// Site footer — closes the page without competing with the contact section.
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img src="/assets/logo-emblem.webp" alt="" width="30" height="30" />
          <span>Builder · Protector · Creator</span>
        </div>

        <p className="footer__colophon">
          Built with React and Vite. Deployed from GitHub Actions. No template.
        </p>

        <p className="footer__copy">© {year} Christopher Clarke</p>
      </div>
    </footer>
  )
}

export default Footer
