// Main functionality for VOGUEMAN

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Page entrance animation
    gsap.from('body', {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
    });

    // Smooth Scroll for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const target = document.querySelector(targetId);
            if (target && typeof lenis !== 'undefined') {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -70 });
            }
        });
    });
});

// Scroll Spy Logic for dynamic nav indicators
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.header-nav a');
    const sectionIds = ['hero', 'featured', 'contact'];
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    let isActive = false;

                    if (id === 'hero') {
                        isActive = (href === 'index.html' || href === './' || href === '/');
                    } else {
                        isActive = href.includes('#' + id);
                    }

                    if (isActive) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        // SLIDE INDICATOR
                        updateNavIndicator();
                    }
                });
            }
        });
    }, observerOptions);

    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Initial positioning
    updateNavIndicator();
}

function updateNavIndicator() {
    const activeLink = document.querySelector('.header-nav a.active');
    const indicator = document.querySelector('.nav-indicator');
    const navUl = document.querySelector('.header-nav ul');
    
    if (activeLink && indicator && navUl) {
        const parentLeft = navUl.getBoundingClientRect().left;
        const linkRect = activeLink.getBoundingClientRect();
        
        indicator.style.transform = `translateX(${linkRect.left - parentLeft}px)`;
        indicator.style.width = `${linkRect.width}px`;
        indicator.classList.add('visible');
    } else if (indicator) {
        indicator.classList.remove('visible');
    }
}

// Header specific logic
function initHeaderLogic() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header-nav');

    if (menuToggle && nav && menuToggle.parentNode) {
        // Remove existing listener if any to avoid double triggers
        const newToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newToggle, menuToggle);
        
        newToggle.addEventListener('click', () => {
            const isActive = nav.classList.contains('active');
            
            if (!isActive) {
                // OPENING
                nav.classList.add('active');
                newToggle.classList.add('is-active');
                
                // Slide curtain in
                gsap.to(nav, { x: "0%", duration: 0.8, ease: "power4.out", overwrite: true });
                
                // Stagger links in after a delay
                gsap.fromTo(nav.querySelectorAll('li'), 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.4, ease: "power3.out", overwrite: true }
                );
                document.body.style.overflow = 'hidden';
            } else {
                // CLOSING
                // 1. Stagger links out
                gsap.to(nav.querySelectorAll('li'), {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.in",
                    overwrite: true
                });

                // 2. Slide curtain out slightly later
                gsap.to(nav, { 
                    x: "100%", 
                    duration: 0.6, 
                    delay: 0.2, 
                    ease: "power4.in",
                    overwrite: true,
                    onComplete: () => {
                        nav.classList.remove('active');
                        newToggle.classList.remove('is-active');
                        document.body.style.overflow = '';
                        gsap.set(nav.querySelectorAll('li'), { opacity: 0, y: 30 });
                    }
                });
            }
        });

        // Close menu on link click (with enhanced Outro Animation)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // 1. Stagger out
                gsap.to(nav.querySelectorAll('li'), {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.in",
                    overwrite: true
                });

                // 2. Slide curtain out
                gsap.to(nav, { 
                    x: "100%", 
                    duration: 0.6, 
                    delay: 0.2, 
                    ease: "power4.in",
                    overwrite: true,
                    onComplete: () => {
                        nav.classList.remove('active');
                        newToggle.classList.remove('is-active');
                        document.body.style.overflow = '';
                        gsap.set(nav.querySelectorAll('li'), { opacity: 0, y: 30 });
                    }
                });
            });
        });
    }
}

// Cart logic
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const items = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
        cartCount.textContent = items.length;
    }
}

function addToCart(id, name, price) {
    const product = { id, name, price, img: getProductImg(id) };
    const items = JSON.parse(localStorage.getItem('vogueman_cart') || '[]');
    items.push(product);
    localStorage.setItem('vogueman_cart', JSON.stringify(items));
    
    if (typeof updateCartCount === 'function') updateCartCount();
    
    // Aesthetic notification
    showNotification(`${name} Added to Bag`);
}

function getProductImg(id) {
    // Map IDs to original images for consistency
    const images = {
        1: "https://images.unsplash.com/photo-1616663308968-58162d332720",
        2: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        3: "https://i.pinimg.com/736x/3c/7f/ca/3c7fca9a5265752950554214a967a0d6.jpg",
        4: "https://www.urbanrider.co.uk/media/catalog/product/cache/059381bd7ffb1f896f935f29bf8190e8/f/s/fso014_6370mf_300rgb08_1.jpg",
        5: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        6: "https://www.giorgiomilano.com/cdn/shop/files/234RG023_550x550.jpg?v=1773178022"
    };
    return images[id] || "";
}

function showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        background: #000;
        color: #fff;
        padding: 20px 40px;
        z-index: 10000;
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.6s forwards';
        setTimeout(() => toast.remove(), 600);
    }, 3000);
}
