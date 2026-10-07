import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Award, FileText, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CertificateViewerModal = ({ cert, onClose }) => {
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  const handleDownload = () => {
    if (cert.certificateUrl) {
      addToast({
        type: 'success',
        message: `Downloading certificate for ${cert.title}...`
      });
      const link = document.createElement('a');
      link.href = cert.certificateUrl;
      link.download = `${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate`;
      link.target = '_blank';
      link.click();
    } else {
      addToast({
        type: 'error',
        message: 'Certificate file not currently available for download.'
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-charcoal-200 dark:border-charcoal-800 bg-charcoal-50/70 dark:bg-charcoal-950/70">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-white leading-tight">
                  {cert.title}
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">
                  Issued by {cert.issuer} • {cert.period}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-charcoal-200 dark:hover:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300 transition-colors"
              aria-label="Close certificate viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate View Container */}
          <div className="p-6 bg-charcoal-100 dark:bg-black/60 flex flex-col items-center justify-center min-h-[340px] max-h-[60vh] overflow-y-auto">
            {cert.certificateUrl ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-charcoal-300 dark:border-charcoal-700 shadow-xl max-w-full">
                <img
                  src={cert.certificateUrl}
                  alt={cert.title}
                  className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center p-8">
                <FileText className="w-12 h-12 text-charcoal-400" />
                <p className="text-sm font-mono text-charcoal-600 dark:text-charcoal-300">
                  Digital Certificate Preview Placeholder
                </p>
              </div>
            )}
          </div>

          {/* Description & Technologies */}
          <div className="p-6 border-t border-charcoal-200 dark:border-charcoal-800 flex flex-col gap-4">
            <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans">
              {cert.description}
            </p>

            {cert.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {cert.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 border border-charcoal-200 dark:border-charcoal-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Actions footer */}
            <div className="pt-4 mt-2 border-t border-charcoal-200/80 dark:border-charcoal-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Credential</span>
              </div>

              <div className="flex items-center gap-3">
                {cert.hasDownload !== false && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
