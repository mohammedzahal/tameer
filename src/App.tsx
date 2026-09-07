import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from 'lenis';

import { MorphingLogo } from './components/MorphingLogo';
import { ScrollLogoHeader } from './components/ScrollLogoHeader';
import { HeroMinimal } from './components/HeroMinimal';
import { PortfolioMinimal } from './components/PortfolioMinimal';
import { AboutMinimal } from './components/AboutMinimal';
import { ServicesMinimal } from './components/ServicesMinimal';
import { ContactMinimal } from './components/ContactMinimal';
import { ProjectModal } from './components/ProjectModal';
import { RfpModal } from './components/RfpModal';
import { MinimalProject } from './data/mockData';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('ar');
  const [selectedProject, setSelectedProject] = useState<MinimalProject | null>(null);
  const [rfpOpen, setRfpOpen] = useState(false);
  const [initialRfpProject, setInitialRfpProject] = useState<string | undefined>(undefined);

  // 🌟 Synchronized Single Source of Truth for Navbar & Morphing Logo Scroll Dynamics
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Instant trigger: As soon as user scrolls >= 8px, dock logo to navbar ASAP
      const isTop = latest < 8;
      setIsScrolled(!isTop);

      const diff = latest - lastScrollY.current;

      if (latest < 220) {
        setIsNavHidden(false);
      } else {
        // Any upward stroke immediately reveals both navbar & logo together
        if (diff < -1.5) {
          setIsNavHidden(false);
        } else if (diff > 3) {
          // Scrolling down smoothly hides navbar and logo simultaneously
          setIsNavHidden(true);
        }
      }

      lastScrollY.current = latest;
    });
  }, [scrollY]);

  // 🌟 Initialize Lenis Smooth Scrolling Engine with Inertial Physics
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor links for buttery-smooth glide
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        const hash = target.hash;
        lenis.start();
        if (hash === '#' || hash === '#top') {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }
        const element = document.querySelector(hash);
        if (element) {
          e.preventDefault();
          const isPinnedSection = hash === '#works' || hash === '#services';
          lenis.scrollTo(element as HTMLElement, { offset: isPinnedSection ? 0 : -20, duration: 1.3 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Pause / Resume smooth scroll when modal is active
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (selectedProject || rfpOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [selectedProject, rfpOpen]);

  // Synchronize HTML document dir and lang attributes
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleOpenRfp = (projectTitle?: string) => {
    setInitialRfpProject(projectTitle);
    setRfpOpen(true);
  };

  const scrollToWorks = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo('#works', { duration: 1.3, offset: 0 });
    } else {
      const el = document.getElementById('works');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleLanguage = () => {
    setCurrentLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const isRtl = currentLang === 'ar';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative min-h-screen bg-black text-slate-100 overflow-x-clip selection:bg-white selection:text-black font-sans"
    >
      {/* 🌟 Tactile Cinematic Film Grain Texture (Inspired by just-a-web-developer.com) */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-40 grain-overlay mix-blend-screen" />

      {/* 🌟 Continuous Morphing Logo (Glides smoothly across navbar when language toggles) */}
      <MorphingLogo 
        currentLang={currentLang} 
        isScrolled={isScrolled} 
        isNavHidden={isNavHidden} 
      />

      {/* Sticky Header with Intuitive Parallax Language Switch */}
      <ScrollLogoHeader
        currentLang={currentLang}
        isScrolled={isScrolled}
        isNavHidden={isNavHidden}
        onToggleLang={toggleLanguage}
        onOpenRfp={() => handleOpenRfp()}
      />

      {/* Main Minimalist Sections */}
      <main className="bg-black">
        {/* 1. Hero Section */}
        <HeroMinimal
          currentLang={currentLang}
          onExplore={scrollToWorks}
        />

        {/* 2. Company Philosophy & Overview */}
        <AboutMinimal currentLang={currentLang} />

        {/* 3. Curated Flagship Works (Portfolio) */}
        <PortfolioMinimal
          currentLang={currentLang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 4. Core Contracting Disciplines */}
        <ServicesMinimal
          currentLang={currentLang}
          onOpenRfp={(title) => handleOpenRfp(title)}
        />

        {/* 5. Direct Engagement & WhatsApp Contact */}
        <ContactMinimal
          currentLang={currentLang}
          onOpenRfp={() => handleOpenRfp()}
        />
      </main>

      {/* Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentLang={currentLang}
        onInquire={(title) => handleOpenRfp(title)}
      />

      {/* Minimal RFP Inquiry Modal */}
      <RfpModal
        isOpen={rfpOpen}
        onClose={() => setRfpOpen(false)}
        initialProject={initialRfpProject}
        currentLang={currentLang}
      />
    </div>
  );
};

export default App;
