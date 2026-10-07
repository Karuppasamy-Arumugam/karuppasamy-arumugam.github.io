import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from '../common/ScrollProgress';
import { CustomCursor } from '../common/CustomCursor';
import { BackToTop } from '../common/BackToTop';
import { CommandPalette } from '../common/CommandPalette';
import { ParticleBackground } from '../background/ParticleBackground';
import { LoadingScreen } from '../common/LoadingScreen';

export const Layout = () => {
  return (
    <div className="portfolio-shell min-h-screen flex flex-col text-charcoal-900 dark:text-charcoal-100 transition-colors duration-200 relative overflow-x-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <ParticleBackground />
      <CommandPalette />

      <Navbar />

      <main className="flex-1 w-full pt-20 sm:pt-24 z-10">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};
