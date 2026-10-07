import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center', // 'left' | 'center'
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-100/80 dark:bg-charcoal-800/80 text-charcoal-800 dark:text-charcoal-200 mb-4 backdrop-blur-sm shadow-sm`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-900 dark:bg-white" />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal-950 dark:text-white"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-3 text-base text-charcoal-600 dark:text-charcoal-400 font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
