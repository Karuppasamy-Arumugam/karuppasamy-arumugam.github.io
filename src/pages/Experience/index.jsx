import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ExperienceTimeline } from '../../components/experience/ExperienceTimeline';

export const ExperiencePage = () => {
  const { experience } = usePortfolioData();

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Career History"
        title="Technical Experience & Systems Engineering"
        subtitle="Practical troubleshooting and infrastructure positions that formed my disciplined approach to software engineering."
      />

      {/* Narrative Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-charcoal-950 dark:text-white">
              Transferable Engineering Foundation
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              Before transitioning to full-time web software development, I worked in technical network administration and ELV installations in India and Dubai. This real-world experience instilled strong root-cause isolation techniques, precision cabling and device configurations, and a habit of writing clean, structured technical documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="pt-2">
        <ExperienceTimeline experiences={experience} />
      </div>

      {/* CTA to Projects */}
      <div className="text-center pt-8 border-t border-charcoal-200 dark:border-charcoal-800">
        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-4 font-sans">
          Interested in how I apply these troubleshooting skills to software architecture?
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-md"
        >
          <span>Explore My Software Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </PageTransition>
  );
};
