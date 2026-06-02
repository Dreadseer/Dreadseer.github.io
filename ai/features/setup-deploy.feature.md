# 🤖 AI_FEATURE_Setup-Deploy

> **IMPORTANT:** Use this document alongside `ai-spec.md`. Do not implement anything
> outside the scope defined here. Read both files fully before generating any code.

---

## Feature Identity

- **Feature Name:** Setup & Deploy
- **Related Area:** Frontend + CI/CD Infrastructure

---

## Feature Goal

Scaffold the React (Vite) application from scratch, configure it for GitHub Pages deployment, set up the Supabase client, and establish the GitHub Actions workflow so that every push to `main` automatically builds and deploys the live site at `https://Dreadseer.github.io`.

---

## Feature Scope

### In Scope (Included)

- Vite + React project scaffolded via `npm create vite@latest`
- `vite.config.js` configured with correct `base` path for GitHub Pages
- React Router DOM installed and configured with `HashRouter`
- Supabase JS client installed and initialized in `src/lib/supabaseClient.js`
- `.env` file created locally for Supabase environment variables
- `.gitignore` updated to exclude `.env`
- GitHub Actions workflow file at `.github/workflows/deploy.yml`
- GitHub Pages configured to deploy from GitHub Actions
- GitHub repository secrets set for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Fallback/graceful behavior when Supabase env vars are not present

### Out of Scope (Excluded)

- No page content or UI components (those belong to their own feature specs)
- No Supabase table creation or RLS policy setup (done manually in Supabase dashboard)
- No Supabase admin user creation (done manually in Supabase dashboard)
- No custom styling or layout at this stage

---

## Sub-Requirements (Feature Breakdown)

- **R1 — Vite Scaffold:** Project created with `npm create vite@latest Dreadseer.github.io`, framework set to React, variant set to JavaScript.
- **R2 — Vite Base Path:** `vite.config.js` sets `base: '/'` for root-level GitHub Pages deployment.
- **R3 — React Router:** `react-router-dom` installed. `App.jsx` uses `HashRouter`. Placeholder routes exist for all 6 pages (`/`, `/portfolio`, `/links`, `/contact`, `/login`, `/backoffice`).
- **R4 — Supabase Client:** `@supabase/supabase-js` installed. `src/lib/supabaseClient.js` initializes the client using `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
- **R5 — Fallback Behavior:** If either Supabase env variable is missing, the client export is `null` and a console warning is logged. The app does not crash on load.
- **R6 — Environment Variables:** A `.env` file exists locally with both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The `.env` file is listed in `.gitignore`.
- **R7 — GitHub Actions Workflow:** `.github/workflows/deploy.yml` triggers on push to `main`, runs `npm ci`, `npm run build`, and deploys the `dist/` folder to GitHub Pages via the `actions/deploy-pages` action.
- **R8 — Secrets in Workflow:** The `deploy.yml` passes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the build step via the `env:` block, sourced from GitHub repository secrets.

---

## User Flow / Logic (High Level)

1. Developer pushes code to the `main` branch on GitHub
2. GitHub Actions workflow triggers automatically
3. Workflow installs dependencies (`npm ci`)
4. Workflow injects Supabase secrets into the build environment
5. Workflow runs `npm run build` — outputs static files to `dist/`
6. Workflow deploys `dist/` to GitHub Pages
7. Site becomes live at `https://Dreadseer.github.io`
8. Visitor navigates to the URL — React app loads, HashRouter handles client-side routing

---

## Interfaces (Pages, Endpoints, Screens)

### Frontend

- `vite.config.js` — build configuration
- `src/main.jsx` — Vite entry point, renders `<App />`
- `src/App.jsx` — `HashRouter` wrapper with `Routes` and placeholder `Route` components for all 6 pages
- `src/lib/supabaseClient.js` — Supabase client singleton, exported for use across all features
- `.env` — local environment variables (never committed)
- `.github/workflows/deploy.yml` — CI/CD pipeline

### Backend / API

- No endpoints at this stage. Supabase connection is established but no queries are made in this feature.

---

## Data Used or Modified

- `VITE_SUPABASE_URL` — Supabase project URL, stored in `.env` locally and as a GitHub secret
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key, stored in `.env` locally and as a GitHub secret

---

## Tech Constraints (Feature-Level)

- Must use `HashRouter` — not `BrowserRouter`. GitHub Pages has no server to handle path-based routing fallbacks.
- `base: '/'` in `vite.config.js` is required for username.github.io root repositories.
- Environment variables must use the `VITE_` prefix to be accessible in Vite client code via `import.meta.env`.
- The `.env` file must appear in `.gitignore` before the first commit. It must never appear in the repository history.
- Do not use `process.env` — Vite uses `import.meta.env`.

---

## Acceptance Criteria

- [ ] Running `npm run dev` starts the app locally without errors
- [ ] Navigating to `http://localhost:5173` renders the React app
- [ ] `vite.config.js` contains `base: '/'`
- [ ] `App.jsx` uses `HashRouter` with routes defined for all 6 pages
- [ ] `src/lib/supabaseClient.js` exists and exports the Supabase client
- [ ] `.env` is present locally and listed in `.gitignore`
- [ ] `.github/workflows/deploy.yml` exists with `npm ci`, `npm run build`, and deploy steps
- [ ] Workflow passes `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` via `env:` block
- [ ] Pushing to `main` triggers the workflow and the site deploys successfully
- [ ] `https://Dreadseer.github.io` loads the React app in a browser
- [ ] App does not crash when Supabase env vars are missing (graceful fallback)

---

## Notes for the AI

- Scaffold the project exactly as the command specifies: `npm create vite@latest Dreadseer.github.io`. Do not rename or restructure the output folders.
- The `HashRouter` choice is non-negotiable for this deployment target. Do not suggest or switch to `BrowserRouter` or `createBrowserRouter`.
- When generating the `deploy.yml`, use the official GitHub Pages Actions: `actions/upload-pages-artifact` and `actions/deploy-pages`. Do not use third-party deploy actions like `peaceiris/actions-gh-pages`.
- The `supabaseClient.js` file should be a single exported instance — not a function, not a hook. All other files import this one instance.
- Keep `App.jsx` minimal at this stage. Placeholder page components (simple `<div>Page Name</div>`) are sufficient — full implementation happens in each page's own feature spec.
