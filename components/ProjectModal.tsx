import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from '../data/portfolioData';

interface ModalApi {
  selectedProject: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

export const useModal = (): ModalApi => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return {
    selectedProject,
    openModal: setSelectedProject,
    closeModal: () => setSelectedProject(null),
  };
};

export const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-2xl sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 18 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto mt-[3vh] max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#111111] sm:mt-[5vh] sm:rounded-3xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl sm:aspect-[16/7] sm:rounded-t-3xl">
              <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                data-cursor="hover"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.15]"
              >
                x
              </button>
            </div>
            <div className="p-5 sm:p-8">
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-[#A855F7]">{project.filterCategory}</span>
              <h3 id="project-modal-title" className="font-display text-[28px] font-extrabold text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <p className="max-w-3xl text-[15px] leading-[1.75] text-zinc-600 dark:text-[#A1A1AA]">{project.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-[10px] text-zinc-600 dark:bg-white/[0.06] dark:text-[#A1A1AA]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ['Problem', project.problem],
                  ['Solution', project.solution],
                  ['Architecture', 'React frontend, API layer, backend services, and database-driven persistence.'],
                  ['Impact', project.impact],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7C3AED]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-[#A1A1AA]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#0A0A0A]">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">System Architecture</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-4">
                  {['Frontend', 'API Layer', 'Backend', 'Database'].map((layer, index) => (
                    <div key={layer} className="relative rounded-xl bg-violet-50 px-3 py-3 text-center text-sm font-bold text-violet-700 dark:bg-violet-950/30 dark:text-violet-300">
                      {layer}
                      {index < 3 && <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-zinc-400 sm:block">/</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="rounded-xl bg-[#7C3AED] px-7 py-3.5 text-center text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_8px_24px_rgba(124,58,237,0.15)] transition-all hover:bg-[#6D28D9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-white">
                  Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="rounded-xl border border-zinc-300 bg-transparent px-7 py-3.5 text-center text-[15px] font-semibold tracking-[-0.01em] text-zinc-500 transition-colors hover:border-zinc-400 hover:bg-zinc-900/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/[0.1] dark:text-[#A1A1AA] dark:hover:border-white/[0.18] dark:hover:bg-white/[0.04]">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
