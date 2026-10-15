import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY).'
	);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
