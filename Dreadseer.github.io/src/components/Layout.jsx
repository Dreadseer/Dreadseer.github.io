// Layout shell — renders Header, then page content via Outlet, then Footer and MobileNav
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
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
