import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { CertificationCard } from '../../components/certifications/CertificationCard';
import { CertificateViewerModal } from '../../components/certifications/CertificateViewerModal';

export const CertificationsPage = () => {
  const { certifications } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <PageTransition className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Accreditations & Training"
        title="Internships & Certifications"
        subtitle="Practical development training programs, industrial workshops, and Linux administration credentials."
      />

      {/* Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 backdrop-blur-md flex items-center gap-3.5 text-xs text-charcoal-600 dark:text-charcoal-400 font-sans max-w-3xl mx-auto">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        <p>
          All credentials represent verified practical training and completed workshops. Digital certificates can be previewed or downloaded directly.
        </p>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            onViewCertificate={setSelectedCert}
          />
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <CertificateViewerModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </PageTransition>
  );
};
