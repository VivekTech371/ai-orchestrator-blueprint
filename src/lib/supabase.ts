
import { createClient } from '@supabase/supabase-js'

// Use placeholder values if environment variables are not available
// These will allow the app to build but won't connect to a real Supabase instance
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a mock Supabase client that doesn't throw errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Add a console warning to inform developers about the missing environment variables
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Warning: Supabase environment variables are missing. ' +
    'The app will run with a mock Supabase client that won\'t connect to a real database. ' +
    'To fix this, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.'
  )
}
