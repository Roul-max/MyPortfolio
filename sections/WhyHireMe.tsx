import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

const reasons = [
  { title: 'Full Stack Development', metric: 'React + Node', proof: 'Builds complete product flows from interface to API and database.' },
  { title: 'Problem Solving', metric: `${projects.length}+ projects`, proof: 'Turns unclear requirements into shipped, usable web experiences.' },
  { title: 'AI Integration', metric: 'OpenAI APIs', proof: 'Experiments with AI-powered workflows like speech and automation tools.' },
  { title: 'Scalable Architecture', metric: 'RBAC + REST', proof: 'Understands authentication, role management, API boundaries, and modular structure.' },
  { title: 'Fast Learning', metric: 'Modern stack', proof: 'Adapts quickly across React, TypeScript, backend services, and product tooling.' },
  { title: 'Modern UI/UX', metric: 'Premium UI', proof: 'Designs responsive interfaces with motion, hierarchy, and recruiter-friendly clarity.' },
];

const WhyHireMe: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <section id="why-hire-me" className="scroll-mt-navbar theme-section relative overflow-hidden border-b px-4 py-20 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(124,58,237,0.14),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(16,185,129,0.10),transparent_30%)]" />
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[160px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">07</div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]">Recruiter wow factor</span>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-zinc-900 dark:text-white">
            Why <span className="text-gradient">Hire Me.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-zinc-500 dark:text-zinc-400">
            A fast scan of the strengths that matter for product teams: execution, clarity, architecture, and polished user experience.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              className={`card-spotlight theme-card group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/25 hover:shadow-[0_24px_70px_rgba(124,58,237,0.12)] ${index >= visibleCount ? 'hidden md:block' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 font-mono text-xs font-black text-violet-700 transition-transform group-hover:scale-105 dark:bg-violet-500/15 dark:text-violet-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {reason.metric}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-black text-zinc-900 dark:text-white">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{reason.proof}</p>
            </motion.article>
          ))}
        </div>

        {visibleCount < reasons.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-white/[0.08] dark:bg-[#111111] dark:text-white dark:hover:bg-white/[0.06]"
            >
              Show more strengths
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhyHireMe;
