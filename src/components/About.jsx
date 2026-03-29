import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from './TextType';
import SplitText from './SplitText';
import CountUp from './CountUp';
import ShineCard from './ShineCard';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef();

  const designSkills = [
    { name: 'UI/UX Designing', value: '91%' },
    { name: 'FIGMA', value: '92%' },
    { name: 'CANVA', value: '71%' },
    { name: 'PHOTOSHOP', value: '75%' },
    { name: 'ILLUSTRATION', value: '72%' },
    { name: 'LAYOUT & GRID DESIGN', value: '85%' },
    { name: 'BRANDING', value: '86%' }
  ];

  const devSkills = [
    { name: 'HTML', value: '97%' },
    { name: 'CSS', value: '95%' },
    { name: 'JAVASCRIPT', value: '92%' },
    { name: 'REACT', value: '52%' },
    { name: 'PHP', value: '86%' },
    { name: 'PYTHON', value: '63%' },
    { name: 'RESPONSIVE', value: '95%' },
    { name: 'SEO', value: '64%' },
    { name: 'GIT', value: '52%' },
    { name: 'WORDPRESS', value: '63%' }
  ];



  useGSAP(() => {
    const togglePlay = "play none none none";

    // About Section Intro Stagger - slide up + slight rotation
    gsap.from(".about-box", {
      y: 80,
      opacity: 0,
      rotation: 2,
      duration: 1.2,
      stagger: 0.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        toggleActions: togglePlay,
      }
    });

    // Skills Matrix Heading - slide from left
    gsap.from(".matrix-heading", {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 85%",
        toggleActions: togglePlay,
      }
    });

    // Skill Bars Reveal Individually
    gsap.utils.toArray(".skill-item").forEach((skill) => {
      const fill = skill.querySelector(".skill-fill");
      gsap.fromTo(skill,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 92%",
            toggleActions: togglePlay,
          }
        }
      );
      gsap.fromTo(fill,
        { width: "0%" },
        {
          width: fill.style.width || "0%",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: skill,
            start: "top 92%",
            toggleActions: togglePlay,
          }
        }
      );
    });

    // Lab Section - slide up
    gsap.from(".lab-box", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#lab",
        start: "top 85%",
        toggleActions: togglePlay,
      }
    });
  }, { scope: container });

  return (
    <div ref={container}>
      {/* Section 2: ABOUT */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto" id="about">
        <div className="flex flex-col md:flex-row gap-8">
          <ShineCard className="about-box flex-[2] bg-white/5 backdrop-blur-md p-12 rounded-[2rem] flex flex-col justify-between min-h-[500px] relative overflow-hidden group border border-white/5 will-change-transform" data-magnetic>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[15rem]">architecture</span>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="font-headline text-4xl xs:text-5xl md:text-7xl font-bold leading-[0.9] text-white tracking-tighter uppercase mb-10 max-w-2xl">
                I build <span className="text-[#8ff5ff] italic">digital architecture</span> that breathes.
              </h3>
              <p className="font-body text-base md:text-lg text-white/50 leading-relaxed max-w-2xl font-light">
                Hi, my name is Safras, and I’m from Sri Lanka. I’m a Full-Stack Developer and Graphic Designer,
                passionate about transforming ideas into immersive digital experiences. I started learning coding
                back in grade 7, and since then, I’ve been fascinated by how lines of code and design can come
                together to create something meaningful. I love crafting websites that are not only functional
                but visually striking, blending creativity with technical precision. Currently, I’m building and
                designing websites that I share with the world on Gumroad, turning my projects into something
                people can use and enjoy. Every line of code, every design element, tells a story — and I thrive
                on bringing those stories to life. For me, building projects is more than work; it’s a journey of
                innovation, creativity, and expression, where every pixel and interaction has a purpose.
              </p>
            </div>
          </ShineCard>

          {/* Right Card: Problem Solver */}
          <ShineCard className="about-box flex-1 bg-white/5 backdrop-blur-md p-12 rounded-[2rem] flex flex-col justify-end min-h-[500px] border border-white/5 relative group will-change-transform" data-magnetic>
            <div className="absolute top-12 left-12 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#8ff5ff] group-hover:bg-[#8ff5ff] group-hover:text-black transition-all duration-500">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>

            <div className="relative z-10">
              <h4 className="font-headline text-2xl font-black mb-4 uppercase tracking-tighter text-white">PROBLEM SOLVER</h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[280px]">
                Logic is my primary language. Every line of code is a calculated step toward seamless interaction.
              </p>
            </div>
          </ShineCard>
        </div>
      </section>

      {/* Section 3: THE SKILLS MATRIX */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto" id="skills">
        <div className="mb-16 matrix-heading">
          <SplitText
            text="The Matrix"
            tag="h2"
            className="font-headline text-6xl md:text-8xl font-black text-white/5 tracking-tighter uppercase select-none leading-none"
            delay={30}
            duration={1}
            textAlign="left"
          />
          <div className="h-[1px] w-full bg-white/10 mt-[-20px]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <SplitText
              text="DESIGN SKILLS"
              tag="h3"
              className="font-headline text-2xl font-bold text-primary mb-12 flex items-center gap-4"
              delay={40}
              textAlign="left"
            />
            <div className="space-y-10">
              {designSkills.map((skill) => (
                <div className="group skill-item" key={skill.name}>
                  <div className="flex justify-between mb-4 font-label text-xs tracking-widest font-bold uppercase opacity-60">
                    <span>{skill.name}</span>
                    <span className="text-primary font-bold">
                      <CountUp
                        to={parseInt(skill.value)}
                        from={0}
                        duration={2}
                        className="skill-count"
                      />%
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                    <div className="skill-fill absolute inset-y-0 left-0 bg-primary" style={{ width: skill.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SplitText
              text="DEVELOPMENT SKILLS"
              tag="h3"
              className="font-headline text-2xl font-bold text-tertiary mb-12 flex items-center gap-4"
              delay={40}
              textAlign="left"
            />
            <div className="space-y-10">
              {devSkills.map((skill) => (
                <div className="group skill-item" key={skill.name}>
                  <div className="flex justify-between mb-4 font-label text-xs tracking-widest font-bold uppercase opacity-60">
                    <span>{skill.name}</span>
                    <span className="text-primary font-bold">
                      <CountUp
                        to={parseInt(skill.value)}
                        from={0}
                        duration={2}
                        className="skill-count"
                      />%
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                    <div className="skill-fill absolute inset-y-0 left-0 bg-tertiary" style={{ width: skill.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: WHAT I'M CURRENTLY DOING */}
      <section className="py-32 px-8 max-w-[1440px] mx-auto overflow-hidden" id="lab">
        <div className="mb-16">
          <TextType
            text="WHAT I'M CURRENTLY DOING"
            as="h3"
            typingSpeed={20}
            loop={false}
            showCursor={true}
            cursorCharacter="_"
            cursorClassName="text-primary font-bold"
            className="font-headline text-3xl md:text-5xl font-black text-white/90 uppercase tracking-tighter"
            startOnVisible={true}
          />
          <div className="h-[1px] w-24 bg-primary mt-4"></div>
        </div>
        {/* Laboratory Card - Full Width */}
        <div className="mb-6">
          <ShineCard className="lab-box glass-card rounded-lg p-8 h-[400px] border border-white/5 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-label text-[10px] font-black tracking-widest uppercase text-white/40">In the Laboratory</span>
            </div>
            <div className="flex-grow font-mono text-sm space-y-4 overflow-hidden mask-gradient">
              <TextType text="> Leveling up technical stack..." as="p" typingSpeed={10} loop={false} showCursor={true} cursorCharacter="_" hideCursorOnComplete={true} startOnVisible={true} initialDelay={200} className="text-primary-fixed-dim w-full" />
              <TextType text="> Deep-diving into Python & React" as="p" typingSpeed={10} loop={false} showCursor={true} cursorCharacter="_" hideCursorOnComplete={true} startOnVisible={true} initialDelay={600} className="text-white/60 w-full" />
              <TextType text="> Bridging the gap: powerful back-end vs high-vibe UI" as="p" typingSpeed={10} loop={false} showCursor={true} cursorCharacter="_" hideCursorOnComplete={true} startOnVisible={true} initialDelay={1000} className="text-white/60 w-full" />
              <TextType text="> Building the future... 78%" as="p" typingSpeed={10} loop={false} showCursor={true} cursorCharacter="_" hideCursorOnComplete={true} startOnVisible={true} initialDelay={1600} className="text-white/40 w-full" />
              <TextType text="> Injecting aesthetic variance into main loop" as="p" typingSpeed={10} loop={false} showCursor={true} cursorCharacter="_" hideCursorOnComplete={true} startOnVisible={true} initialDelay={1900} className="text-tertiary w-full" />
            </div>
          </ShineCard>
        </div>

        {/* 3 Activity Cards - Equal Width, One Row */}
        <div className="activity-grid">
          {/* Freelancing */}
          <ShineCard className="activity-card bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/5 text-center hover:bg-white/10 transition-all duration-500 group" borderRadius="0.5rem">
            <h4 className="font-headline font-black text-2xl mb-4 group-hover:text-primary transition-colors duration-300">FREELANCING</h4>
            <p className="text-[10px] font-label font-bold text-white/30 uppercase tracking-[0.2em]">
              I currently do freelance design and development services to sharpen my skills and gain real-world experience.
              I create modern, responsive, and high-quality websites at affordable prices for clients who want something
              unique and professional.
            </p>
          </ShineCard>

          {/* Selling */}
          <ShineCard className="activity-card bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/5 text-center hover:bg-white/10 transition-all duration-500 group" borderRadius="0.5rem">
            <h4 className="font-headline font-black text-2xl mb-4 group-hover:text-secondary transition-colors duration-300">SELLING</h4>
            <p className="text-[10px] font-label font-bold text-white/30 uppercase tracking-[0.2em]">
              I'm also selling digital products like web design templates and fully coded websites on my Gumroad store called Webinfiny.
              It's where I share my creative projects and help others get high-quality designs and ready-to-use website templates at
              affordable prices.
            </p>
          </ShineCard>

          {/* Learning */}
          <ShineCard className="activity-card bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/5 text-center hover:bg-white/10 transition-all duration-500 group" borderRadius="0.5rem">
            <h4 className="font-headline font-black text-2xl mb-4 group-hover:text-tertiary transition-colors duration-300">LEARNING</h4>
            <p className="text-[10px] font-label font-bold text-white/30 uppercase tracking-[0.2em]">
              Currently, I'm in the lab leveling up my technical stack and building the future. I'm deep-diving into
              Python and React to bridge the gap between powerful back-end logic and high-vibe user interfaces.
            </p>
          </ShineCard>
        </div>
      </section>
    </div>
  );
}
