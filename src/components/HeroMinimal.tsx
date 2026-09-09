import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { InteractiveDotDispersionCanvas } from './InteractiveDotDispersionCanvas';

interface HeroMinimalProps {
  currentLang: 'en' | 'ar';
  onExplore?: () => void;
}

// Split-flap mechanical flight board variants (for language switch)
const flapVariants = {
  initial: {
    opacity: 0,
    rotateX: -70,
    y: 12,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    rotateX: 70,
    y: -12,
    transition: {
      duration: 0.20,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

export const HeroMinimal: React.FC<HeroMinimalProps> = ({ currentLang }) => {
  const { scrollY } = useScroll();

  const smoothProgress = useSpring(
    useTransform(scrollY, [0, 240], [0, 1]),
    { stiffness: 120, damping: 26 }
  );

  // Cinematic scroll disassembly
  const headingOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const headingY = useTransform(smoothProgress, [0, 1], [0, -35]);
  const headingScale = useTransform(smoothProgress, [0, 0.8], [1, 0.96]);

  const subtextOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const subtextY = useTransform(smoothProgress, [0, 1], [0, -20]);

  const isRtl = currentLang === 'ar';

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-start pt-4 sm:pt-6 pb-16 bg-transparent overflow-hidden select-none">
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-zinc-900/20 via-zinc-950/10 to-transparent pointer-events-none z-0" />

      {/* Spacing for the Floating Emblem */}
      <div className="h-[360px] sm:h-[385px] md:h-[405px] w-full flex items-center justify-center pointer-events-none select-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center mt-2 w-full">
        {/* Company Title & Statement */}
        <motion.div
          style={{ 
            opacity: headingOpacity, 
            y: headingY,
            scale: headingScale,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-3xl mx-auto w-full"
        >
          {/* Headline Container with Fixed Height & 3D Perspective */}
          <div 
            className="min-h-[84px] sm:min-h-[105px] md:min-h-[120px] flex items-center justify-center relative w-full"
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`hero-headline-${currentLang}`}
                variants={flapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                className="w-full text-center"
              >
                {isRtl ? (
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-arabic font-black text-white leading-[1.45] sm:leading-[1.55]">
                    ريادة في البناء • تميز في الإنجاز
                  </h1>
                ) : (
                  <h1 className="text-2xl sm:text-3xl md:text-[2.6rem] lg:text-[3.0rem] font-heading font-black tracking-tight text-white uppercase leading-[1.3] sm:leading-[1.35]">
                    <span className="block">ARCHITECTURE. ENGINEERING.</span>
                    <span className="block text-zinc-200 mt-1 sm:mt-1.5">CONSTRUCTION.</span>
                  </h1>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtitle Container with Fixed Height & 3D Perspective */}
          <motion.div 
            style={{ opacity: subtextOpacity, y: subtextY }}
            className="min-h-[52px] sm:min-h-[48px] flex items-center justify-center relative w-full"
          >
            <div 
              className="w-full flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`hero-sub-${currentLang}`}
                  variants={flapVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  className="w-full text-center"
                >
                  <p 
                    className={isRtl 
                      ? 'text-sm sm:text-base text-zinc-300 font-arabic font-normal leading-[1.8] sm:leading-[1.9] max-w-2xl mx-auto' 
                      : 'text-sm sm:text-base text-zinc-300 font-normal leading-relaxed tracking-wide max-w-xl mx-auto'
                    }
                  >
                    {isRtl
                      ? 'مقاولات عامة متكاملة، هياكل حديدية، وتشطيبات معمارية فاخرة عبر المملكة العربية السعودية.'
                      : 'Integrated general contracting, structural steel engineering, and architectural finishes across Saudi Arabia.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
