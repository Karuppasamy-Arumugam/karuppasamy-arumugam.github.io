import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Terminal,
  CheckCircle2,
  ArrowRight,
  FileCode,
  Cpu,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { EducationTimeline } from '../../components/education/EducationTimeline';

export const AboutPage = () => {
  const { profile, education } = usePortfolioData();
  const profileImageUrl = `${import.meta.env.BASE_URL}assets/images/karuppasamy-profile.jpeg`;

  const transitionSteps = [
    {
      step: "01",
      title: "Diploma in Information Technology",
      period: "2022 – 2025",
      description: "Built foundational comprehension of computer architecture, structured query language (SQL), and object-oriented programming fundamentals.",
      icon: GraduationCap
    },
    {
      step: "02",
      title: "Networking & ELV Systems Experience",
      period: "2025 – 2026",
      description: "Gained real-world engineering troubleshooting experience configuring enterprise routers, switches, and cabling. Developed strong root-cause analysis habits.",
      icon: Cpu
    },
    {
      step: "03",
      title: "Python Full Stack Specialization",
      period: "2026",
      description: "Immersed in full-stack web software engineering with Python, Django, REST APIs, React.js, and modern relational database modeling through intensive project building.",
      icon: Terminal
    },
    {
      step: "04",
      title: "Junior Full Stack Developer",
      period: "Present",
      description: "Actively creating scalable, user-centric web applications with modern frontend frameworks and robust Python backend services.",
      icon: Code2,
      highlight: true
    }
  ];

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <SectionTitle
        badge="About Me"
        title="Software Developer with a Practical Engineering Edge"
        subtitle="Focused on building responsive, maintainable web applications using Python and React.js."
      />

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bio Narrative */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-charcoal-950 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span>Who I Am & What I Do</span>
            </h3>

            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              Hello! I'm <strong className="text-charcoal-950 dark:text-white">{profile.name}</strong>, a Junior Full Stack Developer based in {profile.location}. My primary focus is designing and delivering clean, responsive web applications using <strong className="text-charcoal-950 dark:text-white">Python, Django, React.js, and modern CSS</strong>.
            </p>

            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              I bring a unique combination of software development skills and practical hardware/networking experience. Having worked on physical network topologies, routers, and infrastructure before stepping fully into web development, I approach code with deep respect for performance, architectural reliability, and methodical root-cause debugging.
            </p>

            <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              Whether architecting a relational database schema in MySQL, writing REST API endpoints in Django or Flask, or building dynamic component trees with React state management, I focus on clean code, seamless user experience, and continuous technical growth.
            </p>
          </div>

          {/* Key Developer Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50">
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Problem Solving Instincts</span>
              </h4>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Structured analytical mindset developed across networking diagnostics, applied directly to code debugging and API design.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50">
              <h4 className="text-sm font-bold text-charcoal-950 dark:text-white mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Continuous Learner</span>
              </h4>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Constantly expanding technical horizons through modern libraries, algorithmic practice, and distance higher education.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick facts card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md shadow-sm space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-brand-200/70 dark:border-brand-500/20 bg-charcoal-950 aspect-[4/3]">
              <img
                src={profileImageUrl}
                alt={`${profile.name} professional portrait`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04101d]/65 via-transparent to-transparent" />
              <div className="absolute left-3 bottom-3 px-2.5 py-1 rounded-full bg-[#071426]/75 border border-white/20 backdrop-blur-md text-[10px] font-mono text-cyan-100">
                Developer Profile
              </div>
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-400">
              Quick Facts
            </span>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-charcoal-400 block">Location</span>
                <span className="font-medium text-charcoal-900 dark:text-white text-sm">{profile.location}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Focus</span>
                <span className="font-medium text-charcoal-900 dark:text-white text-sm">Python Full Stack | React</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Roles
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-mono font-bold hover:from-brand-500 hover:to-cyan-500 transition-all shadow-md shadow-brand-500/20"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Career Transition Timeline */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-charcoal-400">
            Evolution
          </span>
          <h3 className="text-2xl font-bold text-charcoal-950 dark:text-white">
            Career Transition Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            A positive, structured transition from technical systems engineering into full-stack software development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {transitionSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  item.highlight
                    ? 'border-charcoal-900 dark:border-white bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 shadow-lg'
                    : 'border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono opacity-60 font-bold">{item.step}</span>
                    <Icon className="w-4 h-4 opacity-80" />
                  </div>
                  <h4 className="text-sm font-bold leading-snug">{item.title}</h4>
                  <span className="text-[11px] font-mono opacity-75 block mt-1">{item.period}</span>
                  <p className="text-xs opacity-85 mt-3 leading-relaxed font-sans">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Education Timeline */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-charcoal-400">
            Academics
          </span>
          <h3 className="text-2xl font-bold text-charcoal-950 dark:text-white">
            Formal Education & Degrees
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            Foundational computing studies and ongoing distance degree in Computer Science.
          </p>
        </div>

        <EducationTimeline educationList={education} />
      </div>
    </PageTransition>
  );
};
