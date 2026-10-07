import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const SkillCard = ({ skill }) => {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-sm shadow-sm hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
            {skill.name}
          </h4>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700">
            {skill.level}
          </span>
        </div>
        <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-sans">
          {skill.highlight}
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-charcoal-100 dark:border-charcoal-800/60 flex items-center gap-1.5 text-[11px] text-charcoal-400 dark:text-charcoal-500 font-mono">
        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
        <span>Verified Proficiency</span>
      </div>
    </motion.div>
  );
};
