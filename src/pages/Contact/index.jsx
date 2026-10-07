import React from 'react';
import { Mail, MessageSquare, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ContactForm } from '../../components/contact/ContactForm';

export const ContactPage = () => {
  const { profile, socials } = usePortfolioData();

  const linkedin = socials.find(s => s.id === 'linkedin')?.url || profile.linkedin;
  const whatsapp = socials.find(s => s.id === 'whatsapp')?.url || (profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : '');

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Get In Touch"
        title="Contact & Collaboration"
        subtitle="Feel free to reach out for junior full stack developer opportunities, project inquiries, or technical discussion."
      />

      {/* Main Form */}
      <ContactForm />

      {/* Direct channels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6 border-t border-charcoal-200 dark:border-charcoal-800">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 hover:border-charcoal-400 dark:hover:border-charcoal-600 transition-colors flex items-center gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-900 dark:text-white group-hover:bg-charcoal-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-charcoal-950 transition-colors">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-charcoal-400">Professional Network</span>
              <p className="text-sm font-bold text-charcoal-950 dark:text-white">Connect on LinkedIn</p>
            </div>
          </a>
        )}

        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 hover:border-emerald-500/40 transition-colors flex items-center gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-charcoal-400">Instant Messaging</span>
              <p className="text-sm font-bold text-charcoal-950 dark:text-white">Chat on WhatsApp</p>
            </div>
          </a>
        )}
      </div>
    </PageTransition>
  );
};
