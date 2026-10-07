export const getSupabaseConfig = () => {
  const url = (import.meta.env.VITE_SUPABASE_URL || '')
    .trim()
    .replace(/\/$/, '');

  const key = (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ''
  ).trim();

  return { url, key };
};