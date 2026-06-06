// Supabase client singleton — imported by all features that need database or auth access
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Graceful fallback: export null if env vars are missing so the app doesn't crash
let supabase = null

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are missing. Supabase client is not initialized.')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
