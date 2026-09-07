import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  scale?: number;
  className?: string;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.1,
  scale = 1.2,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const range = 220 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxContainer;
