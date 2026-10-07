import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectModal } from '../../components/projects/ProjectModal';

export const ProjectsPage = () => {
  const { projects } = usePortfolioData();
  const [quickViewProject, setQuickViewProject] = useState(null);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Portfolio Archive"
        title="Software Projects & Applications"
        subtitle="Explore my interactive web applications, full-stack systems, and developer tools built with Python and React."
      />

      {/* Projects Grid */}
      <div className="min-h-[300px]">
        {projects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 mx-auto flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-charcoal-900 dark:text-white">
              No projects published yet
            </h3>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onQuickView={setQuickViewProject}
                  isFeatured={false}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProject && (
        <ProjectModal
          project={quickViewProject}
          onClose={() => setQuickViewProject(null)}
        />
      )}
    </PageTransition>
  );
};