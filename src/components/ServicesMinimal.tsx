import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Send } from 'lucide-react';
import { CORE_SERVICES, CoreServiceItem } from '../data/mockData';

interface ServicesMinimalProps {
  currentLang: 'en' | 'ar';
  onOpenRfp?: (serviceTitle?: string) => void;
}

interface ServiceCard3DProps {
  service: CoreServiceItem;
  currentIndex: number;
  direction: number;
  total: number;
  isRtl: boolean;
  currentLang: 'en' | 'ar';
  onOpenRfp?: (serviceTitle?: string) => void;
}

const ServiceCard3D: React.FC<ServiceCard3DProps> = ({
  service,
  currentIndex,
  direction,
  total,
  isRtl,
  currentLang,
  onOpenRfp,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Interactive Mouse Gyro Tilt & Specular Sheen
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220 };
  const hoverRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const hoverRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, 90]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 90]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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

  const yOffset = direction >= 0 ? 35 : -35;
  const rotXOffset = direction >= 0 ? 6 : -6;

  return (
    <motion.div
      key={service.num}
      initial={{ opacity: 0, y: yOffset, scale: 0.94, rotateX: rotXOffset }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -yOffset, scale: 0.94, rotateX: -rotXOffset }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 28,
        mass: 0.5,
      }}
      style={{
        perspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      className="w-full flex items-center justify-center will-change-transform"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: hoverRotateX,
          rotateY: hoverRotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1400,
        }}
        className="w-full max-w-6xl rounded-3xl bg-zinc-950/90 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_60px_rgba(255,255,255,0.04)] select-none group relative overflow-hidden transition-shadow duration-500"
      >
        {/* Dynamic Specular Sheen Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[4]"
          style={{
            background: `radial-gradient(circle 420px at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.12), transparent 70%)`,
          }}
        />

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.05] transition-colors duration-700" />

        {/* 🌟 2-Column Responsive Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-9 items-center relative z-10">
          
          {/* Column 1: Grand 3D Architectural Image (7 Cols) */}
          <div className="lg:col-span-7 order-1 lg:order-none">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl group/img">
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-[-8%] w-[116%] h-[116%] will-change-transform z-0"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700 ease-out"
                />
              </motion.div>

              {/* Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[1]" />
              <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />

              {/* Floating Top HUD Pills */}
              <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-black/65 backdrop-blur-xl text-zinc-200 shadow-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentLang === 'ar' ? 'معتمد وفق الكود السعودي' : 'SBC Certified Execution'}</span>
                </span>

                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase bg-white text-black shadow-xl">
                  {service.num} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Information & Engineering Scope Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-4 order-2 lg:order-none">
            
            <div className="space-y-2.5 sm:space-y-3.5">
              {/* Giant Ghost Watermark Number */}
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-zinc-700/60 group-hover:text-zinc-500 transition-colors duration-500 tracking-tighter">
                  {service.num}
                </span>

                <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-[11px] font-mono shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentLang === 'ar' ? 'قطاع مقاولات رئيسي' : 'Core Discipline'}</span>
                </div>
              </div>

              {/* Discipline Title */}
              <h3
                className={`text-lg sm:text-xl lg:text-2xl font-black text-white group-hover:text-zinc-100 transition-colors uppercase leading-snug ${
                  isRtl ? 'font-arabic font-black' : 'font-heading tracking-tight'
                }`}
              >
                {currentLang === 'ar' ? service.titleAr : service.title}
              </h3>

              {/* Narrative Description */}
              <p
                className={`text-xs sm:text-sm text-zinc-300 leading-relaxed font-light ${
                  isRtl ? 'font-arabic leading-[1.8]' : 'font-sans'
                }`}
              >
                {currentLang === 'ar' ? service.descAr : service.desc}
              </p>
            </div>

            {/* Tags & Action Buttons */}
            <div className="space-y-3 pt-1">
              {/* Capabilities & Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(currentLang === 'ar' ? service.tagsAr : service.tags).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 backdrop-blur-md text-zinc-300 text-[11px] sm:text-xs font-mono font-medium shadow-sm transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct Inquiry Action Trigger */}
              {onOpenRfp && (
                <div className="pt-1">
                  <button
                    onClick={() => onOpenRfp(currentLang === 'ar' ? service.titleAr : service.title)}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer group/btn"
                  >
                    <span>{currentLang === 'ar' ? 'طلب تسعير ومواصفات فنية' : 'Request Discipline RFP'}</span>
                    <Send className={`w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${isRtl ? 'rotate-[180deg]' : ''}`} />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesMinimal: React.FC<ServicesMinimalProps> = ({ currentLang, onOpenRfp }) => {
  const isRtl = currentLang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLocked = useRef(false);
  const isTransitioning = useRef(false);
  const lockGraceUntil = useRef(0);
  const lastTriggerTime = useRef(0);

  const total = CORE_SERVICES.length;
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Preload all discipline images for zero latency
  useEffect(() => {
    CORE_SERVICES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // 🌟 Silky-Smooth Scroll-Lock Detection
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

      // 1. Approach from above (scrolling down into services)
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
        setDirection(1);
        currentIndexRef.current = 0;
        setCurrentIndex(0);
      }
      // 2. Approach from below (scrolling up into services)
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
        const lastIdx = total - 1;
        setDirection(-1);
        currentIndexRef.current = lastIdx;
        setCurrentIndex(lastIdx);
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [total]);

  // 🌟 Silky-Smooth Scroll Stepping with Inertia Dampening & Reversible Direction
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

      if (e.deltaY > 0) {
        // Scrolling down -> Move to next discipline
        if (currentIndexRef.current < total - 1) {
          lastTriggerTime.current = now;
          const nextIdx = currentIndexRef.current + 1;
          setDirection(1);
          currentIndexRef.current = nextIdx;
          setCurrentIndex(nextIdx);
        } else {
          // At the last discipline -> Unlock and smoothly continue scrolling down to contact
          lastTriggerTime.current = now;
          isLocked.current = false;
          isTransitioning.current = true;
          lenis?.start();
          lenis?.scrollTo('#contact', {
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
      } else if (e.deltaY < 0) {
        // Scrolling up -> Move to previous discipline
        if (currentIndexRef.current > 0) {
          lastTriggerTime.current = now;
          const prevIdx = currentIndexRef.current - 1;
          setDirection(-1);
          currentIndexRef.current = prevIdx;
          setCurrentIndex(prevIdx);
        } else {
          // At the first discipline -> Unlock and smoothly continue scrolling up to works
          lastTriggerTime.current = now;
          isLocked.current = false;
          isTransitioning.current = true;
          lenis?.start();
          lenis?.scrollTo('#works', {
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
      }
    };

    window.addEventListener('wheel', handleWheelCapture, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', handleWheelCapture);
  }, [total]);

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

      // Check if swipe dominates
      if (Math.abs(diffX) > 30 || Math.abs(diffY) > 30) {
        const isNext = isRtl ? diffX < -30 || diffY > 30 : diffX > 30 || diffY > 30;
        const lenis = (window as any).__lenis;

        if (isNext) {
          if (currentIndexRef.current < total - 1) {
            const nextIdx = currentIndexRef.current + 1;
            setDirection(1);
            currentIndexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
          } else {
            isLocked.current = false;
            isTransitioning.current = true;
            lenis?.start();
            lenis?.scrollTo('#contact', {
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
        } else {
          if (currentIndexRef.current > 0) {
            const prevIdx = currentIndexRef.current - 1;
            setDirection(-1);
            currentIndexRef.current = prevIdx;
            setCurrentIndex(prevIdx);
          } else {
            isLocked.current = false;
            isTransitioning.current = true;
            lenis?.start();
            lenis?.scrollTo('#works', {
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
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRtl, total]);

  const handlePrev = useCallback(() => {
    const next = currentIndexRef.current > 0 ? currentIndexRef.current - 1 : total - 1;
    setDirection(-1);
    currentIndexRef.current = next;
    setCurrentIndex(next);
  }, [total]);

  const handleNext = useCallback(() => {
    const next = currentIndexRef.current < total - 1 ? currentIndexRef.current + 1 : 0;
    setDirection(1);
    currentIndexRef.current = next;
    setCurrentIndex(next);
  }, [total]);

  const handleSelectDiscipline = (idx: number) => {
    setDirection(idx > currentIndexRef.current ? 1 : -1);
    currentIndexRef.current = idx;
    setCurrentIndex(idx);
  };

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
      id="services"
      ref={containerRef}
      className="h-screen max-h-[100dvh] pt-3 sm:pt-5 pb-3 sm:pb-4 bg-black text-white relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 🌟 Atmospheric Dynamic Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-zinc-800/15 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between">
        
        {/* 🌟 Section Header with Category Stepper Navigation & Tactile Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-2 gap-2 shrink-0">
          <div className="space-y-0.5">
            <div
              className={`flex items-center space-x-2 rtl:space-x-reverse ${
                isRtl ? 'text-[11px] font-arabic font-semibold text-zinc-400' : 'text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-[0.25em]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>03 • {currentLang === 'ar' ? 'القطاعات والقدرات الإنشائية' : 'Core Disciplines'}</span>
            </div>

            <h2
              className={
                isRtl
                  ? 'text-base sm:text-lg lg:text-xl font-arabic font-black text-white leading-tight'
                  : 'text-lg sm:text-xl lg:text-2xl font-heading font-black text-white tracking-tight uppercase leading-tight'
              }
            >
              {currentLang === 'ar' ? 'حلول هندسية متكاملة وفق أعلى المعايير' : 'Integrated Contracting & Engineering'}
            </h2>
          </div>

          {/* Stepper Controls: Quick Jump Buttons & Tactile Arrows */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Stepper Pills */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse bg-zinc-900/60 backdrop-blur-md p-1 rounded-full shadow-md">
              {CORE_SERVICES.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.num}
                    onClick={() => handleSelectDiscipline(idx)}
                    className={`relative px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all duration-300 cursor-pointer ${
                      isActive ? 'text-black font-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDisciplinePill"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{s.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Tactile Previous / Next Buttons */}
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

        {/* 🌟 1-by-1 3D Parallax Canvas Stage */}
        <div className="relative w-full flex-1 my-auto flex items-center justify-center overflow-visible">
          <AnimatePresence mode="wait">
            <ServiceCard3D
              key={CORE_SERVICES[currentIndex].num}
              service={CORE_SERVICES[currentIndex]}
              currentIndex={currentIndex}
              direction={direction}
              total={total}
              isRtl={isRtl}
              currentLang={currentLang}
              onOpenRfp={onOpenRfp}
            />
          </AnimatePresence>
        </div>

        {/* 🌟 Footer Scrubber & Navigation HUD */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 shrink-0">
          
          {/* Active Index Counter & Title */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-[11px] font-mono text-zinc-400">
            <span className="text-white font-bold text-xs sm:text-sm">{CORE_SERVICES[currentIndex]?.num}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">{String(total).padStart(2, '0')}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-200 truncate max-w-[280px] hidden md:inline-block font-medium">
              {currentLang === 'ar'
                ? CORE_SERVICES[currentIndex]?.titleAr
                : CORE_SERVICES[currentIndex]?.title}
            </span>
          </div>

          {/* Interactive Progress Segments */}
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            {CORE_SERVICES.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectDiscipline(idx)}
                  className={`relative h-1.5 rounded-full transition-all duration-400 cursor-pointer overflow-hidden ${
                    isActive ? 'w-8 bg-zinc-800' : 'w-2 bg-zinc-900 hover:bg-zinc-700'
                  }`}
                  title={`Discipline ${idx + 1}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDisciplineScrubber"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Instruction Guidance */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="hidden sm:inline font-medium">
              {currentLang === 'ar'
                ? 'مرّر بالفأرة أو اسحب للتنقل بين كافة القطاعات الإنشائية'
                : 'Scroll wheel or swipe to tour all disciplines'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesMinimal;
