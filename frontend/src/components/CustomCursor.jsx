import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let animFrame;
    let currentX = -100, currentY = -100;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      // Smooth ring follow
      const followRing = () => {
        currentX += (x - currentX) * 0.12;
        currentY += (y - currentY) * 0.12;
        setRing({ x: currentX, y: currentY });
        animFrame = requestAnimationFrame(followRing);
      };
      cancelAnimationFrame(animFrame);
      followRing();

      // Check hover elements
      const el = document.elementFromPoint(x, y);
      const hoverable = el?.closest('a, button, [role="button"], input, textarea, .skill-card, .glass-card');
      setIsHover(!!hoverable);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      />
      <div
        className={`cursor-ring ${isHover ? 'hover' : ''}`}
        style={{ transform: `translate(${ring.x - 18}px, ${ring.y - 18}px)` }}
      />
    </>
  );
}
