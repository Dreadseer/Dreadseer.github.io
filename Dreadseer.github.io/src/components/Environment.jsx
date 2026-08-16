// The environment layer — a fixed backdrop that changes worlds as you descend.
//
// The background artwork is composed with its subject on the right and open
// space on the left, so the site puts content in the left column and lets the
// art live in the right margin instead of burying it under text. Each layer
// cross-fades when its section takes command, and a soft parallax offset keeps
// the plane feeling like it sits behind the content rather than on it.

import { usePointerParallax } from '../hooks/useExperience'
import './Environment.css'

// Which artwork belongs to which part of the story.
const WORLDS = [
  { id: 'hero', src: '/assets/bg-home.webp' },
  { id: 'trajectory', src: '/assets/bg-portfolio.webp' },
  { id: 'capabilities', src: '/assets/bg-links.webp' },
  { id: 'work', src: '/assets/bg-links.webp' },
  { id: 'record', src: '/assets/bg-portfolio.webp' },
  { id: 'offduty', src: '/assets/bg-home.webp' },
  { id: 'contact', src: '/assets/bg-contact.webp' },
]

// Deduplicated so the same image is only ever painted once.
const UNIQUE_SRCS = [...new Set(WORLDS.map((w) => w.src))]

function Environment({ activeSection }) {
  const { x, y } = usePointerParallax()
  const activeSrc =
    WORLDS.find((w) => w.id === activeSection)?.src ?? WORLDS[0].src

  return (
    <div className="env" aria-hidden="true">
      {UNIQUE_SRCS.map((src) => (
        <div
          key={src}
          className={`env__plate${src === activeSrc ? ' is-active' : ''}`}
          style={{
            backgroundImage: `url('${src}')`,
            transform: `translate3d(${x * -14}px, ${y * -10}px, 0) scale(1.06)`,
          }}
        />
      ))}

      {/* Grade: pulls the art down into the brand palette and protects contrast
          on the left where the text column sits. */}
      <div className="env__grade" />
      <div className="env__vignette" />
    </div>
  )
}

export default Environment
