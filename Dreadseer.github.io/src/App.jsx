// App entry point — HashRouter + nested routes so public pages share the Layout shell
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import Contact from './pages/Contact'
import Login from './pages/Login'
import BackOffice from './pages/BackOffice'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/*
          Public routes are nested inside Layout so every public page automatically
          gets the Header, Footer, and MobileNav without repeating them per page.
        */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links" element={<Links />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/*
          /login and /backoffice render WITHOUT the Layout wrapper —
          they are hidden/protected routes with their own standalone UI.
        */}
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
    </HashRouter>
  )
}

export default App
