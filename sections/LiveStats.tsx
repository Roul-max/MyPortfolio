import React from 'react';
import { motion } from 'framer-motion';
import { projects, skills } from '../data/portfolioData';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { label: 'Projects Built', value: projects.length, suffix: '+' },
  { label: 'Technologies Learned', value: skills.reduce((total, group) => total + group.items.length, 0), suffix: '+' },
  { label: 'Coding Hours', value: 1200, suffix: '+' },
  { label: 'Years Learning', value: 4, suffix: '+' },
  { label: 'API / Backend Features', value: 12, suffix: '+' },
];

const Counter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const count = useCountUp(value, 1400, 0);
  return (
    <div ref={count.ref} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:border-white/[0.07] dark:bg-[#111111]">
      <p className="font-display text-4xl font-black text-zinc-900 dark:text-white">{count.value}<span className="text-[#7C3AED]">{suffix}</span></p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 dark:text-[#52525B]">{label}</p>
    </div>
  );
};

const LiveStats: React.FC = () => (
  <section id="stats" className="scroll-mt-navbar border-b border-zinc-200 bg-white px-4 py-20 dark:border-white/[0.04] dark:bg-[#111111] sm:px-6 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED]">Recruiter Snapshot</span>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] text-zinc-900 dark:text-white">Proof in numbers.</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => <Counter key={stat.label} {...stat} />)}
      </div>
    </div>
  </section>
);

export default LiveStats;
