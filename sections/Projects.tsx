import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Project, projects } from '../data/portfolioData';
import { ProjectModal, useModal } from '../components/ProjectModal';

type FilterValue = 'all' | 'fullstack' | 'ai' | 'web';

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'AI', value: 'ai' },
  { label: 'Web', value: 'web' },
];

const getProjectStory = (project: Project): { problem: string; solution: string; impact: string } => ({
  problem: project.problem,
  solution: project.solution,
  impact: project.impact,
});

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  recruiterMode: boolean;
  className?: string;
}

const ProjectCard = React.forwardRef<HTMLElement, ProjectCardProps>(({ project, onOpen, recruiterMode, className = '' }, ref) => {
  const story = getProjectStory(project);

  return (
  <motion.article
      layout
      ref={ref}
      data-cursor="hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`project-tilt group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-violet-500/25 hover:shadow-[0_24px_70px_rgba(124,58,237,0.12),0_4px_16px_rgba(0,0,0,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/[0.06] dark:bg-[#111111] dark:shadow-[0_24px_70px_rgba(0,0,0,0.34)] dark:hover:shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(124,58,237,0.1)] ${project.featured ? 'lg:col-span-2' : ''} ${className}`}
    >
    <div className={`relative overflow-hidden ${project.featured ? 'h-[280px] max-md:aspect-[4/3] max-md:h-auto' : 'aspect-[16/10]'}`}>
      <img src={project.image} alt={`${project.title} project preview`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {project.featured && <span className="absolute left-4 top-4 rounded-full bg-[rgba(124,58,237,0.9)] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur dark:text-white">Featured</span>}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-4 left-4 flex translate-y-4 gap-2 transition-transform duration-300 group-hover:translate-y-0">
          <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">Live Demo</a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-bold text-white dark:bg-[#111111] dark:text-white">GitHub</a>
        </div>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {recruiterMode && project.featured && <span className="rounded-md bg-emerald-50 px-2.5 py-1 font-mono text-[10px] text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">Recruiter Pick</span>}
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-md border border-violet-500/15 bg-violet-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-violet-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-violet-300">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 dark:text-[#52525B]">{project.category}</p>
          <h3 className={`${project.featured ? 'mt-1 text-[22px]' : 'mt-1 text-[17px]'} font-display font-bold text-zinc-800 dark:text-[#F4F4F5]`}>{project.title}</h3>
        </div>
        {project.featured && <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">Best proof</span>}
      </div>
      <p className="mt-3 line-clamp-3 text-[13px] leading-[1.6] text-zinc-500 dark:text-[#71717A]">{project.description}</p>
      <div className="mt-5 grid gap-2">
        {([
          ['Problem', story.problem],
          ['Solution', story.solution],
          ['Impact', story.impact],
        ] as const).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7C3AED]">{label}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-zinc-100 pt-5 dark:border-white/[0.06]">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-700 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/[0.08] dark:text-white dark:hover:bg-white/[0.06]"
        >
          View case study
        </button>
      </div>
    </div>
    </motion.article>
  );
});
ProjectCard.displayName = 'ProjectCard';

interface ProjectsProps {
  recruiterMode?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ recruiterMode = false }) => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const modal = useModal();

  const filteredProjects = useMemo(
    () => projects
      .filter((project) => activeFilter === 'all' || project.filterCategory === activeFilter)
      .filter((project) => `${project.title} ${project.description} ${project.tech.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(Boolean(b.featured) && recruiterMode) - Number(Boolean(a.featured) && recruiterMode)),
    [activeFilter, query, recruiterMode]
  );

  useEffect(() => {
    setVisibleCount(3);
  }, [activeFilter, query]);

  return (
    <section id="projects" className="scroll-mt-navbar relative border-b border-zinc-200 bg-white px-4 py-20 dark:border-white/[0.04] dark:bg-[#111111] sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">04</div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-wider text-[#7C3AED]">Selected Work</span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-zinc-900 dark:text-white">
            Recruiter-ready <span className="text-gradient">Projects.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-zinc-500 dark:text-[#71717A]">
            Each project is framed by the problem solved, implementation approach, and practical engineering outcome.
          </p>
        </div>

        <div className="mb-10 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tech, impact..."
            className="min-h-[44px] rounded-2xl border border-zinc-200 bg-white px-4 text-[14px] text-zinc-900 outline-none transition-colors focus:border-violet-500 dark:border-white/[0.08] dark:bg-[#161616] dark:text-white"
          />
          <div className="flex w-full gap-1 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-white/[0.08] dark:bg-[#161616] sm:inline-flex sm:w-auto sm:rounded-full">
            {filters.map((filter) => {
              const active = activeFilter === filter.value;
              const count = filter.value === 'all' ? projects.length : projects.filter((project) => project.filterCategory === filter.value).length;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`relative shrink-0 rounded-full px-4 py-1.5 font-mono text-[12px] font-medium transition-colors ${active ? 'text-white dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-[#71717A] dark:hover:text-white'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500`}
                >
                  {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-[#7C3AED]" />}
                  <span className="relative z-10">{filter.label}{filter.value === 'all' && <span className="ml-1 rounded-full bg-zinc-900/10 px-1.5 text-[10px] dark:bg-white/10">{count}</span>}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} onOpen={modal.openModal} recruiterMode={recruiterMode} className={index >= visibleCount ? 'hidden md:flex' : ''} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filteredProjects.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-white/[0.08] dark:bg-[#111111] dark:text-white dark:hover:bg-white/[0.06]"
            >
              See more projects
            </button>
          </motion.div>
        )}
      </div>
      <ProjectModal project={modal.selectedProject} onClose={modal.closeModal} />
    </section>
  );
};

export default Projects;
