# Portfolio Update Summary

## Visual refresh
- New navy/cyan technology theme inspired by the supplied developer video.
- Warm amber accents derived from the supplied professional portrait.
- Supplied MP4 added to the Home hero with play/pause and mute controls.
- Supplied portrait added to the hero card and About page.
- Hero video can be enabled/disabled from Admin → Settings.

## WhatsApp
- All default and fallback WhatsApp links now point to +91 9585346003.
- Migration logic corrects the previous dummy WhatsApp URL already cached in browser localStorage.

## Resume
- Removed browser-only IndexedDB resume storage.
- Admin → Resume now supports secure global publishing through Supabase Storage.
- The public Resume page automatically downloads the latest published PDF for every visitor.
- A bundled PDF remains as fallback until Supabase is configured or before the first cloud upload.
- See SUPABASE_SETUP.md for the one-time setup.

## Admin security
- Removed hardcoded frontend admin credentials.
- Admin login is ready for Supabase email/password authentication.
