// The signal line — the site's spine.
//
// One device doing three jobs at once: it is the scroll progress indicator, the
// section navigation, and the visual through-line of the story (a circuit trace
// borrowed from the crest). Sections are nodes on the trace; the signal fills
// the line as you descend and each node latches as it takes command.
//
// Desktop: a fixed vertical rail on the left edge.
// Mobile:  a top bar with a progress hairline and a full-screen section menu.

import { useEffect, useState } from 'react'
import './SignalRail.css'

function SignalRail({ sections, active, progress, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    onNavigate(id)
  }

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === active)
  )

  return (
    <>
      {/* ── Desktop rail ──────────────────────────────────────────────── */}
      <nav className="rail" aria-label="Section navigation">
        <a
          href="#hero"
          className="rail__crest"
          onClick={(e) => {
            e.preventDefault()
            go('hero')
          }}
          aria-label="Christopher Clarke — back to top"
        >
          <img src="/assets/logo-emblem.webp" alt="" width="34" height="34" />
        </a>

        <div className="rail__trace">
          {/* The unfilled trace */}
          <span className="rail__track" aria-hidden="true" />
          {/* The signal that has travelled so far */}
          <span
            className="rail__signal"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />

          <ul className="rail__nodes">
            {sections.map((section, i) => {
              const isActive = section.id === active
              const isPassed = i < activeIndex
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    className={`rail__node${isActive ? ' is-active' : ''}${
                      isPassed ? ' is-passed' : ''
                    }`}
                    onClick={() => go(section.id)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="rail__dot" aria-hidden="true" />
                    <span className="rail__label">
                      <span className="rail__index">{section.index}</span>
                      {section.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <span className="rail__readout" aria-hidden="true">
          {String(Math.round(progress * 100)).padStart(2, '0')}
        </span>
      </nav>

      {/* ── Mobile top bar ────────────────────────────────────────────── */}
      <header className="topbar">
        <a
          href="#hero"
          className="topbar__brand"
          onClick={(e) => {
            e.preventDefault()
            go('hero')
          }}
        >
          <img src="/assets/logo-emblem.webp" alt="" width="30" height="30" />
          <span>Christopher Clarke</span>
        </a>

        <button
          type="button"
          className="topbar__toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="section-menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <span
          className="topbar__progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      <div
        id="section-menu"
        className={`sheet${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <ul className="sheet__list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={`sheet__item${
                  section.id === active ? ' is-active' : ''
                }`}
                onClick={() => go(section.id)}
              >
                <span className="sheet__index">{section.index}</span>
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SignalRail
