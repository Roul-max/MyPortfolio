import { useEffect, useRef } from 'react';

type ConfettiGlobal = {
  confetti?: (options?: Record<string, unknown>) => void;
};

const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const loadConfetti = (): Promise<void> => new Promise((resolve, reject) => {
  if ((window as ConfettiGlobal).confetti) {
    resolve();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  script.async = true;
  script.onload = () => resolve();
  script.onerror = () => reject(new Error('Confetti failed to load'));
  document.head.appendChild(script);
});

export const useKonami = (onUnlock: () => void): void => {
  const index = useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === sequence[index.current]) {
        index.current += 1;
      } else {
        index.current = key === sequence[0] ? 1 : 0;
      }

      if (index.current === sequence.length) {
        index.current = 0;
        void loadConfetti().then(() => {
          (window as ConfettiGlobal).confetti?.({
            particleCount: 160,
            spread: 72,
            origin: { y: 0.72 },
          });
          onUnlock();
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onUnlock]);
};
