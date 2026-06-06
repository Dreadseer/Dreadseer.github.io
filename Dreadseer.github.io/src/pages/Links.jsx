// Links page — curated developer resource cards that open in a new tab
import { links } from '../data/links'
import './Links.css'

// AI-generated image — created with DALL-E (link-mdn.svg; replace with final render before submission)

// ── Sub-component: LinkCard ────────────────────────────────────────────────────
// The entire card is wrapped in an <a> so the whole surface is clickable.
// target="_blank" + rel="noopener noreferrer" are required on every external link.
function LinkCard({ title, description, url, image, isAiImage }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
      aria-label={`Open ${title} in a new tab`}
    >
      {/* TODO: Replace placeholder images with real screenshots or AI-generated
          images in public/assets/ before submission */}
      {isAiImage && (
        // AI-generated image — created with DALL-E / Adobe Firefly
        <img
          src={image}
          alt={`AI-generated preview image representing ${title}`}
          className="link-card__image"
        />
      )}
      {!isAiImage && (
        <img
          src={image}
          alt={`Preview image representing ${title}`}
          className="link-card__image"
        />
      )}

      <div className="link-card__body">
        <p className="link-card__title">{title}</p>
        <p className="link-card__description">{description}</p>
        {/* Visible "Visit" affordance — styled as a button, not a plain text link */}
        <span className="link-card__visit">Visit ↗</span>
      </div>
    </a>
  )
}

// ── Main Links component ───────────────────────────────────────────────────────
function Links() {
  return (
    <>
      <h1 className="links-page__heading">Developer Resources</h1>
      <p className="links-page__subheading">
        A curated collection of tools, documentation, and platforms used throughout
        the CodeBoxx program and beyond.
      </p>

      {/* 3-column grid on desktop, collapses to 1 column on mobile via CSS */}
      <div className="links-grid">
        {links.map((link, index) => (
          <LinkCard
            key={link.url}
            title={link.title}
            description={link.description}
            url={link.url}
            image={link.image}
            // First card (MDN) is the AI-generated image placeholder
            isAiImage={index === 0}
          />
        ))}
      </div>
    </>
  )
}

export default Links
