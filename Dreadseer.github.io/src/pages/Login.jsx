// Hidden admin login page — Supabase signInWithPassword, no public header or footer
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  // ── Session check on mount ────────────────────────────────────────────────
  // If the admin is already authenticated, skip the form and go straight to
  // the back office. This also handles the "refresh the page" persistence case.
  useEffect(() => {
    // Guard: if Supabase client is null (env vars missing), skip the check
    if (!supabase) return

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        navigate('/backoffice')
      }
    }

    checkSession()
  }, []) // Empty array — run once on mount only

  // ── Login handler — attached to button onClick, not <form onSubmit> ──────
  async function handleLogin() {
    // 1. Clear any previous error before each attempt
    setError('')

    // 2. Guard: if Supabase client is null, show error and bail out
    if (!supabase) {
      setError('Authentication is unavailable right now. Please try again later.')
      return
    }

    // 3. Disable the button for the duration of the auth call
    setIsSubmitting(true)

    try {
      // 4. Attempt sign-in — credentials are whatever the user typed, never hardcoded
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        // 6. Wrong credentials or any auth error — generic message (do not reveal which field)
        setError('Invalid login credentials. Please try again.')
      } else {
        // 5. Success — navigate to the back office; form fields stay filled but are irrelevant
        navigate('/backoffice')
      }
    } finally {
      // 7. Always re-enable the button when the call finishes, success or failure
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Minimal heading — deliberately does not hint this is an admin area */}
        <h1 className="login-card__heading">Welcome Back</h1>

        {/* Email field */}
        <div className="login-card__field">
          <label htmlFor="login-email" className="login-card__label">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="login-card__input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Password field */}
        <div className="login-card__field">
          <label htmlFor="login-password" className="login-card__label">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="login-card__input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {/* Error message — only rendered when error string is non-empty */}
        {error && (
          <p className="login-card__error" role="alert">
            ❌ {error}
          </p>
        )}

        {/* Login button — disabled and text changes during the auth call */}
        <button
          type="button"
          className="login-card__button"
          onClick={handleLogin}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default Login
