import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const coreRef = useRef(null);
  const scanRef = useRef(null);
  const brandRef = useRef(null);
  const glitchRef = useRef(null);
  const pctRef = useRef(null);
  const [pct, setPct] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const minMs = 2400;
    const start = performance.now();
    let rafId;

    const tick = () => {
      const elapsed = performance.now() - start;
      const eased = Math.min(1, 1 - Math.pow(1 - Math.min(elapsed / minMs, 1), 2.2));
      setPct(Math.round(eased * 100));
      if (eased < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const spin = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'none',
    });

    const corePulse = gsap.to(coreRef.current, {
      scale: 1.15,
      opacity: 0.85,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const scanTw = gsap.fromTo(
      scanRef.current,
      { yPercent: -120 },
      { yPercent: 120, duration: 2.8, repeat: -1, ease: 'none' }
    );

    const letters = brandRef.current?.querySelectorAll('.loader-brand-char');
    if (letters?.length) {
      gsap.fromTo(
        letters,
        { y: 80, rotateX: -75, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'back.out(1.7)',
          delay: 0.15,
        }
      );
    }

    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.85 });
    glitchTl
      .to(glitchRef.current, { x: 3, skewX: 8, opacity: 0.9, duration: 0.06 })
      .to(glitchRef.current, { x: -4, skewX: -6, duration: 0.05 })
      .to(glitchRef.current, { x: 0, skewX: 0, opacity: 0.35, duration: 0.08 });

    const finish = () => {
      cancelAnimationFrame(rafId);
      spin.kill();
      corePulse.kill();
      glitchTl.kill();
      scanTw.kill();
      gsap.killTweensOf(scanRef.current);

      const exit = gsap.timeline({
        onComplete: () => onComplete?.(),
      });

      exit
        .to(
          [ringRef.current, coreRef.current, brandRef.current, pctRef.current, scanRef.current, glitchRef.current],
          { scale: 1.35, opacity: 0, duration: 0.55, ease: 'power3.in', stagger: 0.03 },
          0
        )
        .to(
          root,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.9,
            ease: 'power4.inOut',
          },
          0.18
        );
    };

    const onWindowLoad = () => {
      const elapsed = performance.now() - start;
      const rest = Math.max(0, minMs - elapsed);
      window.setTimeout(finish, rest);
    };

    if (document.readyState === 'complete') {
      onWindowLoad();
    } else {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      spin.kill();
      corePulse.kill();
      glitchTl.kill();
      scanTw.kill();
      gsap.killTweensOf(scanRef.current);
      window.removeEventListener('load', onWindowLoad);
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="page-loader fixed inset-0 z-[25000] flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      aria-busy="true"
      aria-label="Loading site"
    >
      <div className="page-loader-grid absolute inset-0 opacity-[0.07] pointer-events-none" />

      <div
        ref={scanRef}
        className="absolute left-0 right-0 h-[32%] pointer-events-none bg-gradient-to-b from-transparent via-primary/12 to-transparent"
        style={{ top: '-15%' }}
      />

      <div className="relative flex flex-col items-center gap-10 px-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50 border-t-primary"
            style={{ willChange: 'transform' }}
          />
          <div
            ref={coreRef}
            className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-tertiary opacity-90 blur-[0.5px]"
            style={{ boxShadow: '0 0 32px rgba(143,245,255,0.5), inset 0 0 20px rgba(255,255,255,0.4)' }}
          />
        </div>

        <div className="relative">
          <div
            ref={glitchRef}
            className="pointer-events-none absolute inset-0 font-headline text-2xl sm:text-3xl font-black tracking-[0.55em] text-primary/35 uppercase text-center blur-[1px]"
            aria-hidden
          >
            SAFRAS
          </div>
          <h2
            ref={brandRef}
            className="relative font-headline text-2xl sm:text-3xl font-black tracking-[0.45em] text-white uppercase flex"
          >
            {'SAFRAS'.split('').map((c, i) => (
              <span key={i} className="loader-brand-char inline-block" style={{ perspective: '120px' }}>
                {c}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col items-center gap-3 w-[min(280px,70vw)] font-mono">
          <span ref={pctRef} className="text-primary text-sm tabular-nums tracking-[0.3em]">
            {pct.toString().padStart(3, '0')}
            <span className="text-white/40 text-xs ml-2">%</span>
          </span>
          <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-[width] duration-200 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
