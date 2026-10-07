import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  FileText,
  Mail,
  Github,
  Linkedin,
  Code2,
  MessageSquare,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { codingProfiles, socials } = usePortfolioData();

  const githubUrl = codingProfiles.find(p => p.id === 'github')?.url || 'https://github.com/Karuppasamy-Arumugam';
  const leetcodeUrl = codingProfiles.find(p => p.id === 'leetcode')?.url || 'https://leetcode.com/u/KaruppasamyArumugam/';
  const hackerrankUrl = codingProfiles.find(p => p.id === 'hackerrank')?.url || 'https://www.hackerrank.com/profile/karuppasamy74';
  const linkedinUrl = socials.find(s => s.id === 'linkedin')?.url || 'https://www.linkedin.com/in/karuppasamy-arumugam/';
  const whatsappUrl = socials.find(s => s.id === 'whatsapp')?.url || 'https://wa.me/919585346003';

  const commands = [
    { id: 'home', title: 'Home', subtitle: 'Portfolio overview and hero', icon: Home, type: 'route', path: '/' },
    { id: 'about', title: 'About Me', subtitle: 'Background, transition, education', icon: User, type: 'route', path: '/about' },
    { id: 'projects', title: 'Projects', subtitle: 'Featured full-stack and React applications', icon: FolderGit2, type: 'route', path: '/projects' },
    { id: 'skills', title: 'Skills & Tech Stack', subtitle: 'Python, React, Django, MySQL, Networking', icon: Cpu, type: 'route', path: '/skills' },
    { id: 'experience', title: 'Experience', subtitle: 'Professional technical history', icon: Briefcase, type: 'route', path: '/experience' },
    { id: 'certifications', title: 'Internships & Certifications', subtitle: 'Python Full Stack, Red Hat Linux, GenAI', icon: Award, type: 'route', path: '/certifications' },
    { id: 'resume', title: 'Resume', subtitle: 'Interactive resume & PDF download', icon: FileText, type: 'route', path: '/resume' },
    { id: 'contact', title: 'Contact Me', subtitle: 'Send a message or inquiry', icon: Mail, type: 'route', path: '/contact' },
    { id: 'admin', title: 'Admin Login', subtitle: 'Developer CMS portal', icon: Lock, type: 'route', path: '/admin/login' },
    { id: 'github', title: 'GitHub Profile', subtitle: 'Open @Karuppasamy-Arumugam on GitHub', icon: Github, type: 'external', url: githubUrl },
    { id: 'linkedin', title: 'LinkedIn Profile', subtitle: 'Connect with Karuppasamy A', icon: Linkedin, type: 'external', url: linkedinUrl },
    { id: 'leetcode', title: 'LeetCode Profile', subtitle: 'Problem solving & algorithms', icon: Code2, type: 'external', url: leetcodeUrl },
    { id: 'hackerrank', title: 'HackerRank Profile', subtitle: 'Python assessments and badges', icon: Code2, type: 'external', url: hackerrankUrl },
    { id: 'whatsapp', title: 'Chat on WhatsApp', subtitle: 'Direct quick message', icon: MessageSquare, type: 'external', url: whatsappUrl },
  ];

  const filtered = commands.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const executeItem = (item) => {
    setIsOpen(false);
    setSearch('');
    if (item.type === 'route') {
      navigate(item.path);
    } else if (item.type === 'external' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      executeItem(filtered[selectedIndex]);
    }
  };

  return (
    <>
      {/* Visual trigger hint on Desktop in bottom corner if needed or navbar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl bg-white dark:bg-charcoal-900 rounded-2xl border border-charcoal-300 dark:border-charcoal-700 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-charcoal-200 dark:border-charcoal-800">
                <Search className="w-5 h-5 text-charcoal-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or jump to page... (ESC to exit)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full bg-transparent text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none text-sm font-sans"
                />
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-500 dark:text-charcoal-400 rounded border border-charcoal-300 dark:border-charcoal-700">
                  ESC
                </kbd>
              </div>

              {/* Results list */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-charcoal-500 dark:text-charcoal-400">
                    No results found for "{search}"
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                          isSelected
                            ? 'bg-charcoal-100 dark:bg-charcoal-800 text-black dark:text-white'
                            : 'text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-900' : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <div className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-1">{item.subtitle}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-charcoal-400">
                          {item.type === 'external' ? (
                            <ExternalLink className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : ''}`} />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer info */}
              <div className="px-4 py-2 bg-charcoal-50 dark:bg-charcoal-950/60 border-t border-charcoal-200 dark:border-charcoal-800/60 flex items-center justify-between text-[11px] text-charcoal-400 font-mono">
                <span>Navigation: <kbd className="px-1 py-0.5 bg-charcoal-200 dark:bg-charcoal-800 rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-charcoal-200 dark:bg-charcoal-800 rounded">↓</kbd></span>
                <span>Select: <kbd className="px-1 py-0.5 bg-charcoal-200 dark:bg-charcoal-800 rounded">Enter</kbd></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
