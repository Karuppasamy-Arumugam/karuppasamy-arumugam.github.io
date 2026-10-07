import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md text-charcoal-700 dark:text-charcoal-200 hover:text-black dark:hover:text-white hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-charcoal-400 dark:focus:ring-charcoal-600 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-300" />
        ) : (
          <Moon className="w-4 h-4 text-charcoal-800" />
        )}
      </motion.div>
    </button>
  );
};
