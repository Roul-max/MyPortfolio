import React from 'react';
import { socials } from '../data/portfolioData';
import { SocialIcon } from './icons';

const DockIcon: React.FC<{ name: 'resume' | 'email' | 'contact' }> = ({ name }) => {
  const paths = {
    resume: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h4" /></>,
    email: <><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></>,
    contact: <><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  } satisfies Record<string, React.ReactNode>;

  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const QuickActionDock: React.FC = () => {
  const email = 'mailto:rohitkumarrrx@gmail.com';
  const actionClass = 'group relative grid h-9 w-9 place-items-center rounded-xl text-zinc-500 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-[#A1A1AA] dark:hover:bg-white/[0.08] dark:hover:text-white';
  const tipClass = 'pointer-events-none absolute bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900';

  return (
    <nav aria-label="Quick actions" className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-2xl border border-zinc-200 bg-white/85 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111111]/80 sm:flex">
      <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open resume" title="Resume" className={actionClass}>
        <DockIcon name="resume" />
        <span className={tipClass}>Resume</span>
      </a>
      {socials.slice(0, 2).map((social) => (
        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name} className={actionClass}>
          <SocialIcon name={social.icon} className="h-4 w-4" />
          <span className={tipClass}>{social.name}</span>
        </a>
      ))}
      <a href={email} aria-label="Email Rohit" title="Email" className={actionClass}>
        <DockIcon name="email" />
        <span className={tipClass}>Email</span>
      </a>
      <a href="#contact" aria-label="Go to contact section" title="Contact" className={actionClass}>
        <DockIcon name="contact" />
        <span className={tipClass}>Contact</span>
      </a>
    </nav>
  );
};

export default QuickActionDock;
