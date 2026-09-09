import React, { useRef, useEffect } from 'react';

interface InteractiveDotDispersionCanvasProps {
  spacing?: number;
  repulsionRadius?: number;
  maxForce?: number;
  className?: string;
  dotBaseAlpha?: number;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  waveEnergy: number;
}

interface Shockwave {
  originX: number;
  originY: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  wavelength: number;
}

export const InteractiveDotDispersionCanvas: React.FC<InteractiveDotDispersionCanvasProps> = ({
  spacing = 38,
  repulsionRadius = 140,
  maxForce = 12,
  className = "absolute inset-0 w-full h-full pointer-events-none z-0 opacity-90",
  dotBaseAlpha = 0.08,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let waves: Shockwave[] = [];

    const SPRING = 0.08;
    const FRICTION = 0.85;

    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          particles.push({
            originX: x,
            originY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            baseAlpha: dotBaseAlpha + Math.random() * 0.04,
            waveEnergy: 0,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isActive = false;
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 🌟 Ultra-smooth Language Transition Wave Shockwave Trigger
    const handleLangWave = (e: Event) => {
      const customEvent = e as CustomEvent<{ clientX?: number; clientY?: number }>;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let originX = width / 2;
      let originY = height / 2;

      if (customEvent.detail && typeof customEvent.detail.clientX === 'number') {
        originX = customEvent.detail.clientX;
        originY = customEvent.detail.clientY ?? height / 2;
      }

      const maxRadius = Math.sqrt(width * width + height * height) + 250;

      // Primary fast shockwave
      waves.push({
        originX,
        originY,
        radius: 0,
        maxRadius,
        speed: 26,
        amplitude: 22,
        wavelength: 200,
      });

      // Secondary smooth harmonic wave
      setTimeout(() => {
        waves.push({
          originX,
          originY,
          radius: 0,
          maxRadius,
          speed: 20,
          amplitude: 12,
          wavelength: 160,
        });
      }, 100);
    };

    window.addEventListener('tameer:lang-wave', handleLangWave);

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 1.8) || 1.0;
      lastTime = time;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      // Advance shockwaves with delta time
      const waveCount = waves.length;
      if (waveCount > 0) {
        for (let w = 0; w < waveCount; w++) {
          waves[w].radius += waves[w].speed * delta;
        }
        waves = waves.filter((w) => w.radius <= w.maxRadius);
      }

      const pCount = particles.length;
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];

        // 1. Repulsion from cursor
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          if (Math.abs(dx) < repulsionRadius && Math.abs(dy) < repulsionRadius) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < repulsionRadius && dist > 0) {
              const force = (1 - dist / repulsionRadius) * maxForce * delta;
              const invDist = 1 / dist;
              p.vx -= dx * invDist * force;
              p.vy -= dy * invDist * force;
            }
          }
        }

        // 2. Wave propagation with high-performance bounding box pruning
        if (waves.length > 0) {
          for (let w = 0; w < waves.length; w++) {
            const wave = waves[w];
            const wdx = p.originX - wave.originX;
            const wdy = p.originY - wave.originY;

            // Fast Manhattan boundary check to skip distant particles
            const outerBound = wave.radius + wave.wavelength;
            const innerBound = Math.max(0, wave.radius - wave.wavelength);
            
            if (Math.abs(wdx) <= outerBound && Math.abs(wdy) <= outerBound) {
              const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
              if (wdist >= innerBound && wdist <= outerBound && wdist > 0) {
                const diff = Math.abs(wdist - wave.radius);
                const progress = 1 - (wave.radius / wave.maxRadius);
                const wavePhase = (Math.PI / 2) * (1 - diff / wave.wavelength);
                const waveForce = Math.sin(wavePhase * 2) * wave.amplitude * Math.max(progress, 0.2) * delta;

                const invWdist = 1 / wdist;
                p.vx += wdx * invWdist * waveForce * 0.32;
                p.vy += wdy * invWdist * waveForce * 0.32;

                p.waveEnergy = Math.max(p.waveEnergy, Math.sin(wavePhase) * progress);
              }
            }
          }
        }

        // 3. Spring physics back to home grid with delta smoothing
        p.vx += (p.originX - p.x) * SPRING * delta;
        p.vy += (p.originY - p.y) * SPRING * delta;
        p.vx *= Math.pow(FRICTION, delta);
        p.vy *= Math.pow(FRICTION, delta);
        p.x += p.vx * delta;
        p.y += p.vy * delta;

        // Wave energy decay
        if (p.waveEnergy > 0.01) {
          p.waveEnergy *= Math.pow(0.93, delta);
        } else {
          p.waveEnergy = 0;
        }

        // 4. Hardware-accelerated visual rendering (Zero shadowBlur overhead)
        const distFromHome = Math.sqrt((p.x - p.originX) ** 2 + (p.y - p.originY) ** 2);
        const alpha = Math.min(p.baseAlpha + distFromHome * 0.02 + p.waveEnergy * 0.7, 0.95);
        const radius = distFromHome > 1.2 ? 1.35 + p.waveEnergy * 1.4 : 0.85 + p.waveEnergy * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(radius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle glow halo for high-energy wave crests without software blur
        if (p.waveEnergy > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.waveEnergy * 0.15})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('tameer:lang-wave', handleLangWave);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [spacing, repulsionRadius, maxForce, dotBaseAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ willChange: 'transform' }}
    />
  );
};

export default InteractiveDotDispersionCanvas;

