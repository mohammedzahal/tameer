import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Instagram, Globe, Menu, X } from 'lucide-react';
import { COMPANY } from '../data/mockData';

interface ScrollLogoHeaderProps {
  currentLang: 'en' | 'ar';
  isScrolled: boolean;
  isNavHidden: boolean;
  introFinished: boolean;
  onToggleLang: () => void;
  onOpenRfp: () => void;
}

export const ScrollLogoHeader: React.FC<ScrollLogoHeaderProps> = ({
  currentLang,
  isScrolled,
  isNavHidden,
  introFinished,
  onToggleLang,
  onOpenRfp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = currentLang === 'ar';
  const showNavbar = introFinished && isScrolled;

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: currentLang === 'ar' ? 'عن تعمير' : 'About', href: '#about' },
    { label: currentLang === 'ar' ? 'المشاريع' : 'Works', href: '#works' },
    { label: currentLang === 'ar' ? 'الخدمات' : 'Capabilities', href: '#services' },
    { label: currentLang === 'ar' ? 'تواصل معنا' : 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Sticky Header Bar with Instant Scroll-Up Reveal Animation */}
      <motion.header
        dir={isRtl ? 'rtl' : 'ltr'}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          y: isNavHidden ? -100 : 0,
          opacity: introFinished ? (isNavHidden ? 0 : 1) : 0,
        }}
        transition={{
          duration: isNavHidden ? 0.35 : 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          backgroundColor: showNavbar ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          borderBottom: showNavbar ? '1px solid rgba(63, 63, 70, 0.5)' : '1px solid transparent',
          backdropFilter: showNavbar ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Target Slot for Docked Emblem + Companion Brand Name */}
          <motion.div 
            layout
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="flex items-center cursor-pointer pointer-events-auto group select-none h-20 sm:h-24 relative z-30"
            title="TAMEER Group - Click to return to top"
          >
            {/* Spacer reserved for the docked emblem */}
            <div className="w-[58px] sm:w-[70px] shrink-0" />

            {/* Brand Title slides in beside the docked emblem */}
            <motion.div
              layout
              initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
              animate={{
                opacity: showNavbar ? 1 : 0,
                x: showNavbar ? 0 : (isRtl ? 10 : -10),
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col select-none ${isRtl ? 'mr-2 text-right' : 'ml-2 text-left'}`}
            >
              <div dir="ltr" className="flex items-center space-x-2 font-display text-sm sm:text-base">
                <span className="font-medium tracking-[0.2em] text-white group-hover:text-zinc-200 transition-colors uppercase">
                  TAMEER
                </span>
                <span className="font-light text-zinc-400 lowercase text-xs sm:text-sm">
                  group
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`brand-sub-${currentLang}`}
                  initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -8 : 8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] sm:text-xs text-zinc-400 font-arabic tracking-wider uppercase inline-block"
                >
                  {currentLang === 'ar' ? COMPANY.fullNameAr : 'Kingdom of Saudi Arabia'}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation Links (Enlarged & Clearer with Swoosh) */}
          <motion.nav
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: showNavbar ? 1 : 0 }}
            transition={{ 
              layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="hidden md:flex items-center space-x-10 rtl:space-x-reverse pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] sm:text-sm uppercase tracking-[0.2em] font-normal text-zinc-300 hover:text-white transition-all duration-200 relative group py-1 overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`nav-${link.href}-${currentLang}`}
                    initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -10 : 10 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {link.label}
                  </motion.span>
                </AnimatePresence>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.nav>

          {/* Controls Container (Classy Monochrome Luxury with Layout Glide) */}
          <motion.div
            layout
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            animate={{
              opacity: showNavbar ? 1 : 0,
              y: showNavbar ? 0 : -8,
              pointerEvents: showNavbar ? 'auto' : 'none',
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* WhatsApp */}
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-900 transition-all shadow-sm"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>

            {/* Instagram */}
            <a
              href={COMPANY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2.5 sm:p-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-900 transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>

            {/* Language Switch Button */}
            <button
              onClick={onToggleLang}
              className="flex items-center space-x-2 rtl:space-x-reverse px-3.5 sm:px-4 py-2 rounded-full border border-zinc-800 hover:border-zinc-500 text-xs sm:text-sm font-mono text-zinc-300 hover:text-white transition-all shadow-sm active:scale-95 bg-zinc-950 overflow-hidden cursor-pointer"
              title="Switch Language / تبديل اللغة"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`lang-btn-${currentLang}`}
                  initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -8 : 8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="font-medium inline-block"
                >
                  {currentLang === 'en' ? 'عربي' : 'EN'}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Inquire CTA Button - Classy Minimal */}
            <button
              onClick={onOpenRfp}
              className="hidden sm:flex items-center px-5 py-2 sm:py-2.5 rounded-full border border-zinc-700 hover:border-white text-white font-normal uppercase text-xs sm:text-sm tracking-wider transition-all hover:bg-white/10 active:scale-95 bg-zinc-900/60 overflow-hidden cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`inquire-btn-${currentLang}`}
                  initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? -10 : 10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {currentLang === 'ar' ? 'طلب عرض سعر' : 'Inquire'}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>

        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            dir={isRtl ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 sm:top-24 z-40 bg-black border-b border-zinc-900 px-6 py-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-light text-zinc-200 hover:text-white transition-colors py-2 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-zinc-900 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRfp();
                  }}
                  className="w-full py-3.5 rounded-full border border-zinc-700 hover:border-white text-zinc-100 font-medium uppercase tracking-wider text-xs sm:text-sm bg-white/5"
                >
                  {currentLang === 'ar' ? 'طلب عرض سعر واستشارة' : 'Request Project RFP'}
                </button>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={onToggleLang}
                    className="text-xs sm:text-sm font-mono text-zinc-400 hover:text-white flex items-center space-x-1.5 rtl:space-x-reverse"
                  >
                    <Globe className="w-4 h-4" />
                    <span>اللغة / Language ({currentLang === 'en' ? 'عربي' : 'English'})</span>
                  </button>
                  <a
                    href={COMPANY.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-mono text-zinc-400 hover:text-white"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
