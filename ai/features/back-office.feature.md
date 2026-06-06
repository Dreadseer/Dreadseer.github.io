# 🤖 AI_FEATURE_Back-Office

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Back Office
- **Related Area:** Frontend — Protected Route + Supabase Integration

---

## Feature Goal

Build a protected Back Office page at `/backoffice` that is only accessible to authenticated admins. It fetches and displays all messages submitted through the Contact form, renders them in a table sorted newest first, allows the admin to view a full message in a modal, delete individual messages, and log out. Unauthenticated users who navigate to this route are redirected to `/login` immediately.

---

## Feature Scope

### In Scope (Included)

- Back Office page component accessible at `/backoffice` — authenticated users only
- Auth check on mount — redirect to `/login` if no session exists
- Fetch all rows from Supabase `messages` table on load, sorted by `created_at` descending
- Display messages in a table with columns: Name, Email, Date, Actions
- View message modal: opens on row click or View button, shows full message details
- Delete button per row — removes message from Supabase and updates the UI instantly
- Logout button — calls `supabase.auth.signOut()`, redirects to `/` or `/login`
- Empty state message when no messages exist
- Error state message if the fetch fails
- Page renders WITHOUT the global `Layout` wrapper (no public header or footer)

### Out of Scope (Excluded)

- No public nav link to this page — not in header, footer, or mobile nav
- No replying to messages
- No editing or updating messages
- No pagination or filtering
- No bulk delete
- No user management or additional admin features

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Protected Route:** When the Back Office page mounts, it checks for an active Supabase session using `supabase.auth.getSession()`. If no session exists, it redirects immediately to `/login` using `useNavigate`. The page content does not render until auth is confirmed.
- **R2 — No Layout Wrapper:** The Back Office page renders outside the global `Layout` component. It has its own standalone styling — no public header or footer visible.
- **R3 — Fetch Messages:** On mount (after auth is confirmed), fetch all rows from the `messages` table using `supabase.from("messages").select("*").order("created_at", { ascending: false })`.
- **R4 — Messages Table:** A table renders with four columns: Name, Email, Date, and Actions. Each row corresponds to one message. Date is formatted in a human-readable format. The Actions column contains a View button and a Delete button per row.
- **R5 — Empty State:** If the messages table is empty, display a message: "No messages yet."
- **R6 — Error State:** If the fetch fails, display an error message: "Failed to load messages. Please try again."
- **R7 — View Message Modal:** Clicking a row or the View button opens a modal displaying: sender name, sender email, date and time, and full message text. The modal has a close button (X or "Close"). Clicking outside the modal or pressing Escape closes it.
- **R8 — Delete Message:** Clicking the Delete button on a row calls `supabase.from("messages").delete().eq("id", message.id)`. On success, the message is removed from the local state instantly — no full re-fetch needed. A confirmation before delete is optional but not required.
- **R9 — Logout Button:** A logout button is visible on the page. Clicking it calls `supabase.auth.signOut()` and redirects to `/` using `useNavigate`. The session is fully cleared.
- **R10 — Loading State:** While messages are being fetched, display a loading indicator (e.g. "Loading messages..."). The table does not render until data is ready.

---

## User Flow / Logic (High Level)

1. Admin navigates to `/#/backoffice` (via redirect from Login or direct URL)
2. Page mounts — auth check runs
3a. No session found → redirect to `/login` immediately
3b. Session found → fetch messages from Supabase
4. Loading indicator displays while fetch is in progress
5. On fetch success:
   - If messages exist → render the table
   - If no messages → render empty state
6. On fetch failure → render error state
7. Admin clicks View on a row → modal opens with full message details
8. Admin closes the modal → modal disappears, table remains
9. Admin clicks Delete on a row → row disappears from table instantly
10. Admin clicks Logout → session cleared, redirect to `/`

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/BackOffice.jsx` — main Back Office page with auth check, table, and modal logic
- `src/pages/BackOffice.css` — standalone styles for the Back Office page
- `src/components/MessageModal.jsx` — modal component for viewing full message details
- `src/components/MessageModal.css` — styles for the modal
- `src/lib/supabaseClient.js` — existing Supabase client (do not recreate)
- `src/App.jsx` — `/backoffice` route must be outside the `Layout` wrapper

### Backend / API

- Supabase Auth — `supabase.auth.getSession()` for auth check on mount
- Supabase Auth — `supabase.auth.signOut()` for logout
- Supabase DB — `supabase.from("messages").select("*").order("created_at", { ascending: false })`
- Supabase DB — `supabase.from("messages").delete().eq("id", message.id)`

---

## Data Used or Modified

### Message Object (from Supabase)

```js
{
  id: "uuid",
  name: "string",
  email: "string",
  message: "string",
  created_at: "timestamp"
}
```

### Component State

```js
const [messages, setMessages] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [selectedMessage, setSelectedMessage] = useState(null) // null = modal closed
```

---

## Tech Constraints (Feature-Level)

- Use the existing `supabaseClient.js` from `src/lib/` — do not create a new Supabase instance.
- Use `useNavigate` from `react-router-dom` for all redirects — not `window.location`.
- Use `useEffect` with an empty dependency array `[]` for the auth check and message fetch on mount.
- The auth check must complete before the fetch runs — run them sequentially, not in parallel.
- Delete must update local state directly (`setMessages(prev => prev.filter(...))`) — do not re-fetch the entire table after a delete.
- The modal must be a separate component (`MessageModal.jsx`) — do not inline it in `BackOffice.jsx`.
- The Escape key listener for closing the modal must be added in a `useEffect` and cleaned up on unmount.
- Format dates using `new Date(created_at).toLocaleString()` — no external date library.
- The `/backoffice` route in `App.jsx` must be outside the `Layout` wrapper.

---

## Acceptance Criteria

- [ ] Navigating to `/#/backoffice` without a session redirects to `/login`
- [ ] Navigating to `/#/backoffice` with a valid session renders the page
- [ ] Page renders with NO public header or footer
- [ ] Loading indicator displays while messages are being fetched
- [ ] Messages table renders with Name, Email, Date, and Actions columns
- [ ] Each row has a View button and a Delete button
- [ ] Clicking View opens the modal with full message details
- [ ] Modal shows sender name, email, date/time, and full message text
- [ ] Modal closes on X button click, outside click, or Escape key press
- [ ] Clicking Delete removes the row from the table instantly
- [ ] Empty state message renders when no messages exist
- [ ] Error state message renders if the fetch fails
- [ ] Logout button clears session and redirects to `/`
- [ ] Page is responsive — table scrolls horizontally on mobile if needed
- [ ] No console errors on load

---

## Notes for the AI

- The auth check and fetch should be in a single `useEffect`. Run the auth check first,
  redirect if no session, then run the fetch if authenticated.
- `selectedMessage` state drives the modal — when it is `null` the modal is hidden,
  when it holds a message object the modal renders with that message's data.
- Pass `selectedMessage`, `onClose`, and nothing else as props to `MessageModal`.
  Keep the modal component simple and focused.
- The modal overlay (full screen dark background) should be a separate div behind the
  modal card. Clicking the overlay calls `onClose`. Clicking inside the modal card
  stops propagation so it does not accidentally close.
- For the table on mobile, wrap it in a div with `overflow-x: auto` so it scrolls
  horizontally rather than overflowing the viewport.
- The logout button should be clearly visible — top right of the page is a natural
  position. Do not hide it or make it hard to find.
- Keep the Back Office styling clean and functional — this is an internal tool,
  not a public-facing page. A simple dark header bar with a logout button and a
  clean white table body is perfectly appropriate.
