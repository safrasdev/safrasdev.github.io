import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef();

  useGSAP(() => {
    const togglePlay = "play none none none";

    gsap.from(".contact-detail", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        toggleActions: togglePlay,
      }
    });

    gsap.from(".site-metadata", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-metadata",
        start: "top 95%",
        toggleActions: togglePlay,
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="pt-44 pb-12 px-8 max-w-[1440px] mx-auto relative overflow-hidden" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-12 lg:col-span-7">
          <SplitText
            text="Let's Sync."
            tag="h2"
            className="font-headline text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white mb-10 md:mb-12 uppercase leading-[0.9]"
            textAlign="left"
            delay={40}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
            <div className="contact-detail flex flex-col gap-3 group/detail">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary translate-y-[1px] group-hover/detail:scale-150 transition-transform"></span>
                <span className="font-label text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Location</span>
              </div>
              <p className="font-headline text-3xl xs:text-4xl text-white font-bold tracking-tight">Sri Lanka.</p>
            </div>
            <div className="contact-detail flex flex-col gap-3 group/detail">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary translate-y-[1px] group-hover/detail:scale-150 transition-transform"></span>
                <span className="font-label text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Communication</span>
              </div>
              <p className="font-headline text-3xl xs:text-4xl text-white font-bold tracking-tight">sfrjayzee@gmail.com</p>
            </div>
            <div className="contact-detail flex flex-col gap-3 group/detail">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary translate-y-[1px] group-hover/detail:scale-150 transition-transform"></span>
                <span className="font-label text-xs font-bold text-white/30 uppercase tracking-[0.3em]">WHATS APP</span>
              </div>
              <p className="font-headline text-3xl xs:text-4xl text-white font-bold tracking-tight">+94 71 482 7090</p>
            </div>
          </div>

          <div className="site-metadata pt-12 border-t border-white/5 flex flex-wrap gap-8 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Version</span>
              <span className="text-xs font-mono text-on-surface-variant/40">Portfolio_v3.0.4</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Stack</span>
              <span className="text-xs font-mono text-on-surface-variant/40">React / GSAP / Framer</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Status</span>
              <span className="text-xs font-mono text-primary font-bold">READY_TO_DEPLOY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
