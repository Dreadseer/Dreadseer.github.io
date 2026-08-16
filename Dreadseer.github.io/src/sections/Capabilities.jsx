// Capabilities — a capability graph rather than a wall of framework logos.
//
// Six domains, each opening into the concrete nodes underneath it. Leadership
// sits in the same grid as React and Spring Boot on purpose: it is a peer
// capability here, not a footnote in an "about" paragraph.
//
// Implemented as a real tablist so arrow keys work and screen readers announce
// the relationship between a domain and its panel.

import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useExperience'
import { domains, aiLoop } from '../data/capabilities'
import './Capabilities.css'

function Capabilities() {
  const ref = useReveal()
  const [activeId, setActiveId] = useState(domains[0].id)
  const tabRefs = useRef([])

  const activeIndex = domains.findIndex((d) => d.id === activeId)
  const active = domains[activeIndex]

  // Roving focus: Left/Right/Home/End move between domains, as expected of a tablist.
  const onKeyDown = (e) => {
    const last = domains.length - 1
    let next = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = activeIndex === last ? 0 : activeIndex + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = activeIndex === 0 ? last : activeIndex - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last

    if (next !== null) {
      e.preventDefault()
      setActiveId(domains[next].id)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
      <div className="shell" ref={ref}>
        <header className="section__head column">
          <p className="eyebrow reveal">02 — Capabilities</p>
          <h2 id="capabilities-title" className="section__title reveal">
            What I can
            <br />
            actually do
          </h2>
          <p className="section__lede reveal">
            Six domains, not a logo wall. Select one to see what sits underneath it —
            including the two most engineers leave off the list.
          </p>
        </header>

        <div className="cap reveal">
          {/* ── Domain selector ─────────────────────────────────────── */}
          <div
            className="cap__domains"
            role="tablist"
            aria-label="Capability domains"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {domains.map((domain, i) => {
              const selected = domain.id === activeId
              return (
                <button
                  key={domain.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`cap-tab-${domain.id}`}
                  aria-selected={selected}
                  aria-controls={`cap-panel-${domain.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`cap__domain cap__domain--${domain.accent}${
                    selected ? ' is-active' : ''
                  }`}
                  onClick={() => setActiveId(domain.id)}
                >
                  <span className="cap__glyph" aria-hidden="true">
                    {domain.glyph}
                  </span>
                  <span className="cap__domain-label">{domain.label}</span>
                  <span className="cap__count" aria-hidden="true">
                    {domain.nodes.length}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Active domain detail ────────────────────────────────── */}
          <div
            className="cap__panel panel"
            role="tabpanel"
            id={`cap-panel-${active.id}`}
            aria-labelledby={`cap-tab-${active.id}`}
            tabIndex={0}
            key={active.id}
          >
            <p className="cap__blurb">{active.blurb}</p>

            <ul className="cap__nodes">
              {active.nodes.map((node, i) => (
                <li
                  key={node.name}
                  className="cap__node"
                  style={{ '--node-delay': `${i * 55}ms` }}
                >
                  <span className="cap__node-line" aria-hidden="true" />
                  <div>
                    <p className="cap__node-name">{node.name}</p>
                    <p className="cap__node-note">{node.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How the AI work actually runs ───────────────────────────── */}
        <div className="loop reveal">
          <div className="loop__head">
            <p className="eyebrow eyebrow--guard">How I use AI</p>
            <h3 className="loop__title">A loop with a human in it</h3>
            <p className="loop__lede prose">
              I am not asking a model for a finished app. I am writing the specification,
              breaking it down, reviewing every line that comes back, and putting my name
              on the result.
            </p>
          </div>

          <ol className="loop__steps">
            {aiLoop.map((item, i) => (
              <li key={item.step} className="loop__step">
                <span className="loop__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="loop__step-name">{item.step}</p>
                  <p className="loop__step-text">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Capabilities
