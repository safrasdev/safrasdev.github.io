import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteRevealed } from '../context/SiteReadyContext';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const logoRef = useRef();
  const siteRevealed = useSiteRevealed();

  useGSAP(() => {
    const chars = logoRef.current?.querySelectorAll('.header-logo-char');
    if (!chars?.length) return;

    if (!siteRevealed) {
      gsap.set(chars, { opacity: 0, y: -40, rotateX: 68, skewX: -14 });
      return;
    }

    gsap.fromTo(
      chars,
      { opacity: 0, y: -40, rotateX: 68, skewX: -14 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        skewX: 0,
        duration: 0.78,
        stagger: { each: 0.04, from: 'center' },
        ease: 'back.out(1.45)',
      }
    );
  }, { scope: logoRef, dependencies: [siteRevealed] });

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent pointer-events-none">
      <div className="flex justify-between items-center px-8 py-6 w-full max-w-[1440px] mx-auto pointer-events-auto">
        <div
          ref={logoRef}
          className="text-xl font-black tracking-tighter uppercase font-headline magnetic-pull cursor-pointer active:scale-95 flex items-baseline [perspective:640px]"
        >
          {'SAFRAS'.split('').map((c, i) => (
            <span key={`b-${i}`} className="header-logo-char inline-block text-white will-change-transform">
              {c}
            </span>
          ))}
          {'Dev'.split('').map((c, i) => (
            <span key={`d-${i}`} className="header-logo-char inline-block text-primary will-change-transform">
              {c}
            </span>
          ))}
        </div>
        <MagneticLiquidButton siteRevealed={siteRevealed} />
      </div>
    </header>
  );
}

function MagneticLiquidButton({ siteRevealed }) {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
      gsap.to(textRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.35)' });
      gsap.to(textRef.current, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.35)' });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: btnRef });

  useGSAP(() => {
    const btn = btnRef.current;
    const label = textRef.current;
    if (!btn || !label) return;

    if (!siteRevealed) {
      gsap.set(btn, {
        opacity: 0,
        scale: 0.35,
        rotate: -18,
        y: 28,
        clipPath: 'circle(0% at 50% 50%)',
      });
      gsap.set(label, { opacity: 0, y: 20, skewX: 10 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(btn, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      clipPath: 'circle(140% at 50% 50%)',
      duration: 0.95,
      ease: 'back.out(1.55)',
    }).to(
      label,
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      '-=0.45'
    );

    return () => tl.kill();
  }, { scope: btnRef, dependencies: [siteRevealed] });

  return (
    <button
      ref={btnRef}
      onClick={(e) => {
        const target = document.getElementById('contact');
        if (target) {
          if (window.lenis) {
            window.lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }}
      className="group relative overflow-hidden bg-white/5 border border-white/10 px-8 py-3 rounded-full outline-none transition-[background-color,border-color,box-shadow] duration-300 hover:bg-white/12 hover:border-primary/35 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black will-change-transform"
    >
      <span
        ref={textRef}
        className="relative z-10 font-headline font-bold text-white tracking-tighter block pointer-events-none transition-colors duration-300 group-hover:text-primary"
      >
        HIRE ME
      </span>
    </button>
  );
}
