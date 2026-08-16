// Capability graph — six domains, each with concrete nodes.
// Leadership sits as a peer domain, not as an afterthought in an "about" paragraph.
// Descriptions are derived from the original skills.js copy and the project record.

export const domains = [
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    glyph: '01',
    accent: 'sig',
    blurb:
      'Component-driven interfaces with real state, real routing, and real responsive behavior.',
    nodes: [
      { name: 'React', note: 'Functional components, hooks, React Router. This site runs on it.' },
      { name: 'JavaScript ES6+', note: 'async/await, destructuring, modules — daily driver.' },
      { name: 'React Native / Expo', note: 'One TypeScript codebase shipped to iOS and Android.' },
      { name: 'Responsive CSS', note: 'Custom properties, fluid type, layout without a framework.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend Engineering',
    glyph: '02',
    accent: 'sig',
    blurb: 'APIs that validate their input, fail predictably, and document what they return.',
    nodes: [
      { name: 'Node.js / Express', note: 'REST endpoints, middleware pipelines, async patterns.' },
      { name: 'Java / Spring Boot', note: 'Service layers, dependency injection, JPA, RESTful design.' },
      { name: 'Auth & sessions', note: 'JWT-based authentication; Supabase auth in production here.' },
      { name: 'API design', note: 'Resource modeling, status codes, error contracts.' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    glyph: '03',
    accent: 'sig',
    blurb: 'Schemas designed before code, and queries that survive real data.',
    nodes: [
      { name: 'SQL / MySQL', note: 'Relational schema design, joins, constraints, complex queries.' },
      { name: 'MongoDB', note: 'Document modeling on the MERN stack.' },
      { name: 'SQLite', note: 'Local persistence for a desktop Electron application.' },
      { name: 'PostgreSQL / Supabase', note: 'Row Level Security policies, not just tables.' },
    ],
  },
  {
    id: 'workflow',
    label: 'Development Workflow',
    glyph: '04',
    accent: 'sig',
    blurb: 'The unglamorous half of shipping — where operations experience pays off immediately.',
    nodes: [
      { name: 'Git / GitHub', note: 'Branching strategies, pull requests, code review.' },
      { name: 'CI/CD', note: 'GitHub Actions building and deploying this site on every push.' },
      { name: 'Debugging', note: 'Reproduce, isolate, verify — the same loop as incident triage.' },
      { name: 'Environments', note: 'WSL, VS Code, Postman, environment variables and secrets.' },
    ],
  },
  {
    id: 'ai',
    label: 'AI-Assisted Engineering',
    glyph: '05',
    accent: 'guard',
    blurb:
      'AI as an accelerator with a human holding the specification, the review, and the accountability.',
    nodes: [
      { name: 'Specification writing', note: 'Turning a vague request into scoped, testable requirements.' },
      { name: 'Requirement decomposition', note: 'Breaking features into steps an agent can execute.' },
      { name: 'AI-assisted review', note: 'Using models to pressure-test code, then verifying the claims.' },
      { name: 'Local model integration', note: 'Shipped an in-app assistant on a local Ollama model.' },
    ],
  },
  {
    id: 'command',
    label: 'Leadership & Operations',
    glyph: '06',
    accent: 'guard',
    blurb:
      'Ten years of responsibility for people, procedures, and outcomes — applied to engineering teams.',
    nodes: [
      { name: 'Team coordination', note: 'Scheduling, onboarding, and structured workflow execution.' },
      { name: 'Incident response', note: 'Staying methodical while a situation is still developing.' },
      { name: 'Documentation', note: 'Records that hold up under audit, and READMEs that hold up under handoff.' },
      { name: 'Communication', note: 'Translating technical detail for non-technical stakeholders.' },
    ],
  },
]

// The AI section's process — presented as a loop, because that is how it actually runs.
export const aiLoop = [
  { step: 'Specify', text: 'Write the requirement down before any code exists. Ambiguity is the bug.' },
  { step: 'Decompose', text: 'Break the feature into steps small enough to verify independently.' },
  { step: 'Generate', text: 'Use AI to accelerate the mechanical work, not to make the decisions.' },
  { step: 'Verify', text: 'Read every line. Run it. Confirm the behavior matches the specification.' },
  { step: 'Own it', text: 'Ship it under my name. If it breaks, that is mine to fix.' },
]
