import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from '../components/admin/ProtectedRoute';

// Lazy-loaded pages for optimal performance and code splitting
const HomePage = lazy(() => import('../pages/Home').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/About').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('../pages/Projects').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailsPage = lazy(() => import('../pages/ProjectDetails').then(m => ({ default: m.ProjectDetailsPage })));
const SkillsPage = lazy(() => import('../pages/Skills').then(m => ({ default: m.SkillsPage })));
const ExperiencePage = lazy(() => import('../pages/Experience').then(m => ({ default: m.ExperiencePage })));
const CertificationsPage = lazy(() => import('../pages/Certifications').then(m => ({ default: m.CertificationsPage })));
const ResumePage = lazy(() => import('../pages/Resume').then(m => ({ default: m.ResumePage })));
const ContactPage = lazy(() => import('../pages/Contact').then(m => ({ default: m.ContactPage })));
const AdminLoginPage = lazy(() => import('../pages/AdminLogin').then(m => ({ default: m.AdminLoginPage })));
const AdminPage = lazy(() => import('../pages/Admin').then(m => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('../pages/NotFound').then(m => ({ default: m.NotFoundPage })));

const RouteLoadingFallback = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-charcoal-400 dark:border-white border-t-transparent animate-spin" />
  </div>
);

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
