import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const logoVideo = '/tameer-logo-anim.mp4';

interface MorphingLogoProps {
  currentLang: 'en' | 'ar';
  isScrolled: boolean;
  isNavHidden: boolean;
  introFinished?: boolean;
}

export const MorphingLogo: React.FC<MorphingLogoProps> = ({ 
  currentLang,
  isScrolled,
  isNavHidden,
  introFinished: externalIntroFinished,
}) => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [internalIntroFinished, setInternalIntroFinished] = useState(false);
  const introFinished = externalIntroFinished !== undefined ? externalIntroFinished : internalIntroFinished;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 3.0s: Video finishes drawing in center, then smoothly glides down to hero spot
    const timer = setTimeout(() => {
      setInternalIntroFinished(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Distance from screen center (50vw) to the target navbar slot
  const maxContentWidth = 1280;
  const horizontalPadding = viewportWidth < 640 ? 12 : (viewportWidth < 1024 ? 24 : 32);
  const edgeDistance = Math.max(
    horizontalPadding,
    (viewportWidth - maxContentWidth) / 2 + horizontalPadding
  );
  
  // In RTL (Arabic), the logo docks on the TOP-RIGHT corner (+X)
  // In LTR (English), the logo docks on the TOP-LEFT corner (-X)
  const isRtl = currentLang === 'ar';
  const logoCenterOffset = viewportWidth < 640 ? 30 : 46;
  const deltaX = viewportWidth / 2 - edgeDistance - logoCenterOffset;
  const targetTranslateX = isRtl ? deltaX : -deltaX;
  const targetScale = viewportWidth < 640 ? 0.17 : 0.205;

  // Exact vertical targets relative to screen vertical center (50vh)
  // Shifted downward for balanced, spacious placement
  const introTargetY = viewportWidth < 640 ? 15 : 28;
  const heroTargetY = (viewportWidth < 640 ? 215 : 290) - viewportHeight / 2;
  const navbarTargetY = (viewportWidth < 640 ? 32 : 48) - viewportHeight / 2;

  const currentX = isScrolled ? targetTranslateX : 0;
  const currentY = isScrolled 
    ? (isNavHidden ? navbarTargetY - 100 : navbarTargetY) 
    : (introFinished ? heroTargetY : introTargetY);
  const currentOpacity = isScrolled && isNavHidden ? 0 : 1;
  const currentScale = isScrolled 
    ? targetScale 
    : (introFinished ? (viewportWidth < 640 ? 0.48 : 0.62) : (viewportWidth < 640 ? 0.76 : 0.92));

  const handleScrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        transformOrigin: 'center center',
        zIndex: 60,
      }}
      className="pointer-events-none select-none"
    >
      {/* 🌟 3-Stage Cinematic Motion: Grand Center during Intro -> Glides up for Hero -> Docks to Navbar on scroll */}
      <motion.div
        animate={{
          x: currentX,
          y: currentY,
          scale: currentScale,
          opacity: currentOpacity,
        }}
        transition={{
          x: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          y: { duration: isScrolled ? (isNavHidden ? 0.25 : 0.3) : 0.75, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: isScrolled ? 0.3 : 0.75, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        onClick={handleScrollToTop}
        className="pointer-events-auto cursor-pointer group flex items-center justify-center relative"
        title="TAMEER Group - Return to top"
      >
        <div className="relative w-[190px] h-[285px] sm:w-[260px] sm:h-[390px] md:w-[300px] md:h-[450px] flex items-center justify-center pointer-events-none">
          <video
            ref={videoRef}
            src={logoVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setIntroFinished(true)}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

