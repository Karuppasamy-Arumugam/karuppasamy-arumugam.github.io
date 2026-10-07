import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Eye, Sparkles } from 'lucide-react';

export const ProjectCard = ({ project, onQuickView, isFeatured = false }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all duration-300 ${
        isFeatured ? 'lg:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Featured ribbon / badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-charcoal-950/80 dark:bg-white/90 text-white dark:text-charcoal-950 text-[11px] font-mono font-semibold backdrop-blur-md shadow-md">
          <Sparkles className="w-3 h-3" />
          <span>Featured Project</span>
        </div>
      )}

      {/* Image Thumbnail with Overlay */}
      <div className={`relative overflow-hidden bg-charcoal-100 dark:bg-charcoal-800/80 ${isFeatured ? 'md:w-1/2 min-h-[240px] md:min-h-[300px]' : 'h-48 sm:h-52 w-full'}`}>
        <img
          src={project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          {onQuickView && (
            <button
              onClick={() => onQuickView(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/90 text-charcoal-900 dark:text-white text-xs font-mono font-medium backdrop-blur-md shadow-md hover:scale-105 transition-transform"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className={`p-6 flex flex-col justify-between flex-1 ${isFeatured ? 'md:w-1/2' : ''}`}>
        <div>
          {/* Header row: Category & Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
              {project.category}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700">
              {project.status || "Completed"}
            </span>
          </div>

          {/* Project Title */}
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold text-charcoal-950 dark:text-white group-hover:text-charcoal-700 dark:group-hover:text-zinc-200 transition-colors">
              {project.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="mt-2 text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies?.slice(0, isFeatured ? 6 : 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800/80 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200/80 dark:border-charcoal-700/80"
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > (isFeatured ? 6 : 4) && (
              <span className="px-2 py-1 rounded-lg text-[11px] font-mono text-charcoal-400">
                +{project.technologies.length - (isFeatured ? 6 : 4)} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-6 border-t border-charcoal-200/80 dark:border-charcoal-800/80 flex items-center justify-between gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-charcoal-950 dark:text-white hover:underline group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 dark:hover:border-charcoal-500 transition-colors"
                title="View Source on GitHub"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 dark:hover:border-charcoal-500 transition-colors"
                title="View Live Demo"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
