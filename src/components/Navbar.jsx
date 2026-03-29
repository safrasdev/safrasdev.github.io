import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observerOptions = {
// ... preserving existing observer effect ...
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeElement = navRef.current?.querySelector(`[data-id="${activeSection}"]`);
      if (activeElement) {
        setIndicatorStyle({
          width: `${activeElement.offsetWidth}px`,
          left: `${activeElement.offsetLeft}px`,
          opacity: 1
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isMobile) return null;

  return (
    <nav 
      ref={navRef}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/20 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(143,245,255,0.08)] flex items-center p-2 z-[60]"
      style={{ isolation: 'auto' }}
    >
      {/* Sliding Indicator Background */}
      <div 
        className="absolute h-[calc(100%-16px)] bg-white/10 rounded-full transition-all duration-500 ease-out z-0"
        style={indicatorStyle}
      />

      {sections.map((section) => (
        <a
          key={section.id}
          data-id={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
          className={`relative px-6 py-2 font-['Manrope'] text-sm font-medium uppercase tracking-widest transition-colors duration-300 z-10 ${
            activeSection === section.id ? 'text-[#8ff5ff]' : 'text-white/60 hover:text-white'
          }`}
          data-magnetic
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
