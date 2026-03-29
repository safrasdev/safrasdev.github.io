import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import { SiteReadyContext } from './context/SiteReadyContext'
import PageLoader from './components/PageLoader'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Aurora from './components/Aurora';
import AuroraCursor from './components/AuroraCursor';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  const [siteRevealed, setSiteRevealed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = siteRevealed ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [siteRevealed])

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;

    lenis.scrollTo(0, { immediate: true })
    ScrollTrigger.clearScrollMemory('manual')

    lenis.on('scroll', ScrollTrigger.update);

    const lenisTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);

    const refreshTriggers = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
    refreshTriggers()

    const onPageShow = (e) => {
      if (e.persisted) {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        lenis.scrollTo(0, { immediate: true })
        ScrollTrigger.refresh(true)
      }
    }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      window.removeEventListener('pageshow', onPageShow)
      gsap.ticker.remove(lenisTicker);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    if (!siteRevealed) return
    const id = requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.lenis?.scrollTo(0, { immediate: true })
      ScrollTrigger.clearScrollMemory('manual')
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [siteRevealed])

  return (
    <SiteReadyContext.Provider value={siteRevealed}>
      {!siteRevealed && <PageLoader onComplete={() => setSiteRevealed(true)} />}
      <AuroraCursor />
      <ScrollIndicator />
      <Header />
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0" style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }}>
          <Aurora
            colorStops={['#8ff5ff', '#ff6b98', '#ac89ff']}
            amplitude={1.2}
            blend={0.6}
            speed={0.5}
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <main className="relative z-10 overflow-hidden bg-transparent">
        <div className="noise-bg fixed inset-0 pointer-events-none z-[100]"></div>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </SiteReadyContext.Provider>
  )
}

export default App
