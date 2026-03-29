import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function isPointerContext(el) {
  let node = el;
  while (node && node.nodeType === 1 && node !== document.documentElement) {
    try {
      if (getComputedStyle(node).cursor === 'pointer') return true;
      if (node.classList?.contains('portfolio-card')) return true;
    } catch {
      break;
    }
    node = node.parentElement;
  }
  return false;
}

export default function AuroraCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const syncActive = () => setActive(mq.matches);
    syncActive();
    mq.addEventListener('change', syncActive);
    return () => mq.removeEventListener('change', syncActive);
  }, []);

  useEffect(() => {
    if (!active) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickSetter(dot, 'x', 'px');
    const yDot = gsap.quickSetter(dot, 'y', 'px');
    const xRing = gsap.quickSetter(ring, 'x', 'px');
    const yRing = gsap.quickSetter(ring, 'y', 'px');

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    let isHovering = false;
    const modeRef = { current: false };
    let tabHidden = document.hidden;

    const onVisibility = () => {
      tabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const applyHover = (on) => {
      if (on === isHovering) return;
      isHovering = on;
      modeRef.current = on;

      if (on) {
        gsap.to(ring, {
          scale: 1.55,
          borderColor: 'rgba(143, 245, 255, 0.95)',
          borderWidth: 2,
          duration: 0.32,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.88)',
          borderWidth: 2,
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.22 });
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xDot(mouse.x);
      yDot(mouse.y);

      applyHover(isPointerContext(e.target));
    };

    const handleMouseDown = (e) => {
      const on = modeRef.current;
      gsap.to(ring, {
        scale: on ? 1.32 : 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });

      const ripple = document.createElement('div');
      ripple.className =
        'absolute rounded-full pointer-events-none will-change-transform z-[9998] border border-white/50';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      if (cursorRef.current) cursorRef.current.appendChild(ripple);

      gsap.to(ripple, {
        width: 120,
        height: 120,
        opacity: 0,
        borderWidth: 1,
        duration: 0.65,
        ease: 'power3.out',
        onComplete: () => ripple.remove(),
      });
    };

    const ticker = () => {
      if (tabHidden) return;

      const base = isHovering ? 0.2 : 0.09;
      const ratio = gsap.ticker.deltaRatio();
      const dt = 1.0 - Math.pow(1.0 - base, ratio);

      ringPos.x += (mouse.x - ringPos.x) * dt;
      ringPos.y += (mouse.y - ringPos.y) * dt;

      xRing(ringPos.x);
      yRing(ringPos.y);
    };

    gsap.set(ring, {
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.88)',
      boxShadow: 'none',
    });
    gsap.set(dot, { boxShadow: 'none' });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    gsap.ticker.add(ticker);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      gsap.ticker.remove(ticker);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div
        ref={ringRef}
        className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform bg-transparent mix-blend-exclusion border-solid"
      />
      <div
        ref={dotRef}
        className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform mix-blend-exclusion bg-[#00eaff]"
      />
    </div>
  );
}
