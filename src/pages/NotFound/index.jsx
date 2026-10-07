import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FolderGit2, AlertTriangle, Terminal } from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';

export const NotFoundPage = () => {
  return (
    <PageTransition className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-8">
      {/* Code Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-20 h-20 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md text-charcoal-900 dark:text-white mx-auto flex items-center justify-center shadow-xl font-mono text-2xl font-extrabold"
      >
        404
      </motion.div>

      {/* Message */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base font-mono text-charcoal-500 dark:text-charcoal-400">
          // Looks like this route hasn't been coded yet.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-md"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Go Home</span>
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:border-charcoal-500 transition-colors"
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>View Projects</span>
        </Link>
      </div>
    </PageTransition>
  );
};
