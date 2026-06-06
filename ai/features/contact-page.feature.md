# 🤖 AI_FEATURE_Contact-Page

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Contact Page
- **Related Area:** Frontend — Public Page + Supabase Integration

---

## Feature Goal

Build the Contact page at `/contact` that allows any visitor to send Chris a message. The form collects a name, email, and message, validates all fields client-side before submission, then inserts the data into the Supabase `messages` table. The visitor receives clear visual feedback on success or failure. This is the first feature that directly uses the Supabase client.

---

## Feature Scope

### In Scope (Included)

- Contact page component accessible at `/contact`
- Form with three fields: name, email, message
- Client-side validation before submission
- Supabase `INSERT` to the `messages` table on valid submission
- Success feedback message (visually distinct, auto-clears)
- Failure feedback message (visually distinct)
- Form fields reset after successful submission
- Page renders inside the global `Layout` component

### Out of Scope (Excluded)

- No email sending — data goes to Supabase only, no SMTP or email service
- No file attachments
- No spam protection or CAPTCHA
- No reading or displaying existing messages (that belongs to Back Office)
- No authentication required — this is a public form
- No server-side validation — client-side only

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Contact Route:** Page is accessible at `/contact` via the nav link.
- **R2 — Form Fields:** The form contains three fields: a text input for name, an email input for email, and a textarea for message. All fields have visible labels or placeholders.
- **R3 — Client-Side Validation:** All three fields are required. The form cannot be submitted with any empty field. The email field validates for proper email format. Validation errors are displayed to the user. The form rejects submission when validation fails.
- **R4 — Supabase Submission:** On valid submission, a Supabase `INSERT` is made to the `messages` table using the client from `src/lib/supabaseClient.js`. The payload includes `name`, `email`, and `message` fields.
- **R5 — Success Feedback:** A success message is displayed after a successful insert (e.g. "Message sent! I'll get back to you soon."). It is visually distinct — green color or check icon. The form fields are cleared after success. The success message disappears after 5 seconds or on the next user interaction.
- **R6 — Failure Feedback:** If the Supabase insert fails, an error message is displayed (e.g. "Something went wrong. Please try again."). It is visually distinct — red color or X icon.
- **R7 — Submit Button State:** The submit button is disabled while the form is being submitted to prevent duplicate submissions.
- **R8 — Fallback Behavior:** If the Supabase client is null (env vars missing), the form displays an error message instead of crashing.
- **R9 — Layout Integration:** The page renders inside the global `Layout` wrapper — it does not re-implement the header or footer.

---

## User Flow / Logic (High Level)

1. Visitor clicks "Contact" in the nav
2. Contact page loads inside the Layout shell
3. Visitor fills in name, email, and message fields
4. Visitor clicks the submit button
5. Client-side validation runs — if any field is invalid, errors display and submission stops
6. If valid, the submit button disables and the Supabase insert runs
7a. On success: form clears, green success message appears, auto-dismisses after 5 seconds
7b. On failure: red error message appears, form fields remain filled so the user can retry

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Contact.jsx` — main Contact page component with form logic
- `src/pages/Contact.css` — scoped styles for the Contact page
- `src/lib/supabaseClient.js` — existing Supabase client (already created in Setup feature, do not recreate)

### Backend / API

- Supabase `messages` table — `INSERT` operation only
- Table schema: `id` (auto), `name` (text), `email` (text), `message` (text), `created_at` (auto)

---

## Data Used or Modified

### Form State

```js
{
  name: "",
  email: "",
  message: ""
}
```

### Supabase Insert Payload

```js
{ name, email, message }
```

### Validation Rules

- `name`: required, must not be empty or whitespace only
- `email`: required, must match a valid email format (use regex or input type validation)
- `message`: required, must not be empty or whitespace only

---

## Tech Constraints (Feature-Level)

- Use the existing `supabaseClient.js` from `src/lib/` — do not create a new Supabase instance.
- Use React `useState` to manage form field values, validation errors, submission state, and feedback messages.
- Do not use an external form library (e.g. Formik, React Hook Form) — plain React state only.
- Do not use `<form onSubmit>` default behavior — use a button `onClick` handler or prevent default explicitly.
- The submit button must be disabled (`disabled` attribute) while `isSubmitting` state is true.
- Success message auto-dismiss must use `setTimeout` — clear it after 5000ms.
- Do not use `process.env` — use `import.meta.env` for any env checks.

---

## Acceptance Criteria

- [ ] Contact page loads at `/contact` without errors
- [ ] Form has name (text), email (email), and message (textarea) fields with labels or placeholders
- [ ] Submitting with any empty field shows a validation error and does not submit
- [ ] Submitting with an invalid email format shows a validation error and does not submit
- [ ] A valid submission triggers a Supabase INSERT to the `messages` table
- [ ] Success message is green/positive and appears after successful insert
- [ ] Form fields clear after successful submission
- [ ] Success message disappears after 5 seconds
- [ ] Failure message is red/negative and appears if the insert fails
- [ ] Submit button is disabled during submission
- [ ] Form does not crash if Supabase client is null
- [ ] Page renders correctly inside the Layout (header and footer visible)
- [ ] Page is responsive — form is readable and usable on mobile

---

## Notes for the AI

- Use a single `errors` state object to track validation messages per field:
  `const [errors, setErrors] = useState({ name: "", email: "", message: "" })`
- Use a separate `feedback` state object for the success/failure message:
  `const [feedback, setFeedback] = useState({ type: "", message: "" })`
  where `type` is either `"success"` or `"error"`.
- Use an `isSubmitting` boolean state to disable the button and prevent double-submits.
- The `setTimeout` for auto-dismissing the success message should be cleared with
  `clearTimeout` if the component unmounts — use `useEffect` cleanup to avoid memory leaks.
- Keep the form layout simple and clean — label above input, error message directly below
  the relevant field in red text, submit button full width or clearly prominent.
- Do not validate on every keystroke — validate on submit only to keep the UX clean.
