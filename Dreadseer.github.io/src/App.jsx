// App entry point — HashRouter required for GitHub Pages static hosting
import { HashRouter, Routes, Route } from 'react-router-dom'
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
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/links" element={<Links />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
    </HashRouter>
  )
}

export default App
