# 🤖 AI_FEATURE_Link-Page

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Links Page
- **Related Area:** Frontend — Public Page

---

## Feature Goal

Build the Links page at `/links` that displays a curated collection of useful developer resources, tools, and references as visual cards. Each card includes an image, title, short description, and a clickable URL that opens in a new tab. At least one image on the page must be AI-generated.

---

## Feature Scope

### In Scope (Included)

- Links page component accessible at `/links`
- At least 3 resource cards, each with an image, title, description, and external URL
- At least 1 AI-generated image used across the page
- Cards open their URL in a new tab
- Page renders inside the global `Layout` component

### Out of Scope (Excluded)

- No search or filtering of links
- No adding or editing links via the UI
- No authentication or protected content
- No external data fetching — all links are hardcoded or from a local data file
- No pagination

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Links Route:** Page is accessible at `/links` via the nav link.
- **R2 — Link Cards:** At least 3 links are displayed. Each card includes an image (thumbnail or preview), a title or name, a short description (1–3 sentences), and a clickable URL.
- **R3 — New Tab:** Every link URL opens in a new browser tab (`target="_blank"`). Each external link also includes `rel="noopener noreferrer"` for security.
- **R4 — AI-Generated Image:** At least 1 image on the page was generated using an AI tool. It has descriptive `alt` text. The AI tool used is noted in a comment in the component file.
- **R5 — Visual Layout:** Cards are displayed in a grid or structured layout — not a plain list.
- **R6 — Layout Integration:** The page renders inside the global `Layout` wrapper — it does not re-implement the header or footer.

---

## User Flow / Logic (High Level)

1. Visitor clicks "Links" in the nav
2. Links page loads inside the Layout shell
3. Visitor browses the resource cards
4. Visitor clicks a card or its link — URL opens in a new tab
5. All content is static — no loading states, no API calls

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Links.jsx` — main Links page component
- `src/pages/Links.css` — scoped styles for the Links page
- `src/data/links.js` — exported array of link objects
- `public/assets/` — images used for link cards (including AI-generated)

### Backend / API

- None. All content is static.

---

## Data Used or Modified

### Links Array (at least 3 entries)

```js
{
  title: "...",
  description: "...",
  url: "https://...",
  image: "/assets/link-image.png"
}
```

Suggested real resources relevant to Chris's stack and program:

- **MDN Web Docs** — `https://developer.mozilla.org` — The go-to reference for HTML, CSS, and JavaScript. Covers everything from basic syntax to advanced browser APIs.
- **React Documentation** — `https://react.dev` — Official React docs with guides, API references, and interactive examples for building component-based UIs.
- **Supabase Docs** — `https://supabase.com/docs` — Documentation for Supabase covering database setup, authentication, and the JavaScript client.
- **LeetCode** — `https://leetcode.com` — Practice platform for coding challenges and technical interview preparation.
- **GitHub** — `https://github.com` — Version control and collaboration platform. Home to all CodeBoxx project repositories.
- **Expo Documentation** — `https://docs.expo.dev` — Official docs for building React Native apps with Expo, including setup, APIs, and deployment guides.

---

## Tech Constraints (Feature-Level)

- All content is hardcoded or sourced from `src/data/links.js` — no API calls.
- All external links must include `target="_blank"` and `rel="noopener noreferrer"`.
- Card images must be real files in `public/assets/` — no placeholder URLs from the internet.
- At least one card image must be AI-generated.
- Do not use an external component library for card layout — build with custom CSS.
- The AI tool used to generate images must be noted in a comment inside `Links.jsx`.

---

## Acceptance Criteria

- [ ] Links page loads at `/links` without errors
- [ ] At least 3 link cards are displayed
- [ ] Each card has an image, title, description, and clickable URL
- [ ] All URLs open in a new tab
- [ ] All external links include `rel="noopener noreferrer"`
- [ ] At least 1 AI-generated image is present with descriptive `alt` text
- [ ] The AI tool used is noted in a comment in `Links.jsx`
- [ ] Cards use a grid or structured layout — not a plain list
- [ ] Page renders correctly inside the Layout (header and footer visible)
- [ ] Page is responsive — cards stack vertically on mobile, no horizontal overflow

---

## Notes for the AI

- Move all link data into `src/data/links.js` and import it — keep the JSX clean.
- A 3-column grid on desktop collapsing to 1 column on mobile is a clean, simple approach for the cards layout.
- Each card should feel like a mini preview — image on top, title, then description, then a visible "Visit" or "Open" link at the bottom of the card.
- The entire card can be wrapped in an `<a>` tag if preferred, but make sure the `target` and `rel` attributes are on that outer element.
- For card images that are not AI-generated, use relevant screenshots or generic placeholder images from `public/assets/` — do not pull from external URLs.
- Leave a comment `{/* TODO: Replace card images with real screenshots or AI-generated images */}` so Chris knows which images need to be swapped before submission.
