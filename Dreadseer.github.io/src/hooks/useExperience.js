// Shared behavior hooks for the single-page experience.
// All of them are no-ops or instant-complete under prefers-reduced-motion.

import { useEffect, useRef, useState, useCallback } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Reveals elements marked `.reveal` inside the returned ref once they rise past
 * the reveal line near the bottom of the viewport.
 *
 * Deliberately scroll-driven rather than IntersectionObserver-driven: an
 * observer only fires when an element *crosses* a threshold, so an element that
 * is jumped over in a single frame — a fast flick, or the rail navigating
 * straight to a later section — goes from "below the viewport" to "above the
 * viewport" without ever intersecting, and stays invisible forever. Measuring
 * position directly cannot miss that case. Each element is dropped from the
 * list once revealed and the listener detaches when the list empties, so this
 * costs nothing after the first pass.
 */
export function useReveal(deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    let pending = Array.from(root.querySelectorAll('.reveal'))
    if (!pending.length) return

    // With reduced motion there is nothing to stagger — show everything at once.
    if (prefersReducedMotion()) {
      pending.forEach((el) => el.classList.add('is-in'))
      return
    }

    let frame = null

    const sweep = () => {
      frame = null
      // Reveal a little before the element reaches the bottom edge so the
      // motion resolves as it settles into view.
      const line = window.innerHeight * 0.92
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add('is-in')
          return false
        }
        return true
      })

      if (!pending.length) detach()
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(sweep)
    }

    function detach() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }

    sweep()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      detach()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

/**
 * Tracks which section is currently in command of the viewport.
 * Uses the section whose top edge is closest to a line ~38% down the screen,
 * which matches where the eye actually sits far better than raw intersection.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = null

    const measure = () => {
      frame = null
      const line = window.innerHeight * 0.38
      let best = ids[0]
      let bestDistance = Infinity

      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const { top, bottom } = el.getBoundingClientRect()
        // Only consider sections actually overlapping the viewport
        if (bottom < 0 || top > window.innerHeight) return
        const distance = Math.abs(top - line)
        if (distance < bestDistance) {
          bestDistance = distance
          best = id
        }
      })

      setActive((prev) => (prev === best ? prev : best))
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

/**
 * Document scroll progress, 0 → 1. Drives the signal line's draw and the
 * mobile progress bar. Throttled to one read per animation frame.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = null

    const measure = () => {
      frame = null
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/**
 * Pointer parallax, normalized to -1..1 from the center of the window.
 * Disabled entirely on touch devices and under reduced motion — it is a
 * desktop-pointer enhancement, never a requirement for understanding anything.
 */
export function usePointerParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = null
    let next = { x: 0, y: 0 }

    const apply = () => {
      frame = null
      setOffset(next)
    }

    const onMove = (e) => {
      next = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return offset
}

/**
 * The hidden sequence. Fires once the Konami code is entered on a keyboard.
 * Keyboard-only by design — it stays out of the way of every other visitor.
 */
const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonami(onUnlock) {
  const positionRef = useRef(0)
  const handler = useCallback(
    (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = SEQUENCE[positionRef.current]

      if (key === expected) {
        positionRef.current += 1
        if (positionRef.current === SEQUENCE.length) {
          positionRef.current = 0
          onUnlock()
        }
      } else {
        // Restart, but allow the wrong key to be the start of a new attempt
        positionRef.current = key === SEQUENCE[0] ? 1 : 0
      }
    },
    [onUnlock]
  )

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])
}
