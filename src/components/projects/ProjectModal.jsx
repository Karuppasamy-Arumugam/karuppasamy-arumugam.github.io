import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ArrowRight, Check } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Project Image */}
          <div className="relative h-60 sm:h-72 w-full bg-charcoal-100 dark:bg-charcoal-800">
            <img
              src={project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-[11px] font-mono backdrop-blur-md">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 mb-2">
                Overview
              </h4>
              <p className="text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                {project.shortDescription || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 mb-2.5">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200 dark:border-charcoal-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features preview */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 mb-2.5">
                  Key Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-600 dark:text-charcoal-300">
                  {project.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-6 border-t border-charcoal-200 dark:border-charcoal-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-md"
              >
                <span>View Full Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
