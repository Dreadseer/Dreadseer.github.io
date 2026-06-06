# Dreadseer.github.io — Personal Portfolio Website

A fully responsive personal portfolio website built with React and Vite, deployed to GitHub Pages, and powered by Supabase as the backend. It showcases skills, education, work experience, and projects — and allows employers to send contact messages directly. Includes a hidden admin back office for managing those messages.

**Live Site:** [https://Dreadseer.github.io](https://Dreadseer.github.io)

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Pages & Routes](#pages--routes)
- [Supabase Setup](#supabase-setup)
- [GitHub Actions Deployment](#github-actions-deployment)
- [Admin Back Office](#admin-back-office)
- [Customizing Content](#customizing-content)
- [API Documentation](#api-documentation)
- [Author](#author)

---

## Project Description

This is Chris Clarke's personal developer portfolio — a static frontend website that serves as a professional online presence for employers and collaborators. It was built from scratch as part of the CodeBoxx Academy AI Native Full-Stack Development program.

**What it does:**
- Introduces Chris as a full-stack developer with a bio, skills carousel, and profile photo
- Showcases real projects built during the program with descriptions and screenshots
- Lists education history and work experience
- Provides a contact form that saves messages directly to a Supabase database
- Includes a secret admin area where Chris can log in, read, and delete messages

**Who it's for:** Employers, recruiters, and collaborators who want to learn about Chris's skills and get in touch.

**What problem it solves:** Gives Chris a professional online presence that is fully owned, customizable, and deployed automatically on every code push — no WordPress, no page builders, just clean code.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 (functional components + hooks) |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM 7 (`HashRouter`) |
| **Backend / Database** | Supabase (PostgreSQL + Auth) |
| **Supabase Client** | `@supabase/supabase-js` 2 |
| **Styling** | Custom CSS (CSS variables, no framework) |
| **Deployment** | GitHub Pages via GitHub Actions |
| **CI/CD** | GitHub Actions (`deploy.yml`) |

> ❌ Not used: Redux, Tailwind, Material UI, Bootstrap, Next.js, Axios, or any custom server.

---

## Project Structure

```
Dreadseer.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploys to GitHub Pages on push to main
├── public/
│   └── assets/                 # All static images, logos, and resume PDF
│       ├── logo.svg            # Site logo displayed in the header
│       ├── chris-portrait.jpg  # Profile photo used on the Home page
│       ├── project-*.png       # Project card screenshots
│       ├── link-*.png          # Link card images
│       └── resume.pdf          # Downloadable resume (add before submission)
├── src/
│   ├── components/             # Reusable UI components shared across pages
│   │   ├── Header.jsx          # Sticky top nav bar with logo and nav links
│   │   ├── Footer.jsx          # Site footer with contact links and copyright
│   │   ├── Layout.jsx          # Wraps all public pages (Header + content + Footer)
│   │   ├── MobileNav.jsx       # Fixed bottom icon navigation (mobile only, ≤768px)
│   │   └── MessageModal.jsx    # Modal popup for viewing a full message in Back Office
│   ├── data/                   # All hardcoded content — edit here to update the site
│   │   ├── skills.js           # Technical and soft skills arrays (Home page)
│   │   ├── portfolio.js        # Education, work experience, and projects (Portfolio page)
│   │   └── links.js            # Resource link cards (Links page)
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase client singleton — imported everywhere needed
│   ├── pages/                  # One file per route
│   │   ├── Home.jsx            # / — Introduction, skills carousels
│   │   ├── Portfolio.jsx       # /portfolio — Education, work, projects, resume download
│   │   ├── Links.jsx           # /links — Curated developer resource cards
│   │   ├── Contact.jsx         # /contact — Contact form that inserts to Supabase
│   │   ├── Login.jsx           # /login — Hidden admin login (no nav link)
│   │   └── BackOffice.jsx      # /backoffice — Protected admin message inbox
│   ├── App.jsx                 # Router setup — public routes inside Layout, admin outside
│   └── main.jsx                # Vite entry point — renders <App />
├── index.html                  # HTML shell (Vite injects the React app here)
├── vite.config.js              # Vite config — base: '/' for GitHub Pages
├── package.json                # Project dependencies and scripts
├── .env                        # Local secrets — NEVER commit this file
└── .gitignore                  # Includes .env
```

---

## Installation & Setup

> **Prerequisites:** You need [Node.js](https://nodejs.org/) (version 18 or higher) and [Git](https://git-scm.com/) installed on your computer.
> Check by running `node -v` and `git --version` in your terminal. Both should return a version number.

### Step 1 — Clone the repository

```bash
git clone https://github.com/Dreadseer/Dreadseer.github.io.git
cd Dreadseer.github.io
```

### Step 2 — Install dependencies

This installs all packages listed in `package.json` (React, Vite, Supabase client, React Router, etc.).

```bash
npm install
```

You should see a `node_modules/` folder appear. This is normal — it is already in `.gitignore` and will never be committed.

### Step 3 — Create your environment file

The app needs two secret values to connect to Supabase. These must **never** be committed to Git.

Create a file called `.env` in the root of the project:

```bash
touch .env
```

Open `.env` and add the following (replace the placeholder values with your real Supabase credentials):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 📍 **Where to find these values:**
> 1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
> 2. Select your project
> 3. Click **Settings** (gear icon) → **API**
> 4. Copy the **Project URL** → paste as `VITE_SUPABASE_URL`
> 5. Copy the **anon / public** key → paste as `VITE_SUPABASE_ANON_KEY`

> ⚠️ The anon key must start with `eyJ...` (a long JWT token). If it looks different, you may have copied the wrong key.

### Step 4 — Start the development server

```bash
npm run dev
```

Open your browser and navigate to **http://localhost:5173**

You should see the portfolio home page. If you see a warning in the console about Supabase env vars, double-check your `.env` file.

---

## Environment Variables

| Variable | Description | Where to find it |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project's REST API URL | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for client-side access | Supabase Dashboard → Settings → API → anon/public key |

**Important notes for new developers:**

- **Why `VITE_` prefix?** Vite only exposes environment variables to the browser if they start with `VITE_`. Do not use `process.env` — always use `import.meta.env.VITE_*`.
- **Why `.env` is in `.gitignore`:** These keys allow access to your database. If they were committed to GitHub, anyone could read or write to your data. Never remove `.env` from `.gitignore`.
- **What happens if they're missing?** The file `src/lib/supabaseClient.js` checks for both values. If either is missing, it exports `null` and logs a warning. The site still loads — but the contact form, login, and back office won't function.

---

## Running the Project

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server at `http://localhost:5173` with hot reload |
| `npm run build` | Compiles and bundles the app into `dist/` for production |
| `npm run preview` | Serves the production build locally to test before deploying |
| `npm run lint` | Runs ESLint to check for code quality issues |

---

## Pages & Routes

This app uses `HashRouter` from React Router. GitHub Pages serves static files and cannot handle path-based routing without a server — the `#` hash prefix solves this. All URLs look like `https://Dreadseer.github.io/#/portfolio`.

| Route | Page | Who can access it | Has Header & Footer? |
|---|---|---|---|
| `/#/` | Home | Everyone | ✅ Yes |
| `/#/portfolio` | Portfolio | Everyone | ✅ Yes |
| `/#/links` | Links | Everyone | ✅ Yes |
| `/#/contact` | Contact | Everyone | ✅ Yes |
| `/#/login` | Login | Admin only — type URL directly | ❌ No |
| `/#/backoffice` | Back Office | Admin only — must be logged in | ❌ No |

**How Layout works:**
In `App.jsx`, the four public routes are nested inside a `<Layout>` component. `Layout` renders the Header, then the page content via `<Outlet />`, then the Footer and MobileNav. The `/login` and `/backoffice` routes are flat routes outside `<Layout>` — they have their own standalone styling with no public navigation.

**Responsive navigation:**
- **Desktop (> 768px):** Horizontal nav links appear in the sticky header
- **Mobile (≤ 768px):** Header nav links hide; a fixed bottom icon bar appears with emoji icons for the four public pages

---

## Supabase Setup

The app uses Supabase for two things: storing contact messages and authenticating the admin. Both must be configured in the Supabase dashboard.

### 1. Create the `messages` table

Go to **Supabase Dashboard → Table Editor → New Table**

Name it `messages` and add these columns (`id` and `created_at` are created automatically):

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key — default: `gen_random_uuid()` |
| `name` | `text` | Sender name from contact form |
| `email` | `text` | Sender email from contact form |
| `message` | `text` | Message body from contact form |
| `created_at` | `timestamptz` | Auto-filled — default: `now()` |

✅ Enable **Row Level Security (RLS)** on the table.

### 2. Add RLS policies

Go to **Supabase Dashboard → SQL Editor → New Query** and run this:

```sql
-- Allow public visitors to submit contact messages
CREATE POLICY "anon_insert_messages"
ON public.messages AS PERMISSIVE
FOR INSERT TO anon WITH CHECK (true);

-- Allow the logged-in admin to also insert (e.g. while testing)
CREATE POLICY "authenticated_insert_messages"
ON public.messages AS PERMISSIVE
FOR INSERT TO authenticated WITH CHECK (true);

-- Allow the logged-in admin to read all messages
CREATE POLICY "authenticated_select_messages"
ON public.messages AS PERMISSIVE
FOR SELECT TO authenticated USING (true);

-- Allow the logged-in admin to delete messages
CREATE POLICY "authenticated_delete_messages"
ON public.messages AS PERMISSIVE
FOR DELETE TO authenticated USING (true);
```

### 3. Create the admin user

Go to **Supabase Dashboard → Authentication → Users → Add User**

Create a user with your admin email and a strong password. This account is used to log into `/#/login` and access the back office. Do not hardcode credentials anywhere in the codebase.

---

## GitHub Actions Deployment

Every push to the `main` branch automatically triggers the workflow in `.github/workflows/deploy.yml`, which:

1. Checks out your latest code
2. Installs Node.js 20
3. Runs `npm ci` (clean, reproducible install)
4. Injects Supabase secrets from GitHub repository secrets into the build
5. Runs `npm run build` → outputs static files to `dist/`
6. Deploys `dist/` to GitHub Pages using official GitHub Actions

### One-time setup — Add GitHub Secrets

Before the first deploy, add your Supabase credentials as secrets so the CI build can access them:

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:
   - Name: `VITE_SUPABASE_URL` | Value: your Supabase project URL
   - Name: `VITE_SUPABASE_ANON_KEY` | Value: your Supabase anon JWT key

### One-time setup — Enable GitHub Pages

1. Go to your GitHub repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save — the next push to `main` will deploy the site live

---

## Admin Back Office

The back office is a hidden, protected admin page — it is not linked anywhere in the public navigation.

**To access it:**
1. Navigate directly to `https://Dreadseer.github.io/#/login`
2. Enter your admin email and password (the account you created in Supabase)
3. On successful login you are redirected to `/#/backoffice`

**What you can do:**
- View all contact form submissions in a table (Name, Email, Date)
- Click any row or the **View** button to open a modal with the full message
- Press **Escape**, click outside the modal, or click **Close** to dismiss it
- Click **Delete** to permanently remove a message (instant, no page reload)
- Click **Logout** to sign out and return to the home page

**How it's protected:**
- On load, `BackOffice.jsx` calls `supabase.auth.getSession()` — if no valid session exists it immediately redirects to `/login`
- On load, `Login.jsx` also calls `getSession()` — if a session already exists it skips the form and redirects straight to `/backoffice`
- Supabase RLS policies ensure public visitors can only INSERT — they cannot SELECT or DELETE messages

---

## Customizing Content

All site text and data lives in `src/data/`. You never need to edit JSX files just to update written content.

### Home page skills (`src/data/skills.js`)
- `technicalSkills` — array of `{ name, description, icon }` — shown in the auto-scrolling technical skills carousel
- `softSkills` — array of `{ name, description, icon }` — shown in the soft skills carousel
- `icon` can be any emoji or Unicode character

### Portfolio page content (`src/data/portfolio.js`)
- `education` — array of `{ institution, program, startDate, endDate }`
- `workExperience` — array of `{ title, organization, startDate, endDate, description[] }` — `description` is an array of bullet point strings
- `projects` — array of `{ name, tech[], description, image, github? }` — `github` is optional; if provided, a GitHub link appears on the card

### Links page (`src/data/links.js`)
- `links` — array of `{ title, description, url, image }` — each becomes a clickable card

### Replacing images
Drop files into `public/assets/` and update the path string in the relevant data file:
- **Profile photo:** `public/assets/chris-portrait.jpg` (referenced in `Home.jsx`)
- **Project screenshots:** `public/assets/project-*.png` (paths in `portfolio.js`)
- **Link card images:** `public/assets/link-*.png` (paths in `links.js`)
- **Resume PDF:** `public/assets/resume.pdf` (referenced in `Portfolio.jsx`)
- **Logo:** `public/assets/logo.svg` (referenced in `Header.jsx`)

---

## API Documentation

This project has no custom API server. All backend operations go through the Supabase client library (`@supabase/supabase-js`).

### Supabase operations

| Feature | Code | Operation |
|---|---|---|
| Contact form submit | `supabase.from('messages').insert({...})` | INSERT into `messages` |
| Back office load | `supabase.from('messages').select('*').order('created_at', {ascending: false})` | SELECT from `messages` |
| Back office delete | `supabase.from('messages').delete().eq('id', id)` | DELETE from `messages` |
| Admin login | `supabase.auth.signInWithPassword({ email, password })` | Supabase Auth |
| Session check | `supabase.auth.getSession()` | Supabase Auth |
| Logout | `supabase.auth.signOut()` | Supabase Auth |

The Supabase client singleton is initialized once in `src/lib/supabaseClient.js` and imported wherever it's needed. Never create a second instance.

---

## Author

**Chris Clarke** — [@Dreadseer](https://github.com/Dreadseer)

- 🌐 Portfolio: [https://Dreadseer.github.io](https://Dreadseer.github.io)
- 💼 LinkedIn: [linkedin.com/in/christopher-clarke-11172310b](https://www.linkedin.com/in/christopher-clarke-11172310b/)
- 📧 Email: dreadseer@gmail.com

---

*Built as part of the [CodeBoxx Academy](https://codeboxx.com) AI Native Full-Stack Development program — Module 16 capstone project.*
