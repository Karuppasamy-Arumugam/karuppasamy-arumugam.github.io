import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Key, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageTransition } from '../../components/layout/PageTransition';

export const AdminLoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated, cloudConfigured } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // If already authenticated, allow direct proceed
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please enter both admin email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(identifier, password);
      addToast({
        type: 'success',
        message: 'Welcome to the Developer Admin Panel.'
      });
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-6">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-charcoal-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Portfolio</span>
      </Link>

      {/* Main card */}
      <div className="p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 flex items-center justify-center shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-charcoal-950 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs font-mono text-charcoal-500 dark:text-charcoal-400 mt-1">
              Private Portfolio Content Management
            </p>
          </div>
        </div>


        {!cloudConfigured && (
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-start gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Cloud admin login is waiting for Supabase configuration. See <strong>SUPABASE_SETUP.md</strong> in the project root.</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter Supabase admin email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-400 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
              Password
            </label>
            <div className="relative flex items-center">
              <Key className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-400 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-charcoal-400 hover:text-black dark:hover:text-white"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </PageTransition>
  );
};
