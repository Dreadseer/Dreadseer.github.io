// Record — the verifiable paper trail. Deliberately plain and dense: this is
// the section a recruiter scans to confirm what the rest of the site claims.

import { useReveal } from '../hooks/useExperience'
import { education, workExperience } from '../data/portfolio'
import './Record.css'

function Record() {
  const ref = useReveal()

  return (
    <section id="record" className="section record" aria-labelledby="record-title">
      <div className="shell" ref={ref}>
        <header className="section__head column">
          <p className="eyebrow reveal">04 — Record</p>
          <h2 id="record-title" className="section__title reveal">
            The paper trail
          </h2>
          <p className="section__lede reveal">
            Where the experience came from, and what is currently in progress.
          </p>
        </header>

        <div className="record__grid">
          {/* ── Experience ──────────────────────────────────────────── */}
          <div className="reveal">
            <h3 className="record__heading">Experience</h3>
            <ol className="record__list">
              {workExperience.map((job) => (
                <li key={`${job.organization}-${job.startDate}`} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">{job.title}</h4>
                    <span className="entry__dates">
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <p className="entry__org">{job.organization}</p>
                  <ul className="entry__points">
                    {job.description.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Education + résumé ──────────────────────────────────── */}
          <div className="reveal" style={{ '--reveal-delay': '120ms' }}>
            {/* A face next to the record — this is the section where a recruiter
                is deciding whether to believe the rest of the page. */}
            <figure className="record__portrait">
              <img
                src="/assets/chris-portrait.webp"
                alt="Christopher Clarke"
                width="440"
                height="660"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <h3 className="record__heading">Education</h3>
            <ol className="record__list">
              {education.map((entry) => (
                <li key={entry.institution} className="entry">
                  <div className="entry__head">
                    <h4 className="entry__title">{entry.program}</h4>
                  </div>
                  <p className="entry__org">{entry.institution}</p>
                  <p className="entry__dates entry__dates--inline">
                    {entry.startDate === 'Expected'
                      ? `Expected ${entry.endDate}`
                      : entry.endDate}
                  </p>
                </li>
              ))}
            </ol>

            <div className="record__resume panel">
              <p className="record__resume-label">Full résumé</p>
              <p className="record__resume-note">
                Every role, in one page, formatted for your applicant tracking system.
              </p>
              <a className="btn" href="/assets/resume.pdf" download>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Record
