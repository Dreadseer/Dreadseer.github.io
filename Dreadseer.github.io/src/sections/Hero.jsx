// Hero — establishes identity in the first five seconds.
//
// The hook is the crest emerging from a live circuit lattice rather than being
// pasted on as a picture: the same geometry that runs down the rail resolves
// into the shield. Type does the heavy lifting; the artwork stays in the margin.

import { usePointerParallax, useReveal } from '../hooks/useExperience'
import './Hero.css'

// Facts, not slogans — each one is supported by the résumé record.
const READOUT = [
  { k: 'Origin', v: 'USMC Veteran' },
  { k: 'Operations', v: '10+ Years Leading' },
  { k: 'Discipline', v: 'Full-Stack' },
]

function Hero({ onNavigate }) {
  const { x, y } = usePointerParallax()
  const ref = useReveal()

  return (
    <section id="hero" className="section hero" aria-labelledby="hero-name">
      <div className="shell hero__grid" ref={ref}>
        {/* ── Identity column ─────────────────────────────────────────── */}
        <div className="hero__content">
          <p className="hero__creed reveal">
            <span>Builder</span>
            <i aria-hidden="true" />
            <span>Protector</span>
            <i aria-hidden="true" />
            <span>Creator</span>
          </p>

          <h1 id="hero-name" className="hero__name reveal" style={{ '--reveal-delay': '80ms' }}>
            <span className="hero__given">Christopher</span>
            <span className="hero__family">Clarke</span>
          </h1>

          <div className="hero__roles reveal" style={{ '--reveal-delay': '180ms' }}>
            <span>Full-Stack Developer</span>
            <span className="hero__roles-sep" aria-hidden="true" />
            <span>Operational Leader</span>
          </div>

          <p className="hero__pitch prose reveal" style={{ '--reveal-delay': '250ms' }}>
            I spent a decade responsible for people, procedures, and outcomes — in the
            Marine Corps, then in operations and security leadership. Now I build the
            systems. <strong>The engineering is new; the accountability is not.</strong>
          </p>

          <div className="hero__actions reveal" style={{ '--reveal-delay': '320ms' }}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onNavigate('work')}
            >
              <span>View the work</span>
            </button>
            <button type="button" className="btn" onClick={() => onNavigate('contact')}>
              <span>Start a conversation</span>
            </button>
          </div>

          <dl className="hero__readout reveal" style={{ '--reveal-delay': '400ms' }}>
            {READOUT.map((item) => (
              <div key={item.k} className="hero__readout-item">
                <dt>{item.k}</dt>
                <dd>{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Crest, emerging from the lattice ────────────────────────── */}
        <div
          className="hero__crest"
          aria-hidden="true"
          style={{ transform: `translate3d(${x * 16}px, ${y * 12}px, 0)` }}
        >
          <svg className="hero__lattice" viewBox="0 0 460 520" fill="none">
            <defs>
              <linearGradient id="latticeFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sig-400)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--sig-600)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Shield geometry from the crest */}
            <path
              className="hero__shield"
              d="M230 34 L404 128 V318 C404 404 320 462 230 492 C140 462 56 404 56 318 V128 Z"
              stroke="url(#latticeFade)"
              strokeWidth="1.25"
            />
            <path
              className="hero__shield hero__shield--inner"
              d="M230 74 L368 148 V314 C368 382 300 428 230 452 C160 428 92 382 92 314 V148 Z"
              stroke="var(--line-strong)"
              strokeWidth="1"
            />

            {/* Circuit traces feeding the crest */}
            <g className="hero__traces" stroke="var(--sig-500)" strokeWidth="1">
              <path d="M56 250 H8" />
              <path d="M404 250 H452" />
              <path d="M230 492 V520" />
              <path d="M120 400 L120 440 L64 440" />
              <path d="M340 400 L340 440 L396 440" />
            </g>
            <g className="hero__pads" fill="var(--sig-500)">
              <circle cx="8" cy="250" r="3" />
              <circle cx="452" cy="250" r="3" />
              <circle cx="64" cy="440" r="3" />
              <circle cx="396" cy="440" r="3" />
            </g>
          </svg>

          <img
            className="hero__emblem"
            src="/assets/logo-emblem.webp"
            alt=""
            width="230"
            height="250"
          />
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <button
        type="button"
        className="hero__scroll"
        onClick={() => onNavigate('trajectory')}
      >
        <span className="hero__scroll-label">The trajectory</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </button>
    </section>
  )
}

export default Hero
