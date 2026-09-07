import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LATIN_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789•/-';
const ARABIC_GLYPHS = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';

interface FlightTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  speed?: number; // ms per tick
  stagger?: number; // ms delay per char
  minFlaps?: number;
  triggerKey?: any; // e.g. currentLang
  isRtl?: boolean;
}

export const FlightText: React.FC<FlightTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  speed = 28,
  stagger = 16,
  minFlaps = 5,
  triggerKey,
  isRtl = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevTextRef = useRef(text);
  const timerRef = useRef<any>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load if text hasn't changed
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevTextRef.current = text;
      setDisplayText(text);
      return;
    }

    if (prevTextRef.current === text && triggerKey === undefined) return;
    
    prevTextRef.current = text;
    setIsFlipping(true);

    const isTargetArabic = /[\u0600-\u06FF]/.test(text);
    const glyphs = isTargetArabic ? ARABIC_GLYPHS : LATIN_GLYPHS;
    const targetChars = Array.from(text);
    const currentChars = Array.from(displayText);
    const maxLen = Math.max(targetChars.length, currentChars.length);

    // Track slots for mechanical airport flight board wave
    const slots = Array.from({ length: maxLen }, (_, i) => {
      const charWaveIndex = isRtl ? maxLen - 1 - i : i;
      return {
        target: targetChars[i] || '',
        current: currentChars[i] || '',
        delayTicks: Math.floor((charWaveIndex * stagger) / speed),
        remainingFlaps: minFlaps + Math.floor(Math.random() * 4),
        locked: false,
      };
    });

    let currentTick = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      currentTick++;
      let allLocked = true;

      const newChars = slots.map((slot) => {
        if (slot.locked) return slot.target;

        if (currentTick < slot.delayTicks) {
          allLocked = false;
          return slot.current;
        }

        // Preserve spaces and formatting characters instantly
        if (slot.target === ' ' || slot.target === '\n' || slot.target === '•' || slot.target === '.') {
          slot.locked = true;
          return slot.target;
        }

        if (slot.remainingFlaps > 0) {
          slot.remainingFlaps--;
          allLocked = false;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        }

        slot.locked = true;
        return slot.target;
      });

      setDisplayText(newChars.join(''));

      if (allLocked) {
        clearInterval(timerRef.current);
        setDisplayText(text);
        setIsFlipping(false);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, triggerKey, speed, stagger, minFlaps, isRtl]);

  return (
    <Component className={`${className} ${isFlipping ? 'tracking-wider transition-all' : ''}`}>
      {displayText}
    </Component>
  );
};

// 🌟 Mechanical 3D Flight Board Headline Transition
interface FlightHeadlineProps {
  currentLang: 'en' | 'ar';
  linesEn: string[];
  linesAr: string[];
  className?: string;
  lineClassName?: string;
}

export const FlightHeadline: React.FC<FlightHeadlineProps> = ({
  currentLang,
  linesEn,
  linesAr,
  className = '',
  lineClassName = '',
}) => {
  const isRtl = currentLang === 'ar';
  const lines = isRtl ? linesAr : linesEn;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLang}
          initial={{ opacity: 0, y: isRtl ? 10 : -10, rotateX: -25 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: isRtl ? -10 : 10, rotateX: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800, transformStyle: 'preserve-3d' }}
          className="flex flex-col items-center select-none"
        >
          {lines.map((line, idx) => (
            <h1
              key={idx}
              className={`${lineClassName} ${idx > 0 ? 'mt-1.5 sm:mt-2' : ''}`}
            >
              <FlightText
                text={line}
                speed={26}
                stagger={14}
                minFlaps={6}
                triggerKey={currentLang}
                isRtl={isRtl}
              />
            </h1>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlightText;
