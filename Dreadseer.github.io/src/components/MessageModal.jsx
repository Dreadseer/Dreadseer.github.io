// Modal overlay that shows the full details of a single contact message
import { useEffect } from 'react'
import './MessageModal.css'

function MessageModal({ message, onClose }) {
  // ── Escape key listener ────────────────────────────────────────────────────
  // Adds a keydown listener on mount and removes it on unmount to avoid leaks.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup: remove listener when the modal unmounts or onClose changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Render nothing when there is no message selected
  if (!message) return null

  return (
    // Clicking the dark overlay (outside the card) closes the modal
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Message details">
      {/*
        stopPropagation prevents the overlay's onClick from firing when the user
        clicks anywhere inside the card itself.
      */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button — top-right corner */}
        <button
          className="modal-card__close"
          onClick={onClose}
          aria-label="Close message modal"
        >
          ✕ Close
        </button>

        <h2 className="modal-card__title">Message Details</h2>

        {/* Sender name */}
        <div className="modal-card__field">
          <span className="modal-card__label">From</span>
          <p className="modal-card__value">{message.name}</p>
        </div>

        {/* Sender email */}
        <div className="modal-card__field">
          <span className="modal-card__label">Email</span>
          <p className="modal-card__value">{message.email}</p>
        </div>

        {/* Date and time — formatted with toLocaleString for the browser's locale */}
        <div className="modal-card__field">
          <span className="modal-card__label">Received</span>
          <p className="modal-card__value">
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>

        {/* Full message text — pre-wrap preserves line breaks the sender typed */}
        <div className="modal-card__field">
          <span className="modal-card__label">Message</span>
          <p className="modal-card__message-text">{message.message}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageModal
