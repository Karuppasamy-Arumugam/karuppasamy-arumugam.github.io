import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-lg backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-zinc-900/90 text-white border-emerald-500/40 dark:bg-zinc-950/90 dark:border-emerald-500/50'
                  : toast.type === 'error'
                  ? 'bg-zinc-900/90 text-white border-rose-500/40 dark:bg-zinc-950/90 dark:border-rose-500/50'
                  : 'bg-zinc-900/90 text-white border-zinc-700/60 dark:bg-zinc-950/90 dark:border-zinc-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-zinc-300 shrink-0" />}
                <p className="text-sm font-medium leading-tight">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
