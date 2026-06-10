import React from 'react';
import { motion } from 'framer-motion';
import { certifications, education, experience, ExperienceItem } from '../data/portfolioData';

const ExperienceIcon: React.FC<{ name: 'work' | 'education' | 'certificate' | 'calendar' | 'check' }> = ({ name }) => {
  const paths = {
    work: <><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M4 7h16v14H4z" /><path d="M4 12h16" /></>,
    education: <><path d="m3 8 9-5 9 5-9 5-9-5Z" /><path d="M7 11v5c2.8 2 7.2 2 10 0v-5" /></>,
    certificate: <><circle cx="12" cy="8" r="4" /><path d="m9 12-1 9 4-2 4 2-1-9" /></>,
    calendar: <><path d="M5 5h14v15H5z" /><path d="M8 3v4M16 3v4M5 10h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  } satisfies Record<string, React.ReactNode>;

  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const TimelineNode: React.FC<{ active?: boolean }> = ({ active }) => (
  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="absolute left-[10px] top-8 z-10 -translate-x-1/2">
    <div className="relative grid h-5 w-5 place-items-center rounded-full border-2 border-violet-500 bg-zinc-50 shadow-lg shadow-violet-500/40 dark:bg-zinc-950">
      {active && <span className="absolute inset-0 block h-full w-full animate-ping rounded-full bg-violet-500 opacity-40" />}
      <motion.span initial={{ scale: 0 }} whileInView={{ scale: [0, 1, 1.3, 1] }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, times: [0, 0.35, 0.7, 1] }} className="relative h-2 w-2 rounded-full bg-violet-500" />
    </div>
  </motion.div>
);

const ExperienceCard: React.FC<{ item: ExperienceItem; active?: boolean }> = ({ item, active }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="relative ml-12 md:ml-14">
      <TimelineNode active={active} />
      <div className="group relative rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-violet-500/30 dark:hover:bg-zinc-900 md:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent transition-colors group-hover:via-violet-500/50" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white text-zinc-600 shadow-sm transition-colors group-hover:border-violet-200 group-hover:from-violet-50 group-hover:to-white group-hover:text-violet-700 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-300 dark:group-hover:border-violet-500/30 dark:group-hover:from-violet-500/20 dark:group-hover:to-violet-900/20 dark:group-hover:text-violet-300">
              <ExperienceIcon name="work" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">{item.role}</h3>
              <p className="text-sm font-semibold text-zinc-600 transition-colors group-hover:text-violet-600 dark:text-zinc-400 dark:group-hover:text-violet-400">{item.company}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-[10px] font-semibold text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"><ExperienceIcon name="calendar" />{item.period}</span>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.highlights.map((highlight) => (
            <span key={highlight} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-zinc-600 transition-colors group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:border-violet-500/30 dark:group-hover:bg-violet-500/10 dark:group-hover:text-violet-300"><ExperienceIcon name="check" />{highlight}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="scroll-mt-navbar relative overflow-hidden border-b border-zinc-200 bg-zinc-50 px-4 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-5 dark:text-zinc-50 md:block">05</div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400">My Journey</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
            Experience & <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent dark:from-violet-400 dark:to-violet-600">Education.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Practical internships, project-focused learning, and certification work aligned around full-stack development.
          </p>
        </div>

        <div className="relative space-y-10">
          <div className="absolute bottom-0 left-5 top-0 w-[2px] bg-gradient-to-b from-violet-500 to-transparent dark:from-violet-500/50" />
          {experience.map((item, index) => <ExperienceCard key={`${item.company}-${item.period}`} item={item} active={index === 0} />)}

          <div className="ml-12 pt-6 font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 md:ml-14">Education</div>
          {education.map((item) => (
            <motion.div key={item.degree} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} className="relative ml-12 md:ml-14">
              <TimelineNode />
              <div className="group relative rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-violet-500/30 dark:hover:bg-zinc-900 md:p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent transition-colors group-hover:via-violet-500/50" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white text-zinc-600 shadow-sm transition-colors group-hover:border-violet-200 group-hover:from-violet-50 group-hover:to-white group-hover:text-violet-700 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-300 dark:group-hover:border-violet-500/30 dark:group-hover:from-violet-500/20 dark:group-hover:to-violet-900/20 dark:group-hover:text-violet-300">
                      <ExperienceIcon name="education" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">{item.degree}</h3>
                      <span className="mt-2 inline-flex rounded-full bg-violet-100 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">{item.specialization}</span>
                      {item.institution && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{item.institution}</p>}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-[10px] font-semibold text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"><ExperienceIcon name="calendar" />{item.period}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-zinc-600 transition-colors group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:border-violet-500/30 dark:group-hover:bg-violet-500/10 dark:group-hover:text-violet-300"><ExperienceIcon name="check" />{highlight}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Certifications</div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
            {certifications.map((cert) => (
              <motion.div key={cert.name} whileHover={{ y: -2 }} className="group flex min-w-[260px] items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-violet-500/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-500/30">
                <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-600 text-white shadow-inner dark:bg-violet-500">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                  <ExperienceIcon name="certificate" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 transition-colors group-hover:text-violet-600 dark:text-zinc-50 dark:group-hover:text-violet-400">{cert.name}</h4>
                  <p className="font-mono text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
                  <div className="mt-1.5 inline-flex items-center rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">Class of {cert.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
