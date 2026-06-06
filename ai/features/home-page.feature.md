# 🤖 AI_FEATURE_Home-Page

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Home Page
- **Related Area:** Frontend — Public Page

---

## Feature Goal

Build the default landing page of the portfolio at the root route (`/`). It introduces Chris as a developer, displays technical and soft skills in a visually organized layout, and includes at least two AI-generated images. This is the first impression for any employer or visitor who lands on the site.

---

## Feature Scope

### In Scope (Included)

- Home page component accessible at `/`
- Introduction section: name, role/title, and short bio paragraph
- Technical skills section: at least 3 skills, each with an icon and supporting text
- Soft skills section: at least 3 soft skills/talents, each with an icon and supporting text
- At least 2 AI-generated images on the page with proper `alt` text
- At least 3 visually distinct sections with spacing or background separation
- Page renders inside the global `Layout` component (Header + Footer already handled)

### Out of Scope (Excluded)

- No contact form (that belongs to the Contact page feature)
- No project listings (that belongs to the Portfolio page feature)
- No authentication or protected content
- No animations or scroll effects beyond basic CSS transitions
- No external data fetching — all content is hardcoded or from a local data file

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Root Route:** The Home page is accessible at `/` and is the default landing page when the site loads.
- **R2 — Introduction Section:** Displays Chris's full name prominently, a role or tagline (e.g. "Full-Stack Developer"), and a short paragraph describing who he is and his background.
- **R3 — Technical Skills Section:** At least 3 technical skills are displayed. Each skill has a name, a short supporting description (not just a single word), and an icon representing the skill.
- **R4 — Soft Skills Section:** At least 3 soft skills or personal talents are displayed. Each has a name, a short supporting description, and an icon.
- **R5 — Skills Visual Layout:** Both skills sections are visually organized — cards, grid, or icon list. Not a plain unordered list.
- **R6 — AI-Generated Images:** At least 2 images on the page were generated using an AI tool. Each has descriptive `alt` text. The AI tool used is noted in a comment in the component file.
- **R7 — Section Separation:** The page has at least 3 clearly distinct sections separated by spacing, background color differences, or dividers.
- **R8 — Layout Integration:** The Home page renders inside the global `Layout` wrapper — it does not re-implement the header or footer.

---

## User Flow / Logic (High Level)

1. Visitor navigates to `https://Dreadseer.github.io` or clicks the Home nav link
2. The Home page loads inside the Layout shell (header and footer already present)
3. Visitor scrolls through the Introduction, Technical Skills, and Soft Skills sections
4. All content is static — no loading states, no API calls

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Home.jsx` — main Home page component
- `src/pages/Home.css` — scoped styles for the Home page
- `src/data/skills.js` (optional) — exported arrays for technical and soft skills data if preferred over hardcoding in the component
- `public/assets/` — AI-generated images used on this page

### Backend / API

- None. All content is static.

---

## Data Used or Modified

### Technical Skills (at least 3 — examples, replace with real ones)

Each skill object:
```js
{ name: "JavaScript", description: "...", icon: "..." }
```

Suggested real skills based on the program:
- JavaScript
- React
- Java / Spring Boot
- React Native / Expo
- SQL / MySQL
- Node.js / Express
- Git / GitHub

### Soft Skills (at least 3 — examples, replace with real ones)

Each skill object:
```js
{ name: "Leadership", description: "...", icon: "..." }
```

Suggested based on Chris's background:
- Leadership (10+ years operations experience)
- Communication
- Problem Solving
- Adaptability
- Attention to Detail

---

## Tech Constraints (Feature-Level)

- All content is hardcoded or sourced from a local `src/data/skills.js` file — no API calls.
- Icons can be Unicode symbols, emoji, or inline SVG — do not install an icon library.
- Images must be real files in `public/assets/` — no placeholder URLs from the internet (e.g. no `picsum.photos`).
- Do not use an external component library for the skills cards layout — build it with custom CSS.
- The AI tool used to generate images must be noted in a comment inside `Home.jsx`.

---

## Acceptance Criteria

- [ ] Home page loads at `/` without errors
- [ ] Chris's name is prominently displayed
- [ ] A role/title or tagline is visible
- [ ] A short bio paragraph is present
- [ ] At least 3 technical skills are displayed, each with a name, description, and icon
- [ ] At least 3 soft skills are displayed, each with a name, description, and icon
- [ ] Both skills sections use a visual layout (cards or grid — not a plain list)
- [ ] At least 2 AI-generated images are present with descriptive `alt` text
- [ ] The AI tool used is noted in a comment in `Home.jsx`
- [ ] The page has at least 3 visually distinct sections
- [ ] Page renders correctly inside the Layout (header and footer visible)
- [ ] Page is responsive — content stacks vertically on mobile, no horizontal overflow

---

## Notes for the AI

- Keep the component readable. If the skills data is long, move it to `src/data/skills.js` and import it — don't bloat the JSX with inline data arrays.
- Use CSS Grid or Flexbox for the skills card layout. A simple 3-column grid on desktop that collapses to 1 column on mobile is ideal.
- The Introduction section is the hero of the page — give it visual weight (larger font for the name, a distinct background or padding).
- Do not invent or fabricate personal details beyond what is provided. Leave clear placeholder comments like `{/* TODO: Replace with real bio */}` where personal content needs to be filled in by Chris.
- AI-generated images should be relevant to the content — a developer workspace, abstract tech imagery, or a professional avatar are all appropriate.
