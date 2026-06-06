# 🤖 AI_SPEC — Module 16: Personal Portfolio Website

> **IMPORTANT:** Read this entire file before implementing any feature. This document
> governs all AI-assisted code generation for this project. Feature spec files must also
> be read alongside this one.

---

## Project Identity

- **Project Name:** Dreadseer.github.io
- **Short Description:** A personal portfolio website that showcases skills, projects, and experience — and allows employers to contact the developer directly. Includes a secret admin back office to manage incoming contact messages.
- **Project Type:** Static Frontend Website (React + Vite), deployed to GitHub Pages, with Supabase as the only backend service.

---

## Goal and Scope

### Goal

Deploy a fully public, professional portfolio website at `https://Dreadseer.github.io` that represents Chris's developer identity, showcases real projects, and allows employers to send contact messages. The site must also include a hidden admin area secured by Supabase authentication.

### In Scope (Build Now)

- React (Vite) application scaffolded from scratch
- GitHub Pages deployment via GitHub Actions (`deploy.yml`)
- Global layout: sticky header with nav links + footer with contact info
- AI-generated personal logo in the header
- Responsive design: desktop horizontal nav, mobile bottom icon nav
- Home page: introduction, technical skills, soft skills sections
- Portfolio page: education, work experience, projects, downloadable PDF resume
- Links page: curated resource cards with images, titles, descriptions, URLs
- Contact page: form (name, email, message) that submits to Supabase `messages` table
- Login page: hidden route, Supabase `signInWithPassword` authentication
- Back Office page: protected route, view/delete messages from Supabase table
- AI Specification document + 8 feature specification documents
- CONCEPTS.md with 3 challenging concepts
- LeetCode challenge screenshots in `./LeetCode-Challenges/`
- README.md covering all setup and project information
- Submission summary document (NOT committed to GitHub)

### Out of Scope (Do NOT Build)

- No custom backend server — Supabase is the only backend
- No server-side rendering
- No user registration or public-facing authentication flows
- No real-time or live chat features
- No CMS or dynamic content editing via the UI (beyond the back office delete)
- No unit tests or automated testing setup
- No multi-page routing beyond the 6 defined routes
- No elevator pitch content or scripts (handled separately)

---

## Users and Use Cases

- **Visitor (Public):** Views the Home, Portfolio, and Links pages. Submits a contact message via the Contact form. Cannot access the back office.
- **Admin (Chris):** Accesses the hidden login page by typing the URL. Authenticates with Supabase. Views and deletes contact messages in the Back Office.

---

## Feature Index (Links Only)

All feature specs are located at `./ai/features/`:

- `setup-deploy.feature.md`
- `header-footer.feature.md`
- `home-page.feature.md`
- `portfolio-page.feature.md`
- `link-page.feature.md`
- `contact-page.feature.md`
- `login-page.feature.md`
- `back-office.feature.md`

---

## Pages / Screens / Routes (Project Map)

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/portfolio` | Portfolio | Public |
| `/links` | Links | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Hidden (not in nav) |
| `/backoffice` | Back Office | Protected (auth required) |

**Routing Notes:**
- Use `HashRouter` from React Router (required for GitHub Pages static hosting)
- All URLs remain at `https://Dreadseer.github.io` — no sub-paths in the deployed URL
- The `/login` route must NOT appear in the header, footer, or mobile bottom nav
- The `/backoffice` route must redirect unauthenticated users to `/login`

---

## Data and Models

### Supabase — `messages` Table

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Auto-generated primary key |
| `name` | text | Sender's name from contact form |
| `email` | text | Sender's email from contact form |
| `message` | text | Message body from contact form |
| `created_at` | timestamp | Auto-generated on insert |

**RLS Policies:**
- Public users: `INSERT` only (no `SELECT`, no `DELETE`)
- Authenticated admin: full access (`SELECT`, `DELETE`)

### Supabase Auth — Admin User

- Pre-created manually in the Supabase dashboard (NOT created via app code)
- Email: `admin@codeboxx.com`
- Password: `C0deB0xx4dm!n`

### Static / Local Data

- All personal content (skills, projects, education, work history, links) lives as hardcoded data in component files or a local `data/` directory — no external CMS.

---

## Tech Stack and Tools

### Frontend

- React (functional components + hooks)
- Vite (build tool and dev server)
- React Router DOM (`HashRouter`)
- Custom CSS (CSS variables for theming, no CSS framework required)

### Backend

- Supabase (PostgreSQL database + Auth) — **no custom server**

### Database

- Supabase hosted PostgreSQL — accessed exclusively through the Supabase JS client

### Tools / Libraries

- `@supabase/supabase-js` — Supabase client
- React Router DOM — client-side routing
- Vite — build and dev tooling
- GitHub Actions — CI/CD pipeline for deployment

> **Do NOT introduce:** Redux, Tailwind, Material UI, Bootstrap, Next.js, Axios, or any backend framework.

---

## Repository Structure

```
Dreadseer.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deploy workflow
├── ai/
│   ├── ai-spec.md               # This file
│   └── features/                # One .feature.md per feature
├── docs/
│   ├── script-1.md
│   ├── script-2.md
│   └── pitch-feedback.md
├── LeetCode-Challenges/         # Challenge screenshots (.png)
├── public/
│   └── assets/                  # Static images, logo, resume PDF
├── src/
│   ├── components/              # Reusable UI components (Header, Footer, etc.)
│   ├── data/                    # Hardcoded content (skills, projects, links)
│   ├── lib/
│   │   └── supabaseClient.js    # Supabase client init
│   ├── pages/                   # One file per route/page
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── BackOffice.jsx
│   ├── App.jsx                  # Router setup + layout wrapper
│   └── main.jsx                 # Vite entry point
├── .env                         # Local only — NEVER committed
├── .gitignore                   # Must include .env
├── CONCEPTS.md
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

---

## Rules for the AI

1. **Use junior-friendly code.** Prefer readability over cleverness. No advanced patterns like HOCs, render props, or complex custom hooks unless already established in the codebase.
2. **Use functional React components with hooks only.** No class components.
3. **Do not add features not listed in this spec or the feature spec files.** If something is not explicitly required, do not build it.
4. **Reuse existing files and components.** Do not create duplicate files or new components if an existing one can be extended.
5. **Explain changes briefly.** When generating or modifying code, add a short comment above any non-obvious logic.
6. **Do not use HTML `<form>` submit behavior.** Handle form interactions with `onClick` and `onChange` handlers in React.
7. **Never commit secrets.** The `.env` file must appear in `.gitignore`. Supabase keys live only in `.env` locally and in GitHub Actions secrets for deployment.
8. **Keep CSS scoped and organized.** Use CSS variables for any repeated colors, fonts, or spacing values.
9. **Do not introduce new dependencies** without a clear requirement. Stick to the approved tech stack.
10. **Do not refactor unrelated code** when implementing a specific feature.

---

## How to Run / Test the Project

```bash
# Install dependencies
npm install

# Create local environment file (never commit this)
# .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

**Deployment:** Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build`, and deploys the `dist/` folder to GitHub Pages. Supabase environment variables are injected as GitHub Actions secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

**Live URL:** `https://Dreadseer.github.io`

---

## Definition of Done

- [ ] React + Vite app scaffolded and running locally
- [ ] GitHub Actions workflow deploys to GitHub Pages on push to `main`
- [ ] Site is publicly live at `https://Dreadseer.github.io`
- [ ] Header is sticky, contains nav links and AI-generated logo
- [ ] Footer appears on every page with contact info and copyright
- [ ] Responsive: horizontal nav on desktop, icon bottom nav on mobile
- [ ] Home page has Introduction, Technical Skills, and Soft Skills sections with AI-generated images
- [ ] Portfolio page has Education, Work, and Projects sections with downloadable PDF resume
- [ ] Links page displays at least 3 resource cards with images, titles, descriptions, and URLs
- [ ] Contact form submits to Supabase `messages` table with success/failure feedback
- [ ] Login page is hidden from navigation, accessible by direct URL only
- [ ] Login authenticates via Supabase and redirects to Back Office on success
- [ ] Back Office is protected and redirects unauthenticated users to Login
- [ ] Back Office displays all messages with view modal and delete functionality
- [ ] Logout clears session and redirects to Home or Login
- [ ] `.env` is listed in `.gitignore` and never committed
- [ ] Supabase secrets are configured in GitHub Actions
- [ ] `ai-spec.md` and all 8 feature spec files are complete
- [ ] `CONCEPTS.md` documents 3 challenging concepts
- [ ] LeetCode challenge screenshots are saved to `./LeetCode-Challenges/`
- [ ] `README.md` is complete and explains the project clearly
- [ ] Branch history follows: `feature/*` → `dev` → `main`
- [ ] Code runs without errors in production build
