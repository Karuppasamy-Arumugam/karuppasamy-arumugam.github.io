import { motion } from 'framer-motion';

export const HeroMedia = ({ profile }) => {
  const fallbackImage = `${import.meta.env.BASE_URL}assets/images/karuppasamy-profile.jpeg`;
  const profileImageUrl = profile?.profileImage || fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="relative w-full max-w-[420px] h-[320px] sm:h-[400px] lg:h-[460px] mx-auto lg:ml-auto"
    >
      <div className="absolute inset-8 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-charcoal-700/60 bg-white shadow-2xl shadow-black/20">
        <img
          src={profileImageUrl}
          alt={`${profile?.name || 'Karuppasamy'} professional portrait`}
          className="h-full w-full object-contain object-bottom"
          loading="eager"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>
    </motion.div>
  );
};