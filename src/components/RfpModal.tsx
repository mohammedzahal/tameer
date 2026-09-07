import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY } from '../data/mockData';

interface RfpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: string;
  currentLang: 'en' | 'ar';
}

export const RfpModal: React.FC<RfpModalProps> = ({
  isOpen,
  onClose,
  initialProject,
  currentLang
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(initialProject || 'Commercial High-Rise Structure');
  const [budget, setBudget] = useState('30M - 80M SAR');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const isRtl = currentLang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TMR-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#cbd5e1', '#64748b']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const generateWhatsAppMessage = () => {
    const text = `*New RFP Inquiry - TAMEER Group*%0A%0A*Name:* ${fullName || 'Client'}%0A*Project Scope:* ${projectType}%0A*Budget Range:* ${budget}%0A*Notes:* ${notes || 'Standard RFP'}`;
    return `${COMPANY.whatsappUrl}?text=${text}`;
  };

  return (
    <AnimatePresence>
      <div 
        dir={isRtl ? 'rtl' : 'ltr'}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/95 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg bg-black border border-zinc-900 p-6 sm:p-8 text-white"
        >
          <button
            onClick={handleResetAndClose}
            className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-white transition-colors z-20`}
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="w-10 h-10 rounded-lg bg-black border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                  <img src="/tameer-emblem.png" alt="TAMEER Group" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block tracking-widest">
                    TAMEER Group • {COMPANY.fullNameAr}
                  </span>
                  <h3 className="text-lg sm:text-xl font-light text-white tracking-wide">
                    {currentLang === 'ar' ? 'طلب عرض سعر واستشارة' : 'Request Project RFP'}
                  </h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                    {currentLang === 'ar' ? 'اسم العميل / الجهة *' : 'Client Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'م. خالد المنصور' : 'Eng. Khalid Al-Mansoor'}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                      {currentLang === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="khalid@company.sa"
                      className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                      {currentLang === 'ar' ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                      {currentLang === 'ar' ? 'تصنيف المشروع' : 'Project Typology'}
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs focus:outline-none focus:border-zinc-700 font-light"
                    >
                      <option value="Commercial High-Rise Tower">Commercial Tower (أبراج ومجمعات)</option>
                      <option value="Royal Estate & Palace">Royal Palace (قصور وفلل فاخرة)</option>
                      <option value="Industrial Logistics Warehouse">Logistics Hub (مستودعات وهناجر)</option>
                      <option value="Heavy Civil & Deep Piling">Civil & Piling (أساسات وأعمال ترابية)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                      {currentLang === 'ar' ? 'الميزانية التقديرية' : 'Budget (SAR)'}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs focus:outline-none focus:border-zinc-700 font-light"
                    >
                      <option value="15M - 35M SAR">15M - 35M SAR</option>
                      <option value="35M - 100M SAR">35M - 100M SAR</option>
                      <option value="100M - 300M SAR">100M - 300M SAR</option>
                      <option value="300M+ SAR">300M+ SAR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                    {currentLang === 'ar' ? 'تفاصيل الموقع والمواصفات' : 'Project Scope & Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'حدد المدينة، المساحة...' : 'Specify city, land area...'}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-white text-xs placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 font-light resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 w-full py-3 rounded-full border border-zinc-700 hover:border-white text-zinc-200 hover:text-white font-light uppercase tracking-wider text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? 'إرسال الطلب' : 'Submit RFP'}</span>
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:border-zinc-400 font-light text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-light text-white tracking-wide">
                  {currentLang === 'ar' ? 'تم استلام طلبك بنجاح' : 'RFP Docket Received'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-light">
                  {currentLang === 'ar' ? (
                    <>شكراً لك، <span className="text-white">{fullName}</span>. الرقم المرجعي: <span className="text-white font-mono">{refCode}</span></>
                  ) : (
                    <>Thank you, <span className="text-white">{fullName}</span>. Reference: <span className="text-white font-mono">{refCode}</span></>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse pt-2">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white font-light text-xs flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Send on WhatsApp</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2 rounded-full border border-zinc-700 text-white font-light text-xs"
                >
                  {currentLang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
