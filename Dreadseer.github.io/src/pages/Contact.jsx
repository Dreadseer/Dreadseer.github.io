// Contact page — name/email/message form with client-side validation and Supabase INSERT
import { useState, useEffect } from 'react'
import supabase from '../lib/supabaseClient'
import './Contact.css'

function Contact() {
  // ── Form field values ──
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // ── Per-field validation error strings ──
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })

  // ── Top-level success / error feedback banner ──
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  // ── Prevents duplicate submissions while the Supabase insert is in-flight ──
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Store the auto-dismiss timeout ID so we can cancel it on unmount ──
  const [feedbackTimerId, setFeedbackTimerId] = useState(null)

  // Clear the pending auto-dismiss timer if the component unmounts before it fires.
  // This prevents a setState call on an unmounted component (memory leak).
  useEffect(() => {
    return () => {
      if (feedbackTimerId) {
        clearTimeout(feedbackTimerId)
      }
    }
  }, [feedbackTimerId])

  // ── Update a single form field by key ──
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // ── Client-side validation — runs on submit, not on every keystroke ──
  // Returns true if all fields pass; false if any field fails.
  // Sets per-field error messages in the errors state.
  function validate() {
    const newErrors = { name: '', email: '', message: '' }
    let isValid = true

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.'
      isValid = false
    }

    // Simple regex: requires @ and a dot after it
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
      isValid = false
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
      isValid = false
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // ── Submit handler — attached to button onClick, not <form onSubmit> ──
  async function handleSubmit() {
    // 1. Clear previous errors and feedback before each attempt
    setErrors({ name: '', email: '', message: '' })
    setFeedback({ type: '', message: '' })

    // 2. Run validation — bail out early if any field is invalid
    if (!validate()) {
      return
    }

    // 3. Disable the submit button for the duration of the request
    setIsSubmitting(true)

    // 4. Guard against missing Supabase client (env vars not set)
    if (!supabase) {
      setFeedback({
        type: 'error',
        message: 'Contact form is unavailable right now. Please try again later.',
      })
      setIsSubmitting(false)
      return
    }

    // 5. Insert the row into the Supabase messages table
    const { error } = await supabase
      .from('messages')
      .insert([{ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }])

    if (error) {
      // 7. Supabase returned an error — show failure feedback, keep form filled
      setFeedback({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      })
    } else {
      // 6. Success — clear fields, show success banner, then auto-dismiss after 5 s
      setFeedback({
        type: 'success',
        message: "Message sent! I'll get back to you soon.",
      })
      setForm({ name: '', email: '', message: '' })

      // Store the timer ID so the useEffect cleanup can cancel it if needed
      const timerId = setTimeout(() => {
        setFeedback({ type: '', message: '' })
      }, 5000)
      setFeedbackTimerId(timerId)
    }

    // 8. Always re-enable the submit button when the request finishes
    setIsSubmitting(false)
  }

  return (
    <>
      <h1 className="contact__heading">Get In Touch</h1>
      <p className="contact__subheading">
        Have a question or want to work together? Fill out the form and I'll get back to you.
      </p>

      {/* ── Feedback banner — only rendered when a message is present ── */}
      {feedback.message && (
        <div
          className={`contact__feedback contact__feedback--${feedback.type}`}
          role="alert"
          aria-live="polite"
        >
          {feedback.type === 'success' ? '✅' : '❌'} {feedback.message}
        </div>
      )}

      {/* ── Form — no onSubmit; submission is driven by the button's onClick ── */}
      <div className="contact__form">

        {/* Name field */}
        <div className="contact__field">
          <label htmlFor="contact-name" className="contact__label">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            className={`contact__input${errors.name ? ' contact__input--error' : ''}`}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {/* Per-field error — only rendered when errors.name is set */}
          {errors.name && (
            <p id="contact-name-error" className="contact__error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="contact__field">
          <label htmlFor="contact-email" className="contact__label">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className={`contact__input${errors.email ? ' contact__input--error' : ''}`}
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="contact__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="contact__field">
          <label htmlFor="contact-message" className="contact__label">
            Message
          </label>
          <textarea
            id="contact-message"
            className={`contact__textarea${errors.message ? ' contact__textarea--error' : ''}`}
            placeholder="Write your message here..."
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="contact__error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit button — disabled and text changes while isSubmitting is true */}
        <button
          type="button"
          className="contact__submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

      </div>
    </>
  )
}

export default Contact
