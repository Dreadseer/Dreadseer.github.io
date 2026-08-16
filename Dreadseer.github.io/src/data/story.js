// The trajectory — five phases of the same operator, not five unrelated jobs.
// Every fact here is drawn from the résumé data in portfolio.js; nothing is invented.
// `translation` is the point of the section: what each phase became in engineering terms.

export const trajectory = [
  {
    id: 'corps',
    index: '01',
    phase: 'Service',
    title: 'United States Marine Corps',
    period: 'Veteran',
    summary:
      'Trained in an environment where preparation is not optional, the standard does not move, ' +
      'and the person next to you depends on your work being right.',
    translation: {
      from: 'Discipline under pressure',
      to: 'Engineering rigor',
    },
    tags: ['Accountability', 'Standards', 'Team execution'],
  },
  {
    id: 'operations',
    index: '02',
    phase: 'Operations',
    title: 'Strategic & Associate Account Representative',
    org: 'Tech Data',
    period: '2016 — 2021',
    summary:
      'Ran enterprise technology accounts through onboarding, record management, and cross-team ' +
      'coordination — the connective tissue between sales, service, and technical teams. ' +
      'Named Associate Sales Representative of the Year in 2017.',
    translation: {
      from: 'Coordinating people and records',
      to: 'Data modeling and workflow design',
    },
    tags: ['CRM systems', 'Documentation', 'Stakeholder comms'],
  },
  {
    id: 'command',
    index: '03',
    phase: 'Leadership',
    title: 'Senior Mobile Advisor / Security Shift Supervisor',
    org: 'Exceed, LLC — Pinellas County Job Corps Center',
    period: '2024 — Present',
    summary:
      'Coordinates daily operational and security workflows across a multi-department campus. ' +
      'Owns incident records, access logs, and compliance documentation, and supervises staff ' +
      'scheduling, onboarding, and structured workflow execution.',
    translation: {
      from: 'Incident response and shift command',
      to: 'Debugging, triage, and on-call thinking',
    },
    tags: ['Supervision', 'Incident handling', 'Process design'],
  },
  {
    id: 'craft',
    index: '04',
    phase: 'Engineering',
    title: 'AI Native Full Stack Development',
    org: 'CodeBoxx Academy',
    period: 'Certification — Jun 2026',
    summary:
      'A deliberate pivot into software: React and React Native on the front, Node/Express and ' +
      'Java Spring Boot on the back, SQL and MongoDB underneath, shipped through Git and CI/CD.',
    translation: {
      from: 'Solving problems for people',
      to: 'Building systems that solve them at scale',
    },
    tags: ['Full-stack', 'REST APIs', 'CI/CD'],
  },
  {
    id: 'scale',
    index: '05',
    phase: 'Leadership × Engineering',
    title: 'B.A.S. Management and Organizational Leadership',
    org: 'St. Petersburg College',
    period: 'Expected Dec 2027',
    summary:
      'Formalizing the half of the job that most engineers learn late — organizational systems, ' +
      'management, and how technical decisions land on real teams and real users.',
    translation: {
      from: 'Two separate careers',
      to: 'One bridge: users ↔ operations ↔ business ↔ technology',
    },
    tags: ['Org systems', 'Management', 'Strategy'],
  },
]

// Displayed beneath the trajectory — the thesis of the whole section.
export const translations = [
  { from: 'Leadership', to: 'Systems thinking' },
  { from: 'Operations', to: 'Workflow design' },
  { from: 'Training', to: 'Documentation' },
  { from: 'Incident response', to: 'Debugging' },
  { from: 'Accountability', to: 'Ownership' },
  { from: 'Briefing a room', to: 'Explaining a trade-off' },
]
