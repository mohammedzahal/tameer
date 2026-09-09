import React, { useState } from 'react';
import { MessageSquare, Mail, MapPin, ArrowUpRight, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY } from '../data/mockData';

interface ContactMinimalProps {
  currentLang: 'en' | 'ar';
  onOpenRfp: () => void;
}

export const ContactMinimal: React.FC<ContactMinimalProps> = ({ currentLang, onOpenRfp }) => {
  const isRtl = currentLang === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Contracting',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-transparent border-t border-zinc-950 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-[0.25em] block mb-3">
            04 • {currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight uppercase">
            {currentLang === 'ar' ? (
              <>لنبدأ بناء <span className="text-zinc-300 font-normal">مشروعك القادم</span></>
            ) : (
              <>Initiate Your <span className="text-zinc-300 font-normal">Next Landmark</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-zinc-900">
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-wide">
                  {currentLang === 'ar' ? 'نموذج التواصل المباشر' : 'Direct Inquiry Form'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal mt-1">
                  {currentLang === 'ar' 
                    ? 'أرسل تفاصيل مشروعك وسيقوم فريقنا الهندسي بالتواصل معك مباشرة'
                    : 'Send us your project details and our team will get in touch with you promptly.'}
                </p>
              </div>
              <Mail className="w-5 h-5 text-zinc-400" />
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-medium text-white">
                  {currentLang === 'ar' ? 'تم تجهيز رسالتك بنجاح' : 'Inquiry Ready!'}
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
                  {currentLang === 'ar'
                    ? `تم فتح برنامج البريد لإرسال التفاصيل مباشرة إلى ${COMPANY.email}، أو يمكنك أيضاً التواصل عبر واتساب للمتابعة الفورية.`
                    : `Your email client has been prepared to send to ${COMPANY.email}. You can also reach us on WhatsApp for an immediate response.`}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={COMPANY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-light tracking-wider flex items-center space-x-2 rtl:space-x-reverse transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Open WhatsApp'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 text-zinc-300 text-xs font-light transition-colors cursor-pointer"
                  >
                    {currentLang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase mb-1.5">
                      {currentLang === 'ar' ? 'الاسم الكامل / الجهة *' : 'Your Name / Entity *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={currentLang === 'ar' ? 'مثال: شركة التطوير العقاري' : 'e.g. Abdullah Al-Otaibi'}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase mb-1.5">
                      {currentLang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase mb-1.5">
                      {currentLang === 'ar' ? 'رقم الجوال / واتساب' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-300 uppercase mb-1.5">
                      {currentLang === 'ar' ? 'نوع الخدمة المطلوبة' : 'Service Required'}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="General Contracting">{currentLang === 'ar' ? 'المقاولات العامة والإنشاءات' : 'General Contracting'}</option>
                      <option value="Commercial Towers">{currentLang === 'ar' ? 'الأبراج والمباني التجارية' : 'Commercial Towers'}</option>
                      <option value="Civil Infrastructure">{currentLang === 'ar' ? 'البنية التحتية والأعمال المدنية' : 'Civil Infrastructure'}</option>
                      <option value="Engineering Consultation">{currentLang === 'ar' ? 'الاستشارات والدراسات الفنية' : 'Engineering Consultation'}</option>
                      <option value="Other">{currentLang === 'ar' ? 'أخرى / استفسار عام' : 'Other / General Inquiry'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-300 uppercase mb-1.5">
                    {currentLang === 'ar' ? 'تفاصيل المشروع والاستفسار *' : 'Project Details / Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={currentLang === 'ar' ? 'اكتب نبذة عن المشروع، الموقع، والجدول الزمني التقديري...' : 'Describe project scope, location, and estimated timeline...'}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-xs focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium text-xs uppercase tracking-wider flex items-center space-x-2 rtl:space-x-reverse transition-all shadow-lg active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? 'إرسال الاستفسار عبر البريد' : 'Submit Inquiry via Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenRfp}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 transition-colors font-light cursor-pointer"
                  >
                    {currentLang === 'ar' ? 'أو افتح نموذج طلب عرض السعر المفصل (RFP)' : 'Or Open Detailed RFP Form'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Compact Normal-Color Map + Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Map */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl">
              <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium text-white text-[11px] truncate">
                    {currentLang === 'ar' ? 'مقر مجموعة تعمير • الدمام' : 'TAMEER HQ • Dammam'}
                  </span>
                </div>

                <a
                  href="https://maps.google.com/?q=King+Fahd+Road+Dammam+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-zinc-400 hover:text-white flex items-center space-x-1 rtl:space-x-reverse transition-colors"
                >
                  <span>{currentLang === 'ar' ? 'خرائط Google' : 'Google Maps'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-[220px] sm:h-[240px] bg-zinc-100">
                <iframe
                  title="TAMEER Headquarters Location Map"
                  src="https://maps.google.com/maps?q=Dammam%2C%20Eastern%20Province%2C%20Saudi%20Arabia&t=m&z=13&output=embed&iwloc=near"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Direct Communication Channels Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-900 space-y-4 text-xs font-mono">
              <div className="text-zinc-400 font-light uppercase tracking-wider pb-2 border-b border-zinc-900 text-[10px]">
                {currentLang === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Channels'}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider">Email</div>
                    <a href={`mailto:${COMPANY.email}`} className="text-zinc-200 hover:text-white transition-colors block text-xs font-sans font-light mt-0.5">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MessageSquare className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider">WhatsApp Direct</div>
                    <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-white transition-colors flex items-center space-x-1 rtl:space-x-reverse text-xs font-sans font-light mt-0.5">
                      <span>{currentLang === 'ar' ? 'محادثة فورية مع المستشار' : 'Chat with Engineering Team'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Instagram className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider">Instagram</div>
                    <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-white transition-colors flex items-center space-x-1 rtl:space-x-reverse text-xs font-sans font-light mt-0.5">
                      <span>@tameer_almesaha_contracting</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider">Address</div>
                    <div className="text-zinc-300 font-sans font-light text-xs mt-0.5">
                      {currentLang === 'ar' ? COMPANY.addressAr : COMPANY.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Line Footer */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-4">
          <div>
            © {new Date().getFullYear()} TAMEER GROUP | {COMPANY.fullNameAr}.
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
              Instagram
            </a>
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
              WhatsApp
            </a>
            <a href="https://tameer-co.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
              www.tameer-co.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
