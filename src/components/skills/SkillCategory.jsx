import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  GitBranch,
  FileText,
  Network,
  Wrench,
  Sparkles,
  Layers
} from 'lucide-react';
import { SkillCard } from './SkillCard';

const iconMap = {
  Code2,
  Layout,
  Server,
  Database,
  GitBranch,
  FileText,
  Network,
  Wrench,
  Sparkles,
  Layers
};

export const SkillCategory = ({ categoryData }) => {
  const IconComponent = iconMap[categoryData.icon] || Layers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="p-6 sm:p-8 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 shadow-sm">
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-charcoal-950 dark:text-white">
            {categoryData.category}
          </h3>
          {categoryData.description && (
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">
              {categoryData.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {categoryData.skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};
