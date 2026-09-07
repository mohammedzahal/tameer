import React, { useState, useEffect, useRef } from 'react';
import { Lottie, LottieHandle } from 'lottie-react';
import tameerAnimationData from '../assets/tameer-logo-animation.json';

interface SplashScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  durationMs = 4000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const lottieRef = useRef<LottieHandle>(null);
  const timerRef = useRef<number | null>(null);

  const dismissSplash = () => {
    if (isFading || !isVisible) return;
    setIsFading(true);
    
    // Allow 1000ms transition before unmounting
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 1000);
  };

  useEffect(() => {
    // Disable scrolling during intro splash
    document.body.style.overflow = 'hidden';

    // Auto-dismiss timeout fallback (4 seconds matching 240 frames @ 60fps)
    timerRef.current = window.setTimeout(() => {
      dismissSplash();
    }, durationMs);

    return () => {
      document.body.style.overflow = '';
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="tameer-splash-screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] transition-opacity duration-1000 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Centered Vector Animated Logo (Lottie 60fps) */}
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] flex items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          src={tameerAnimationData}
          loop={false}
          autoplay={true}
          subscriptions={{
            complete: dismissSplash,
          }}
          className="w-full h-full"
        />
      </div>

      {/* Clean Bottom-Right Skip Button */}
      <button
        onClick={dismissSplash}
        type="button"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center space-x-2 rtl:space-x-reverse shadow-lg"
      >
        <span>SKIP</span>
        <span className="text-zinc-600">→</span>
      </button>
    </div>
  );
};


