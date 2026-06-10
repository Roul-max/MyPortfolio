import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = (): void => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(max <= 0 ? 0 : (window.scrollY / max) * 100);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[9998] h-[2px] bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] transition-[width] duration-100 ease-linear"
      style={{ width: `${width}%` }}
    />
  );
};

export default ScrollProgress;
