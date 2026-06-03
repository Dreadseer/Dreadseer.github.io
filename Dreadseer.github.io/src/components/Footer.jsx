// Site-wide footer — contact links and auto-updating copyright year
import './Footer.css'

function Footer() {
  // Auto-updates every year without any code change
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__contact">
        <a
          href="mailto:dreadseer@gmail.com"
          className="footer__link"
          aria-label="Send Chris an email"
        >
          dreadseer@gmail.com
        </a>
        <a
          href="https://github.com/Dreadseer"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          aria-label="Visit Chris's GitHub profile (opens in new tab)"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/christopher-clarke-11172310b/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          aria-label="Visit Chris's LinkedIn profile (opens in new tab)"
        >
          LinkedIn
        </a>
      </div>
      <p className="footer__copy">
        &copy; {year} Chris (Dreadseer). All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
