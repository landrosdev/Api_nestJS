import { createClient } from '@supabase/supabase-js'

// Initialisation du client Supabase côté serveur
// - Requiert SUPABASE_URL et SUPABASE_KEY dans l'environnement
// - La clé peut être l'anon key (publique) pour les lectures avec RLS, ou la service_role key pour des opérations serveur
// - Ne pas exposer la service_role key côté client
const sanitize = v => {
  if (!v) return undefined
  const trimmed = String(v).trim().replace(/^\uFEFF/, '')
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith('\'') && trimmed.endsWith('\''))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

const SUPABASE_URL = sanitize(process.env.SUPABASE_URL)
const SUPABASE_KEY = sanitize(process.env.SUPABASE_KEY)

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('[Supabase] Variables manquantes: vérifiez SUPABASE_URL et SUPABASE_KEY dans .env')
}

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false
      }
    })
  : null
