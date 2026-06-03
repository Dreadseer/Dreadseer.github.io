// Portfolio page — Education, Work Experience, and Projects sections with PDF download
import { education, workExperience, projects } from '../data/portfolio'
import './Portfolio.css'

// AI-generated images — created with DALL-E (replace SVG placeholders with final renders)

// ── Sub-component: EducationCard ──────────────────────────────────────────────
function EducationCard({ institution, program, startDate, endDate }) {
  return (
    <div className="education-card">
      <p className="education-card__institution">{institution}</p>
      <p className="education-card__program">{program}</p>
      <p className="education-card__dates">
        {startDate} — {endDate}
      </p>
    </div>
  )
}

// ── Sub-component: WorkCard ───────────────────────────────────────────────────
function WorkCard({ title, organization, startDate, endDate, description }) {
  return (
    <div className="work-card">
      <div className="work-card__header">
        <div>
          <p className="work-card__title">{title}</p>
          <p className="work-card__org">{organization}</p>
        </div>
        <span className="work-card__dates">
          {startDate} — {endDate}
        </span>
      </div>
      <p className="work-card__description">{description}</p>
    </div>
  )
}

// ── Sub-component: ProjectCard ────────────────────────────────────────────────
function ProjectCard({ name, tech, description, image }) {
  return (
    <div className="project-card">
      <img
        src={image}
        alt={`Screenshot or illustration of the ${name} project`}
        className="project-card__image"
      />
      <div className="project-card__body">
        <p className="project-card__name">{name}</p>
        {/* Each tech item rendered as a pill badge — not a comma-separated string */}
        <div className="project-card__tech">
          {tech.map((t) => (
            <span key={t} className="tech-badge">
              {t}
            </span>
          ))}
        </div>
        <p className="project-card__description">{description}</p>
      </div>
    </div>
  )
}

// ── Main Portfolio component ──────────────────────────────────────────────────
function Portfolio() {
  return (
    <>
      {/* ── Section 1: Education ── */}
      <section className="portfolio-section" aria-labelledby="education-heading">
        <div className="portfolio-banner">
          {/* AI-generated image — created with DALL-E / Adobe Firefly */}
          <img
            src="/assets/portfolio-education.svg"
            alt="Abstract illustration representing education and learning in a technology field"
            className="portfolio-banner__img"
          />
        </div>

        <h2 id="education-heading" className="portfolio-section__heading">
          Education
        </h2>

        {/* Maps over education array from src/data/portfolio.js — most recent first */}
        <div className="education-list">
          {education.map((entry) => (
            <EducationCard
              key={`${entry.institution}-${entry.startDate}`}
              institution={entry.institution}
              program={entry.program}
              startDate={entry.startDate}
              endDate={entry.endDate}
            />
          ))}
        </div>
      </section>

      {/* ── Section 2: Work Experience ── */}
      <section
        className="portfolio-section portfolio-section--alt"
        aria-labelledby="work-heading"
      >
        <h2 id="work-heading" className="portfolio-section__heading">
          Work Experience
        </h2>

        {/* Maps over workExperience array — most recent first */}
        <div className="work-list">
          {workExperience.map((entry) => (
            <WorkCard
              key={`${entry.organization}-${entry.startDate}`}
              title={entry.title}
              organization={entry.organization}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
            />
          ))}
        </div>
      </section>

      {/* ── Section 3: Projects ── */}
      <section className="portfolio-section" aria-labelledby="projects-heading">
        <div className="portfolio-banner">
          {/* AI-generated image — created with DALL-E / Adobe Firefly */}
          <img
            src="/assets/portfolio-projects.svg"
            alt="Abstract network diagram representing connected software projects and technologies"
            className="portfolio-banner__img"
          />
        </div>

        <h2 id="projects-heading" className="portfolio-section__heading">
          Projects
        </h2>

        {/* PDF download button sits above the project grid for high visibility */}
        <div className="resume-download-wrap">
          {/* TODO: Place resume.pdf in public/assets/ before final submission */}
          <a
            href="/assets/resume.pdf"
            download
            className="resume-download-btn"
            aria-label="Download Chris's resume as a PDF file"
          >
            ⬇ Download Resume (PDF)
          </a>
        </div>

        {/* Maps over projects array — most recent first, 2-column grid on desktop */}
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              tech={project.tech}
              description={project.description}
              image={project.image}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Portfolio
