import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Printer, CheckCircle2, Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useToast } from '../../context/ToastContext';
import { getLatestResumeUrl, isResumeCloudConfigured } from '../../utils/resumeStorage';

export const ResumeViewer = () => {
  const { profile, skills, experience, education, certifications, projects } = usePortfolioData();
  const { addToast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      addToast({
        type: 'success',
        message: 'Preparing the latest resume for download...'
      });

      let resumeUrl = null;

      if (isResumeCloudConfigured()) {
        try {
          resumeUrl = await getLatestResumeUrl();
        } catch (error) {
          console.warn('Cloud resume is unavailable, using fallback PDF:', error);
        }
      }

      if (!resumeUrl) {
        const configuredResumeUrl = profile.resumeUrl?.trim();

        if (
          configuredResumeUrl?.startsWith('http://') ||
          configuredResumeUrl?.startsWith('https://')
        ) {
          resumeUrl = configuredResumeUrl;
        } else {
          const relativePath = (
            configuredResumeUrl ||
            'assets/resume/Karuppasamy-A-Resume.pdf'
          ).replace(/^\/+/, '');

          resumeUrl = `${import.meta.env.BASE_URL}${relativePath}`;
        }
      }

      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Karuppasamy_A_Junior_Full_Stack_Developer_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast({
        type: 'success',
        message: 'Resume download started.'
      });
    } catch (error) {
      console.error('Resume download error:', error);
      addToast({
        type: 'error',
        message: 'Unable to download the resume.'
      });
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-charcoal-600 dark:text-charcoal-300">
          <FileText className="w-4 h-4 text-charcoal-900 dark:text-white" />
          <span>Karuppasamy-A-Resume.pdf (ATS-Optimized Format)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 text-xs font-mono font-medium hover:text-black dark:hover:text-white transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-mono font-bold hover:from-brand-500 hover:to-cyan-500 transition-all shadow-md shadow-brand-500/20 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Downloading...' : 'Download Resume (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* Styled Printable / Viewable Resume Document */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 sm:p-12 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white dark:bg-[#111115] shadow-xl text-charcoal-900 dark:text-charcoal-100 font-sans print:border-none print:shadow-none print:p-0"
        id="printable-resume"
      >
        {/* Document Header */}
        <div className="border-b border-charcoal-200 dark:border-charcoal-800 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-charcoal-950 dark:text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300 mt-0.5">
                {profile.title} • {profile.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-charcoal-600 dark:text-charcoal-400 space-y-1">
              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {profile.location}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {profile.email}</span>
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <Globe className="w-3 h-3" /> github.com/Karuppasamy-Arumugam
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Section: Professional Summary */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
            {profile.aboutSummary || profile.heroDescription}
          </p>
        </div>

        {/* Section: Technical Skills */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Technical Skills
          </h2>
          <div className="space-y-2 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-mono font-semibold text-charcoal-900 dark:text-white min-w-[160px]">
                  {cat.category}:
                </span>
                <span className="text-charcoal-600 dark:text-charcoal-300">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Featured Projects */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Key Software Projects
          </h2>
          <div className="space-y-4">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-sm text-charcoal-950 dark:text-white">
                    {proj.title}
                  </span>
                  <span className="font-mono text-charcoal-500 dark:text-charcoal-400">
                    {proj.technologies?.join(' • ')}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {proj.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Experience */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Technical Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-sm text-charcoal-950 dark:text-white">{exp.role}</span>
                    <span className="text-charcoal-600 dark:text-charcoal-400 font-medium"> — {exp.company}</span>
                  </div>
                  <span className="font-mono text-charcoal-500 dark:text-charcoal-400">{exp.period} | {exp.location}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-charcoal-600 dark:text-charcoal-300">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Education */}
        <div className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-charcoal-950 dark:text-white">{edu.degree}</span>
                  <span className="text-charcoal-600 dark:text-charcoal-400"> — {edu.institution}</span>
                </div>
                <span className="font-mono text-charcoal-500 dark:text-charcoal-400">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Internships & Certifications */}
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400 pb-1 border-b border-charcoal-100 dark:border-charcoal-800/80 mb-3">
            Internships & Certifications
          </h2>
          <div className="space-y-2 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-charcoal-950 dark:text-white">{cert.title}</span>
                  <span className="text-charcoal-600 dark:text-charcoal-400"> ({cert.issuer})</span>
                </div>
                <span className="font-mono text-charcoal-500 dark:text-charcoal-400">{cert.period}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
