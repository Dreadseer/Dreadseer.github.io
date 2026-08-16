// The experience — the whole portfolio as one continuous descent.
//
// Sections are nodes on the signal line. The legacy routes (/portfolio, /links,
// /contact) still resolve here and scroll to the matching section, so any link
// that already exists in the wild keeps working.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Environment from '../components/Environment'
import SignalRail from '../components/SignalRail'
import CharacterSheet from '../components/CharacterSheet'
import Footer from '../components/Footer'

import Hero from '../sections/Hero'
import Trajectory from '../sections/Trajectory'
import Capabilities from '../sections/Capabilities'
import Work from '../sections/Work'
import Record from '../sections/Record'
import OffDuty from '../sections/OffDuty'
import Contact from '../sections/Contact'

import {
  useActiveSection,
  useScrollProgress,
  useKonami,
} from '../hooks/useExperience'

import '../styles/sections.css'

const SECTIONS = [
  { id: 'hero', index: '00', label: 'Identity' },
  { id: 'trajectory', index: '01', label: 'Trajectory' },
  { id: 'capabilities', index: '02', label: 'Capabilities' },
  { id: 'work', index: '03', label: 'The Work' },
  { id: 'record', index: '04', label: 'Record' },
  { id: 'offduty', index: '05', label: 'Off Duty' },
  { id: 'contact', index: '06', label: 'Contact' },
]

// Old routes → the section that replaced them.
const LEGACY_ROUTES = {
  '/portfolio': 'work',
  '/links': 'offduty',
  '/contact': 'contact',
}

function Experience() {
  const { pathname } = useLocation()
  const [unlocked, setUnlocked] = useState(false)

  const ids = useMemo(() => SECTIONS.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const progress = useScrollProgress()

  useKonami(useCallback(() => setUnlocked(true), []))

  const navigate = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

    // Move focus to the target so keyboard users land where the page scrolled.
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }, [])

  // Honor a legacy route on entry by scrolling to its replacement section.
  useEffect(() => {
    const target = LEGACY_ROUTES[pathname]
    if (!target) return
    // Wait a frame so layout is settled before measuring the scroll position.
    const id = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#hero">
        Skip to content
      </a>

      <Environment activeSection={active} />

      <SignalRail
        sections={SECTIONS}
        active={active}
        progress={progress}
        onNavigate={navigate}
      />

      <div className="experience">
        <main id="main">
          <Hero onNavigate={navigate} />
          <Trajectory />
          <Capabilities />
          <Work />
          <Record />
          <OffDuty />
          <Contact />
        </main>

        <Footer />
      </div>

      {unlocked && <CharacterSheet onClose={() => setUnlocked(false)} />}
    </>
  )
}

export default Experience
