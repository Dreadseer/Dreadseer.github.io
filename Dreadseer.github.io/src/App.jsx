// App entry point — HashRouter is required for GitHub Pages: the fragment is
// never sent to the server, so refreshing a deep link cannot 404 on a host that
// only serves the root index.html.
import { HashRouter, Routes, Route } from 'react-router-dom'
import Experience from './pages/Experience'
import Login from './pages/Login'
import BackOffice from './pages/BackOffice'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/*
          The portfolio is a single continuous experience. The former page
          routes are kept so existing links stay valid — Experience reads the
          pathname and scrolls to the section that replaced each old page.
        */}
        <Route path="/" element={<Experience />} />
        <Route path="/portfolio" element={<Experience />} />
        <Route path="/links" element={<Experience />} />
        <Route path="/contact" element={<Experience />} />

        {/* Hidden admin routes — standalone UI, no site chrome. */}
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />

        {/* Anything else falls back to the experience rather than a blank page. */}
        <Route path="*" element={<Experience />} />
      </Routes>
    </HashRouter>
  )
}

export default App
