// Home page — Introduction, Technical Skills, and Soft Skills sections
import { technicalSkills, softSkills } from '../data/skills'
import './Home.css'

// AI-generated images — created with DALL-E (replace SVG placeholders with final renders)

function SkillCard({ icon, name, description }) {
  return (
    <div className="skill-card">
      <span className="skill-card__icon" role="img" aria-hidden="true">
        {icon}
      </span>
      <p className="skill-card__name">{name}</p>
      <p className="skill-card__description">{description}</p>
    </div>
  )
}

function Home() {
  return (
    <>
      {/* ── Section 1: Introduction ── */}
      <section className="home-section intro" aria-labelledby="intro-heading">
        <div className="intro__image-wrap">
          {/* AI-generated image — created with DALL-E / Adobe Firefly */}
          <img
            src="/assets/home-hero.svg"
            alt="Illustrated developer portrait of Chris — a full-stack developer with a dark tech-themed background"
            className="intro__image"
          />
        </div>

        {/* TODO: Replace placeholder text with real bio */}
        <h1 id="intro-heading" className="intro__name">
          Chris Clarke
        </h1>
        <p className="intro__tagline">Full-Stack Developer | Operations Leader</p>
        <p className="intro__bio">
          {/* TODO: Replace placeholder text with real bio */}
          Hi, I'm Chris Clarke — a full-stack developer with over 10 years of operations and
          leadership experience. I made a deliberate pivot into software development and
          I'm passionate about building clean, reliable applications that solve real
          problems. I'm comfortable across the stack: from React UIs to Java Spring Boot
          APIs to SQL databases.
        </p>
      </section>

      {/* ── Section 2: Technical Skills ── */}
      <section
        className="home-section home-section--alt"
        aria-labelledby="tech-skills-heading"
      >
        <div className="skills-image-wrap">
          {/* AI-generated image — created with DALL-E / Adobe Firefly */}
          <img
            src="/assets/home-skills.svg"
            alt="Abstract tech illustration showing interconnected nodes representing a developer's skill set"
            className="skills-image"
          />
        </div>

        <h2 id="tech-skills-heading" className="home-section__heading">
          Technical Skills
        </h2>

        {/* Maps over technicalSkills array from src/data/skills.js */}
        <div className="skills-grid">
          {technicalSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              description={skill.description}
            />
          ))}
        </div>
      </section>

      {/* ── Section 3: Soft Skills ── */}
      <section
        className="home-section"
        aria-labelledby="soft-skills-heading"
      >
        <h2 id="soft-skills-heading" className="home-section__heading">
          Soft Skills
        </h2>

        {/* Same card style as Technical Skills for visual consistency */}
        <div className="skills-grid">
          {softSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              description={skill.description}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
