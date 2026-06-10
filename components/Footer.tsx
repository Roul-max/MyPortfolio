import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-8 dark:border-white/[0.06] dark:bg-[#0A0A0A] sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-mono text-[12px] text-zinc-400 dark:text-[#52525B]">
          © {new Date().getFullYear()} Rohit Kumar. All rights reserved.
        </p>
        <motion.button type="button" onClick={scrollToTop} whileHover={{ y: -2 }} className="flex items-center gap-2 text-[13px] font-semibold text-zinc-500 transition-colors hover:text-violet-600 dark:text-[#A1A1AA] dark:hover:text-violet-400">
          Back to top
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
