import { useEffect } from 'react';

export const useSmoothScroll = (): void => {
  useEffect(() => {
    const onClick = (event: Event): void => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      const element = document.querySelector<HTMLElement>(href);
      if (!element) return;

      event.preventDefault();
      const top = element.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    anchors.forEach((anchor) => anchor.addEventListener('click', onClick));

    return () => anchors.forEach((anchor) => anchor.removeEventListener('click', onClick));
  });
};
