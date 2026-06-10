import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  suffix?: string;
}

interface CountUpResult {
  ref: React.RefObject<HTMLDivElement>;
  value: string;
}

const easeOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 3);

export const useCountUp = (
  end: number,
  duration = 1500,
  start = 0,
  options: CountUpOptions = {}
): CountUpResult => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(start);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const next = start + (end - start) * easeOutCubic(elapsed);
      setCount(Math.round(next));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, end, start, started]);

  return { ref, value: `${count}${options.suffix ?? ''}` };
};
