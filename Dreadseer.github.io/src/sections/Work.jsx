// Work — projects as short case studies with progressive disclosure.
//
// The closed state is skimmable: name, what it is, the stack, and a shot of the
// thing. Opening one answers the questions an interviewer actually asks — what
// problem, for whom, what was built, what was hard, and what it taught.

import { useState } from 'react'
import { useReveal } from '../hooks/useExperience'
import { projects } from '../data/portfolio'
import './Work.css'

function ProjectEntry({ project, index }) {
  const [open, setOpen] = useState(false)
  const panelId = `case-${project.id}`

  // The reveal class lives on a wrapper, not on the article. The observer adds
  // `is-in` to the DOM directly, and React would wipe it on the next render of
  // any element whose own className prop changes — which the article's does
  // every time the case study is toggled.
  return (
    <div className="reveal">
    <article className={`work${open ? ' is-open' : ''}`}>
      <div className="work__main">
        {/* ── Summary ─────────────────────────────────────────────── */}
        <div className="work__content">
          <div className="work__meta">
            <span className="work__index">{String(index + 1).padStart(2, '0')}</span>
            <span className="work__kind">{project.kind}</span>
          </div>

          <h3 className="work__name">{project.name}</h3>
          <p className="work__tagline">{project.tagline}</p>

          <div className="tag-row work__tech">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="work__actions">
            <button
              type="button"
              className="work__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="work__toggle-icon" aria-hidden="true">
                <i />
                <i />
              </span>
              {open ? 'Close case study' : 'Read the case study'}
            </button>

            {project.github && (
              <a
                className="link"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
                <span aria-hidden="true">↗</span>
                <span className="sr-only">
                  {`${project.name} on GitHub, opens in a new tab`}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* ── Media ───────────────────────────────────────────────── */}
        <div className="work__media">
          <img
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
            decoding="async"
          />
          <span className="work__media-frame" aria-hidden="true" />
        </div>
      </div>

      {/* ── Case study ────────────────────────────────────────────── */}
      <div id={panelId} className="work__case" role="region" aria-label={`${project.name} case study`}>
        <div className="work__case-inner">
          <div className="work__case-grid">
            <div className="work__case-block">
              <p className="work__case-label">The problem</p>
              <p className="work__case-text">{project.problem}</p>
              <p className="work__case-for">
                <span>Built for</span> {project.audience}
              </p>
            </div>

            <div className="work__case-block">
              <p className="work__case-label">What I built</p>
              <ul className="work__case-list">
                {project.build.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="work__case-block work__case-block--wide">
            <p className="work__case-label work__case-label--guard">The engineering problem</p>
            <p className="work__case-text">{project.engineering}</p>
          </div>

          <div className="work__case-block work__case-block--wide">
            <p className="work__case-label">What it taught me</p>
            <p className="work__case-text">{project.learned}</p>
          </div>
        </div>
      </div>
    </article>
    </div>
  )
}

function Work() {
  const ref = useReveal()

  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shell" ref={ref}>
        <header className="section__head column">
          <p className="eyebrow reveal">03 — The Work</p>
          <h2 id="work-title" className="section__title reveal">
            Things I have
            <br />
            actually shipped
          </h2>
          <p className="section__lede reveal">
            Five builds, each with a real constraint behind it. Open any of them for the
            problem, the decisions, and the part that did not go smoothly.
          </p>
        </header>

        <div className="work-list">
          {projects.map((project, i) => (
            <ProjectEntry key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
