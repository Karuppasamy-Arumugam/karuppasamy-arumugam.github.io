import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(() => {
    // Show only once per browser session
    return !sessionStorage.getItem('portfolio_initial_loaded');
  });

  const [codeSnippet, setCodeSnippet] = useState('initializing dev environment...');

  useEffect(() => {
    if (!visible) {
      if (onComplete) onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setCodeSnippet('import { Developer } from "karuppasamy";');
    }, 300);

    const t2 = setTimeout(() => {
      setCodeSnippet('Developer.init({ focus: "Python | React" });');
    }, 700);

    const t3 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('portfolio_initial_loaded', 'true');
      if (onComplete) onComplete();
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark text-charcoal-900 dark:text-white select-none"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Logo badge with pulse */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-20 h-20 rounded-2xl border border-charcoal-300 dark:border-charcoal-700 bg-white/50 dark:bg-charcoal-900/50 backdrop-blur-md flex items-center justify-center shadow-xl"
          >
            <span className="font-mono font-bold text-2xl tracking-tighter text-charcoal-900 dark:text-white">
              &lt;K /&gt;
            </span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-charcoal-900 animate-ping" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-charcoal-900" />
          </motion.div>

          {/* Code Subtext */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
              {codeSnippet}
            </span>
            {/* Progress line */}
            <div className="w-36 h-1 bg-charcoal-200 dark:bg-charcoal-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
                className="w-full h-full bg-charcoal-900 dark:bg-white"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
