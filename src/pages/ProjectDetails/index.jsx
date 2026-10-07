import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code2,
  Layers,
  Lightbulb,
  AlertTriangle,
  FolderGit2,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProjectShare } from '../../components/projects/ProjectShare';

export const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects } = usePortfolioData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const project = projects.find(p => p.slug === slug || String(p.id) === slug);

  if (!project) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 mx-auto flex items-center justify-center">
          <FolderGit2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal-950 dark:text-white">
          Project Not Found
        </h2>
        <p className="text-sm text-charcoal-500 max-w-md mx-auto">
          The requested project "{slug}" could not be located in the developer repository.
        </p>
        <div className="pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const gallery = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"];

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Top Bar: Back Link & Sharing */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-charcoal-200 dark:border-charcoal-800">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono text-charcoal-600 dark:text-charcoal-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <ProjectShare projectTitle={project.title} />
      </div>

      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200 dark:border-charcoal-700">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700">
            Status: {project.status || "Completed"}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans max-w-3xl">
          {project.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-md"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs font-mono font-medium hover:border-charcoal-500 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Image & Screenshot Gallery */}
      <div className="space-y-4">
        <div className="relative rounded-3xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800 bg-charcoal-100 dark:bg-charcoal-900 shadow-2xl aspect-video max-h-[480px]">
          <img
            src={gallery[activeImageIndex]}
            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";
            }}
          />
        </div>

        {/* Thumbnail Selector */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 sm:w-28 h-14 sm:h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  idx === activeImageIndex
                    ? 'border-charcoal-900 dark:border-white scale-105 shadow-md'
                    : 'border-charcoal-200 dark:border-charcoal-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Structured Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Deep Dive Narrative */}
        <div className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <div className="p-7 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md space-y-3">
            <h3 className="text-lg font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-charcoal-700 dark:text-charcoal-300" />
              <span>Project Overview</span>
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              {project.description || project.shortDescription}
            </p>
          </div>

          {/* Problem Statement & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 space-y-2">
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Problem Statement</span>
              </h4>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-sans">
                {project.problemStatement || "Designing a streamlined client interface without performance bottlenecks or disjointed state across multiple interactive components."}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 space-y-2">
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>Architectural Solution</span>
              </h4>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-sans">
                {project.solution || "Implemented clean modular architecture with centralized state management, responsive UI contracts, and robust error boundaries."}
              </p>
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="p-7 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Key Features & Capabilities</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges & Learning Outcomes */}
          <div className="space-y-4">
            {project.challenges && (
              <div className="p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 space-y-2">
                <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                  Technical Challenges Faced
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-sans">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.learningOutcomes && (
              <div className="p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 space-y-2">
                <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                  What I Learned & Engineering Takeaways
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed font-sans">
                  {project.learningOutcomes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Tech Specs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200 dark:border-charcoal-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-800 space-y-3 text-xs font-mono text-charcoal-500">
              <div className="flex items-center justify-between">
                <span>Category</span>
                <span className="font-semibold text-charcoal-900 dark:text-white">{project.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="font-semibold text-charcoal-900 dark:text-white">{project.status || "Completed"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
