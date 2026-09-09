import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { STATS } from '../data/mockData';
import { InteractiveDotDispersionCanvas } from './InteractiveDotDispersionCanvas';

interface AboutMinimalProps {
  currentLang: 'en' | 'ar';
}

interface AnimatedWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mx-[2.5px] sm:mx-[4px]">
      {word}
    </motion.span>
  );
};

export const AboutMinimal: React.FC<AboutMinimalProps> = ({ currentLang }) => {
  const isRtl = currentLang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxStats = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageParallax1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageInnerParallax1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const imageParallax2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageInnerParallax2 = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const paragraphAr1 = "مؤسسة تعمير المساحة للمقاولات صرح وطني سعودي رائد انطلق من قلب المنطقة الشرقية بمدينة الدمام، ليرسي معايير هندسية متقدمة في تنفيذ الأبراج التجارية، المجمعات السكنية، والمرافق الصناعية واللوجستية الكبرى.";
  const paragraphAr2 = "نمتلك خبرة متخصصة في متطلبات الإنشاء بالمنطقة الشرقية، بدءاً من المعالجة الجيوتقنية للتربة الساحلية، أنظمة سحب المياه الجوفية (Dewatering)، والعزل المائي المتطور، وصولاً إلى الهياكل الخرسانية المسلحة والمباني الحديدية المسبقة الصنع، ملتزمين التزاماً صارماً بكود البناء السعودي (SBC) ورؤية المملكة 2030.";

  const paragraphEn1 = "Tameer AlMesaha General Contracting is a premier 100% Saudi national establishment headquartered in Dammam, setting elevated engineering benchmarks in the construction of commercial towers, residential communities, and industrial facilities.";
  const paragraphEn2 = "We bring specialized regional expertise in Eastern Province geotechnical conditions—ranging from high coastal water tables, dewatering systems, and advanced waterproofing to reinforced concrete casting and pre-engineered structural steel, strictly aligned with the Saudi Building Code (SBC) and Vision 2030.";

  const words1 = (isRtl ? paragraphAr1 : paragraphEn1).split(' ');
  const words2 = (isRtl ? paragraphAr2 : paragraphEn2).split(' ');

  const pillars = [
    {
      num: '01',
      titleAr: 'الريادة الإنشائية في المنطقة الشرقية',
      titleEn: 'Eastern Province Construction Pioneer',
      descAr: 'حضور ميداني فاعل يغطي الدمام، الخبر، الظهران، الجبيل الصناعية، الأحساء، سلوى، وصولاً إلى كبرى المشاريع بالعاصمة الرياض.',
      descEn: 'Active field operations spanning Dammam, Khobar, Dhahran, Jubail Industrial City, Al-Ahsa, Salwa, and commercial hubs in Riyadh.',
    },
    {
      num: '02',
      titleAr: 'كود البناء السعودي وضبط الجودة (SBC)',
      titleEn: 'SBC Compliance & Rigorous QA/QC',
      descAr: 'تطبيق أدق معايير الكود السعودي (SBC 201 - 801)، ضبط درجات حرارة الصب الصيفي، واختبارات معتمدة للخرسانة وحديد التسليح.',
      descEn: 'Strict execution under SBC 201–801 codes, summer concrete thermal control, and certified 3rd-party laboratory QA/QC testing.',
    },
    {
      num: '03',
      titleAr: 'حلول تسليم المفتاح المتكاملة (Turnkey)',
      titleEn: 'Turnkey & Fast-Track Execution',
      descAr: 'إدارة دورة حياة المشروع كاملة: أعمال الحفر، الأساسات، الهيكل الإنشائي العظم، الأعمال الكهروميكانيكية (MEP)، والتشطيبات المعمارية الفاخرة.',
      descEn: 'Comprehensive delivery: deep excavation, concrete framing, pre-engineered steel, MEP infrastructure, and luxury architectural handover.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-24 sm:py-40 bg-black border-b border-zinc-900 relative overflow-hidden text-white selection:bg-white selection:text-black"
    >
      <InteractiveDotDispersionCanvas />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-zinc-900/20 blur-[180px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[350px] bg-white/[0.015] blur-[140px] pointer-events-none rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse mb-8">
          <span className="w-2 h-2 bg-white" />
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-[0.3em]">
            01 • {isRtl ? 'عن مؤسسة تعمير المساحة للمقاولات' : 'About Tameer AlMesaha'}
          </span>
        </div>

        <div className="max-w-5xl mb-16 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`text-2xl sm:text-4xl lg:text-5xl font-black text-white ${
              isRtl ? 'font-arabic leading-[1.35]' : 'font-heading tracking-tight uppercase leading-[1.15]'
            }`}
          >
            {isRtl 
              ? 'صرح وطني يجسد عراقة البناء والدقة الهندسية في المنطقة الشرقية وكافة أنحاء المملكة' 
              : 'A National Force in Structural Rigor & Engineering Precision Across KSA'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-28 sm:mb-44">
          
          <motion.div 
            style={{ y: imageParallax1 }}
            className="lg:col-span-6 order-1"
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group select-none">
              <div className="absolute top-2.5 left-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute top-2.5 right-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute bottom-2.5 left-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute bottom-2.5 right-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>

              <motion.div 
                style={{ y: imageInnerParallax1 }} 
                className="w-full h-[116%] -mt-[8%] relative will-change-transform"
              >
                <img 
                  src="/about-construction-1.jpg" 
                  alt="Construction execution in Eastern Province" 
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] grayscale-[10%] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-6 order-2 space-y-6 lg:pl-4 rtl:lg:pl-0 rtl:lg:pr-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              {isRtl ? 'الخبرة الميدانية والامتداد الجغرافي' : 'Regional Mastery & Field Operations'}
            </div>

            <div className={`text-base sm:text-lg lg:text-2xl text-zinc-100 font-normal ${
              isRtl ? 'font-arabic leading-[2.2]' : 'font-sans leading-relaxed'
            }`}>
              {words1.map((word, idx) => {
                const total = words1.length;
                const start = 0.10 + (idx / total) * 0.22;
                const end = start + 0.08;
                return (
                  <AnimatedWord
                    key={`w1-${idx}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </div>

            <div className="pt-2 flex items-center space-x-3 rtl:space-x-reverse text-xs sm:text-sm font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>{isRtl ? 'الدمام • الخبر • الظهران • الجبيل • الأحساء • سلوى' : 'Dammam • Khobar • Dhahran • Jubail • Al-Ahsa • Salwa'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-28 sm:mb-44">
          
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 lg:pr-4 rtl:lg:pr-0 rtl:lg:pl-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              {isRtl ? 'كود البناء السعودي والجودة الإنشائية' : 'Saudi Building Code (SBC) & Vision 2030'}
            </div>

            <div className={`text-base sm:text-lg lg:text-2xl text-zinc-300 font-light ${
              isRtl ? 'font-arabic leading-[2.2]' : 'font-sans leading-relaxed'
            }`}>
              {words2.map((word, idx) => {
                const total = words2.length;
                const start = 0.35 + (idx / total) * 0.22;
                const end = start + 0.08;
                return (
                  <AnimatedWord
                    key={`w2-${idx}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </div>

            <div className="pt-2 flex items-center space-x-3 rtl:space-x-reverse text-xs sm:text-sm font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>{isRtl ? 'امتثال كود SBC • اختبارات ضبط الجودة QA/QC • أمان تام' : 'SBC Codes • QA/QC Testing • Zero-Harm Safety'}</span>
            </div>
          </div>

          <motion.div 
            style={{ y: imageParallax2 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group select-none">
              <div className="absolute top-2.5 left-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute top-2.5 right-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute bottom-2.5 left-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>
              <div className="absolute bottom-2.5 right-2.5 text-xs font-mono text-zinc-600 group-hover:text-white transition-colors duration-500 z-20 pointer-events-none select-none">+</div>

              <motion.div 
                style={{ y: imageInnerParallax2 }} 
                className="w-full h-[116%] -mt-[8%] relative will-change-transform"
              >
                <img 
                  src="/about-construction-2.jpg" 
                  alt="Tower crane on KSA construction site" 
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] grayscale-[10%] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-7 sm:p-8 bg-zinc-950/80 border border-zinc-900 hover:border-zinc-700 transition-colors duration-300 space-y-3 relative group"
            >
              <div className="text-xs font-mono font-bold text-zinc-500">
                {pillar.num}
              </div>

              <h3 className={`text-lg sm:text-xl font-bold text-white ${isRtl ? 'font-arabic' : 'font-heading uppercase tracking-tight'}`}>
                {isRtl ? pillar.titleAr : pillar.titleEn}
              </h3>

              <p className={`text-xs sm:text-sm text-zinc-400 font-light leading-relaxed ${isRtl ? 'font-arabic leading-[1.8]' : 'font-sans'}`}>
                {isRtl ? pillar.descAr : pillar.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 🌟 4 Clean Architectural Metric Columns with Parallax Lift */}
        <motion.div 
          style={{ y: parallaxStats }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pt-12 border-t border-zinc-900"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="space-y-1.5 border-l border-zinc-900 pl-6 rtl:border-l-0 rtl:border-r rtl:pr-6"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className={`text-xs sm:text-sm text-zinc-400 font-light tracking-wide ${isRtl ? 'font-arabic leading-snug' : 'font-sans'}`}>
                {isRtl ? stat.labelAr : stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutMinimal;
