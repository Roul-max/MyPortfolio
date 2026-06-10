import React from 'react';
import { motion } from 'framer-motion';

export default function HeroRight() {
  return (
    <div className="relative flex h-full w-full items-center justify-center lg:-mt-16 lg:justify-end">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute right-10 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px] dark:bg-violet-500/20" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xl dark:border-zinc-700/60 dark:bg-zinc-950 dark:shadow-2xl dark:shadow-violet-900/20"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
        {/* Editor Header */}
        <div className="flex items-end gap-3 border-b border-zinc-200 bg-zinc-50/80 px-4 pt-3 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mb-2.5 flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <div className="ml-2 flex rounded-t-lg border-x border-t border-zinc-200 bg-white px-4 py-1.5 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="font-mono text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">developer.ts</span>
          </div>
        </div>

        {/* Editor Content with Line Numbers */}
        <div className="overflow-x-auto p-4 text-[13px] leading-relaxed">
          <div className="grid grid-cols-[auto_1fr] gap-4 font-mono text-[13px] leading-relaxed">
            {/* Line Numbers */}
            <div className="flex select-none flex-col border-r border-zinc-200 pr-4 text-right text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
              {Array.from({ length: 11 }).map((_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            
            {/* Code */}
            <div className="flex flex-col whitespace-nowrap pb-2 text-zinc-600 dark:text-zinc-400">
              <span><span className="text-violet-600 dark:text-violet-400">import</span> {'{'} <span className="text-zinc-800 dark:text-zinc-200">passion</span>, <span className="text-zinc-800 dark:text-zinc-200">precision</span> {'}'} <span className="text-violet-600 dark:text-violet-400">from</span> <span className="font-medium text-zinc-900 dark:text-zinc-50">'@rohit/mindset'</span>;</span>
              <span>&nbsp;</span>
              <span><span className="text-violet-600 dark:text-violet-400">const</span> <span className="text-zinc-800 dark:text-zinc-200">developer</span> = {'{'}</span>
              <span className="pl-4"><span className="text-zinc-500 dark:text-zinc-400">name:</span> <span className="font-medium text-zinc-900 dark:text-zinc-50">'Rohit Kumar'</span>,</span>
              <span className="pl-4"><span className="text-zinc-500 dark:text-zinc-400">role:</span> <span className="font-medium text-zinc-900 dark:text-zinc-50">'Full Stack Developer'</span>,</span>
              <span className="pl-4"><span className="text-zinc-500 dark:text-zinc-400">skills:</span> [<span className="font-medium text-zinc-900 dark:text-zinc-50">'React'</span>, <span className="font-medium text-zinc-900 dark:text-zinc-50">'Next.js'</span>, <span className="font-medium text-zinc-900 dark:text-zinc-50">'TypeScript'</span>],</span>
              <span className="pl-4"><span className="text-zinc-500 dark:text-zinc-400">location:</span> <span className="font-medium text-zinc-900 dark:text-zinc-50">'Noida, India'</span>,</span>
              <span className="pl-4"><span className="text-zinc-500 dark:text-zinc-400">isHireable:</span> <span className="text-violet-600 dark:text-violet-400">true</span></span>
              <span>{'}'};</span>
              <span>&nbsp;</span>
              <span><span className="text-violet-600 dark:text-violet-400">export default</span> <span className="text-zinc-800 dark:text-zinc-200">developer</span>;<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="ml-0.5 inline-block h-3.5 w-1.5 align-middle bg-violet-500" /></span>
            </div>
          </div>
        </div>

        {/* Editor Footer / Info Bar */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-100/50 px-4 py-2 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> No errors</span>
            <span className="hidden sm:inline-block">UTF-8</span>
          </div>
          <div>TypeScript React</div>
        </div>
      </motion.div>
    </div>
  );
}
