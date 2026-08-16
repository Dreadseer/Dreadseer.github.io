// Contact — the closing movement.
//
// The Supabase submission logic is carried over unchanged from the original
// contact page (validate on submit, insert, feedback banner, auto-dismiss).
// What changed is the framing: this reads as the end of an argument rather
// than a form bolted to the bottom of a page.

import { useState, useEffect, useRef } from 'react'
import supabase from '../lib/supabaseClient'
import { useReveal } from '../hooks/useExperience'
import './Contact.css'

const CHANNELS = [
  { label: 'Email', value: 'dreadseer@gmail.com', href: 'mailto:dreadseer@gmail.com' },
  { label: 'GitHub', value: 'github.com/Dreadseer', href: 'https://github.com/Dreadseer' },
  {
    label: 'LinkedIn',
    value: 'christopher-clarke',
    href: 'https://www.linkedin.com/in/christopher-clarke-11172310b/',
  },
]

function Contact() {
  const revealRef = useReveal()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Holds the auto-dismiss timer so it can be cancelled on unmount.
  const timerRef = useRef(null)
  useEffect(() => () => clearTimeout(timerRef.current), [])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Validation runs on submit rather than on every keystroke so the form does
  // not scold the visitor while they are still typing.
  function validate() {
    const next = { name: '', email: '', message: '' }
    let valid = true

    if (!form.name.trim()) {
      next.name = 'Name is required.'
      valid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      next.email = 'Email is required.'
      valid = false
    } else if (!emailRegex.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
      valid = false
    }

    if (!form.message.trim()) {
      next.message = 'Message is required.'
      valid = false
    }

    setErrors(next)
    return valid
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({ name: '', email: '', message: '' })
    setFeedback({ type: '', message: '' })

    if (!validate()) return

    setIsSubmitting(true)

    // Env vars missing — fail loudly in the UI rather than silently doing nothing.
    if (!supabase) {
      setFeedback({
        type: 'error',
        message: 'The form is unavailable right now — email works: dreadseer@gmail.com',
      })
      setIsSubmitting(false)
      return
    }

    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    })

    if (error) {
      setFeedback({ type: 'error', message: 'Something went wrong. Please try again.' })
    } else {
      setFeedback({ type: 'success', message: "Message received. I'll get back to you." })
      setForm({ name: '', email: '', message: '' })
      timerRef.current = setTimeout(
        () => setFeedback({ type: '', message: '' }),
        6000
      )
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="shell" ref={revealRef}>
        <div className="contact__grid">
          {/* ── The close ───────────────────────────────────────────── */}
          <div className="contact__pitch">
            <p className="eyebrow reveal">06 — Contact</p>
            <h2 id="contact-title" className="contact__title reveal">
              If you are building something real
            </h2>
            <p className="contact__lede reveal">
              If you are solving a genuine problem, or you need someone who can hold a
              technical conversation and a stakeholder conversation on the same day —
              that is the work I want.
            </p>

            <ul className="channels reveal">
              {CHANNELS.map((c) => (
                <li key={c.label} className="channel">
                  <span className="channel__label">{c.label}</span>
                  <a
                    className="channel__value"
                    href={c.href}
                    {...(c.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── The form ────────────────────────────────────────────── */}
          <form className="contact__form panel reveal" onSubmit={handleSubmit} noValidate>
            <p className="contact__form-title">Send a message</p>

            {feedback.message && (
              <p
                className={`contact__feedback contact__feedback--${feedback.type}`}
                role="alert"
              >
                {feedback.message}
              </p>
            )}

            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'is-error' : ''}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'c-name-err' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <p id="c-name-err" className="field__error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'is-error' : ''}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'c-email-err' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <p id="c-email-err" className="field__error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                rows="5"
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={errors.message ? 'is-error' : ''}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'c-message-err' : undefined}
              />
              {errors.message && (
                <p id="c-message-err" className="field__error">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending…' : 'Send message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
