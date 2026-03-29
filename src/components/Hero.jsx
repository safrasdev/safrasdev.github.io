import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from './TextType';
import TextPressure from './TextPressure';
import { useSiteRevealed } from '../context/SiteReadyContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef();
  const title1 = useRef();
  const title2 = useRef();
  const subtitleWrap = useRef();
  const scrollPrompt = useRef();
  const scrollLine = useRef();
  const scrollLabel = useRef();
  const [subtitleReady, setSubtitleReady] = useState(false);
  const siteRevealed = useSiteRevealed();

  useGSAP(() => {
    const eyebrow = title1.current;
    const block = title2.current;
    const sub = subtitleWrap.current;
    const scroll = scrollPrompt.current;
    const lineEl = scrollLine.current;
    const labelEl = scrollLabel.current;

    if (!block) return;

    const mobileChars = block.querySelectorAll('.hero-char-inner');
    const desktopTitle = block.querySelector('.hero-title-desktop-wrap');
    const mobileTitle = block.querySelector('.hero-title-mobile');

    const prepHidden = () => {
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 52, skewY: 8, filter: 'blur(12px)' });
      if (mobileChars.length) gsap.set(mobileChars, { y: '125%', rotateZ: 12, opacity: 0, skewX: -4 });
      if (desktopTitle) gsap.set(desktopTitle, { opacity: 0, scale: 0.82, y: 56, rotateX: 18, filter: 'blur(16px)', transformOrigin: '50% 50%' });
      if (mobileTitle) gsap.set(mobileTitle, { opacity: 1 });
      if (sub) gsap.set(sub, { opacity: 0, y: 36, clipPath: 'inset(100% 0% 0% 0%)' });
      if (labelEl) gsap.set(labelEl, { opacity: 0, letterSpacing: '0.8em', y: 12 });
      if (lineEl) gsap.set(lineEl, { scaleY: 0, opacity: 0, transformOrigin: '50% 0%' });
    };

    if (!siteRevealed) {
      prepHidden();
      return;
    }

    if (!sub) setSubtitleReady(true);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(eyebrow, {
      opacity: 1,
      y: 0,
      skewY: 0,
      filter: 'blur(0px)',
      duration: 1,
    })
      .to(
        mobileChars,
        {
          y: '0%',
          rotateZ: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.92,
          stagger: { each: 0.07, ease: 'back.out(1.45)' },
          ease: 'power4.out',
        },
        '-=0.55'
      )
      .to(
        desktopTitle,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
        },
        '-=0.85'
      )
      .to(
        sub,
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.85,
          ease: 'power3.inOut',
        },
        '-=0.45'
      )
      .call(() => setSubtitleReady(true), null, '-=0.35');

    if (lineEl) {
      tl.to(lineEl, { scaleY: 1, opacity: 1, duration: 0.75, ease: 'power2.out' }, '-=0.35');
    }
    if (labelEl) {
      tl.to(
        labelEl,
        { opacity: 0.35, letterSpacing: '0.5em', y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.55'
      );
    }

    return () => {
      tl.kill();
    };
  }, { scope: container, dependencies: [siteRevealed] });

  return (
    <section ref={container} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative bg-transparent" id="home" style={{ isolation: 'auto' }}>
      <div className="max-w-6xl relative z-10 w-full">
        <span ref={title1} className="hero-eyebrow font-montserrat text-primary-fixed-dim font-bold mb-2 md:mb-4 uppercase inline-block will-change-transform">
          HEY THERE I'M
        </span>

        <div ref={title2} className="w-full flex flex-col items-center justify-center mb-0 min-h-[5.5rem] md:min-h-[220px]">
          <h1 className="hero-title-mobile hero-main-title font-montserrat font-black text-white uppercase mb-4 w-full max-w-full px-2 text-center flex justify-center gap-[0.02em] flex-wrap">
            {'SAFRAS'.split('').map((c, i) => (
              <span key={i} className="hero-char inline-block overflow-hidden pb-1">
                <span className="hero-char-inner inline-block will-change-transform">{c}</span>
              </span>
            ))}
          </h1>
          <div className="hero-title-desktop-wrap w-full mb-0 will-change-transform [perspective:900px]">
            <TextPressure
              text="SAFRAS"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#FFFFFF"
              minFontSize={60}
            />
          </div>
        </div>

        <div ref={subtitleWrap} className="mt-4 md:mt-12 will-change-[clip-path,opacity,transform]">
          <TextType
            text={['WEB DEVELOPER', 'GRAPHIC DESIGNER']}
            as="h2"
            typingSpeed={90}
            deletingSpeed={50}
            pauseDuration={3000}
            loop={true}
            showCursor={true}
            cursorCharacter="_"
            cursorClassName="text-primary font-bold"
            waitForIntro={true}
            introReady={subtitleReady}
            initialDelay={120}
            className="hero-subtitle font-montserrat font-bold text-gray-400 uppercase block mx-auto w-fit min-h-[1.2em]"
          />
        </div>
      </div>
      <div ref={scrollPrompt} className="absolute bottom-24 flex flex-col items-center gap-4">
        <span ref={scrollLabel} className="text-[10px] tracking-[0.5em] font-label font-bold will-change-transform">
          SCROLL TO EXPLORE
        </span>
        <div ref={scrollLine} className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent will-change-transform" />
      </div>
    </section>
  );
}
