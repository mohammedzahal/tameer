import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { MinimalProject, COMPANY } from '../data/mockData';

interface ProjectModalProps {
  project: MinimalProject | null;
  onClose: () => void;
  currentLang: 'en' | 'ar';
  onInquire: (title: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  currentLang,
  onInquire
}) => {
  if (!project) return null;

  const isRtl = currentLang === 'ar';
  const whatsappMessage = `${COMPANY.whatsappUrl}?text=${encodeURIComponent(`Hello TAMEER Group, I am inquiring about ${project.title}`)}`;

  return (
    <AnimatePresence>
      <div 
        dir={isRtl ? 'rtl' : 'ltr'}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-3 sm:top-4 ${isRtl ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} p-2 sm:p-2.5 rounded-full bg-black/70 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors z-30`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Full-Frame Photographic Canvas */}
          <div className="w-full h-[50vh] sm:h-[75vh] rounded-lg overflow-hidden border border-zinc-900 bg-zinc-950 relative flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Minimalist Footnote Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light">
            <div>
              <h3 className="text-base sm:text-lg font-light text-white tracking-wide">
                {currentLang === 'ar' ? project.titleAr : project.title}
              </h3>
              <p className="text-zinc-500 font-mono text-[11px] mt-0.5">
                {currentLang === 'ar' ? project.locationAr : project.location} • {project.year}
              </p>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <a
                href={whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:border-zinc-400 font-light text-xs flex items-center space-x-1.5 rtl:space-x-reverse transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onInquire(project.title);
                }}
                className="px-5 py-2 rounded-full border border-zinc-700 hover:border-white text-zinc-200 hover:text-white font-light uppercase tracking-wider text-xs transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
              >
                <span>Proposal</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
