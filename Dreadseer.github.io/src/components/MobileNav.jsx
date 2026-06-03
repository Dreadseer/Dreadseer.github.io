// Fixed bottom icon navigation — visible only on mobile (≤768px), hidden on desktop via CSS
import { NavLink } from 'react-router-dom'
import './MobileNav.css'

// Unicode icons chosen to avoid installing any icon library
// /login and /backoffice are intentionally excluded
const NAV_ITEMS = [
  { label: 'Home',      to: '/',          icon: '🏠' },
  { label: 'Portfolio', to: '/portfolio', icon: '💼' },
  { label: 'Links',     to: '/links',     icon: '🔗' },
  { label: 'Contact',   to: '/contact',   icon: '✉️' },
]

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile bottom navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? 'mobile-nav__link active' : 'mobile-nav__link'
          }
          // Exact match for / so home icon isn't always active
          end={item.to === '/'}
          aria-label={item.label}
        >
          <span role="img" aria-hidden="true">{item.icon}</span>
          <span className="mobile-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNav
