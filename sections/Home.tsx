import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socials } from '../data/portfolioData';
import { SocialIcon } from '../components/icons';
import HeroRight from '../components/HeroRight';

const roles = ['Full Stack Developer', 'React Engineer', 'Node.js Builder', 'Product-minded Developer'];

const Home: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="scroll-mt-navbar theme-section relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b px-4 pb-16 pt-24 sm:px-6 lg:min-h-screen lg:px-8 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.violet.500/15%),transparent_30%),radial-gradient(circle_at_80%_10%,theme(colors.violet.500/10%),transparent_28%),radial-gradient(circle_at_70%_80%,theme(colors.violet.600/15%),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,theme(colors.violet.500/20%),transparent_30%),radial-gradient(circle_at_80%_10%,theme(colors.violet.500/15%),transparent_28%),radial-gradient(circle_at_70%_80%,theme(colors.violet.600/20%),transparent_30%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      {[0, 1, 2, 3, 4].map((item) => (
        <span key={item} className="pointer-events-none absolute hidden h-1.5 w-1.5 animate-float rounded-full bg-violet-400/50 md:block" style={{ left: `${16 + item * 17}%`, top: `${22 + (item % 3) * 19}%`, animationDelay: `${item * 0.45}s` }} />
      ))}
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[160px] font-black text-zinc-900 opacity-[0.022] dark:text-white md:block">01</div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 text-center lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] lg:gap-10 lg:text-left xl:gap-16">
        <div className="min-w-0">
          <div className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 sm:px-4 sm:text-[11px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Available for new projects
          </div>

          <h1 className="font-display text-5xl font-black leading-tight tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block text-zinc-900 dark:text-zinc-50">Building</span>
            <span className="block text-zinc-900 dark:text-zinc-50">things</span>
            <span className="block bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent dark:from-violet-400 dark:to-violet-600">that matter.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-full break-words font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-white/30 sm:text-[11px]">
            <span className="text-violet-600 dark:text-violet-400">{roles[roleIndex]}</span> / React / Node.js / TypeScript
          </p>

          <p className="mx-auto mt-6 max-w-[620px] font-body text-[15px] font-normal leading-[1.75] text-zinc-600 dark:text-zinc-400 sm:text-[15.5px]">
            Crafting high-performance web applications and immersive digital experiences with React, Node.js, and TypeScript. Based in Noida, India, available for full-time roles and project work.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 min-[420px]:flex-row min-[420px]:flex-wrap lg:justify-start">
            <motion.a whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} href="#projects" data-cursor="hover" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-sm shadow-violet-500/5 transition-all hover:bg-violet-700 hover:shadow hover:shadow-violet-500/10 sm:shadow-lg sm:shadow-violet-500/25 sm:hover:shadow-xl sm:hover:shadow-violet-500/35 dark:bg-violet-500 dark:hover:bg-violet-600">
              View My Work
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href="/Resume.pdf" download data-cursor="hover" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-transparent px-6 py-3 text-[14.5px] font-semibold tracking-[-0.01em] text-zinc-600 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-violet-400 dark:hover:bg-violet-500/10">
              Download CV
            </motion.a>
          </div>

          <div className="mt-8 flex justify-center gap-2 lg:justify-start">
            {socials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} data-cursor="hover" className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-zinc-400 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-600 dark:border-zinc-700 dark:text-zinc-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400">
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden w-full lg:block">
          <HeroRight />
        </div>
      </div>
    </section>
  );
};

export default Home;
