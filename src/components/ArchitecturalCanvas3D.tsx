import React, { useEffect, useRef, useState } from 'react';
import { Eye, RotateCw, Layers, Building2 } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ArchitecturalCanvas3DProps {
  className?: string;
}

export const ArchitecturalCanvas3D: React.FC<ArchitecturalCanvas3DProps> = ({ 
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0.22, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFloor, setActiveFloor] = useState<number>(32);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scanlineY = 0;
    let localRotY = rotation.y;
    let localRotX = rotation.x;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3-Tower Monolith Configuration matching the TAMEER Group logo!
    // Center Tower (Taller, angled crown), Left Tower (Slightly lower), Right Tower (Balanced)
    const towers = [
      { id: 'left', offsetX: -75, offsetZ: 0, width: 60, depth: 60, height: 260, floors: 20, angleCrown: 0.15 },
      { id: 'center', offsetX: 0, offsetZ: 0, width: 75, depth: 75, height: 340, floors: 28, angleCrown: 0.25 },
      { id: 'right', offsetX: 75, offsetZ: 0, width: 60, depth: 60, height: 280, floors: 22, angleCrown: -0.15 },
    ];

    const project = (p: Point3D, width: number, heightCanvas: number): { x: number; y: number; scale: number; z: number } => {
      const cosY = Math.cos(localRotY);
      const sinY = Math.sin(localRotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(localRotX);
      const sinX = Math.sin(localRotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 480;
      const distance = 420;
      const scale = fov / (distance + z2);

      return {
        x: width / 2 + x1 * scale,
        y: heightCanvas / 2 + y2 * scale + 20,
        scale,
        z: z2
      };
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const heightCanvas = rect.height;

      ctx.clearRect(0, 0, width, heightCanvas);

      if (autoRotate && !isDragging) {
        localRotY += 0.0035;
        setRotation(prev => ({ ...prev, y: localRotY }));
      } else {
        localRotY = rotation.y;
        localRotX = rotation.x;
      }

      // Draw subtle circular ground coordinate grids (Titanium Grey)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let r = 50; r <= 260; r += 50) {
        ctx.beginPath();
        ctx.arc(width / 2, heightCanvas / 2 + 120, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render each of the 3 TAMEER Monolith Towers
      towers.forEach((tower) => {
        const halfW = tower.width / 2;
        const halfD = tower.depth / 2;
        const floorHeight = tower.height / tower.floors;

        // Draw structural vertical column edges
        const corners = [
          { x: tower.offsetX - halfW, z: tower.offsetZ - halfD },
          { x: tower.offsetX + halfW, z: tower.offsetZ - halfD },
          { x: tower.offsetX + halfW, z: tower.offsetZ + halfD },
          { x: tower.offsetX - halfW, z: tower.offsetZ + halfD },
        ];

        // Draw vertical columns for the tower
        corners.forEach((corner, cIdx) => {
          const bottomP = project({ x: corner.x, y: 100, z: corner.z }, width, heightCanvas);
          const crownOffset = (cIdx === 1 || cIdx === 2) ? tower.angleCrown * 40 : 0;
          const topP = project({ x: corner.x, y: 100 - tower.height + crownOffset, z: corner.z }, width, heightCanvas);

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.28)';
          ctx.lineWidth = 1.2;
          ctx.moveTo(bottomP.x, bottomP.y);
          ctx.lineTo(topP.x, topP.y);
          ctx.stroke();
        });

        // Draw floor slabs
        for (let f = 0; f < tower.floors; f++) {
          const currentY = 100 - f * floorHeight;
          const isHighlighted = f === Math.floor((activeFloor / 38) * tower.floors);

          const floorCorners = corners.map((c, cIdx) => {
            const crownOffset = (cIdx === 1 || cIdx === 2 && f > tower.floors - 4) 
              ? (f / tower.floors) * tower.angleCrown * 35 
              : 0;
            return project({ x: c.x, y: currentY + crownOffset, z: c.z }, width, heightCanvas);
          });

          ctx.beginPath();
          if (isHighlighted) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
          } else {
            const alpha = 0.12 + (f / tower.floors) * 0.18;
            ctx.strokeStyle = `rgba(203, 213, 225, ${alpha})`;
            ctx.lineWidth = 0.9;
          }

          ctx.moveTo(floorCorners[0].x, floorCorners[0].y);
          for (let i = 1; i < 4; i++) {
            ctx.lineTo(floorCorners[i].x, floorCorners[i].y);
          }
          ctx.closePath();
          ctx.stroke();

          if (isHighlighted) {
            ctx.fill();
          }

          // Diagonal structural cross-bracing on every 4th floor
          if (f % 4 === 0 && f < tower.floors - 1) {
            const nextFloorY = currentY - floorHeight * 2;
            const nextCornerA = project({ x: corners[0].x, y: nextFloorY, z: corners[0].z }, width, heightCanvas);
            const currentCornerB = project({ x: corners[1].x, y: currentY, z: corners[1].z }, width, heightCanvas);
            
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.moveTo(floorCorners[0].x, floorCorners[0].y);
            ctx.lineTo(nextCornerA.x, nextCornerA.y);
            ctx.stroke();
          }

          // Node vertices
          floorCorners.forEach(node => {
            ctx.beginPath();
            const nodeAlpha = Math.max(0.1, (node.z + 200) / 400);
            ctx.fillStyle = isHighlighted ? '#ffffff' : `rgba(226, 232, 240, ${nodeAlpha})`;
            ctx.arc(node.x, node.y, isHighlighted ? 2.5 : 1.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      });

      // Animated LiDAR Laser Scanline Beam (Titanium Silver / Cool White)
      scanlineY = (scanlineY + 1.2) % (heightCanvas + 50);
      const beamY = scanlineY - 25;

      const gradient = ctx.createLinearGradient(0, beamY - 18, 0, beamY + 18);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(width * 0.1, beamY - 18, width * 0.8, 36);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, beamY);
      ctx.lineTo(width * 0.9, beamY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation, autoRotate, isDragging, activeFloor]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation(prev => ({
      x: Math.max(-1.1, Math.min(1.1, prev.x + deltaY * 0.006)),
      y: prev.y + deltaX * 0.006
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/15 bg-carbon-900/90 backdrop-blur-xl shadow-dark-card ${className}`}>
      {/* Telemetry HUD Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center space-x-2 bg-carbon-950/90 border border-white/10 px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <Building2 className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-slate-400">TAMEER 3-TOWER MONOLITH</span>
          <span className="text-white font-bold">KSA-SBC-400</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-300 bg-carbon-950/90 border border-white/10 px-3 py-1.5 rounded-lg">
          <div className="flex items-center space-x-1">
            <span className="text-slate-500">SEISMIC ZONE:</span>
            <span className="text-emerald-400">ZONE 2B COMPLIANT</span>
          </div>
          <div className="h-3 w-px bg-white/15" />
          <div className="flex items-center space-x-1">
            <span className="text-slate-500">LIDAR ACCURACY:</span>
            <span className="text-white">±1.0 mm</span>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[480px] cursor-grab active:cursor-grabbing block"
      />

      {/* Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-carbon-950/90 backdrop-blur-md border border-white/10 p-3 rounded-xl z-10">
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
              autoRotate 
                ? 'bg-white/15 border-white/40 text-white shadow-silver-glow' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? 'Auto-Orbit: ON' : 'Auto-Orbit: PAUSED'}</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1 text-slate-400 text-xs font-mono px-2">
            <Eye className="w-3.5 h-3.5 text-slate-300 mr-1" />
            <span>DRAG TO ROTATE 3-TOWER MONOLITH</span>
          </div>
        </div>

        {/* Floor Level Selector */}
        <div className="flex items-center space-x-2">
          <Layers className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-xs text-slate-400 font-mono">ACTIVE TIER:</span>
          <div className="flex space-x-1">
            {[8, 18, 28, 38].map(floor => (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-all ${
                  activeFloor === floor
                    ? 'bg-white text-carbon-950 font-bold shadow-silver-glow'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                L{floor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
