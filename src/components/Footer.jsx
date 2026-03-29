import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef();

  useGSAP(() => {
    gsap.from(container.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: container });

  return (
    <footer ref={container} className="bg-[#0e0e0e] w-full pt-20 pb-32 border-t border-white/5">
      <div className="flex flex-col items-center gap-12 w-full px-8">
        <div className="text-[#8ff5ff] font-['Space_Grotesk'] font-black text-4xl tracking-tighter uppercase">
          Safras
        </div>
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16">
          <a className="group relative p-4 flex flex-col items-center gap-2 transition-all duration-500 hover:-translate-y-3" href="https://www.reddit.com/user/FradZic/" title="Reddit" target='_blank'>
            <i className="fa-brands fa-reddit text-2xl xs:text-3xl text-white/20 group-hover:text-primary transition-colors duration-500"></i>
            <span className="text-[8px] font-bold tracking-[0.2em] text-white/10 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500">REDDIT</span>
          </a>
          <a className="group relative p-4 flex flex-col items-center gap-2 transition-all duration-500 hover:-translate-y-3" href="https://github.com/safrasdev" title="GitHub" target='_blank'>
            <i className="fa-brands fa-github text-2xl xs:text-3xl text-white/20 group-hover:text-primary transition-colors duration-500"></i>
            <span className="text-[8px] font-bold tracking-[0.2em] text-white/10 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500">GITHUB</span>
          </a>
          <a className="group relative p-4 flex flex-col items-center gap-2 transition-all duration-500 hover:-translate-y-3" href="https://www.linkedin.com/in/mohammed-safras-013b82370/" title="LinkedIn" target='_blank'>
            <i className="fa-brands fa-linkedin-in text-2xl xs:text-3xl text-white/20 group-hover:text-primary transition-colors duration-500"></i>
            <span className="text-[8px] font-bold tracking-[0.2em] text-white/10 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500">LINKEDIN</span>
          </a>
          <a className="group relative p-4 flex flex-col items-center gap-2 transition-all duration-500 hover:-translate-y-3" href="https://www.instagram.com/webinfiny_" title="Instagram" target='_blank'>
            <i className="fa-brands fa-instagram text-2xl xs:text-3xl text-white/20 group-hover:text-primary transition-colors duration-500"></i>
            <span className="text-[8px] font-bold tracking-[0.2em] text-white/10 group-hover:text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500">INSTAGRAM</span>
          </a>
        </nav>
        <p className="font-['Inter'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          © 2026 SAFRAS. ENGINEERED FOR THE COSMOS.
        </p>
      </div>
    </footer>
  );
}
