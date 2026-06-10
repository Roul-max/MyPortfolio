import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useCountUp } from '../hooks/useCountUp';

const Stat: React.FC<{ end: number; label: string }> = ({ end, label }) => {
  const count = useCountUp(end, 1500, 0);
  return (
    <div ref={count.ref}>
      <div className="font-display text-[52px] font-black leading-none text-zinc-900 dark:text-white">
        {count.value}<span className="text-[#7C3AED]">+</span>
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-[#52525B]">{label}</div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-navbar relative overflow-hidden border-b border-zinc-200 bg-white px-4 py-20 dark:border-white/[0.04] dark:bg-[#111111] sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">02</div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} className="flex justify-center lg:col-span-5">
          <motion.div
            whileHover={{ scale: 1.02, filter: 'drop-shadow(0 0 58px rgba(124,58,237,0.32))' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative aspect-square w-full max-w-[300px] rounded-2xl before:absolute before:inset-[-1px] before:-z-10 before:rounded-[17px] before:bg-[linear-gradient(135deg,rgba(124,58,237,0.5),rgba(168,85,247,0.2),transparent)] lg:max-w-[380px] lg:rounded-3xl lg:before:rounded-[25px]"
            style={{ filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.2))' }}
          >
            <img
              src="/profile.jpeg"
              alt="Portrait of Rohit Kumar"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-3xl object-cover object-[center_top]"
            />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} viewport={{ once: true, margin: '-60px' }} className="lg:col-span-7">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED]">
            <span className="h-px w-5 bg-[#7C3AED]" />
            The Human Behind the Code
          </span>

          <div className="mb-10 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-8 md:gap-10">
            <Stat end={projects.length} label="Projects Built" />
            <span className="hidden h-12 w-px bg-zinc-200 sm:block dark:bg-white/[0.08]" />
            <Stat end={2} label="Internships" />
            <span className="hidden h-12 w-px bg-zinc-200 sm:block dark:bg-white/[0.08]" />
            <Stat end={12} label="Technologies" />
          </div>

          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-zinc-900 dark:text-white">
            Crafting experiences that <span className="text-gradient">leave a mark.</span>
          </h2>

          <div className="mt-8 space-y-6 text-[15px] leading-[1.75] text-zinc-500 dark:text-[#71717A]">
            <p>
              My journey in tech is fueled by curiosity for the space between design and engineering. I build web applications that are fast, useful, and considered down to the last interaction.
            </p>
            <blockquote className="border-l-2 border-[#7C3AED] pl-5 font-display text-[18px] font-medium italic text-zinc-600 dark:text-white/60">
              I do not just write code. I engineer experiences.
            </blockquote>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              { title: 'Philosophy', text: 'Minimum bloat, maximum performance. I believe the best interfaces feel simple because the engineering underneath is disciplined.' },
              { title: 'Mission', text: 'To help teams turn ambitious ideas into accessible, durable, and future-ready software.' },
            ].map((card) => (
              <motion.div key={card.title} whileHover={{ y: -2 }} className="border-gradient-top relative rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-violet-500/25 hover:shadow-[0_4px_20px_rgba(124,58,237,0.06)] dark:border-white/[0.07] dark:bg-[#161616]">
                <h4 className="font-display text-[17px] font-bold text-zinc-800 dark:text-[#F4F4F5]">{card.title}</h4>
                <p className="mt-3 text-[14px] leading-[1.7] text-zinc-500 dark:text-[#71717A]">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
