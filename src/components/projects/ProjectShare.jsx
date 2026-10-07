import React from 'react';
import { Linkedin, MessageSquare, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ProjectShare = ({ projectTitle, projectUrl }) => {
  const { addToast } = useToast();
  const url = projectUrl || window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        type: 'success',
        message: 'Project link copied to clipboard!'
      });
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Failed to copy link.'
      });
    }
  };

  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareWhatsApp = () => {
    const text = `Check out this project by Karuppasamy A: ${projectTitle} - ${url}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-charcoal-400 mr-1">Share:</span>
      <button
        onClick={shareLinkedIn}
        className="p-2 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 text-charcoal-600 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={shareWhatsApp}
        className="p-2 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 text-charcoal-600 dark:text-charcoal-300 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
      </button>

      <button
        onClick={handleCopy}
        className="p-2 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 text-charcoal-600 dark:text-charcoal-300 hover:text-black dark:hover:text-white hover:border-charcoal-400 transition-colors"
        title="Copy Project Link"
        aria-label="Copy Project Link"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
};
