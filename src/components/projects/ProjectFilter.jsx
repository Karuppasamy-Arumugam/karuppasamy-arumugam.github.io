import React from 'react';
import { motion } from 'framer-motion';

const filterCategories = [
  'All',
  'React',
  'Python',
  'JavaScript',
  'Frontend',
  'Backend',
  'Full Stack'
];

export const ProjectFilter = ({ activeFilter, onSelectFilter }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-charcoal-100/80 dark:bg-charcoal-900/80 border border-charcoal-200/80 dark:border-charcoal-800/80 backdrop-blur-md max-w-2xl mx-auto">
      {filterCategories.map((cat) => {
        const isActive = activeFilter === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectFilter(cat)}
            className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors duration-200 focus:outline-none ${
              isActive
                ? 'text-charcoal-950 dark:text-white font-semibold'
                : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white'
            }`}
          >
            <span className="relative z-10">{cat}</span>
            {isActive && (
              <motion.div
                layoutId="activeProjectFilter"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute inset-0 bg-white dark:bg-charcoal-800 rounded-xl shadow-sm border border-charcoal-200/60 dark:border-charcoal-700/60"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
