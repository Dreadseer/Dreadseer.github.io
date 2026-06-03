// Supabase client singleton — imported by all features that need database or auth access
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Temporary debug log — remove after confirming the correct key is loaded
console.log('Supabase key being used:', supabaseAnonKey?.slice(0, 20))

// Graceful fallback: export null if env vars are missing so the app doesn't crash
let supabase = null

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are missing. Supabase client is not initialized.')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
