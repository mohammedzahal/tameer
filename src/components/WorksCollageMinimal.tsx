import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CURATED_PROJECTS, MinimalProject } from '../data/mockData';
import ParallaxContainer from './ParallaxContainer';

interface WorksCollageMinimalProps {
  currentLang: 'en' | 'ar';
  onSelectProject: (project: MinimalProject) => void;
  onOpenAllWorks: () => void;
}

// 🌟 Interactive 3D Card for Collage Items
const CollageCard: React.FC<{
  project: MinimalProject;
  currentLang: 'en' | 'ar';
  isRtl: boolean;
  onSelect: () => void;
  aspectClass?: string;
  speed?: number;
}> = ({ project, currentLang, isRtl, onSelect, aspectClass = 'aspect-[16/10]', speed = 0.06 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer block relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-900 hover:border-zinc-700 transition-colors duration-500 shadow-xl hover:shadow-2xl will-change-transform"
    >
      <div className={`relative ${aspectClass} overflow-hidden w-full`}>
        <ParallaxContainer speed={speed} scale={1.2} className="w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </ParallaxContainer>

        {/* Ambient Overlay & Specular Sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge & Quick Details in Card */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
            {currentLang === 'ar' ? project.categoryAr : project.category}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110 shadow-lg">
            <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </div>
        </div>

        {/* Bottom Title & Specs */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-1">
          <h3 className={`text-lg sm:text-xl font-black text-white group-hover:text-zinc-100 transition-colors uppercase tracking-tight ${isRtl ? 'font-arabic font-bold leading-[1.4]' : 'font-heading'}`}>
            {currentLang === 'ar' ? project.titleAr : project.title}
          </h3>
          <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-zinc-400">
            <span>{currentLang === 'ar' ? project.locationAr : project.location}</span>
            <span>•</span>
            <span className="font-mono text-zinc-300">{project.year}</span>
            <span>•</span>
            <span className="font-mono text-zinc-300">{project.value}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const WorksCollageMinimal: React.FC<WorksCollageMinimalProps> = ({
  currentLang,
  onSelectProject,
  onOpenAllWorks,
}) => {
  const isRtl = currentLang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const collageParallaxLeft = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const collageParallaxRight = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  // Selected 4 diverse flagship projects for the home collage
  const pMinistry = CURATED_PROJECTS.find(p => p.id === 'ministry-of-finance-salwa') || CURATED_PROJECTS[0];
  const pNoor = CURATED_PROJECTS.find(p => p.id === 'al-noor-commercial-residential') || CURATED_PROJECTS[1];
  const pRayan = CURATED_PROJECTS.find(p => p.id === 'rayan-residential-villas-33') || CURATED_PROJECTS[2];
  const pIndustrial = CURATED_PROJECTS.find(p => p.id === 'dammam-2nd-industrial-warehouses') || CURATED_PROJECTS[5];

  return (
    <section 
      ref={sectionRef} 
      id="works" 
      className="py-32 bg-black text-white relative overflow-hidden"
    >
      {/* Background Architectural Wireframe Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.14] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-900 gap-6">
          <div className="space-y-3">
            <span className={`flex items-center space-x-2 rtl:space-x-reverse ${isRtl ? 'text-xs font-arabic font-semibold text-zinc-300' : 'text-xs font-mono font-bold text-zinc-300 uppercase tracking-[0.3em]'}`}>
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>01 • {currentLang === 'ar' ? 'المشاريع الاستراتيجية' : 'Selected Works'}</span>
            </span>
            <h2 className={isRtl ? 'text-2xl sm:text-3xl lg:text-4xl font-arabic font-black text-white leading-[1.45]' : 'text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight uppercase'}>
              {currentLang === 'ar' ? 'صروح معمارية بأعلى معايير الإتقان' : 'Engineered Landmarks & Monoliths'}
            </h2>
          </div>

          <button
            onClick={onOpenAllWorks}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 rounded-full border border-zinc-700 hover:border-white bg-zinc-950 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-all duration-300 hover:bg-white/10 active:scale-95 shadow-md cursor-pointer shrink-0"
          >
            <span>{currentLang === 'ar' ? 'كافة المشاريع (8)' : 'View All Works (8)'}</span>
            <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

        {/* 🌟 Architectural Mosaic / Collage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Large Hero Feature (7 cols) */}
          <motion.div 
            style={{ y: collageParallaxLeft }}
            className="lg:col-span-7 space-y-8"
          >
            <CollageCard
              project={pMinistry}
              currentLang={currentLang}
              isRtl={isRtl}
              onSelect={() => onSelectProject(pMinistry)}
              aspectClass="aspect-[16/11]"
              speed={0.06}
            />

            <CollageCard
              project={pIndustrial}
              currentLang={currentLang}
              isRtl={isRtl}
              onSelect={() => onSelectProject(pIndustrial)}
              aspectClass="aspect-[16/9]"
              speed={-0.05}
            />
          </motion.div>

          {/* Right Column: Staggered Portrait & Medium Feature (5 cols) */}
          <motion.div 
            style={{ y: collageParallaxRight }}
            className="lg:col-span-5 space-y-8 lg:pt-10"
          >
            <CollageCard
              project={pNoor}
              currentLang={currentLang}
              isRtl={isRtl}
              onSelect={() => onSelectProject(pNoor)}
              aspectClass="aspect-[4/4.5]"
              speed={-0.06}
            />

            <CollageCard
              project={pRayan}
              currentLang={currentLang}
              isRtl={isRtl}
              onSelect={() => onSelectProject(pRayan)}
              aspectClass="aspect-[16/11]"
              speed={0.07}
            />
          </motion.div>
        </div>

        {/* 🌟 Bold Prominent Link Button To Categorized Works Page */}
        <div className="p-8 sm:p-12 rounded-2xl border border-zinc-900 bg-gradient-to-b from-zinc-950/90 to-zinc-900/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left rtl:sm:text-right">
          <div className="space-y-2">
            <h3 className={`text-xl sm:text-2xl font-black text-white uppercase ${isRtl ? 'font-arabic font-bold leading-[1.4]' : 'font-heading tracking-tight'}`}>
              {currentLang === 'ar' ? 'استكشف كافة مشاريع مجموعة تعمير' : 'Explore The Complete Works Archive'}
            </h3>
            <p className={`text-xs sm:text-sm text-zinc-400 max-w-xl ${isRtl ? 'font-arabic font-normal' : 'font-sans'}`}>
              {currentLang === 'ar' 
                ? 'استعراض مفصل ومصنف للأبراج التجارية، المجمعات السكنية، والهياكل اللوجستية المنفذة بأعلى معايير كود البناء السعودي.'
                : 'Browse our full catalog of high-rise commercial monoliths, luxury villa compounds, and industrial pre-engineered logistics hubs.'}
            </p>
          </div>

          <button
            onClick={onOpenAllWorks}
            className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 font-heading font-black text-xs uppercase tracking-wider flex items-center space-x-3 rtl:space-x-reverse transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <span>{currentLang === 'ar' ? 'استعراض كافة المشاريع والتصنيفات' : 'Open Full Categorized Works Page'}</span>
            <ArrowUpRight className={`w-4 h-4 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default WorksCollageMinimal;
