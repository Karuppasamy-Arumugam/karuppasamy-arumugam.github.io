import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Briefcase,
  Award,
  Sparkles,
  Terminal,
  ChevronRight,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { HeroMedia } from '../../components/home/HeroMedia';
import { AvailabilityBadge } from '../../components/common/AvailabilityBadge';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectModal } from '../../components/projects/ProjectModal';
import { SkillCard } from '../../components/skills/SkillCard';

export const HomePage = () => {
  const { profile, projects, skills, experience, certifications, codingProfiles, socials, settings } = usePortfolioData();
  const [activeRotatingIndex, setActiveRotatingIndex] = useState(0);
  const [quickViewProject, setQuickViewProject] = useState(null);

  const rotatingTexts = profile.heroRotatingTexts || [
    "I Build Web Applications",
    "I Work With Python",
    "I Create React Interfaces",
    "I Develop Full Stack Projects"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRotatingIndex(prev => (prev + 1) % rotatingTexts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const featuredProjects = projects.filter(p => p.featured);
  const displayFeatured = featuredProjects.length > 0 ? featuredProjects.slice(0, 3) : projects.slice(0, 3);
  const previewSkills = skills.slice(0, 2);

  const githubUrl = codingProfiles.find(p => p.id === 'github')?.url || profile.github;
  const linkedinUrl = socials.find(s => s.id === 'linkedin')?.url || profile.linkedin;

  return (
    <PageTransition>
      <div className="space-y-24 sm:space-y-32 pb-16">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left: Headline & Actions */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 z-10">
              <AvailabilityBadge />

              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs sm:text-sm font-mono text-charcoal-600 dark:text-charcoal-400"
                >
                  <span>Hello, World! I am</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-charcoal-950 dark:text-white"
                >
                  {profile.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="space-y-1"
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal-800 dark:text-charcoal-200">
                    {profile.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-charcoal-500 dark:text-charcoal-400">
                    {profile.subtitle}
                  </p>
                </motion.div>

                {/* Rotating Tagline Animation */}
                <div className="h-9 sm:h-10 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRotatingIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50/90 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/25 text-brand-800 dark:text-cyan-100 font-mono text-xs sm:text-sm font-semibold"
                    >
                      <Terminal className="w-3.5 h-3.5 text-brand-500 dark:text-cyan-300" />
                      <span>{rotatingTexts[activeRotatingIndex]}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Short Intro */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 max-w-xl leading-relaxed font-sans"
              >
                {profile.heroDescription}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-mono font-bold hover:from-brand-500 hover:to-cyan-500 transition-all shadow-lg shadow-brand-500/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/resume"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/80 dark:bg-charcoal-900/80 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/80 dark:bg-charcoal-900/80 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Me</span>
                </Link>

                {/* Social Quick Icons */}
                <div className="flex items-center gap-2 pl-1">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 text-charcoal-700 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 transition-colors"
                      title="GitHub"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 text-charcoal-700 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 transition-colors"
                      title="LinkedIn"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Personal developer video + portrait */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <HeroMedia profile={profile} videoEnabled={settings?.heroVideoEnabled !== false} />
            </div>
          </div>
        </section>

        {/* ================= ABOUT PREVIEW SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-charcoal-300 dark:border-charcoal-700 bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                  <span>About & Trajectory</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white">
                  Disciplined Engineer with Systems Troubleshooting Instincts
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
                  {profile.aboutSummary}
                </p>
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-charcoal-950 dark:text-white hover:underline group"
                  >
                    <span>Read Full Story & Career Transition</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-800/80">
                  <span className="text-xs font-mono text-charcoal-400">Education</span>
                  <p className="text-sm font-bold text-charcoal-950 dark:text-white mt-1">B.Sc. in Computer Science</p>
                  <p className="text-xs text-charcoal-500">ACCET Karaikudi (Distance Ed)</p>
                </div>
                <div className="p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-800/80">
                  <span className="text-xs font-mono text-charcoal-400">Technical Foundation</span>
                  <p className="text-sm font-bold text-charcoal-950 dark:text-white mt-1">Diploma in Information Technology</p>
                  <p className="text-xs text-charcoal-500">MSPVL Polytechnic College</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <SectionTitle
              badge="Selected Work"
              title="Featured Software Projects"
              subtitle="Practical, responsive applications engineered with Python, React.js, and clean architecture."
              align="left"
              className="mb-0"
            />
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-charcoal-950 dark:text-white hover:underline self-start sm:self-auto"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayFeatured.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onQuickView={setQuickViewProject}
                isFeatured={false}
              />
            ))}
          </div>
        </section>

        {/* ================= SKILLS PREVIEW ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Proficiency & Tooling"
            title="Technical Skills Overview"
            subtitle="Categorized developer stack focused on practical implementation without arbitrary percentage bars."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewSkills.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md"
              >
                <h3 className="text-lg font-bold text-charcoal-950 dark:text-white mb-2">
                  {cat.category}
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-5">
                  {cat.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillCard key={sIdx} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-xs font-mono font-bold text-charcoal-950 dark:text-white hover:border-charcoal-500 transition-colors shadow-sm"
            >
              <span>Explore All Skill Categories (Backend, DB, Networking, AI Tools)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================= CAREER JOURNEY TIMELINE ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Path & Evolution"
            title="Positive Career Transition"
            subtitle="How systems troubleshooting and networking experience enhance my full-stack engineering ability."
          />

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 text-center">
              <span className="text-[11px] font-mono text-charcoal-400 uppercase">Step 01</span>
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white mt-1">Diploma in IT</h4>
              <p className="text-xs text-charcoal-500 mt-1">Core computing foundation</p>
            </div>

            <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 text-center">
              <span className="text-[11px] font-mono text-charcoal-400 uppercase">Step 02</span>
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white mt-1">Networking & ELV</h4>
              <p className="text-xs text-charcoal-500 mt-1">Hardware & routing instincts</p>
            </div>

            <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 text-center">
              <span className="text-[11px] font-mono text-charcoal-400 uppercase">Step 03</span>
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white mt-1">Python Full Stack</h4>
              <p className="text-xs text-charcoal-500 mt-1">Intensive training & projects</p>
            </div>

            <div className="p-5 rounded-2xl border-2 border-charcoal-900 dark:border-white bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950 text-center shadow-lg">
              <span className="text-[11px] font-mono opacity-80 uppercase">Target</span>
              <h4 className="text-sm font-bold mt-1">Junior Full Stack Dev</h4>
              <p className="text-xs opacity-90 mt-1">Building web apps</p>
            </div>
          </div>
        </section>

        {/* ================= CODING PROFILES ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Code & Problem Solving"
            title="External Coding Profiles"
            subtitle="Explore my live problem solving, algorithmic challenges, and public git repositories."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {codingProfiles.filter(p => p.url && p.url.trim() !== '').map((profileItem) => (
              <a
                key={profileItem.id}
                href={profileItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md shadow-sm hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-900 dark:text-white group-hover:bg-charcoal-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-charcoal-950 transition-colors">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal-950 dark:text-white">
                      {profileItem.name}
                    </h4>
                    <p className="text-xs font-mono text-charcoal-500 dark:text-charcoal-400">
                      {profileItem.username || 'View Profile'}
                    </p>
                    <span className="text-[10px] text-charcoal-400 block mt-0.5">
                      {profileItem.badgeText}
                    </span>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-charcoal-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </section>

        {/* ================= REUSABLE CALL TO ACTION (CTA) ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-14 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-gradient-to-b from-white/90 to-charcoal-50/90 dark:from-charcoal-900/90 dark:to-charcoal-950/90 backdrop-blur-2xl text-center shadow-2xl overflow-hidden">
            {/* Subtle gradient blur circle behind CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-charcoal-300/30 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400">
                Let's Build Together
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
                Have an opportunity or project in mind?
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
                Let's connect and build something useful together. I am actively seeking Junior Full Stack Developer opportunities where I can contribute and continue growing.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-all shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Me</span>
                </Link>

                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:border-charcoal-500 transition-colors"
                >
                  <span>View Projects</span>
                </Link>

                <Link
                  to="/resume"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:border-charcoal-500 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
