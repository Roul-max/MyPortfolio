import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/portfolioData';

interface NavbarProps {
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const lastScroll = useRef(0);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace('#', ''));
    const handleScroll = (): void => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 60);
      setHidden(currentScroll > lastScroll.current && currentScroll > 220);
      lastScroll.current = currentScroll;
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 130 && rect.bottom >= 130;
      });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onThemeChange = (event: Event): void => {
      const custom = event as CustomEvent<{ dark: boolean }>;
      setIsDark(Boolean(custom.detail.dark));
    };
    window.addEventListener('portfolio:theme-change', onThemeChange);
    return () => window.removeEventListener('portfolio:theme-change', onThemeChange);
  }, []);

  const toggleTheme = (): void => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    onToggleTheme();
  };

  const closeSheet = (): void => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed left-1/2 top-4 z-50 w-[calc(100vw-24px)] max-w-5xl -translate-x-1/2 rounded-2xl border border-zinc-200/80 bg-white/90 px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#0A0A0A]/80 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:top-5 md:w-[calc(100vw-40px)] md:rounded-full md:px-4 lg:w-fit ${scrolled ? 'shadow-[0_4px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : ''} ${hidden ? '-translate-y-24 opacity-0' : 'opacity-100'}`}
      >
        <div className="flex items-center justify-end gap-2 md:justify-between md:gap-4">
          <div className="hidden min-w-0 items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const active = activeSection === id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="hover"
                  className={`relative rounded-full px-2.5 py-1.5 font-body text-[13.5px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 lg:px-3 lg:text-[14px] ${active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-[#71717A] dark:hover:text-white'}`}
                >
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-zinc-900/[0.08] dark:bg-white/10" />}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={!isDark}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              data-cursor="hover"
              onClick={toggleTheme}
              className="group grid h-8 w-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-violet-50 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="transition-transform duration-300 group-hover:rotate-45">
                {isDark ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                )}
              </span>
            </button>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-full text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-white md:hidden"
          >
            <span className={`h-0.5 w-5 rounded-full bg-zinc-900 transition-all dark:bg-white ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full bg-zinc-900 transition-all dark:bg-white ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full bg-zinc-900 transition-all dark:bg-white ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSheet}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              id="mobile-navigation"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-zinc-200 bg-white/[0.96] p-5 pb-[calc(env(safe-area-inset-bottom)+24px)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111111]/95 md:hidden"
            >
              {navLinks.map((link) => {
                const active = activeSection === link.href.replace('#', '');
                return (
                  <a key={link.name} href={link.href} onClick={closeSheet} className={`block border-b border-zinc-200 py-3 text-xl font-bold dark:border-white/[0.06] ${active ? 'text-[#A855F7]' : 'text-zinc-700 dark:text-white'}`}>
                    {link.name}
                  </a>
                );
              })}
              <button type="button" onClick={toggleTheme} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-center font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
