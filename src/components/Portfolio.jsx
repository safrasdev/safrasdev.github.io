import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const container = useRef();
  const scroller = useRef();
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const projects = [
    {
      title: "Book Beacon",
      category: "Create Books",
      image: "/public/portfolios/thumbnails/bookbeacon.png",
      color: "text-primary",
      link: "/public/portfolios/BookBeacon/main.html"
    },
    {
      title: "JavaScript Engine",
      category: "Animation",
      image: "portoflios/thumbnails/jsengine.png",
      color: "text-tertiary",
      link: "/public/portfolios/JavaScript Execution Visualizer/index.html" 
    },
    {
      title: "Korrel",
      category: "Coding Language",
      image: "portoflios/thumbnails/korrel.png",
      color: "text-tertiary",
      link: "https://korrel.vercel.app/" 
    },
    {
      title: "Obsidian Gallery",
      category: "Personal Portfolio",
      image: "portoflios/thumbnails/obsidiangallery.png",
      color: "text-tertiary",
      link: "/public/portfolios/Obsidian Gallery/index.html" 
    },
    {
      title: "Art of Flavour",
      category: "Restuarant Website",
      image: "portoflios/thumbnails/resturant.png",
      color: "text-tertiary",
      link: "/public/portfolios/Cafe Website/index.html" 
    },
    {
      title: "Vogue Man",
      category: "E-Commerce",
      image: "portoflios/thumbnails/vogueman.png",
      color: "text-tertiary",
      link: "/public/portfolios/Shopping Website/my-store/index.html" 
    },
    {
      title: "Web Iphone",
      category: "Web Design",
      image: "portoflios/thumbnails/iphone.png",
      color: "text-primary",
      link: "/public/portfolios/IPhone Project/sources/index.html" 
    },
    {
      title: "Lonely Snake",
      category: "Game",
      image: "portoflios/thumbnails/lonelysnake.png",
      color: "text-tertiary",
      link: "/public/portfolios/Lonely Snake/sources/index.html" 
    },
  ];

  useEffect(() => {
    const calcConstraints = () => {
      if (scroller.current && container.current) {
        const scrollerWidth = scroller.current.scrollWidth;
        const containerWidth = container.current.offsetWidth;
        setConstraints({ left: -(scrollerWidth - containerWidth + 64), right: 0 });
      }
    };
    calcConstraints();
    window.addEventListener('resize', calcConstraints);
    return () => window.removeEventListener('resize', calcConstraints);
  }, [projects.length]);

  useGSAP(() => {
    gsap.from(".portfolio-header", {
      y: 60,
      opacity: 0,
      rotation: 1,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 relative overflow-hidden" id="work">
      <div className="portfolio-header px-8 mb-20 max-w-[1440px] mx-auto w-full relative">
        <SplitText
          text="Selected Works"
          tag="h2"
          className="font-headline text-6xl md:text-9xl font-black text-white/10 tracking-tighter uppercase select-none leading-none"
          textAlign="left"
          delay={30}
        />
        <div className="flex flex-col items-start gap-8 mt-4">
          <p className="font-body text-2xl text-on-surface-variant max-w-xl">Curated experiments in digital weightlessness.</p>
          <div className="flex items-center gap-3 animate-pulse">
            <span className="text-[14px] font-bold tracking-[0.3em] text-white/40 uppercase">Swipe to explore</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary/60 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <motion.div
          ref={scroller}
          className="flex gap-12 whitespace-nowrap py-10 px-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={constraints}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card block flex-shrink-0 w-[80vw] md:w-[600px] h-[60vh] group/card relative rounded-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/5 transition-transform duration-500 hover:scale-[0.98] select-none cursor-grab active:cursor-grabbing"
              data-magnetic
              draggable="false"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 opacity-70 group-hover/card:opacity-100 pointer-events-none"
                src={project.image}
                alt={project.title}
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 pointer-events-none">
                <span className={`${project.color} font-label text-xs font-bold uppercase tracking-widest mb-2 opacity-80`}>{project.category}</span>
                <h3 className="font-headline text-4xl md:text-5xl font-black text-white">{project.title}</h3>
                
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-fit flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto group/btn"
                >
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">View Project</span>
                  <span className="material-symbols-outlined text-sm group-hover/btn:rotate-45 transition-transform">arrow_outward</span>
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
