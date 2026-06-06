# CONCEPTS.md — Module 16 FSO-1616 Professional Development

Three concepts encountered and worked through while building this personal portfolio website.

---

## Concept 1 — Supabase Row Level Security (RLS)

### What it is
Row Level Security is a PostgreSQL feature that Supabase uses to control who can read, write, or delete rows in a database table. When RLS is enabled on a table, **all access is blocked by default** until you explicitly create policies that allow specific operations for specific roles.

### Why it was challenging
This project spent significant time debugging a `403 Forbidden` error on the contact form. Even though the code was correct and the Supabase client was initialized properly, every INSERT attempt was rejected. The root cause was that RLS was enabled on the `messages` table but no INSERT policy had been created for the `anon` role (which is what public, unauthenticated visitors use).

What made it harder to diagnose:
- The error appeared in the network tab as a plain `403` with no obvious explanation
- The Supabase dashboard showed the table existed and the key was correct
- A SQL test using `SET ROLE anon` in the dashboard appeared to succeed (because the dashboard's SQL editor runs with elevated privileges)
- The fix required understanding the difference between **table-level grants** (PostgreSQL `GRANT` statements) and **row-level policies** — both layers must allow the operation for it to succeed

### What I learned
- RLS policies and PostgreSQL `GRANT` statements are two separate security layers. A `GRANT INSERT TO anon` alone is not enough — you also need a `CREATE POLICY ... FOR INSERT TO anon WITH CHECK (true)` to allow rows through
- The `anon` role is used for all unauthenticated requests made with the public anon key
- The `authenticated` role is used once a user signs in — so testing the contact form while logged into the back office sends requests as `authenticated`, not `anon`, which requires its own policy
- Always verify policies with `SELECT * FROM pg_policies WHERE tablename = 'messages'` and check that the `with_check` column is `true`, not null

### The fix
```sql
CREATE POLICY "anon_insert_messages"
ON public.messages AS PERMISSIVE
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "authenticated_insert_messages"
ON public.messages AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (true);
```

---

## Concept 2 — React Router `HashRouter` vs `BrowserRouter` for Static Hosting

### What it is
React Router offers multiple router types. `BrowserRouter` uses real URL paths (e.g. `/portfolio`) and relies on the server to serve the app on any path. `HashRouter` uses a `#` hash in the URL (e.g. `/#/portfolio`) and handles all routing entirely in the browser with no server involvement.

### Why it was challenging
GitHub Pages is a **static file host** — it only serves files that physically exist in the `dist/` folder. When a visitor goes to `https://Dreadseer.github.io/portfolio`, GitHub Pages looks for a file at `dist/portfolio/index.html`. That file doesn't exist — there is only one `index.html` at the root. The result is a `404 Not Found` error on any route except the home page.

`BrowserRouter` would work fine on a server like Express or Nginx (where you can configure a fallback to `index.html`), but on GitHub Pages there is no server to configure.

### What I learned
- **`HashRouter` solves this** because the hash portion of a URL (`#/portfolio`) is never sent to the server — the browser handles it entirely. GitHub Pages only ever receives requests for the root `index.html`, and React Router reads the hash to decide what to render
- The routing choice affects the entire app architecture — it must be decided at the start and is very difficult to change later
- Nested routes in React Router are used to share layout: wrapping public routes inside a parent `<Route element={<Layout />}>` means every child route automatically gets the Header, Footer, and MobileNav via `<Outlet />` without repeating them in every page component
- The `end` prop on `NavLink` is needed for the Home route (`/`) to prevent it from matching every route that starts with `/`, which would make the Home link always appear active

### The pattern used
```jsx
// App.jsx — public routes share Layout, admin routes are standalone
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/portfolio" element={<Portfolio />} />
</Route>
<Route path="/login" element={<Login />} />      // no layout
<Route path="/backoffice" element={<BackOffice />} /> // no layout
```

---

## Concept 3 — `requestAnimationFrame` for Smooth Browser Animations

### What it is
`requestAnimationFrame` (rAF) is a browser API that calls a function on every display refresh — typically 60 times per second (every ~16ms). It is the correct tool for any animation that needs to update the DOM continuously and smoothly, as opposed to `setInterval` which fires on an arbitrary clock that is not synchronized with the screen's refresh cycle.

### Why it was challenging
The skill card carousels on the Home page were first built with `setInterval` set to fire every 2000ms and jump the scroll position by 300px at a time. No matter how short the interval was made, the result always felt "steppy" — the cards would snap rather than flow.

Switching to `requestAnimationFrame` introduced new challenges:
- `setInterval` returns a numeric ID you cancel with `clearInterval`. rAF also returns an ID but you cancel it with `cancelAnimationFrame`. The mental model is the same but the API is different
- rAF runs even when the tab is hidden (in some browsers), which wastes resources. A `pausedRef` was used to skip the scroll logic without cancelling the loop, so resuming is instant
- CSS `scroll-snap-type: x mandatory` on the carousel track completely blocked the pixel-by-pixel scrolling — the browser's snap engine was fighting the rAF loop and winning, snapping the scroll position back on every frame. Removing scroll-snap was required for rAF scrolling to work
- `useEffect` cleanup is critical: if the component unmounts (e.g. navigating to another page), `cancelAnimationFrame` must be called or the loop continues running in the background forever, causing memory leaks and errors on unmounted components

### What I learned
- `requestAnimationFrame` moves `scrollLeft` by a tiny amount (0.5px) on every frame at 60fps, producing ~30px/second of continuous, smooth motion — no jump, no stutter
- A `useRef` is used to store the rAF ID (not `useState`) because updating a ref does not trigger a re-render — perfect for values that need to persist between frames but don't affect the UI
- The `pausedRef` pattern (a boolean ref toggled by mouse events) is more efficient than cancelling and restarting the animation loop on hover, because flipping a ref is synchronous and instant while rescheduling a loop introduces a one-frame gap
- CSS and JavaScript animations must be designed to cooperate — `scroll-snap` is a CSS animation feature that overrides programmatic scroll, so they cannot both be active on the same element at the same time

### The pattern used
```js
function startAutoScroll() {
  function step() {
    if (!pausedRef.current && track) {
      // Move 0.5px per frame — smooth at 60fps
      if (atEnd) track.scrollLeft = 0      // seamless loop
      else track.scrollLeft += SPEED
    }
    rafRef.current = requestAnimationFrame(step) // schedule next frame
  }
  rafRef.current = requestAnimationFrame(step)
}

// Cleanup on unmount — prevents memory leaks
return () => cancelAnimationFrame(rafRef.current)
```
