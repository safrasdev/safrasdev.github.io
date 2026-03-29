import { useRef, useCallback } from 'react';

export default function ShineCard({ children, className = '', borderRadius = '0.5rem', ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--shine-x', `${x}px`);
    card.style.setProperty('--shine-y', `${y}px`);
    card.style.setProperty('--shine-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--shine-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`shine-card ${className}`}
      style={{ '--shine-radius': borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
