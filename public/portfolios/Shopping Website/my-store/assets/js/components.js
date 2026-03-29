/**
 * VOGUEMAN - Custom Components
 * No async fetches — HTML is inlined for guaranteed render timing.
 */

class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="container header-inner">
                    <div class="header-logo"><a href="index.html">VOGUE<span>MAN</span></a></div>
                    <nav class="header-nav">
                        <ul>
                            <div class="nav-indicator"></div>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="shop.html">Shop</a></li>
                            <li><a href="index.html#featured">Collections</a></li>
                            <li><a href="index.html#contact">Contact</a></li>
                        </ul>
                    </nav>
                    <div class="header-actions">
                        <a href="cart.html" class="cart-trigger">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span class="cart-count">0</span>
                        </a>
                        <button class="menu-toggle"><div class="bar"></div><div class="bar"></div></button>
                    </div>
                </div>
            </header>`;

        // Wait one frame so the browser paints the DOM before we calculate positions
        requestAnimationFrame(() => {
            this.highlightActivePage();

            if (typeof updateCartCount === 'function') updateCartCount();
            if (typeof initHeaderLogic === 'function') initHeaderLogic();

            // Only run scrollspy on homepage
            const isHome = window.location.pathname.match(/(index\.html|\/)$/) || window.location.pathname === '/';
            if (isHome && typeof initScrollSpy === 'function') {
                initScrollSpy();
            }
        });

        window.addEventListener('hashchange', () => {
            requestAnimationFrame(() => this.highlightActivePage());
        });
    }

    highlightActivePage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;
        const links = this.querySelectorAll('.header-nav a');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const [cleanHref, hash] = href.split('#');
            let isActive = false;

            const isHomePage = currentPath === 'index.html' || currentPath === '';
            const isLinkHome = cleanHref === 'index.html' || cleanHref === '';

            if (hash) {
                isActive = currentHash === '#' + hash;
            } else {
                isActive = (cleanHref === currentPath) || (isHomePage && isLinkHome);
            }

            link.classList.toggle('active', isActive);
        });

        // Delay indicator update another frame to ensure layout is complete
        requestAnimationFrame(() => {
            if (typeof updateNavIndicator === 'function') updateNavIndicator();
        });
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="container footer-inner">
                    <div class="footer-grid">
                        <div class="footer-brand">
                            <a href="index.html" class="footer-logo">VOGUE<span>MAN</span></a>
                            <p class="footer-desc">Curating the finest in men's fashion since 2014. Excellence in every stitch, style in every second.</p>
                            <div class="social-links">
                                <a href="#">INSTAGRAM</a>
                                <a href="#">TWITTER</a>
                                <a href="#">PINTEREST</a>
                                <a href="#">LINKEDIN</a>
                            </div>
                        </div>
                        <div class="footer-links">
                            <h3>Collection</h3>
                            <ul>
                                <li><a href="shop.html">New Arrivals</a></li>
                                <li><a href="shop.html">Shoes &amp; Boots</a></li>
                                <li><a href="shop.html">Luxury Watches</a></li>
                                <li><a href="shop.html">Tailored Clothing</a></li>
                                <li><a href="shop.html">Winter Essentials</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Sustainability</a></li>
                                <li><a href="#">Craftsmanship</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Press</a></li>
                            </ul>
                        </div>
                        <div class="footer-links">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Sizing Guide</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div class="footer-newsletter">
                            <h3>Newsletter</h3>
                            <p>Join our exclusive community for seasonal drops and private style advisory.</p>
                            <form class="newsletter-form">
                                <input type="email" placeholder="EMAIL ADDRESS" required>
                                <button type="submit">SUBSCRIBE</button>
                            </form>
                            <div class="payment-methods-mini">
                                <span>AMEX</span>
                                <span>VISA</span>
                                <span>MASTERCARD</span>
                                <span>APPLE PAY</span>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="bottom-left">
                            <p>&copy; ${new Date().getFullYear()} VOGUEMAN. ALL RIGHTS RESERVED.</p>
                        </div>
                        <div class="bottom-right">
                            <div class="legal-links">
                                <a href="#">Privacy Policy</a>
                                <a href="#">Terms &amp; Conditions</a>
                                <a href="#">Cookie Policy</a>
                                <a href="#">Accessibility</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>`;
    }
}

if (!customElements.get('site-header')) customElements.define('site-header', SiteHeader);
if (!customElements.get('site-footer')) customElements.define('site-footer', SiteFooter);
