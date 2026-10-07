import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, Sparkles, Layers } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PageTransition } from '../../components/layout/PageTransition';
import { SectionTitle } from '../../components/common/SectionTitle';
import { SkillCategory } from '../../components/skills/SkillCategory';

export const SkillsPage = () => {
  const { skills } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...skills.map(c => c.category)];

  const filteredSkills = skills.map(cat => {
    // If a specific category is selected and it's not this one, filter it out
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }

    if (!searchQuery.trim()) {
      return cat;
    }

    const q = searchQuery.toLowerCase().trim();
    const matchingSkills = cat.skills.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.level.toLowerCase().includes(q) ||
      s.highlight.toLowerCase().includes(q)
    );

    if (matchingSkills.length > 0 || cat.category.toLowerCase().includes(q)) {
      return {
        ...cat,
        skills: matchingSkills.length > 0 ? matchingSkills : cat.skills
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <SectionTitle
        badge="Technical Expertise"
        title="Skills & Technologies"
        subtitle="Practical competencies across full-stack software development, database modeling, and networking infrastructure."
      />

      {/* Search & Categories */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Python, React, MySQL, Django, REST)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md text-charcoal-950 dark:text-white placeholder-charcoal-400 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-400 transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 font-semibold shadow-sm'
                    : 'bg-charcoal-100/80 dark:bg-charcoal-900/80 text-charcoal-600 dark:text-charcoal-400 hover:text-black dark:hover:text-white border border-charcoal-200 dark:border-charcoal-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="space-y-8 min-h-[350px]">
        {filteredSkills.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-sm font-bold text-charcoal-900 dark:text-white">
              No matching skills found
            </p>
            <p className="text-xs text-charcoal-500">
              Try searching with another keyword or resetting the category filter.
            </p>
          </div>
        ) : (
          filteredSkills.map((catData, idx) => (
            <SkillCategory key={idx} categoryData={catData} />
          ))
        )}
      </div>
    </PageTransition>
  );
};
