// Off Duty — the personality layer and the reference stack.
//
// Present but subordinate: a recruiter who does not care about tabletop games
// still gets a useful section (the references I actually keep open), while
// someone who does will notice the sequence hint at the bottom.

import { useReveal } from '../hooks/useExperience'
import { interests } from '../data/offduty'
import { links } from '../data/links'
import './OffDuty.css'

function OffDuty() {
  const ref = useReveal()

  return (
    <section id="offduty" className="section offduty" aria-labelledby="offduty-title">
      <div className="shell" ref={ref}>
        <header className="section__head column">
          <p className="eyebrow reveal">05 — Off Duty</p>
          <h2 id="offduty-title" className="section__title reveal">
            The other half
          </h2>
          <p className="section__lede reveal">
            I build things when nobody is asking me to. That habit is the reason the
            rest of this site exists.
          </p>
        </header>

        <div className="offduty__interests">
          {interests.map((item, i) => (
            <div
              key={item.label}
              className="offduty__interest reveal"
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <p className="offduty__interest-label">{item.label}</p>
              <p className="offduty__interest-text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ── Reference stack ─────────────────────────────────────────── */}
        <div className="refs reveal">
          <div className="refs__head">
            <h3 className="refs__title">Reference stack</h3>
            <p className="refs__note">
              The documentation I keep open. No affiliate links, no course funnels —
              just what I actually use.
            </p>
          </div>

          <ul className="refs__list">
            {links.map((link) => (
              <li key={link.title}>
                <a
                  className="ref"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ref__title">
                    {link.title}
                    <span className="ref__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  <span className="ref__desc">{link.description}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The wink. Keyboard users who recognize it know what to do. */}
        <p className="offduty__hint reveal" aria-hidden="true">
          <span>↑ ↑ ↓ ↓ ← → ← → B A</span>
        </p>
      </div>
    </section>
  )
}

export default OffDuty
