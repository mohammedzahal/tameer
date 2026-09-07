import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Eye, MapPin, ChevronLeft, ChevronRight, Layers, Maximize2, Sparkles, Building2 } from 'lucide-react';
import { CURATED_PROJECTS, MinimalProject } from '../data/mockData';

interface PortfolioMinimalProps {
  currentLang: 'en' | 'ar';
  onSelectProject: (project: MinimalProject) => void;
}

interface ParallaxCardProps {
  project: MinimalProject;
  idx: number;
  currentIndex: number;
  total: number;
  cardWidth: number;
  isRtl: boolean;
  currentLang: 'en' | 'ar';
  isActive: boolean;
  onActivate: () => void;
  onSelectProject: (project: MinimalProject) => void;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  project,
  idx,
  currentIndex,
  total,
  cardWidth,
  isRtl,
  currentLang,
  isActive,
  onActivate,
  onSelectProject,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const offset = idx - currentIndex;
  const absOffset = Math.abs(offset);
  const formattedIndex = String(idx + 1).padStart(2, '0');

  // 3D Interactive Mouse Tilt & Specular Sheen
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 200 };
  const hoverRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const hoverRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, 90]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 90]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 🌟 3D Cylindrical Arc Stage Coordinates
  const baseRotateY = isRtl
    ? Math.max(Math.min(offset * 26, 40), -40)
    : Math.max(Math.min(-offset * 26, 40), -40);

  const translateZ = isActive ? 40 : -Math.min(absOffset * 140, 340);
  const scale = isActive ? 1 : Math.max(0.92 - absOffset * 0.08, 0.78);
  const opacity = isActive ? 1 : Math.max(0.7 - absOffset * 0.18, 0.25);
  const zIndex = 50 - Math.min(absOffset * 10, 40);

  // Parallax displacement of internal image for stereoscopic depth
  const imageParallaxOffset = isRtl
    ? offset * 50
    : -offset * 50;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (isActive) {
          onSelectProject(project);
        } else {
          onActivate();
        }
      }}
      animate={{
        scale,
        opacity,
        rotateY: baseRotateY,
        z: translateZ,
        y: isActive ? 0 : 6,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 28,
        mass: 0.5,
      }}
      style={{
        width: cardWidth,
        zIndex,
        rotateX: isActive ? hoverRotateX : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 1400,
      }}
      className={`relative shrink-0 h-[310px] sm:h-[350px] md:h-[390px] lg:h-[425px] rounded-3xl overflow-hidden cursor-pointer select-none group flex flex-col justify-between transition-all duration-300 ${
        isActive
          ? 'bg-zinc-950 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_60px_rgba(255,255,255,0.06)]'
          : 'bg-zinc-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
      }`}
    >
      {/* 🌟 Grand Full-Canvas Architectural Image with Deep Stereoscopic Parallax */}
      <motion.div
        animate={{
          x: imageParallaxOffset,
          scale: isActive ? 1.05 : 1.15,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[-10%] w-[120%] h-[120%] will-change-transform z-0"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-100 transition-all duration-500"
        />
      </motion.div>

      {/* Cinematic Dual Gradient Scrims for Flawless Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 z-[1] pointer-events-none" />

      {/* 🌟 3D Atmospheric Depth Dimmer for Inactive Cards */}
      <motion.div
        animate={{
          opacity: isActive ? 0 : Math.min(0.25 + absOffset * 0.25, 0.75),
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black pointer-events-none z-[2]"
      />

      {/* Dynamic Specular Sheen Glare */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[3]"
        style={{
          background: `radial-gradient(circle 380px at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.18), transparent 70%)`,
        }}
      />

      {/* 🌟 Top Floating HUD Bar (Borderless Frosted Pills) */}
      <div className="relative z-10 p-3 sm:p-4 md:p-5 flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-white tracking-widest bg-black/60 backdrop-blur-xl px-2.5 py-1 rounded-lg shadow-md">
            {formattedIndex}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-xl text-zinc-200 flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentLang === 'ar' ? project.categoryAr : project.category}</span>
          </span>
        </div>

        <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-black tracking-wider uppercase bg-white text-black shadow-xl">
          {project.value}
        </span>
      </div>

      {/* Center "Inspect Project" Floating Pill on Hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="px-4 py-2 rounded-full bg-white text-black font-heading font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Eye className="w-3.5 h-3.5" />
          <span>{currentLang === 'ar' ? 'معاينة التفاصيل' : 'Inspect Details'}</span>
          <Maximize2 className="w-3 h-3 opacity-70" />
        </div>
      </div>

      {/* 🌟 Bottom Integrated Typography & Metadata Glass Panel */}
      <div className="relative z-10 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col gap-2">
        {/* Specs & Location Row (Borderless Frosted Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-300">
          <span className="flex items-center space-x-1.5 rtl:space-x-reverse bg-black/60 backdrop-blur-xl px-2.5 py-1 rounded-md text-white font-medium shadow-sm">
            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
            <span>{currentLang === 'ar' ? project.locationAr : project.location}</span>
          </span>
          <span className="bg-black/60 backdrop-blur-xl px-2.5 py-1 rounded-md text-zinc-300 shadow-sm">
            {project.area}
          </span>
          <span className="bg-black/60 backdrop-blur-xl px-2.5 py-1 rounded-md text-zinc-300 shadow-sm">
            {project.year}
          </span>
        </div>

        {/* Project Title & Action Button Row */}
        <div className="flex items-center justify-between gap-3">
          <h3
            className={`text-sm sm:text-base md:text-lg lg:text-xl font-black text-white group-hover:text-zinc-100 transition-colors uppercase leading-tight drop-shadow-md truncate ${
              isRtl ? 'font-arabic' : 'font-heading tracking-tight'
            }`}
          >
            {currentLang === 'ar' ? project.titleAr : project.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project);
            }}
            className="px-3 sm:px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center space-x-1.5 rtl:space-x-reverse shrink-0 group/btn cursor-pointer"
          >
            <span>{currentLang === 'ar' ? 'استعراض' : 'Explore'}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

        {/* Bottom Accent Active Scrub Bar */}
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden mt-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-zinc-300 via-white to-zinc-300 shadow-sm"
            animate={{
              width: isActive ? '100%' : '0%',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const PortfolioMinimal: React.FC<PortfolioMinimalProps> = ({ currentLang, onSelectProject }) => {
  const isRtl = currentLang === 'ar';
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportTrackRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(1200);
  const [cardWidth, setCardWidth] = useState(600);

  const isLocked = useRef(false);
  const isTransitioning = useRef(false);
  const hasCompletedForward = useRef(false);
  const lockGraceUntil = useRef(0);
  const lastTriggerTime = useRef(0);

  const categories = [
    { id: 'all', label: currentLang === 'ar' ? 'جميع المشاريع' : 'All Works' },
    { id: 'commercial', label: currentLang === 'ar' ? 'أبراج ومباني' : 'High-Rise' },
    { id: 'estates', label: currentLang === 'ar' ? 'مجمعات وفلل' : 'Estates' },
    { id: 'industrial', label: currentLang === 'ar' ? 'منشآت ومستودعات' : 'Industrial' },
  ];

  const filteredProjects = CURATED_PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.categoryKey === selectedFilter;
  });

  const currentIndexRef = useRef(currentIndex);
  const filteredProjectsRef = useRef(filteredProjects);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    filteredProjectsRef.current = filteredProjects;
  }, [filteredProjects]);

  // 🌟 Preload all project images for instant display
  useEffect(() => {
    CURATED_PROJECTS.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  // Calculate dynamic card & container width based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        if (w < 640) {
          setCardWidth(Math.floor(w * 0.86));
        } else if (w < 1024) {
          setCardWidth(520);
        } else if (w < 1280) {
          setCardWidth(640);
        } else if (w < 1536) {
          setCardWidth(720);
        } else {
          setCardWidth(780);
        }

        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const gap = 24;
  const slideStep = cardWidth + gap;

  // 🌟 Dead-Center Horizontal Track Math
  // Computes precise track translation so that active card `currentIndex` is dead-center in the container
  const centerOffset = (containerWidth - cardWidth) / 2;
  const trackX = isRtl
    ? -centerOffset + currentIndex * slideStep
    : centerOffset - currentIndex * slideStep;

  // 🌟 Silky-Smooth Center Scroll-Lock Detection
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const checkScrollPosition = () => {
      const section = containerRef.current;
      const lenis = (window as any).__lenis;
      if (!section || isLocked.current || isTransitioning.current) return;

      const rect = section.getBoundingClientRect();
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      lastScrollY = currentY;

      if (Math.abs(diff) < 0.5) return;
      const scrollingDown = diff > 0;
      const scrollingUp = diff < 0;

      // 1. Approach from above (scrolling down into works)
      if (scrollingDown && rect.top <= 80 && rect.top >= -80) {
        isLocked.current = true;
        lockGraceUntil.current = Date.now() + 450; // Absorb approach inertia
        const targetY = section.offsetTop;

        if (Math.abs(rect.top) > 4 && lenis) {
          lenis.scrollTo(targetY, {
            duration: 0.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              lenis?.stop();
            },
          });
        } else {
          lenis?.stop();
        }
        currentIndexRef.current = 0;
        setCurrentIndex(0);
      }
      // 2. Approach from below (scrolling up into works)
      else if (scrollingUp && rect.top >= -80 && rect.top <= 80) {
        isLocked.current = true;
        lockGraceUntil.current = Date.now() + 450; // Absorb approach inertia
        const targetY = section.offsetTop;

        if (Math.abs(rect.top) > 4 && lenis) {
          lenis.scrollTo(targetY, {
            duration: 0.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              lenis?.stop();
            },
          });
        } else {
          lenis?.stop();
        }
        const lastIdx = filteredProjectsRef.current.length - 1;
        currentIndexRef.current = lastIdx;
        setCurrentIndex(lastIdx);
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // 🌟 Silky-Smooth Scroll Stepping with Inertia Dampening
  useEffect(() => {
    const handleWheelCapture = (e: WheelEvent) => {
      if (!isLocked.current) return;

      // Strictly stop page scroll
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      // Absorb lingering scroll inertia on landing
      if (now < lockGraceUntil.current) return;

      if (Math.abs(e.deltaY) < 18) return;

      const COOLDOWN_MS = 280;
      if (now - lastTriggerTime.current < COOLDOWN_MS) return;

      const lenis = (window as any).__lenis;
      const total = filteredProjectsRef.current.length;

      if (e.deltaY > 0) {
        // Scrolling down -> Move to next project
        if (currentIndexRef.current < total - 1) {
          lastTriggerTime.current = now;
          const nextIdx = currentIndexRef.current + 1;
          currentIndexRef.current = nextIdx;
          setCurrentIndex(nextIdx);
        } else {
          // At the last card -> Unlock and smoothly glide down to #services
          lastTriggerTime.current = now;
          isLocked.current = false;
          isTransitioning.current = true;
          lenis?.start();
          lenis?.scrollTo('#services', {
            offset: 0,
            duration: 1.1,
            onComplete: () => {
              isTransitioning.current = false;
            },
          });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 1200);
        }
      } else if (e.deltaY < 0) {
        // Scrolling up -> Move to previous project
        if (currentIndexRef.current > 0) {
          lastTriggerTime.current = now;
          const prevIdx = currentIndexRef.current - 1;
          currentIndexRef.current = prevIdx;
          setCurrentIndex(prevIdx);
        } else {
          // At the first card -> Unlock and smoothly glide up to #about
          lastTriggerTime.current = now;
          isLocked.current = false;
          isTransitioning.current = true;
          lenis?.start();
          lenis?.scrollTo('#about', {
            offset: -20,
            duration: 1.1,
            onComplete: () => {
              isTransitioning.current = false;
            },
          });
          setTimeout(() => {
            isTransitioning.current = false;
          }, 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheelCapture, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', handleWheelCapture);
  }, []);

  // Touch Swipe gestures support
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLocked.current) return;
      const now = Date.now();
      if (now < lockGraceUntil.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Check if horizontal or vertical swipe dominates
      if (Math.abs(diffX) > 30 || Math.abs(diffY) > 30) {
        const isNext = isRtl ? diffX < -30 || diffY > 30 : diffX > 30 || diffY > 30;
        const total = filteredProjectsRef.current.length;
        const lenis = (window as any).__lenis;

        if (isNext) {
          if (currentIndexRef.current < total - 1) {
            const nextIdx = currentIndexRef.current + 1;
            currentIndexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
          } else {
            isLocked.current = false;
            isTransitioning.current = true;
            lenis?.start();
            lenis?.scrollTo('#services', {
              offset: 0,
              duration: 1.1,
              onComplete: () => {
                isTransitioning.current = false;
              },
            });
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1200);
          }
        } else {
          if (currentIndexRef.current > 0) {
            const prevIdx = currentIndexRef.current - 1;
            currentIndexRef.current = prevIdx;
            setCurrentIndex(prevIdx);
          } else {
            isLocked.current = false;
            isTransitioning.current = true;
            lenis?.start();
            lenis?.scrollTo('#about', {
              offset: -20,
              duration: 1.1,
              onComplete: () => {
                isTransitioning.current = false;
              },
            });
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1200);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRtl]);

  const handleFilterChange = (catId: string) => {
    setSelectedFilter(catId);
    currentIndexRef.current = 0;
    setCurrentIndex(0);
  };

  const handlePrev = useCallback(() => {
    const total = filteredProjectsRef.current.length;
    const next = currentIndexRef.current > 0 ? currentIndexRef.current - 1 : total - 1;
    currentIndexRef.current = next;
    setCurrentIndex(next);
  }, []);

  const handleNext = useCallback(() => {
    const total = filteredProjectsRef.current.length;
    const next = currentIndexRef.current < total - 1 ? currentIndexRef.current + 1 : 0;
    currentIndexRef.current = next;
    setCurrentIndex(next);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (isRtl) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) handlePrev();
        else handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isRtl]);

  return (
    <section
      id="works"
      ref={containerRef}
      className="h-screen max-h-[100dvh] pt-3 sm:pt-5 pb-3 sm:pb-4 bg-black text-white relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 🌟 Atmospheric Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-zinc-800/15 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between">
        
        {/* 🌟 Compact Section Header with Category Filter Tabs & Tactile Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-2 gap-2 shrink-0">
          <div className="space-y-0.5">
            <div
              className={`flex items-center space-x-2 rtl:space-x-reverse ${
                isRtl ? 'text-[11px] font-arabic font-semibold text-zinc-400' : 'text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-[0.25em]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>02 • {currentLang === 'ar' ? 'المشاريع الاستراتيجية' : 'Selected Works'}</span>
            </div>

            <h2
              className={
                isRtl
                  ? 'text-base sm:text-lg lg:text-xl font-arabic font-black text-white leading-tight'
                  : 'text-lg sm:text-xl lg:text-2xl font-heading font-black text-white tracking-tight uppercase leading-tight'
              }
            >
              {currentLang === 'ar' ? 'صروح معمارية بأعلى معايير الإتقان' : 'Engineered Landmarks & Monoliths'}
            </h2>
          </div>

          {/* Controls Bar: Category Filters & Tactile Carousel Arrows */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Pills (Borderless Frosted Buttons) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const active = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange(cat.id)}
                    className={`relative px-3.5 py-1 rounded-full transition-all duration-300 cursor-pointer text-[10px] sm:text-[11px] ${
                      isRtl ? 'font-arabic font-medium' : 'font-mono font-bold tracking-wider uppercase'
                    } ${
                      active
                        ? 'text-black shadow-lg font-bold'
                        : 'text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/80 backdrop-blur-md'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="portfolioCatActive"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tactile Previous / Next Buttons (Borderless Frosted Pill) */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse rounded-full p-0.5 bg-zinc-900/70 backdrop-blur-md shadow-md">
              <button
                onClick={isRtl ? handleNext : handlePrev}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer"
                title={isRtl ? 'التالي' : 'Previous'}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={isRtl ? handlePrev : handleNext}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer"
                title={isRtl ? 'السابق' : 'Next'}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 🌟 3D Parallax Carousel Viewport */}
        <div
          ref={viewportTrackRef}
          style={{
            perspective: 1400,
            transformStyle: 'preserve-3d',
          }}
          className="relative py-1 overflow-visible w-full my-auto"
        >
          <motion.div
            animate={{
              x: trackX,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 28,
              mass: 0.5,
            }}
            style={{
              gap: `${gap}px`,
              transformStyle: 'preserve-3d',
            }}
            className="flex items-center will-change-transform"
          >
            {filteredProjects.map((project, idx) => (
              <ParallaxCard
                key={project.id}
                project={project}
                idx={idx}
                currentIndex={currentIndex}
                total={filteredProjects.length}
                cardWidth={cardWidth}
                isRtl={isRtl}
                currentLang={currentLang}
                isActive={idx === currentIndex}
                onActivate={() => setCurrentIndex(idx)}
                onSelectProject={onSelectProject}
              />
            ))}
          </motion.div>
        </div>

        {/* 🌟 Carousel Scrubber & Navigation Footer HUD */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 shrink-0">
          
          {/* Index Counter */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-[11px] font-mono text-zinc-400">
            <span className="text-white font-bold text-xs sm:text-sm">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">{String(filteredProjects.length).padStart(2, '0')}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 truncate max-w-[260px] hidden md:inline-block font-medium">
              {currentLang === 'ar'
                ? filteredProjects[currentIndex]?.titleAr
                : filteredProjects[currentIndex]?.title}
            </span>
          </div>

          {/* Interactive Dynamic Progress Segments */}
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            {filteredProjects.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-1.5 rounded-full transition-all duration-400 cursor-pointer overflow-hidden ${
                    isActive ? 'w-8 bg-zinc-800' : 'w-2 bg-zinc-900 hover:bg-zinc-700'
                  }`}
                  title={`Project ${idx + 1}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeScrubber"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint & Guidance */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="hidden sm:inline font-medium">
              {currentLang === 'ar'
                ? 'مرّر بالفأرة أو اسحب للتنقل بين كافة المشاريع'
                : 'Scroll wheel or swipe to tour all projects'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PortfolioMinimal;
