import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

const axes = [
  { label: 'Frontend', value: 90 },
  { label: 'Backend', value: 70 },
  { label: 'DevOps', value: 55 },
  { label: 'Tools', value: 80 },
  { label: 'Learning', value: 88 },
];

const center = 140;
const point = (index: number, radius: number): [number, number] => {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
  return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius];
};

const polygon = (radius: number): string => axes.map((_, index) => point(index, radius).join(',')).join(' ');

const deviconMap: Record<string, string> = {
  'React.js': 'react/react-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  HTML5: 'html5/html5-original.svg',
  CSS3: 'css3/css3-original.svg',
  'Next.js': 'nextjs/nextjs-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  'Framer Motion': 'framermotion/framermotion-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  PostgreSQL: 'postgresql/postgresql-original.svg',
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  'VS Code': 'vscode/vscode-original.svg',
  Figma: 'figma/figma-original.svg',
  Postman: 'postman/postman-original.svg',
  Vercel: 'vercel/vercel-original.svg',
  Netlify: 'netlify/netlify-original.svg',
  Express: 'express/express-original.svg',
  Kubernetes: 'kubernetes/kubernetes-plain.svg',
  'AWS Lambda': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  GraphQL: 'graphql/graphql-plain.svg',
  'Three.js': 'threejs/threejs-original.svg',
  Docker: 'docker/docker-original.svg',
};

const invertInDark = new Set(['Next.js', 'Express', 'GitHub', 'Vercel', 'Three.js']);

const SkillLogo: React.FC<{ name: string; icon?: string }> = ({ name, icon }) => {
  const professionalIcons: Record<string, React.ReactNode> = {
    'Fast Learner': <><path d="M12 3 4 7l8 4 8-4-8-4Z" /><path d="M4 11l8 4 8-4" /><path d="M8 13.5V18c1.1.7 2.5 1 4 1s2.9-.3 4-1v-4.5" /></>,
    'Problem Solving': <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8.4 14.7a6 6 0 1 1 7.2 0c-.7.5-1.1 1.3-1.1 2.1v.2h-5v-.2c0-.8-.4-1.6-1.1-2.1Z" /></>,
    Teamwork: <><path d="M16 11a4 4 0 1 0-8 0" /><path d="M3 21a7 7 0 0 1 18 0" /><path d="M17.5 7.5a3 3 0 0 1 3 3" /><path d="M3.5 10.5a3 3 0 0 1 3-3" /></>,
    'Clear Communication': <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 9h8" /><path d="M8 13h5" /></>,
  };

  if (professionalIcons[name]) {
    return (
      <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {professionalIcons[name]}
      </svg>
    );
  }

  if (icon) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}`}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-4 w-4 shrink-0 ${invertInDark.has(name) ? 'dark:invert' : ''}`}
      />
    );
  }

  if (name === 'REST APIs') {
    return (
      <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 7H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h3" />
        <path d="M16 7h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3" />
        <path d="M9 12h6" />
        <path d="m11 9-3 3 3 3" />
        <path d="m13 9 3 3-3 3" />
      </svg>
    );
  }

  return <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500" />;
};

const RadarChart: React.FC = () => {
  const dataPoints = axes.map((axis, index) => point(index, axis.value).join(',')).join(' ');

  return (
    <div className="relative mx-auto mb-10 hidden h-[260px] w-[260px] md:block lg:h-[280px] lg:w-[280px]">
      <svg viewBox="0 0 280 280" className="relative h-full w-full overflow-visible">
        <defs>
          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        {[25, 50, 75, 100].map((percent) => (
          <polygon key={percent} points={polygon(percent)} fill="none" stroke="#94a3b8" strokeOpacity="0.3" />
        ))}
        {axes.map((axis, index) => {
          const [x, y] = point(index, 100);
          const [lx, ly] = point(index, 122);
          return (
            <g key={axis.label}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#94a3b8" strokeOpacity="0.3" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#71717a" className="font-mono text-[10px]">{axis.label}</text>
            </g>
          );
        })}
        <circle cx={center} cy={center} r="20" fill="rgba(124,58,237,0.2)" filter="url(#centerGlow)" />
        <motion.polygon
          points={dataPoints}
          fill="rgba(124,58,237,0.15)"
          stroke="#7C3AED"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: 'center' }}
        />
        {axes.map((axis, index) => {
          const [x, y] = point(index, axis.value);
          return (
            <motion.circle
              key={axis.label}
              cx={x}
              cy={y}
              r="5"
              fill="#7C3AED"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const currentlyLearning = ['Kubernetes', 'AWS Lambda', 'GraphQL', 'Three.js', 'Docker'];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(() => ['All', ...skills.map((group) => group.category)], []);
  const visibleSkills = skills.filter((group) => activeCategory === 'All' || group.category === activeCategory);

  return (
    <section id="skills" className="scroll-mt-navbar relative border-b border-zinc-200 bg-slate-50 px-4 py-20 dark:border-white/[0.04] dark:bg-[#0A0A0A] sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">03</div>
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-4">
          <RadarChart />
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED]">Technical Arsenal</span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-zinc-900 dark:text-white">
            My <span className="text-gradient">Tech Stack.</span>
          </h2>
          <p className="mt-6 text-[15px] font-normal leading-[1.75] text-zinc-500 dark:text-[#71717A]">
            As a fresher, I focus on building a strong foundation in modern web technologies and expanding it through hands-on projects.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${activeCategory === category ? 'border-[#7C3AED] bg-[#7C3AED] text-white' : 'border-zinc-200 text-zinc-500 hover:border-violet-300 hover:text-violet-700 dark:border-white/[0.08] dark:text-[#71717A]'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12 lg:col-span-8">
          {visibleSkills.map((group) => (
            <motion.div key={group.category} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={{ show: { transition: { staggerChildren: 0.03 } } }}>
              <h3 className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-[#52525B]">
                {group.category}<span className="h-px flex-1 bg-zinc-200 dark:bg-white/[0.06]" />
              </h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,minmax(145px,1fr))]">
                {group.items.map((skill) => {
                  const icon = deviconMap[skill.name];
                  return (
                    <motion.span
                      key={skill.name}
                      variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                      whileHover={{ y: -2 }}
                      data-cursor="hover"
                      className="inline-flex min-w-0 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-3.5 py-2 text-[13px] font-medium text-zinc-700 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-violet-500/30 hover:bg-violet-50 hover:text-violet-700 dark:border-white/[0.07] dark:bg-[#161616] dark:text-[#D4D4D8] dark:shadow-none dark:hover:bg-[rgba(124,58,237,0.05)] dark:hover:text-white"
                    >
                      <SkillLogo name={skill.name} icon={icon} />
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-white/[0.06]">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C3AED] dark:text-[#A855F7]">Currently Learning</p>
            <div className="flex flex-wrap gap-3">
              {currentlyLearning.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-[10px] border border-dashed border-violet-300 bg-violet-50 px-3.5 py-2 text-[13px] font-medium text-[#7C3AED] dark:border-[rgba(168,85,247,0.32)] dark:bg-[rgba(124,58,237,0.06)] dark:text-[#A855F7]">
                  <SkillLogo name={item} icon={deviconMap[item]} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
