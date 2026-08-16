// The unlock — a character sheet, revealed by the hidden sequence.
//
// Explicitly labeled as an easter egg so it can never be mistaken for a real
// credential. Behaves like a proper dialog: focus moves in, Escape closes,
// focus returns to where it was, and background content is inert to AT.

import { useEffect, useRef } from 'react'
import { characterSheet } from '../data/offduty'
import './CharacterSheet.css'

function CharacterSheet({ onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    returnFocusRef.current = document.activeElement
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Keep Tab inside the dialog while it is open.
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div
        className="sheet-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-card__head">
          <div>
            <p className="sheet-card__egg">Easter egg unlocked</p>
            <h2 id="cs-title" className="sheet-card__title">
              Character Sheet
            </h2>
          </div>
          <button
            type="button"
            className="sheet-card__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close character sheet"
          >
            ✕
          </button>
        </div>

        <dl className="sheet-card__meta">
          <div>
            <dt>Class</dt>
            <dd>{characterSheet.class}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{characterSheet.origin}</dd>
          </div>
          <div>
            <dt>Alignment</dt>
            <dd>{characterSheet.alignment}</dd>
          </div>
        </dl>

        <ul className="stats">
          {characterSheet.stats.map((stat) => (
            <li key={stat.label} className="stat">
              <span className="stat__label">{stat.label}</span>
              <span className="stat__bar" aria-hidden="true">
                <span style={{ width: `${(stat.value / 20) * 100}%` }} />
              </span>
              <span className="stat__value">{stat.value}</span>
            </li>
          ))}
        </ul>

        <div className="sheet-card__passives">
          <p className="sheet-card__passives-label">Passives</p>
          <ul>
            {characterSheet.passives.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <p className="sheet-card__foot">
          Stats are for entertainment purposes. The résumé is upstairs.
        </p>
      </div>
    </div>
  )
}

export default CharacterSheet
