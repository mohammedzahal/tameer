import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { STATS, COMPANY } from '../data/mockData';

interface AboutMinimalProps {
  currentLang: 'en' | 'ar';
}

export const AboutMinimal: React.FC<AboutMinimalProps> = ({ currentLang }) => {
  const isRtl = currentLang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxStats = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-32 bg-black border-b border-zinc-900 relative overflow-hidden"
    >
      {/* Ambient Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-900/30 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-8">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-[0.3em]">
            01 • {currentLang === 'ar' ? 'عن مؤسسة تعمير' : 'About Tameer'}
          </span>
        </div>

        {/* Prominent Lead Heading & Authoritative Company Overview */}
        <div className="max-w-5xl mb-16 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`text-2xl sm:text-3xl lg:text-5xl text-white ${currentLang === 'ar' ? 'font-arabic font-black leading-[1.4]' : 'font-heading font-black tracking-tight uppercase'}`}
          >
            {currentLang === 'ar' 
              ? 'صرح وطني متخصص في المقاولات العامة والحلول الإنشائية' 
              : 'Pioneering Integrated Contracting & Structural Engineering'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg lg:text-xl text-zinc-300 ${currentLang === 'ar' ? 'font-arabic font-normal leading-[2.0]' : 'font-sans font-light leading-relaxed'}`}
          >
            {currentLang === 'ar'
              ? 'مؤسسة تعمير المساحة للمقاولات هي مؤسسة وطنية سعودية 100٪ مسجلة بمدينة الدمام، رائدة في تقديم الحلول الإنشائية المتكاملة، المباني التجارية والسكنية متعددة الأدوار، الهياكل والمستودعات الحديدية مسبقة الصنع، والتشطيبات المعمارية الفاخرة، ملتزمة بأعلى مواصفات كود البناء السعودي (SBC) وتطلعات رؤية المملكة 2030.'
              : 'Tameer AlMesaha Establishment is a 100% Saudi-owned general contracting firm registered in Dammam. We deliver turnkey construction services, multi-story commercial and residential developments, pre-engineered structural steel warehouses, and luxury architectural finishes, adhering rigorously to the Saudi Building Code (SBC) and supporting the Kingdom\'s Vision 2030.'}
          </motion.p>
        </div>

        {/* 4 Clean Architectural Metric Columns with Parallax Lift */}
        <motion.div 
          style={{ y: parallaxStats }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-12 border-t border-zinc-900"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="space-y-2 border-l border-zinc-900 pl-6 rtl:border-l-0 rtl:border-r rtl:pr-6"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-sans tracking-wide">
                {currentLang === 'ar' ? stat.labelAr : stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
