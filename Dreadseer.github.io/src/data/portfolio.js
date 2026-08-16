// Static portfolio data — education, work history, and project case studies.
//
// Project entries are written as short case studies rather than card blurbs:
// what the problem was, who it was for, what was built, and the engineering
// detail worth asking about in an interview. Every claim traces back to the
// project itself — there are no invented metrics here.

// ── Education (most recent first) ──────────────────────────────────────────
export const education = [
  {
    institution: 'St. Petersburg College',
    program: 'B.A.S. Management and Organizational Leadership',
    startDate: 'Expected',
    endDate: 'Dec 2027',
  },
  {
    institution: 'CodeBoxx Academy',
    program: 'AI Native Full Stack Development Certification',
    startDate: '',
    endDate: 'Jun 2026',
  },
]

// ── Work Experience (most recent first) ────────────────────────────────────
export const workExperience = [
  {
    title: 'Senior Mobile Advisor / Security Shift Supervisor',
    organization: 'Exceed, LLC — Pinellas County Job Corps Center',
    startDate: 'Jun 2024',
    endDate: 'Present',
    description: [
      'Coordinate daily operational and security workflows across a multi-department campus environment.',
      'Maintain incident records, access logs, and compliance documentation with strong attention to accuracy.',
      'Supervise staff scheduling, onboarding, and structured workflow execution.',
    ],
  },
  {
    title: 'Strategic Account Representative',
    organization: 'Tech Data',
    startDate: 'May 2018',
    endDate: 'Jan 2021',
    description: [
      'Supported enterprise technology accounts through onboarding, record management, and internal coordination.',
      'Maintained CRM data and documentation used by sales, service, and technical teams.',
    ],
  },
  {
    title: 'Associate Sales Representative',
    organization: 'Tech Data',
    startDate: 'Jun 2016',
    endDate: 'May 2018',
    description: [
      'Provided operational support for a high-volume account portfolio.',
      'Maintained clean and accurate order and account documentation.',
      'Recognized as Associate Sales Representative of the Year in 2017.',
    ],
  },
]

// ── Projects (most recent first) ───────────────────────────────────────────
export const projects = [
  {
    id: 'dm-suite',
    name: 'Dungeon Master Campaign Suite',
    kind: 'Desktop application',
    tagline: 'A campaign command center for tabletop game masters.',
    tech: ['Electron', 'React', 'Node.js', 'SQLite', 'Ollama'],
    image: '/assets/project-dm-suite.webp',
    github: 'https://github.com/Dreadseer/Dungeon-Master-Campaign-Suite',
    problem:
      'Dungeon Masters run campaigns out of scattered notebooks, PDFs, and half a dozen browser tabs. ' +
      'Everything needed at the table lives somewhere else.',
    audience: 'Tabletop RPG game masters',
    build: [
      'Single desktop app for lore, characters, NPCs, locations, and session notes',
      'Built-in map engine for creating and managing maps and assets',
      'Encounter builder, combat calculator, and character sheets',
      'In-app AI assistant running on a local Ollama model',
    ],
    engineering:
      'The assistant runs against a local Ollama model rather than a hosted API, so the app keeps ' +
      'working offline at the table and carries no per-request cost. Packaging a React UI, a Node ' +
      'process, and a local SQLite store into one Electron application meant treating the desktop ' +
      'shell as its own deployment target, not just a browser in a window.',
    learned:
      'Desktop distribution has constraints web deployment hides: file system access, local data ' +
      'persistence, and shipping an application that has to run without a network.',
  },
  {
    id: 'rocket-food',
    name: 'Rocket Food Delivery',
    kind: 'Cross-platform mobile app',
    tagline: 'One TypeScript codebase, two mobile platforms, one REST backend.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Spring Boot'],
    image: '/assets/project-rocket-food.webp',
    github: 'https://github.com/Dreadseer/React-Native-Mobile-Development',
    problem:
      'A food delivery experience needs to feel native on both iOS and Android without maintaining ' +
      'two separate applications and two separate sets of bugs.',
    audience: 'Mobile customers ordering from local restaurants',
    build: [
      'Restaurant browsing and ordering flow in React Native + Expo',
      'Real-time order tracking',
      'Java Spring Boot REST API backend',
      'Shared business logic across both platforms from a single TypeScript codebase',
    ],
    engineering:
      'The interesting boundary was between the typed mobile client and the Spring Boot service: ' +
      'keeping the API contract stable enough that one set of TypeScript types could describe ' +
      'responses consumed by two platforms.',
    learned:
      'Cross-platform is a discipline, not a checkbox — the shared layer only stays shared if the ' +
      'platform-specific code is deliberately kept at the edges.',
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    kind: 'Web application',
    tagline: 'The site you are reading — and the debugging that got it deployed.',
    tech: ['React 19', 'Vite', 'Supabase', 'GitHub Actions'],
    image: '/assets/bg-links.webp',
    github: 'https://github.com/Dreadseer/Dreadseer.github.io',
    problem:
      'Own the professional presence outright — no page builder, no template lock-in, and no manual ' +
      'deploy step between writing code and it being live.',
    audience: 'Recruiters, hiring managers, and collaborators',
    build: [
      'React + Vite single-page experience deployed to GitHub Pages',
      'Contact form writing directly to a Supabase Postgres table',
      'Protected admin area for reading and removing messages',
      'GitHub Actions pipeline deploying automatically on every push to main',
    ],
    engineering:
      'Two problems were worth the whole build. First, the contact form returned a bare 403 on every ' +
      'insert: Supabase Row Level Security was enabled with no INSERT policy for the anon role, and ' +
      'table-level GRANTs are a separate layer from row-level policies — both have to allow the write. ' +
      'Second, GitHub Pages serves static files only, so any route other than / returned a 404 on ' +
      'refresh; HashRouter keeps routing entirely client-side because the fragment is never sent to ' +
      'the server.',
    learned:
      'Static hosting and database security both fail in ways the error message does not explain. ' +
      'Reading the platform documentation beat guessing at the code every time.',
  },
  {
    id: 'codebloggs',
    name: 'CodeBloggs',
    kind: 'Full-stack web app',
    tagline: 'A MERN blog platform with real authentication.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: '/assets/project-codebloggs.webp',
    github: 'https://github.com/Kazzy96/Module-9',
    problem:
      'Build a complete content platform end to end — not a front end with fake data, but real ' +
      'persistence, real accounts, and real authorization.',
    audience: 'Writers publishing and managing their own posts',
    build: [
      'Create, edit, and delete posts with Markdown support',
      'JWT-based authentication',
      'REST API over MongoDB',
      'React front end consuming the API',
    ],
    engineering:
      'Authentication is where a CRUD app stops being a tutorial. Issuing JWTs, storing them safely ' +
      'on the client, and checking them on protected routes forced a clear separation between what ' +
      'the UI shows and what the API actually permits.',
    learned:
      'The front end can never be the security boundary. Every protected action has to be enforced ' +
      'again on the server.',
  },
  {
    id: 'codeboxx-event',
    name: 'CodeBoxx Event Experience',
    kind: 'Mobile-first web app',
    tagline: 'Scan a QR code, ship something in five minutes, no account required.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/assets/project-event.webp',
    github: 'https://github.com/Dreadseer/git-github.com-Dreadseer-CodeBoxx-Intro-to-Dev',
    problem:
      'At a recruitment event you have a few minutes and a stranger holding a phone. Any signup ' +
      'form, app install, or setup step ends the conversation before it starts.',
    audience: 'Prospective students at CodeBoxx recruitment events',
    build: [
      'QR code opens the app directly in a phone browser',
      'Students build a personal landing page or interactive mini-app in about five minutes',
      'No login, no install, and no coding knowledge required',
      'Mobile-first layout designed for one-handed use while standing',
    ],
    engineering:
      'Every technical decision came out of one constraint: zero friction. No auth meant no user ' +
      'record to hang state on, so the experience had to be immediate and self-contained from the ' +
      'first tap on an unknown device and an unknown browser.',
    learned:
      'Constraints are design direction. "No login" removed a whole category of features and made ' +
      'the remaining product much clearer.',
  },
]
