import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Loader2,
  Mail,
  User,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useToast } from '../../context/ToastContext';

export const ContactForm = () => {
  const { profile, settings } = usePortfolioData();
  const { addToast } = useToast();

  // Contact email controlled from Admin -> Profile.
  // Falls back to the default email if no value is saved.
  const contactEmail =
    profile?.email?.trim() || 'karuppasamyarumugam05@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isFormEnabled = settings?.contactFormEnabled !== false;

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ==========================================
  // COPY EMAIL
  // ==========================================
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);

      setCopiedEmail(true);

      addToast({
        type: 'success',
        message: 'Email copied!'
      });

      setTimeout(() => {
        setCopiedEmail(false);
      }, 3000);
    } catch (error) {
      console.error('Copy email error:', error);

      addToast({
        type: 'error',
        message: 'Failed to copy email to clipboard.'
      });
    }
  };

  // ==========================================
  // WEB3FORMS SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormEnabled) {
      setStatus('error');
      setErrorMessage(
        'The contact form is currently unavailable. Please contact me directly by email.'
      );
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Use the key saved from Admin first.
    // If Admin key is blank, fall back to the .env key.
    const accessKey =
      settings?.web3FormsAccessKey?.trim() ||
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      // Check Web3Forms key
      if (!accessKey || accessKey.trim() === '') {
        throw new Error(
          'Web3Forms access key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in the .env file.'
        );
      }

      console.log(
        'Web3Forms key loaded:',
        Boolean(accessKey)
      );

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },

          body: JSON.stringify({
            access_key: accessKey,

            name: formData.name.trim(),

            email: formData.email.trim(),

            subject: formData.subject.trim(),

            message: formData.message.trim(),

            from_name: 'Karuppasamy Portfolio'
          })
        }
      );

      const result = await response.json();

      console.log(
        'Web3Forms response:',
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            'Web3Forms returned an error.'
        );
      }

      if (result.success) {
        handleSuccess();
      } else {
        throw new Error(
          result.message ||
            'Failed to submit the form to Web3Forms.'
        );
      }
    } catch (error) {
      console.error(
        'Contact form error:',
        error
      );

      setStatus('error');

      setErrorMessage(
        error.message ||
          'Something went wrong while sending your message.'
      );

      addToast({
        type: 'error',
        message:
          'Message failed to send. Please try again or email directly.'
      });
    }
  };

  // ==========================================
  // SUCCESS
  // ==========================================
  const handleSuccess = () => {
    setStatus('success');

    addToast({
      type: 'success',
      message: 'Message sent successfully!'
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          y: 0.8
        },
        colors: [
          '#10b981',
          '#ffffff',
          '#71717a'
        ]
      });
    } catch (error) {
      console.log(
        'Confetti error:',
        error
      );
    }

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setErrors({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* =====================================
          DIRECT EMAIL
      ====================================== */}

      <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/60 dark:bg-charcoal-900/60 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-900 dark:text-white">
            <Mail className="w-4 h-4" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-400">
              Direct Inquiries
            </span>

            <p className="text-sm font-semibold text-charcoal-950 dark:text-white">
              {contactEmail}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-xs font-mono font-medium text-charcoal-800 dark:text-charcoal-200 hover:text-black dark:hover:text-white hover:border-charcoal-500 transition-colors self-end sm:self-center"
        >
          {copiedEmail ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}

          <span>
            {copiedEmail
              ? 'Email Copied!'
              : 'Copy Email'}
          </span>
        </button>
      </div>

      {/* =====================================
          MAIN FORM
      ====================================== */}

      <div className="p-6 sm:p-8 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl shadow-xl">

        <AnimatePresence mode="wait">

          {/* =====================================
              SUCCESS MESSAGE
          ====================================== */}

          {status === 'success' ? (
            <motion.div
              key="success-box"
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.95
              }}
              className="py-12 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-charcoal-950 dark:text-white">
                  Message Sent Successfully
                </h3>

                <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-1 max-w-sm">
                  Thank you for reaching out.
                  I have received your message
                  and will get back to you soon.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setStatus('idle')
                }
                className="mt-4 px-6 py-2.5 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-xs font-mono font-bold hover:opacity-90 transition-opacity"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (

            /* =====================================
                CONTACT FORM
            ====================================== */

            <form
              key="contact-form"
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >

              {/* FORM DISABLED MESSAGE */}

              {!isFormEnabled && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />

                  <span>
                    The contact form is currently
                    unavailable. Please contact me
                    directly using the email above.
                  </span>
                </div>
              )}

              {/* ERROR MESSAGE */}

              {status === 'error' && (
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />

                  <span>
                    {errorMessage}
                  </span>
                </div>
              )}

              {/* =====================================
                  NAME + EMAIL
              ====================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* NAME */}

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
                    Your Name{' '}
                    <span className="text-rose-500">
                      *
                    </span>
                  </label>

                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isFormEnabled}
                      placeholder="e.g. John Doe"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                        errors.name
                          ? 'border-rose-500 focus:ring-rose-400'
                          : 'border-charcoal-300 dark:border-charcoal-700 focus:ring-charcoal-400'
                      } bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {errors.name && (
                    <p className="text-[11px] font-mono text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
                    Your Email{' '}
                    <span className="text-rose-500">
                      *
                    </span>
                  </label>

                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isFormEnabled}
                      placeholder="e.g. john@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-400'
                          : 'border-charcoal-300 dark:border-charcoal-700 focus:ring-charcoal-400'
                      } bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-[11px] font-mono text-rose-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================
                  SUBJECT
              ====================================== */}

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
                  Subject{' '}
                  <span className="text-rose-500">
                    *
                  </span>
                </label>

                <div className="relative flex items-center">
                  <Tag className="absolute left-3.5 w-4 h-4 text-charcoal-400 pointer-events-none" />

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={!isFormEnabled}
                    placeholder="e.g. Junior Full Stack Developer Role / Collaboration"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      errors.subject
                        ? 'border-rose-500 focus:ring-rose-400'
                        : 'border-charcoal-300 dark:border-charcoal-700 focus:ring-charcoal-400'
                    } bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>

                {errors.subject && (
                  <p className="text-[11px] font-mono text-rose-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* =====================================
                  MESSAGE
              ====================================== */}

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-charcoal-700 dark:text-charcoal-300">
                  Message{' '}
                  <span className="text-rose-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={!isFormEnabled}
                    placeholder="Write your message here (minimum 10 characters)..."
                    className={`w-full p-4 rounded-xl border ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-400'
                        : 'border-charcoal-300 dark:border-charcoal-700 focus:ring-charcoal-400'
                    } bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white text-sm placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>

                {errors.message && (
                  <p className="text-[11px] font-mono text-rose-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* =====================================
                  SUBMIT BUTTON
              ====================================== */}

              <button
                type="submit"
                disabled={
                  status === 'sending' ||
                  !isFormEnabled
                }
                className="w-full py-3.5 px-6 rounded-xl bg-charcoal-950 dark:bg-white text-white dark:text-charcoal-950 text-sm font-mono font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />

                    <span>
                      Sending Message...
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />

                    <span>
                      Send Message
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};