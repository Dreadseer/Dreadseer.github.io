// Supabase client singleton — imported by every feature needing database or auth access.
//
// These values are inlined at BUILD time by Vite, not read at runtime. A build
// produced without them ships an app that can never reach the database, so the
// warning below is deliberately loud: it is the only signal that a deploy is
// going out broken.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Exported so the UI can tell "not configured" apart from "request failed" and
// show an honest fallback instead of a form that silently goes nowhere.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let supabase = null

if (!isSupabaseConfigured) {
  console.error(
    '[supabase] Not initialized — VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY were ' +
      'missing when this bundle was built. The contact form, login, and back office are ' +
      'disabled. In CI these come from repository secrets of the same name; locally they ' +
      'come from a .env file in the project root.'
  )
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
