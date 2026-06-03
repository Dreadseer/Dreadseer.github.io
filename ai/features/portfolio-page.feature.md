# 🤖 AI_FEATURE_Portfolio-Page

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Portfolio Page
- **Related Area:** Frontend — Public Page

---

## Feature Goal

Build the Portfolio page at `/portfolio` that serves as Chris's online resume. It displays education history, work experience, and real projects built during the program — all in reverse chronological order. It also includes a button to download a PDF version of the resume and at least two AI-generated images integrated into the layout.

---

## Feature Scope

### In Scope (Included)

- Portfolio page component accessible at `/portfolio`
- Education section: at least one institution with program, degree, and dates
- Work experience section: at least one role with title, organization, dates, and description
- Projects section: at least one project with name, tech stack, description, and image
- Downloadable PDF resume button/link
- At least 2 AI-generated images integrated into the page
- Page renders inside the global `Layout` component

### Out of Scope (Excluded)

- No contact form
- No authentication or protected content
- No external data fetching — all content is hardcoded or from a local data file
- No editing or dynamic updating of resume content via the UI
- No filtering or sorting of projects

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Portfolio Route:** Page is accessible at `/portfolio` via the nav link.
- **R2 — Education Section:** At least one educational entry is displayed. Each entry includes institution name, degree or program name, and start/end dates. Entries are in reverse chronological order (most recent first).
- **R3 — Work Experience Section:** At least one work experience entry is displayed. Each entry includes job title/role, organization name, dates, and a description of responsibilities or achievements. Entries are in reverse chronological order.
- **R4 — Projects Section:** At least one project is displayed. Each project entry includes: project name, tech stack used, a description of what it does and its purpose, and an image.
- **R5 — Downloadable PDF:** A button or link allows the visitor to download a PDF version of the resume. The PDF file lives in `public/assets/resume.pdf`. The link opens or downloads the file directly.
- **R6 — AI-Generated Images:** At least 2 images on the page were generated using an AI tool. Each has descriptive `alt` text. The AI tool used is noted in a comment in the component file.
- **R7 — Section Separation:** The page has at least 3 clearly distinct sections separated by spacing, background color differences, or dividers.
- **R8 — Layout Integration:** The page renders inside the global `Layout` wrapper — it does not re-implement the header or footer.

---

## User Flow / Logic (High Level)

1. Visitor clicks "Portfolio" in the nav
2. Portfolio page loads inside the Layout shell
3. Visitor scrolls through Education, Work Experience, and Projects sections
4. Visitor clicks the download button — PDF resume downloads or opens in a new tab
5. All content is static — no loading states, no API calls

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `src/pages/Portfolio.jsx` — main Portfolio page component
- `src/pages/Portfolio.css` — scoped styles for the Portfolio page
- `src/data/portfolio.js` — exported arrays for education, work, and projects data
- `public/assets/resume.pdf` — downloadable resume PDF file
- `public/assets/` — AI-generated images and project images

### Backend / API

- None. All content is static.

---

## Data Used or Modified

### Education (at least 1 entry)

```js
{
  institution: "CodeBoxx Academy",
  program: "AI Native Full-Stack Development",
  startDate: "2024",
  endDate: "Present"
}
```

### Work Experience (at least 1 entry)

```js
{
  title: "Operations Coordinator / Leader",
  organization: "Pinellas County Job Corps Center",
  startDate: "...",
  endDate: "...",
  description: "..."
}
```

### Projects (at least 1 entry — use real CodeBoxx projects)

```js
{
  name: "Rocket Food Delivery",
  tech: ["React Native", "Expo", "TypeScript", "Spring Boot"],
  description: "...",
  image: "/assets/project-rocket-food.png"
}
```

Suggested projects from the program:
- Rocket Food Delivery (Modules 13–14) — React Native / Expo / Spring Boot
- Rocket Elevators Back Office (Module 11) — Java / Spring Boot / MySQL
- CodeBloggs (Module 9) — MERN Stack
- CodeBoxx Event Experience (Intro to Dev) — Next.js / React / Tailwind

---

## Tech Constraints (Feature-Level)

- All content is hardcoded or sourced from `src/data/portfolio.js` — no API calls.
- The PDF download link must use an `<a>` tag with `href` pointing to `public/assets/resume.pdf` and `download` attribute set.
- Project images must be real files in `public/assets/` — no placeholder URLs from the internet.
- Icons can be Unicode symbols or emoji — do not install an icon library.
- Do not use an external component library for layout — build with custom CSS.
- The AI tool used to generate images must be noted in a comment inside `Portfolio.jsx`.

---

## Acceptance Criteria

- [ ] Portfolio page loads at `/portfolio` without errors
- [ ] Education section displays at least one entry with institution, program, and dates
- [ ] Work experience section displays at least one entry with title, org, dates, and description
- [ ] Projects section displays at least one entry with name, tech, description, and image
- [ ] All sections are in reverse chronological order (most recent first)
- [ ] A download button/link for the PDF resume is present and functional
- [ ] At least 2 AI-generated images are present with descriptive `alt` text
- [ ] The AI tool used is noted in a comment in `Portfolio.jsx`
- [ ] The page has at least 3 visually distinct sections
- [ ] Page renders correctly inside the Layout (header and footer visible)
- [ ] Page is responsive — content stacks vertically on mobile, no horizontal overflow

---

## Notes for the AI

- Move all resume data into `src/data/portfolio.js` — do not bloat the JSX with long inline arrays.
- The projects section should be the most visually prominent — use cards with the project image, name, tech stack tags, and description. A simple grid (2 columns desktop, 1 column mobile) works well.
- For the tech stack on each project, render each technology as a small tag or badge element — not a comma-separated string.
- Leave `{/* TODO: Replace with real dates/description */}` comments wherever Chris needs to fill in personal content.
- The PDF download link: `<a href="/assets/resume.pdf" download>Download Resume (PDF)</a>`. If the file does not exist yet, create a clearly labeled placeholder comment so Chris knows where to place it.
- Work experience descriptions should mention responsibilities AND achievements — leave placeholder text that prompts Chris to add specifics from his 10+ years in operations.
