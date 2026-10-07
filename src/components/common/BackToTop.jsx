import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 350) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md shadow-lg text-charcoal-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal-400"
          aria-label="Back to top"
          title="Scroll back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
