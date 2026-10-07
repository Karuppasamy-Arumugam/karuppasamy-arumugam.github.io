import React from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Download, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const CertificationCard = ({ cert, onViewCertificate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md shadow-sm hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700">
            {cert.type || "Certification"}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{cert.period}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-charcoal-950 dark:text-white group-hover:text-charcoal-700 dark:group-hover:text-zinc-200 transition-colors">
          {cert.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-charcoal-500 dark:text-charcoal-400 mt-1 mb-3">
          <span className="font-semibold text-charcoal-700 dark:text-charcoal-300">{cert.issuer}</span>
          {cert.location && <span>• {cert.location}</span>}
        </div>

        <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans mt-2">
          {cert.description}
        </p>

        {cert.note && (
          <p className="text-xs text-charcoal-500 italic mt-2">
            *{cert.note}
          </p>
        )}

        {cert.technologies && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {cert.technologies.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800/80 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200/80 dark:border-charcoal-700/80"
              >
                {tech}
              </span>
            ))}
            {cert.technologies.length > 6 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-charcoal-400">
                +{cert.technologies.length - 6} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="pt-6 mt-6 border-t border-charcoal-200/80 dark:border-charcoal-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Credential</span>
        </div>

        <button
          onClick={() => onViewCertificate(cert)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Certificate</span>
        </button>
      </div>
    </motion.div>
  );
};
