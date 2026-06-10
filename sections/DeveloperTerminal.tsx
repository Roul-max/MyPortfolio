import React, { useMemo, useState } from 'react';
import { projects, skills, socials } from '../data/portfolioData';

const DeveloperTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>(['Type help to list commands.']);

  const commandMap = useMemo<Record<string, string>>(() => ({
    help: 'Commands: whoami, skills, projects, experience, contact, resume, github, clear',
    whoami: 'Rohit Kumar - Full Stack Developer based in Noida, India.',
    skills: skills.map((group) => `${group.category}: ${group.items.map((item) => item.name).join(', ')}`).join('\n'),
    projects: projects.map((project) => `${project.title} - ${project.impact}`).join('\n'),
    experience: 'Full Stack Intern at Croma Campus Pvt. Ltd. Frontend Developer at AICTE.',
    contact: 'Email: rohitkumarrrx@gmail.com',
    resume: 'Resume available at /Resume.pdf',
    github: socials.find((social) => social.icon === 'github')?.href ?? 'GitHub link available in the navbar.',
  }), []);

  const runCommand = (): void => {
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') {
      setLines([]);
      setInput('');
      return;
    }
    setLines((current) => [...current, `> ${command}`, commandMap[command] ?? `Unknown command: ${command}`]);
    setInput('');
  };

  return (
    <section id="terminal" className="scroll-mt-navbar border-b border-zinc-200 bg-white px-4 py-20 dark:border-white/[0.04] dark:bg-[#111111] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED]">Interactive Terminal</span>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,54px)] font-extrabold tracking-[-0.02em] text-zinc-900 dark:text-white">Recruiter CLI.</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-[#09090B] shadow-2xl dark:border-white/[0.08]">
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-[11px] text-zinc-500">rohit-portfolio</span>
          </div>
          <div className="min-h-[280px] whitespace-pre-wrap p-5 font-mono text-[13px] leading-7 text-zinc-200">
            {lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[#A855F7]">&gt;</span>
              <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && runCommand()} aria-label="Terminal command" className="flex-1 bg-transparent text-zinc-100 outline-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperTerminal;
