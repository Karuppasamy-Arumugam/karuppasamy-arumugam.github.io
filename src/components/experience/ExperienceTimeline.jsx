import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="relative border-l border-charcoal-200 dark:border-charcoal-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
      {experiences.map((item, index) => (
        <motion.div
          key={item.id || index}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.1 }}
          className="relative group"
        >
          {/* Timeline Node Dot */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-charcoal-900 dark:border-white bg-white dark:bg-charcoal-950 group-hover:scale-125 transition-transform" />

          {/* Card Container */}
          <div className="p-6 sm:p-7 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md shadow-sm hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                  {item.company}
                </span>
                <h3 className="text-xl font-bold text-charcoal-950 dark:text-white mt-0.5">
                  {item.role}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>
            </div>

            {/* Transferable highlights */}
            {item.transferableSkills && (
              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-charcoal-400 mr-1">Transferable Skills:</span>
                {item.transferableSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200 dark:border-charcoal-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Responsibilities list */}
            <ul className="space-y-2 text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              {item.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal-400 dark:bg-charcoal-500 mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
