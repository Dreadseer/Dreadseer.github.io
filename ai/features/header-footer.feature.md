# 🤖 AI_FEATURE_Header-Footer

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Project Layout (Header & Footer)
- **Related Area:** Frontend — Global Layout

---

## Feature Goal

Establish the global layout shell that wraps every page of the site. This includes a sticky header with navigation links and an AI-generated logo, a footer with contact info and copyright, and a responsive behavior that switches from a horizontal desktop nav to a bottom icon nav on mobile. Every page in the app renders inside this layout.

---

## Feature Scope

### In Scope (Included)

- `Layout` wrapper component that renders Header + page content + Footer
- `Header` / `Navbar` component: sticky, contains nav links and logo
- `Footer` component: contact info, social links, copyright notice
- AI-generated personal logo displayed in the header
- Responsive behavior: horizontal nav on desktop (>768px), icon-only bottom nav on mobile (≤768px)
- Logo click navigates to Home (`/`)
- Navigation links to all 4 public pages: Home, Portfolio, Links, Contact
- Login and Back Office routes are NOT included in any navigation

### Out of Scope (Excluded)

- No page content — layout shell only
- No authentication logic
- No dark/light mode toggle (that is an extra mile feature)
- No language switcher (that is an extra mile feature)
- Login (`/login`) and Back Office (`/backoffice`) links must NOT appear anywhere in the nav

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Layout Component:** A `Layout` component wraps all page content. It renders `<Header />`, then `{children}` or `<Outlet />`, then `<Footer />`. All routes in `App.jsx` render inside this Layout.
- **R2 — Header:** A `<header>` element is sticky or fixed at the top of the viewport. It has a consistent background and styling across all pages.
- **R3 — Logo:** An AI-generated logo image is visible in the header. Clicking it navigates to `/`. It has descriptive `alt` text.
- **R4 — Nav Links:** The header contains navigation links to Home, Portfolio, Links, and Contact. Active link state is visually indicated.
- **R5 — Footer:** A `<footer>` element appears at the bottom of every page. It includes at least one contact method (email and/or social links) and a copyright notice.
- **R6 — Desktop Nav:** On viewports wider than 768px, navigation links are displayed horizontally in the header.
- **R7 — Mobile Nav:** On viewports 768px and below, header nav links are hidden. A bottom navigation bar appears fixed at the bottom of the viewport with icon-only links to the same 4 pages.
- **R8 — Responsive Logo:** The logo scales appropriately on all screen sizes and does not overflow its container.
- **R9 — No Overflow:** No content overflows the viewport horizontally at any screen size.

---

## User Flow / Logic (High Level)

1. User lands on any page
2. Layout component renders — Header appears at top, Footer at bottom
3. On desktop: user sees horizontal nav links in the header
4. On mobile: user sees the logo/brand in the header, icon nav appears fixed at the bottom
5. User clicks a nav link — React Router navigates to the correct page without a full reload
6. User clicks the logo — navigates to Home (`/`)
7. Footer is always visible below the page content

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/components/Layout.jsx` — wrapper component, renders Header + Outlet/children + Footer
- `src/components/Header.jsx` — sticky top navigation bar with logo and links
- `src/components/Footer.jsx` — bottom contact and copyright section
- `src/components/MobileNav.jsx` — fixed bottom icon navigation (mobile only, hidden on desktop)
- `src/App.jsx` — updated to wrap all public routes inside `<Layout />`
- `public/assets/logo.png` (or `.svg`) — AI-generated logo file

### Backend / API

- None. This feature is purely frontend.

---

## Data Used or Modified

- Navigation link list: Home (`/`), Portfolio (`/portfolio`), Links (`/links`), Contact (`/contact`)
- Logo image path: `public/assets/logo.png` or imported directly into `Header.jsx`
- Footer content: developer email, GitHub or LinkedIn URL, copyright year

---

## Tech Constraints (Feature-Level)

- Use React Router's `<Link>` component for all navigation — not `<a href>` tags.
- Use React Router's `useLocation` hook to determine the active route for active link styling.
- Use CSS media queries at `768px` breakpoint — no JavaScript-based responsive logic.
- The mobile bottom nav must be a separate component (`MobileNav.jsx`), not embedded directly in `Header.jsx`.
- The logo must be a real image file (AI-generated). A placeholder `<div>` is not acceptable for final submission.
- Fixed/sticky header must not overlap page content — use appropriate padding or margin on the Layout's content area.

---

## Acceptance Criteria

- [ ] A `Layout` component wraps all public-facing routes in `App.jsx`
- [ ] Header is visible and sticky at the top on every page
- [ ] Logo is visible in the header and clicking it navigates to `/`
- [ ] Logo has an `alt` attribute with descriptive text
- [ ] Nav links to Home, Portfolio, Links, and Contact are present in the header
- [ ] Active nav link is visually distinct from inactive links
- [ ] Footer appears on every page with at least one contact method and a copyright notice
- [ ] On desktop (>768px): nav links are horizontal in the header, mobile bottom nav is hidden
- [ ] On mobile (≤768px): header nav links are hidden, bottom icon nav is visible and fixed
- [ ] No horizontal overflow at any screen size
- [ ] Logo scales correctly on mobile without overflowing
- [ ] `/login` and `/backoffice` do not appear in any navigation element

---

## Notes for the AI

- Use React Router's `<Outlet />` pattern inside `Layout.jsx` if using nested routes in `App.jsx`. Alternatively, wrap children with `{children}` prop — either pattern is acceptable, but be consistent.
- The active link style should use `NavLink` from `react-router-dom` instead of `Link` — it provides the `isActive` prop for easy styling.
- The bottom mobile nav icons can use Unicode symbols, emoji, or simple SVG icons inline — do not install an icon library.
- Do not hardcode the copyright year. Use `new Date().getFullYear()` in the Footer.
- Keep the CSS for Header, Footer, and MobileNav in separate `.css` files or CSS modules scoped to each component.
- The sticky header must have a `z-index` high enough to stay above all page content when scrolling.
