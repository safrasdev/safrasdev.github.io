import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text = "",
  className = "",
  delay = 30,
  duration = 0.8,
  ease = "expo.out",
  textAlign = "center",
  tag: Tag = "p",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  ...props
}) => {
  const containerRef = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.split-char');
    gsap.fromTo(chars, from, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top 85%`,
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef, dependencies: [text] });

  return (
    <Tag
      ref={containerRef}
      className={`split-text-container ${className}`}
      style={{ textAlign, display: 'block' }}
      {...props}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden py-1">
          {word.split("").map((char, charIdx) => (
            <span key={charIdx} className="split-char inline-block will-change-transform opacity-0">
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
