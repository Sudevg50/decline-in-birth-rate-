import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zpbliqrmqslxroopucug.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_z-qPvfv-OFtcii761RuP8w_iAzGtbbc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
