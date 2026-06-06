// Static portfolio data — imported by Portfolio.jsx for Education, Work, and Projects sections

// ── Education (most recent first) ──────────────────────────────────────────────────────────
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

// ── Work Experience (most recent first) ────────────────────────────────────────────────────
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

// ── Projects (most recent first) ───────────────────────────────────────────────────────────
export const projects = [
  {
    name: 'Dungeon Master Campaign Suite',
    tech: ['Electron', 'React', 'Node.js', 'SQLite'],
    description:
      'A full-service desktop application that lets Dungeon Masters manage lore, characters, ' +
      'NPCs, locations, and session notes all in one place. Features a built-in map engine ' +
      'for creating and managing maps and assets, an encounter builder, combat calculator, ' +
      'character sheets, and an AI assistant powered by a local Ollama model.',
    image: '/assets/project-dm-suite.png',
    github: 'https://github.com/Dreadseer/Dungeon-Master-Campaign-Suite',
  },
  {
    name: 'Rocket Food Delivery',
    tech: ['React Native', 'Expo', 'TypeScript', 'Spring Boot'],
    description:
      'A cross-platform mobile food delivery application built with React Native and Expo. ' +
      'Features real-time order tracking, restaurant browsing, and a Spring Boot REST API backend. ' +
      'Shared business logic across iOS and Android from a single TypeScript codebase.',
    image: '/assets/project-rocket-food.png',
    github: 'https://github.com/Dreadseer/React-Native-Mobile-Development',
  },
  {
    name: 'CodeBloggs',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'A full-stack blog platform built on the MERN stack. ' +
      'Users can create, edit, and delete blog posts with Markdown support. ' +
      'Features JWT-based authentication, a REST API, and a React frontend.',
    image: '/assets/project-codebloggs.png',
    github: 'https://github.com/Kazzy96/Module-9',
  },
  {
    name: 'CodeBoxx Event Experience',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    description:
      'A mobile-first, QR-code-accessible web app built for CodeBoxx Academy recruitment events. ' +
      'Students scan a QR code, open the app in their browser, and build a personal landing page ' +
      'or interactive mini-app in ~5 minutes — no login, no install, no coding knowledge required.',
    image: '/assets/project-event.png',
    github: 'https://github.com/Dreadseer/git-github.com-Dreadseer-CodeBoxx-Intro-to-Dev',
  },
]
