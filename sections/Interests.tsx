import React from 'react';
import { interests } from '../data/portfolioData';

const iconPaths: Record<string, React.ReactNode> = {
  Photography: (
    <>
      <path d="M7 7h2l1.2-2h3.6L15 7h2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  Travel: (
    <>
      <path d="M4 16 20 8" />
      <path d="m9 14 2 6 2-8 6-3-8 1-5-4 2 7Z" />
    </>
  ),
  'Open Source': (
    <>
      <path d="M7 8a5 5 0 0 1 10 0c0 3.8-5 9-5 9S7 11.8 7 8Z" />
      <path d="M9 20h6" />
    </>
  ),
  Gaming: (
    <>
      <path d="M8 10h8a4 4 0 0 1 3.8 5.3l-.5 1.5a2 2 0 0 1-3.3.8L14 15h-4l-2 2.6a2 2 0 0 1-3.3-.8l-.5-1.5A4 4 0 0 1 8 10Z" />
      <path d="M8 13h4M10 11v4M16 13h.01" />
    </>
  ),
  Music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="16" r="2" />
    </>
  ),
  Design: (
    <>
      <path d="M12 3 4 8l8 5 8-5-8-5Z" />
      <path d="m4 13 8 5 8-5" />
      <path d="m4 17 8 5 8-5" />
    </>
  ),
  Coffee: (
    <>
      <path d="M5 8h12v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
      <path d="M17 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M8 4v2M12 4v2M16 4v2" />
    </>
  ),
  'Building things': (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-4 6 4v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M10 10h4" />
    </>
  ),
};

const InterestIcon: React.FC<{ name: string }> = ({ name }) => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {iconPaths[name] ?? <circle cx="12" cy="12" r="7" />}
  </svg>
);

const Chip: React.FC<{ name: string }> = ({ name }) => (
  <span className="mx-2 inline-flex min-w-fit cursor-default items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-[18px] py-2.5 text-[14px] font-medium text-zinc-600 transition-all hover:border-violet-500/30 hover:bg-violet-50 hover:text-violet-700 dark:border-white/[0.07] dark:bg-[#161616] dark:text-[#A1A1AA] dark:hover:bg-[rgba(124,58,237,0.06)] dark:hover:text-white md:px-6 md:py-3 md:text-[15px]">
    <InterestIcon name={name} />
    {name}
  </span>
);

const Interests: React.FC = () => {
  const rowOne = interests.slice(0, 4);
  const rowTwo = interests.slice(4);

  return (
    <section id="interests" className="scroll-mt-navbar relative overflow-hidden border-b border-zinc-200 bg-white px-4 py-20 dark:border-white/[0.04] dark:bg-[#111111] sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">06</div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[clamp(32px,6vw,40px)] font-extrabold tracking-[-0.02em] text-zinc-900 dark:text-white">Beyond the Code.</h2>
          <p className="mt-3 text-[15px] text-zinc-400 dark:text-[#52525B]">What keeps me grounded outside work</p>
        </div>

        <div className="marquee-mask space-y-4 overflow-hidden">
          <div className="marquee-row flex w-max animate-scroll-left whitespace-nowrap">
            {[...rowOne, ...rowOne, ...rowOne, ...rowOne].map((item, index) => <Chip key={`${item.name}-${index}`} name={item.name} />)}
          </div>
          <div className="marquee-row flex w-max animate-scroll-right whitespace-nowrap">
            {[...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo].map((item, index) => <Chip key={`${item.name}-${index}`} name={item.name} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
