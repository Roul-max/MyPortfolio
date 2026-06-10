import React, { useEffect } from 'react';

const CursorSpotlight: React.FC = () => {
  useEffect(() => {
    const onMove = (event: MouseEvent): void => {
      document.documentElement.style.setProperty('--spotlight-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--spotlight-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
};

export default CursorSpotlight;
