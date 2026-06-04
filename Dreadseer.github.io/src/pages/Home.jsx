// Home page — Introduction, Technical Skills, and Soft Skills sections
import { useRef, useEffect } from 'react'
import { technicalSkills, softSkills } from '../data/skills'
import './Home.css'

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

// Reusable carousel — constant smooth scroll via requestAnimationFrame, pauses on hover
function SkillsCarousel({ skills, label }) {
  const trackRef = useRef(null)
  const rafRef = useRef(null)    // requestAnimationFrame ID
  const pausedRef = useRef(false) // tracks hover pause state without re-rendering

  // Speed: pixels advanced per frame (60fps). 0.5 = ~30px/sec — smooth and readable.
  // Increase to 1.0 for faster, decrease to 0.3 for slower.
  const SPEED = 0.5

  function startAutoScroll() {
    const track = trackRef.current
    if (!track) return

    function step() {
      if (!pausedRef.current && track) {
        const { scrollLeft, scrollWidth, clientWidth } = track

        // When we reach the end, jump silently back to 0 — feels seamless
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          track.scrollLeft = 0
        } else {
          track.scrollLeft += SPEED
        }
      }
      // Schedule next frame
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }

  function stopAutoScroll() {
    cancelAnimationFrame(rafRef.current)
  }

  // Manual arrow click — nudge by one card width without stopping the animation
  function scroll(direction) {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    startAutoScroll()

    // Pause on hover — flip the flag instead of cancelling the RAF loop
    // so resuming is instant with no restart lag
    const pause  = () => { pausedRef.current = true }
    const resume = () => { pausedRef.current = false }

    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)

    return () => {
      stopAutoScroll()
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <div className="carousel">
      <button
        className="carousel__btn carousel__btn--left"
        onClick={() => scroll(-1)}
        aria-label={`Scroll ${label} left`}
      >
        ‹
      </button>

      {/* The scrollable track — hides scrollbar, auto-scrolls, touch-friendly */}
      <div className="carousel__track" ref={trackRef}>
        {skills.map((skill) => (
          <div className="carousel__item" key={skill.name}>
            <SkillCard
              icon={skill.icon}
              name={skill.name}
              description={skill.description}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel__btn carousel__btn--right"
        onClick={() => scroll(1)}
        aria-label={`Scroll ${label} right`}
      >
        ›
      </button>
    </div>
  )
}

function Home() {
  return (
    <>
      {/* ── Section 1: Introduction ── */}
      <section className="home-section intro" aria-labelledby="intro-heading">

        {/* Left column — text content */}
        <div className="intro__text">
          <h1 id="intro-heading" className="intro__name">
            Hi, I'm Chris Clarke
          </h1>
          <p className="intro__tagline">Full-Stack Developer | Operations Leader</p>
          <p className="intro__bio">
            I'm a full-stack developer & USMC veteran with over 10 years of operations and
            leadership experience. I made a deliberate pivot into software development and
            I'm passionate about building clean, reliable applications that solve real
            problems. I'm comfortable across the stack: from React UIs to Java Spring Boot
            APIs to SQL databases.
          </p>
        </div>

        {/* Right column — portrait photo */}
        <div className="intro__image-wrap">
          <img
            src="/assets/chris-portrait.jpg"
            alt="Professional portrait of Chris Clarke, full-stack developer"
            className="intro__image"
          />
        </div>

      </section>

      {/* ── Section 2: Technical Skills ── */}
      <section
        className="home-section home-section--alt"
        aria-labelledby="tech-skills-heading"
      >
        <h2 id="tech-skills-heading" className="home-section__heading">
          Technical Skills
        </h2>
        <SkillsCarousel skills={technicalSkills} label="technical skills" />
      </section>

      {/* ── Section 3: Soft Skills ── */}
      <section
        className="home-section"
        aria-labelledby="soft-skills-heading"
      >
        <h2 id="soft-skills-heading" className="home-section__heading">
          Soft Skills
        </h2>
        <SkillsCarousel skills={softSkills} label="soft skills" />
      </section>
    </>
  )
}

export default Home
