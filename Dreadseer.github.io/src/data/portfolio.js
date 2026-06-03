// Static portfolio data — imported by Portfolio.jsx for Education, Work, and Projects sections

// ── Education (most recent first) ──────────────────────────────────────────────────────────
export const education = [
  {
    institution: 'CodeBoxx Academy',
    program: 'AI Native Full-Stack Development',
    startDate: '2024',
    endDate: 'Present',
  },
  // TODO: Add any prior education entries here
]

// ── Work Experience (most recent first) ────────────────────────────────────────────────────
export const workExperience = [
  {
    title: 'Operations Leader',
    organization: 'Pinellas County Job Corps Center',
    startDate: '2013', // TODO: Replace with exact start date
    endDate: '2024',   // TODO: Replace with exact end date
    description:
      // TODO: Replace placeholder descriptions with real details
      'Led day-to-day operations across multiple departments, overseeing scheduling, ' +
      'compliance, and staff performance for a residential career-training facility ' +
      'serving 200+ students. Implemented process improvements that reduced operational ' +
      'overhead and improved program outcomes. Mentored junior staff and coordinated ' +
      'directly with federal partners to meet reporting and compliance requirements.',
  },
  // TODO: Add any additional work experience entries here
]

// ── Projects (most recent first) ───────────────────────────────────────────────────────────
// TODO: Add real project descriptions and confirm image paths
export const projects = [
  {
    name: 'Rocket Food Delivery',
    tech: ['React Native', 'Expo', 'TypeScript', 'Spring Boot'],
    description:
      'A cross-platform mobile food delivery application built with React Native and Expo. ' +
      'Features real-time order tracking, restaurant browsing, and a Spring Boot REST API backend. ' +
      'Shared business logic across iOS and Android from a single TypeScript codebase.',
    image: '/assets/project-rocket-food.svg',
  },
  {
    name: 'Rocket Elevators Back Office',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Hibernate'],
    description:
      'An internal admin dashboard for managing elevator installation and maintenance records. ' +
      'Built on Java Spring Boot with Hibernate ORM and a MySQL database. ' +
      'Provides CRUD operations for buildings, elevators, and technician assignments.',
    image: '/assets/project-elevators.svg',
  },
  {
    name: 'CodeBloggs',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'A full-stack blog platform built on the MERN stack. ' +
      'Users can create, edit, and delete blog posts with Markdown support. ' +
      'Features JWT-based authentication, a REST API, and a React frontend.',
    image: '/assets/project-codebloggs.svg',
  },
  {
    name: 'CodeBoxx Event Experience',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    description:
      'A polished event showcase website built with Next.js and Tailwind CSS. ' +
      'Displays program events, speaker profiles, and schedules with a fully responsive layout. ' +
      'Demonstrates server-side rendering and static generation techniques.',
    image: '/assets/project-event.svg',
  },
]
