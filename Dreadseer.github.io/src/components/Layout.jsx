// Layout shell — renders Header, then page content via Outlet, then Footer and MobileNav
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'
import './Layout.css'

// Maps each public route to its page-specific background modifier class.
const BG_CLASS_BY_PATH = {
  '/': 'layout--bg-home',
  '/portfolio': 'layout--bg-portfolio',
  '/links': 'layout--bg-links',
  '/contact': 'layout--bg-contact',
}

function Layout() {
  const { pathname } = useLocation()
  const bgClass = BG_CLASS_BY_PATH[pathname] || ''

  return (
    <div className={`layout ${bgClass}`.trim()}>
      <Header />

      {/* top padding prevents the sticky header from overlapping page content */}
      <main className="layout__content">
        <Outlet />
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}

export default Layout
