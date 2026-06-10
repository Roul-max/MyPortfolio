import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';

interface TiltStyle extends CSSProperties {
  '--tilt-x'?: string;
  '--tilt-y'?: string;
}

interface MouseTiltResult<T extends HTMLElement> {
  ref: RefObject<T>;
  style: TiltStyle;
}

export const useMouseTilt = <T extends HTMLElement>(maxAngle = 8): MouseTiltResult<T> => {
  const ref = useRef<T>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [style, setStyle] = useState<TiltStyle>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transformStyle: 'preserve-3d',
    transition: 'transform 300ms ease',
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let hovering = false;

    const animate = (): void => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      setStyle({
        transform: `perspective(1000px) rotateX(${current.current.x.toFixed(2)}deg) rotateY(${current.current.y.toFixed(2)}deg)`,
        transformStyle: 'preserve-3d',
        transition: hovering ? 'transform 150ms ease' : 'transform 400ms ease',
        '--tilt-x': `${current.current.x.toFixed(2)}deg`,
        '--tilt-y': `${current.current.y.toFixed(2)}deg`,
      });
      frame = requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent): void => {
      hovering = true;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.current = { x: -y * maxAngle, y: x * maxAngle };
    };

    const onLeave = (): void => {
      hovering = false;
      target.current = { x: 0, y: 0 };
    };

    frame = requestAnimationFrame(animate);
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [maxAngle]);

  return { ref, style };
};
