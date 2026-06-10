import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 800; // 0.8 seconds total loading time
    const interval = 10; // update every 10ms for smoothness
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 100); // Ultra-brief pause at 100% before completing
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100001] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0A0A0A]"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.6, ease: [0.85, 0, 0.15, 1] } // Snappier curtain reveal
      }}
    >
      {/* Subtle Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.08),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-2xl border border-[#7C3AED]"
              animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 font-display text-2xl font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:bg-white dark:text-black dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]">
              RK
            </span>
          </div>
        </motion.div>

        {/* Percentage & Text Container */}
        <div className="flex flex-col items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-display text-6xl font-black tracking-tighter text-zinc-900 dark:text-white sm:text-7xl">
              {progress}%
            </span>
            
            {/* Dynamic Status Text */}
            <div className="mt-2 h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={progress === 100 ? 'done' : 'loading'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED]"
                >
                  {progress === 100 ? "Recruiter view ready" : "Preparing recruiter view..."}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10 sm:w-64"
        >
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-violet-600 to-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-transparent to-white opacity-50 blur-[1px]" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroLoader;
