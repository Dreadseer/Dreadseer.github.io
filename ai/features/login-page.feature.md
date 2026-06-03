# 🤖 AI_FEATURE_Login-Page

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Login Page
- **Related Area:** Frontend — Hidden Route + Supabase Authentication

---

## Feature Goal

Build a hidden login page at `/login` that allows Chris (the admin) to authenticate using Supabase Auth. The page is not linked anywhere in the public navigation — it is only reachable by typing the URL directly. On successful login, the user is redirected to the Back Office. On failure, a clear error message is shown. The session persists across page refreshes.

---

## Feature Scope

### In Scope (Included)

- Login page component accessible at `/login` by direct URL only
- Email and password input fields
- Supabase `signInWithPassword` authentication
- Redirect to `/backoffice` on successful login
- Error message displayed on failed login attempt
- Session persistence across page refresh
- If a valid session already exists, redirect directly to `/backoffice` without showing the form
- Page renders WITHOUT the global `Layout` wrapper (no public header or footer)

### Out of Scope (Excluded)

- No public nav link to this page — not in header, footer, or mobile nav
- No user registration or sign-up form
- No password reset or forgot password flow
- No "remember me" toggle — session persistence is handled automatically by Supabase
- No social login (Google, GitHub, etc.)
- No rate limiting or lockout logic

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Hidden Route:** The `/login` route is not included in the Header, Footer, or MobileNav components. It is only accessible by typing the URL directly into the browser.
- **R2 — No Layout Wrapper:** The Login page renders outside the global `Layout` component. It has its own standalone styling — no public header or footer visible.
- **R3 — Login Form Fields:** The form contains an email input (`type="email"`) and a password input (`type="password"`). Both have visible labels or placeholders. A submit/login button is present.
- **R4 — Supabase Authentication:** On form submission, `supabase.auth.signInWithPassword({ email, password })` is called using the client from `src/lib/supabaseClient.js`.
- **R5 — Success Redirect:** On successful login, the user is navigated to `/backoffice` using React Router's `useNavigate`. The session is established and persists across page refreshes.
- **R6 — Failure Feedback:** If the credentials are wrong or the request fails, an error message is displayed (e.g. "Invalid login credentials. Please try again."). The message is visually distinct — red text. The form fields remain filled so the user can correct and retry.
- **R7 — Session Check on Load:** When the Login page mounts, it checks if a valid Supabase session already exists. If a session is found, it redirects immediately to `/backoffice` without rendering the form.
- **R8 — Submit Button State:** The submit button is disabled while authentication is in progress to prevent duplicate submissions. Button text changes to "Signing in..." during submission.
- **R9 — Fallback Behavior:** If the Supabase client is null (env vars missing), the form displays an error message instead of crashing.

---

## User Flow / Logic (High Level)

1. Admin types `https://Dreadseer.github.io/#/login` directly in the browser
2. Login page mounts — checks for existing Supabase session
3a. If session exists → redirect immediately to `/backoffice`
3b. If no session → render the login form
4. Admin enters email and password and clicks the login button
5. Button disables, `signInWithPassword` is called
6a. On success → navigate to `/backoffice`
6b. On failure → show red error message, re-enable the button

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Login.jsx` — login page component with auth logic
- `src/pages/Login.css` — standalone styles for the login page
- `src/lib/supabaseClient.js` — existing Supabase client (do not recreate)
- `src/App.jsx` — `/login` route must be outside the `Layout` wrapper

### Backend / API

- Supabase Auth — `supabase.auth.signInWithPassword({ email, password })`
- Supabase Auth — `supabase.auth.getSession()` for session check on mount

---

## Data Used or Modified

### Form State

```js
{
  email: "",
  password: ""
}
```

### Admin Credentials (pre-created in Supabase dashboard — NOT in code)

- Email: `admin@codeboxx.com`
- Password: `C0deB0xx4dm!n`

### Session Check

```js
const { data: { session } } = await supabase.auth.getSession()
if (session) navigate("/backoffice")
```

---

## Tech Constraints (Feature-Level)

- Use the existing `supabaseClient.js` from `src/lib/` — do not create a new Supabase instance.
- Use `useNavigate` from `react-router-dom` for redirects — not `window.location`.
- Use `useEffect` to check for an existing session on component mount.
- Use React `useState` for form fields, error message, and submitting state.
- Do not use an external form library — plain React state only.
- The `/login` route in `App.jsx` must be outside the `Layout` wrapper — confirm this is already the case from the Header/Footer feature.
- Do not hardcode credentials anywhere in the component — the admin account is pre-created in Supabase and the form just calls `signInWithPassword` with whatever the user types.

---

## Acceptance Criteria

- [ ] `/login` is not linked in the Header, Footer, or MobileNav
- [ ] Navigating to `/#/login` renders the login form (no public header or footer)
- [ ] Email and password fields are present with labels or placeholders
- [ ] Submitting with correct credentials redirects to `/backoffice`
- [ ] Session persists — refreshing the page after login does not log the user out
- [ ] If already logged in, navigating to `/login` redirects to `/backoffice`
- [ ] Submitting with wrong credentials shows a red error message
- [ ] Submit button is disabled and shows "Signing in..." during submission
- [ ] Form does not crash if Supabase client is null
- [ ] Page is responsive and usable on mobile

---

## Notes for the AI

- The Login page should feel clean and minimal — centered card layout, no distractions.
  It's a secret admin page, not a public-facing page.
- Use `useEffect` with an empty dependency array `[]` for the session check on mount.
  Run the check asynchronously inside the effect.
- The `isSubmitting` state should cover the entire async call — set it to true before
  calling `signInWithPassword` and back to false in the finally block.
- Do not show any hint to visitors that this page exists — no "Admin Login" heading
  that would be obvious. A subtle label like "Welcome Back" or just a minimal form
  is sufficient.
- Keep the error message generic: "Invalid login credentials. Please try again."
  Do not reveal whether the email or password specifically was wrong.
