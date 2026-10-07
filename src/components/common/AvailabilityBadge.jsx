import React from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const AvailabilityBadge = ({ className = '' }) => {
  const { profile, settings } = usePortfolioData();
  const isAvailable = settings?.isAvailable ?? profile?.availableForWork ?? true;
  const statusText = settings?.availabilityStatus || profile?.availabilityStatus || "Available for Junior Full Stack Developer Opportunities";

  if (!isAvailable) return null;

  return (
    <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-medium backdrop-blur-md shadow-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="tracking-tight">{statusText}</span>
    </div>
  );
};
