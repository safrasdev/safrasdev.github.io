// GSAP Animations for VOGUEMAN

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 0. Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,
    touchMultiplier: 1.5,
});

// Link Lenis to ScrollTrigger & GSAP Ticker
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


document.addEventListener('DOMContentLoaded', () => {
    // 00. LUXURY: Bespoke 3D Watch Interactions
    const watchCase = document.querySelector('.watch-case');
    const watchHands = {
        hour: document.querySelector('.hour-hand'),
        min: document.querySelector('.min-hand'),
        sec: document.querySelector('.sec-hand')
    };

    if (watchCase) {
        const state = { tiltX: 0, tiltY: 0, angle: 0 };
        const target = { tiltX: 0, tiltY: 0, angle: 0 };

        window.addEventListener('mousemove', (e) => {
            const rect = watchCase.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // 1. Tilt targeting
            target.tiltY = (e.clientX / window.innerWidth - 0.5) * 40;
            target.tiltX = (e.clientY / window.innerHeight - 0.5) * -40;

            // 2. Hand rotation targeting (Angle to mouse)
            const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            target.angle = radians * (180 / Math.PI) + 90;

            // Smoothly animate both tilt and hands
            gsap.to(state, {
                tiltX: target.tiltX,
                tiltY: target.tiltY,
                angle: target.angle,
                duration: 1,
                ease: "power2.out",
                onUpdate: () => {
                    // Update Case Tilt
                    watchCase.style.transform = `rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg)`;
                    
                    // Update Hands (with different speeds/offsets for each)
                    if (watchHands.sec) watchHands.sec.style.transform = `rotate(${state.angle}deg)`;
                    if (watchHands.min) watchHands.min.style.transform = `rotate(${state.angle * 0.8}deg)`;
                    if (watchHands.hour) watchHands.hour.style.transform = `rotate(${state.angle * 0.5}deg)`;
                }
            });
        });
    }

    // 0. LUXURY: Character Split for ALL reveal-text spans
    const splitHeaders = document.querySelectorAll('.reveal-text span');
    splitHeaders.forEach(span => {
        const text = span.textContent;
        span.innerHTML = '';
        [...text].forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            charSpan.style.display = 'inline-block';
            charSpan.style.transform = 'translateY(100%)';
            charSpan.style.willChange = 'transform';
            span.appendChild(charSpan);
        });
    });

    // 1. Initial Hero Animations
    const heroTl = gsap.timeline();

    heroTl.to('.hero-text .reveal-text span span', {
        y: 0,
        duration: 1.5,
        stagger: 0.04,
        ease: "expo.out"
    })
        .to('.hero-text .fade-in', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=1")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1
        }, "-=0.5");

    // 2. Parallax for Hero Background
    const heroBg = document.querySelector('.parallax-bg');
    if (heroBg) {
        heroBg.style.willChange = 'transform';
        gsap.to(heroBg, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 3. Optimized Image Parallax
    const images = document.querySelectorAll('.bento-item img, .product-card img');
    images.forEach(img => {
        img.style.willChange = 'transform';
        gsap.to(img, {
            yPercent: 15,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 4. Reveal Text Animations (Generic)
    const revealTexts = document.querySelectorAll('.reveal-text span');
    revealTexts.forEach(span => {
        if (span.closest('.hero-section')) return;

        gsap.to(span, {
            y: 0,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: span,
                start: "top 95%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 4b. Fade In Animations (Generic) - THIS FIXES THE VISIBILITY BUG
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach(el => {
        if (el.closest('.hero-section')) return;

        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 5. Section Reveal with Subtle Skew
    const sections = document.querySelectorAll('.featured-sections, .philosophy-section, .contact-section, .cta-parallax');
    sections.forEach(section => {
        gsap.from(section, {
            skewY: 1,
            opacity: 0.95,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 80%",
                scrub: true
            }
        });
    });

    // 6. Large CTA Parallax Background
    const ctaBg = document.querySelector('.parallax-bg-fixed');
    if (ctaBg) {
        ctaBg.style.willChange = 'transform';
        gsap.to(ctaBg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: '.cta-parallax',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 7. Premium Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.btn, .cart-trigger, .menu-toggle, .header-logo, .hero-nav-links a');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });

    // 8. LUXURY: 3D Tilt Animation for Bento Items
    const bentoItems = document.querySelectorAll('.bento-item, .product-card');
    bentoItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            const tiltX = (y - 0.5) * 15;
            const tiltY = (x - 0.5) * -15;

            gsap.to(item, {
                rotateX: tiltX,
                rotateY: tiltY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
                overwrite: true
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, { rotateX: 0, rotateY: 0, duration: 1, ease: "power2.out" });
        });
    });

    // 9. LUXURY: Mouse Cursor Trailer (Lagging dot)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 6,
                y: e.clientY - 6,
                duration: 0.6, // Increased for a silky follow effect
                ease: "power2.out",
                opacity: 1,
                overwrite: true
            });
        });

        const activeTargets = document.querySelectorAll('a, button, .bento-item, .product-card');
        activeTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursor.classList.add('active'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // 10. LUXURY: Reveal Logic for Bento Items and Product Cards
    const revealItems = document.querySelectorAll('.reveal-item, .bento-item, .product-card');
    revealItems.forEach(item => {
        gsap.fromTo(item, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const revealSplitHeaders = document.querySelectorAll('.reveal-text span');
    revealSplitHeaders.forEach(span => {
        if (span.closest('.hero-section')) return;

        gsap.to(span.querySelectorAll('span'), {
            y: 0,
            duration: 1.2,
            stagger: 0.02,
            ease: "expo.out",
            scrollTrigger: {
                trigger: span,
                start: "top 95%",
                toggleActions: "play none none reverse"
            }
        });
    });
});
