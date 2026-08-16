// Capabilities — a capability graph rather than a wall of framework logos.
//
// Six domains, each opening into the concrete nodes underneath it. Leadership
// sits in the same grid as React and Spring Boot on purpose: it is a peer
// capability here, not a footnote in an "about" paragraph.
//
// Two genuinely different interaction models, not one adapted with CSS:
//
//   Desktop — a tablist. A persistent selector column beside a detail panel,
//   driven by pointer and arrow keys, with both visible at once.
//
//   Touch — an accordion. Every domain is visible in one vertical scan and its
//   detail opens directly beneath the row you tapped. A horizontal selector
//   would put five of the six domains off-screen with nothing to suggest they
//   exist, and would separate the control from the content it changes.

import { useRef, useState } from 'react'
import { useReveal, useMediaQuery } from '../hooks/useExperience'
import { domains, aiLoop } from '../data/capabilities'
import './Capabilities.css'

// The nodes belonging to one domain — shared by both interaction models.
function DomainNodes({ domain }) {
  return (
    <>
      <p className="cap__blurb">{domain.blurb}</p>
      <ul className="cap__nodes">
        {domain.nodes.map((node, i) => (
          <li key={node.name} className="cap__node" style={{ '--node-delay': `${i * 55}ms` }}>
            <span className="cap__node-line" aria-hidden="true" />
            <div>
              <p className="cap__node-name">{node.name}</p>
              <p className="cap__node-note">{node.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ── Desktop: selector column + detail panel ─────────────────────────── */
function DomainTabs() {
  const [activeId, setActiveId] = useState(domains[0].id)
  const tabRefs = useRef([])

  const activeIndex = domains.findIndex((d) => d.id === activeId)
  const active = domains[activeIndex]

  // Roving focus, as expected of a tablist.
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
    <div className="cap">
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
              className={`cap__domain cap__domain--${domain.accent}${selected ? ' is-active' : ''}`}
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

      <div
        className="cap__panel panel"
        role="tabpanel"
        id={`cap-panel-${active.id}`}
        aria-labelledby={`cap-tab-${active.id}`}
        tabIndex={0}
        key={active.id}
      >
        <DomainNodes domain={active} />
      </div>
    </div>
  )
}

/* ── Touch: accordion ────────────────────────────────────────────────── */
function DomainAccordion() {
  // First domain starts open so the section opens with content rather than a
  // wall of closed rows; tapping the open row collapses it.
  const [openId, setOpenId] = useState(domains[0].id)

  return (
    <div className="acc">
      {domains.map((domain) => {
        const open = domain.id === openId
        return (
          <div
            key={domain.id}
            className={`acc__item acc__item--${domain.accent}${open ? ' is-open' : ''}`}
          >
            <h3 className="acc__heading">
              <button
                type="button"
                className="acc__trigger"
                aria-expanded={open}
                aria-controls={`acc-panel-${domain.id}`}
                onClick={() => setOpenId(open ? null : domain.id)}
              >
                <span className="cap__glyph" aria-hidden="true">
                  {domain.glyph}
                </span>
                <span className="acc__label">{domain.label}</span>
                <span className="acc__count" aria-hidden="true">
                  {domain.nodes.length}
                </span>
                <span className="acc__icon" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>

            <div id={`acc-panel-${domain.id}`} className="acc__panel" role="region">
              <div className="acc__panel-inner">
                <DomainNodes domain={domain} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Capabilities() {
  const ref = useReveal()
  const isTouchLayout = useMediaQuery('(max-width: 900px)')

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
            Six domains, not a logo wall. Open one to see what sits underneath it —
            including the two most engineers leave off the list.
          </p>
        </header>

        {/* Reveal sits on a stable wrapper: the inner tree swaps between the two
            interaction models, and React would otherwise overwrite the class. */}
        <div className="reveal">
          {isTouchLayout ? <DomainAccordion /> : <DomainTabs />}
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
