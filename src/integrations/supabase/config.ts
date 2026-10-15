const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
export const SUPABASE_ANON_KEY = anonKey || publishableKey;
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);