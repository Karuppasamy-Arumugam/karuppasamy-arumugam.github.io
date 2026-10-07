import React from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ResumeViewer } from '../../components/resume/ResumeViewer';

export const ResumePage = () => {
  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <SectionTitle
        badge="Curriculum Vitae"
        title="Professional Resume"
        subtitle="Complete overview of software engineering proficiencies, technical background, and qualifications."
      />

      <ResumeViewer />
    </PageTransition>
  );
};
