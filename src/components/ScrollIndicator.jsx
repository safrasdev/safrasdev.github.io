import { useEffect, useRef, useState } from 'react';

export default function ScrollIndicator() {
  const canvasRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollRef.current = Math.min(100, Math.max(0, percent));
      setScrollPercent(scrollRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let tabHidden = document.hidden;
    const onVisibility = () => {
      tabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      if (tabHidden) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const size = canvas.width;
      const center = size / 2;
      const radius = size / 2 - 2;
      const pct = scrollRef.current;
      const time = timeRef.current;

      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius - 1, 0, Math.PI * 2);
      ctx.clip();

      const waterLevel = size - (pct / 100) * size;

      ctx.beginPath();
      ctx.moveTo(0, size);
      for (let x = 0; x <= size; x++) {
        const y = waterLevel
          + Math.sin((x / size) * Math.PI * 3 + time * 0.04) * 4
          + Math.sin((x / size) * Math.PI * 1.5 + time * 0.02) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fillStyle = 'rgba(143, 245, 255, 0.35)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, size);
      for (let x = 0; x <= size; x++) {
        const y = waterLevel
          + Math.sin((x / size) * Math.PI * 2.5 - time * 0.03) * 5
          + Math.sin((x / size) * Math.PI * 2 + time * 0.015) * 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(size, size);
      ctx.closePath();
      ctx.fillStyle = 'rgba(143, 245, 255, 0.2)';
      ctx.fill();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(center, center, radius - 1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(143, 245, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = pct > 50 ? 'rgba(0, 0, 0, 0.7)' : 'rgba(143, 245, 255, 0.8)';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(pct)}%`, center, center);

      timeRef.current += 1;
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed z-[70] pointer-events-none" style={{ bottom: 32, right: 32, width: 64, height: 64 }}>
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        style={{ width: 64, height: 64, borderRadius: '50%' }}
      />
    </div>
  );
}
