const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const heroTl = gsap.timeline();
    heroTl.from(".navbar", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
          .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
          .from(".title-container", { scaleX: 0, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.4")
          .from(".title-box", { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
          .from(".hero-title", { y: 40, opacity: 0, rotationX: -20, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4")
          .from(".hero-plate", { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6");

    // Parallax & Scroll Effects
    gsap.to(".hero-plate", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });

    gsap.fromTo(".parallax-img-wrap",
        { clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)" },
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none",
            scrollTrigger: { trigger: ".story-section", start: "top 80%", end: "center center", scrub: true }
        }
    );

    gsap.to(".parallax-img", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top bottom", end: "bottom top", scrub: true }
    });

    gsap.from(".story-text", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ".story-section", start: "top 70%", toggleActions: "play none none reverse" }
    });

    // Magnetic Buttons
    document.querySelectorAll('.btn-primary, .btn-reserve').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const pos = btn.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Floating Elements
    gsap.to(".float-1", { yPercent: 150, xPercent: -50, rotation: 45, ease: "none", scrollTrigger: { trigger: ".hero-section", scrub: true } });
    gsap.to(".float-2", { yPercent: -200, xPercent: 100, rotation: -45, ease: "none", scrollTrigger: { trigger: ".hero-section", scrub: true } });
    gsap.to(".float-3", { yPercent: 250, xPercent: 50, ease: "none", scrollTrigger: { trigger: ".hero-section", scrub: true } });
    gsap.to(".float-4", { yPercent: -150, xPercent: -100, ease: "none", scrollTrigger: { trigger: ".hero-section", scrub: true } });

    // Menu Item Reveals
    gsap.utils.toArray('.menu-section .menu-header').forEach((header) => {
        const label = header.querySelector('.section-label');
        const heading = header.querySelector('.section-heading');
        if (label) gsap.from(label, { y: 30, opacity: 0, duration: 0.7, scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' } });
        if (heading) gsap.from(heading, { y: 40, opacity: 0, duration: 0.9, delay: 0.12, scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none reverse' } });
    });

    document.querySelectorAll('.category-banner').forEach((banner, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(banner,
            { clipPath: fromLeft ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: banner, start: 'top 82%', toggleActions: 'play none none reverse' } }
        );

        const title = banner.querySelector('.category-title');
        if (title) gsap.from(title, { x: fromLeft ? -40 : 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: banner, start: 'top 75%', toggleActions: 'play none none reverse' } });

        const img = banner.querySelector('.category-img');
        if (img) gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: banner, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    const specialBox = document.querySelector('.special-container .seek-anim');
    if (specialBox) {
        gsap.from(specialBox, { opacity: 0, y: 60, scale: 0.96, duration: 1.1, scrollTrigger: { trigger: specialBox, start: 'top 85%', toggleActions: 'play none none reverse' } });
        const specialImg = specialBox.querySelector('img');
        if (specialImg) gsap.fromTo(specialImg, { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: specialBox, start: 'top bottom', end: 'bottom top', scrub: true } });
    }

    // Horizontal Scroll Gallery
    const galleryPanels = document.querySelectorAll(".gallery-panel");
    if (galleryPanels.length > 0) {
        gsap.to(galleryPanels, {
            xPercent: -100 * (galleryPanels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".gallery-section",
                pin: true,
                scrub: 1,
                end: () => "+=" + (document.querySelector(".gallery-container").offsetWidth - window.innerWidth)
            }
        });
    }

    // Navbar Navigation & Active States
    const navBg = document.querySelector('.nav-active-bg');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    const updateNavBg = (activeLink) => {
        if (!navBg || !activeLink) return;
        const linkRect = activeLink.getBoundingClientRect();
        const parentRect = activeLink.closest('.nav-links').getBoundingClientRect();
        navBg.style.left = `${linkRect.left - parentRect.left}px`;
        navBg.style.width = `${linkRect.width}px`;
    };

    const initialActive = document.querySelector('.nav-links a.active');
    if (initialActive) setTimeout(() => updateNavBg(initialActive), 100);

    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 300)) current = section.getAttribute('id');
        });
        if (window.scrollY < 100) current = 'home';

        navItems.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href === '#about' && (current === 'about' || current === 'gallery')) {
                a.classList.add('active');
                updateNavBg(a);
            } else if (href.includes(current)) {
                a.classList.add('active');
                updateNavBg(a);
            }
        });

        navbar.classList.toggle('scrolled', window.scrollY > 150);
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('closeBtn');

    if (hamburger && mobileNav) {
        const toggleMenu = (open) => {
            hamburger.classList.toggle('open', open);
            mobileNav.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
            open ? lenis.stop() : lenis.start();
        };

        hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
        if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
        document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    }

    // Set Copyright Year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
});
