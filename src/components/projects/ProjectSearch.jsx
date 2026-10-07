import React from 'react';
import { Search, X } from 'lucide-react';

export const ProjectSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-md w-full mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, technology, or category..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md text-charcoal-950 dark:text-white placeholder-charcoal-400 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-charcoal-400 dark:focus:ring-charcoal-600 transition-all shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 rounded-md text-charcoal-400 hover:text-black dark:hover:text-white transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
