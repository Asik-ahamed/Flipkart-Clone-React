import { createClient } from '@supabase/supabase-js';

// Log to check the values
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_KEY);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Make sure this is correct
  import.meta.env.VITE_SUPABASE_KEY  // Make sure this is correct
);

export default supabase;
