// Trajectory — the professional story as a transformation, not a résumé.
//
// Each phase hangs off a continuation of the signal line, and the emphasis is
// on the translation: what that phase became once it was pointed at software.
// The résumé facts are present, but they are the supporting detail, not the point.

import { useReveal } from '../hooks/useExperience'
import { trajectory, translations } from '../data/story'
import './Trajectory.css'

function Trajectory() {
  const ref = useReveal()

  return (
    <section id="trajectory" className="section trajectory" aria-labelledby="trajectory-title">
      <div className="shell" ref={ref}>
        <header className="section__head column">
          <p className="eyebrow reveal">01 — Trajectory</p>
          <h2 id="trajectory-title" className="section__title reveal">
            Nothing here was
            <br />
            a career change
          </h2>
          <p className="section__lede reveal">
            The same operator, pointed at a new problem. Every phase below produced a
            capability that engineering needed anyway — I just learned it somewhere
            with higher stakes than a sprint board.
          </p>
        </header>

        {/* ── The phases ──────────────────────────────────────────────── */}
        <ol className="phases">
          {trajectory.map((phase) => (
            <li key={phase.id} className="phase reveal">
              <div className="phase__marker" aria-hidden="true">
                <span className="phase__dot" />
                <span className="phase__stem" />
              </div>

              <div className="phase__body">
                <div className="phase__meta">
                  <span className="phase__index">{phase.index}</span>
                  <span className="phase__label">{phase.phase}</span>
                  <span className="phase__period">{phase.period}</span>
                </div>

                <h3 className="phase__title">{phase.title}</h3>
                {phase.org && <p className="phase__org">{phase.org}</p>}
                <p className="phase__summary">{phase.summary}</p>

                <div className="tag-row phase__tags">
                  {phase.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* The translation — the reason this section exists */}
                <div className="translate">
                  <span className="translate__from">{phase.translation.from}</span>
                  <span className="translate__arrow" aria-hidden="true">
                    <svg viewBox="0 0 44 8" fill="none">
                      <path d="M0 4h38" stroke="currentColor" strokeWidth="1" />
                      <path d="M36 1l6 3-6 3" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                  <span className="translate__to">{phase.translation.to}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* ── The thesis ──────────────────────────────────────────────── */}
        <div className="thesis reveal">
          <p className="eyebrow eyebrow--guard">The short version</p>
          <ul className="thesis__grid">
            {translations.map((t) => (
              <li key={t.from} className="thesis__item">
                <span className="thesis__from">{t.from}</span>
                <span className="thesis__became">became</span>
                <span className="thesis__to">{t.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Trajectory
