// Sticky top navigation bar — logo + horizontal desktop nav links (4 public routes only)
import { NavLink } from 'react-router-dom'
import './Header.css'

// The 4 public nav destinations — /login and /backoffice are intentionally excluded
const NAV_LINKS = [
  { label: 'Home',      to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Links',     to: '/links' },
  { label: 'Contact',   to: '/contact' },
]

function Header() {
  return (
    <header className="header">
      {/* Logo — clicking it always navigates to the home page */}
      <NavLink to="/" className="header__logo-link" aria-label="Go to home page">
        <img
          src="/assets/logo.svg"
          alt="Dreadseer personal logo — two letters DS on a dark background"
          className="header__logo"
        />
      </NavLink>

      {/* Desktop navigation — hidden on mobile via CSS media query */}
      <nav className="header__nav" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            // NavLink automatically adds class "active" when the route matches
            className={({ isActive }) =>
              isActive ? 'header__nav-link active' : 'header__nav-link'
            }
            // Exact match only for the home route so /portfolio doesn't also mark / active
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
