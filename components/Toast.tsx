import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastItem } from '../hooks/useToast';

interface ToastProps {
  toasts: ToastItem[];
  onDismiss?: (id: number) => void;
}

const variantClasses: Record<ToastItem['variant'], string> = {
  success: 'border-l-4 border-emerald-500',
  error: 'border-l-4 border-red-500',
  info: 'border-l-4 border-violet-500',
};

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => (
  <div className="fixed bottom-6 right-6 z-[100000] flex w-[min(360px,calc(100vw-32px))] flex-col gap-3">
    <AnimatePresence initial={false}>
      {toasts.map((toast) => (
        <motion.button
          key={toast.id}
          type="button"
          onClick={() => onDismiss?.(toast.id)}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          className={`rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left text-sm font-medium text-zinc-800 shadow-lg backdrop-blur-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/[0.1] dark:bg-[#161616] dark:text-white ${variantClasses[toast.variant]}`}
        >
          {toast.message}
        </motion.button>
      ))}
    </AnimatePresence>
  </div>
);
