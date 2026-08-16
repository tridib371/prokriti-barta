import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaDivider from '../components/ui/AlponaDivider';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', subject: 'general', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const { t, lang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      qBn: 'ঢাকা এবং ঢাকার বাইরে ডেলিভারি পেতে কতদিন সময় লাগে?',
      qEn: 'How long does delivery take inside and outside Dhaka?',
      aBn: 'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসের মধ্যে আপনার দোরগোড়ায় হোম ডেলিভারি পৌঁছে দেওয়া হয়।',
      aEn: 'Home delivery is completed within 24-48 hours inside Dhaka and 2-3 business days across all districts outside Dhaka.'
    },
    {
      qBn: 'পণ্য হাতে পেয়ে টাকা পরিশোধ (ক্যাশ অন ডেলিভারি) করা যাবে?',
      qEn: 'Can I pay Cash on Delivery (COD) upon inspecting the package?',
      aBn: 'হ্যাঁ, প্রকৃতি বার্তার প্রতিটি অর্ডারে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। ডেলিভারিম্যানের সামনে পণ্য চেক করে মুল্য পরিশোধ করতে পারবেন।',
      aEn: 'Yes! Every order supports 100% Cash on Delivery (COD). You can inspect your products upon arrival.'
    },
    {
      qBn: 'পণ্য পছন্দ না হলে বা ক্ষতিগ্রস্ত হলে রিটার্ন পলিসি কী?',
      qEn: 'What is your return and refund policy for damaged goods?',
      aBn: 'পণ্য ভাঙা বা ক্ষতিগ্রস্ত অবস্থায় পেলে তৎক্ষণাৎ ডেলিভারিম্যানকে ফেরত দিন বা আমাদের হটলাইনে কল দিন, আমরা বিনা খরচে রিপ্লেসমেন্ট পাঠাব।',
      aEn: 'If a bottle or jar arrives damaged, return it to the delivery agent or call our helpline immediately for a 100% free replacement.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider">
            <MessageSquare size={14} /> {t('nav.contact')}
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-sm sm:text-base text-muted font-bn-sans leading-relaxed">
            {t('contact.sub')}
          </p>
        </div>

        <AlponaDivider />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
                {lang === 'bn' ? 'আমাদের সাথে যোগাযোগের ঠিকানা' : 'Direct Helpline & Support'}
              </h2>

              <div className="space-y-5 text-xs sm:text-sm font-bn-sans">
                
                {/* Phone Hotline */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-bg/60 border border-line hover:border-accent/40 transition-colors">
                  <div className="p-3 bg-accent/15 text-accent rounded-xl shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">{t('nav.helpline')}</h4>
                    <a href="tel:+8801717279166" className="text-accent font-bold hover:underline block text-xs sm:text-sm mt-0.5">
                      +880 1717-279166
                    </a>
                    <p className="text-muted text-[11px] mt-0.5">{lang === 'bn' ? 'সকাল ৯:০০ - রাত ১০:০০ (প্রতিদিন)' : '9:00 AM - 10:00 PM (Daily)'}</p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-bg/60 border border-line hover:border-accent/40 transition-colors">
                  <div className="p-3 bg-accent/15 text-accent rounded-xl shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">{t('contact.email')}</h4>
                    <a href="mailto:support@prokritibarta.com" className="text-accent font-bold hover:underline block text-xs sm:text-sm mt-0.5">
                      support@prokritibarta.com
                    </a>
                    <p className="text-muted text-[11px] mt-0.5">{lang === 'bn' ? '২৪ ঘণ্টার মধ্যে দ্রুত উত্তর প্রদান' : 'Fast response within 24 hours'}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-bg/60 border border-line hover:border-accent/40 transition-colors">
                  <div className="p-3 bg-accent/15 text-accent rounded-xl shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm sm:text-base">{lang === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}</h4>
                    <p className="text-ink text-xs sm:text-sm mt-0.5 leading-relaxed">{t('footer.address')}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Promise Banner */}
            <div className="bg-primary/95 text-surface rounded-3xl p-6 space-y-2 shadow-xs">
              <h3 className="font-display font-bold text-base text-accent flex items-center gap-1.5">
                <Sparkles size={16} /> {lang === 'bn' ? 'আমাদের অঙ্গীকার' : 'Our Quality Assurance'}
              </h3>
              <p className="text-xs text-surface/85 font-bn-sans leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার প্রতিটি প্রশ্ন ও মতামত প্রকৃতি বার্তার জন্য অত্যন্ত মূল্যবান। আমরা সরাসরি খামার থেকে গ্রাহক সেবা পরিচালনা করি।'
                  : 'Every query is handled directly by our organic food safety and customer happiness team.'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-bold text-2xl text-primary">{t('contact.success')}</h3>
                <p className="text-xs sm:text-sm text-muted font-bn-sans max-w-sm mx-auto">
                  {lang === 'bn' ? 'আমাদের প্রতিনিধি আপনার নম্বরে খুব শীঘ্রই যোগাযোগ করবেন।' : 'Our support specialist will review your message and reach out shortly.'}
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-2">
                  {lang === 'bn' ? 'নতুন বার্তা পাঠান' : 'Send Another Message'}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-3 border-b border-line flex items-center justify-between">
                  <h2 className="font-display font-bold text-xl text-primary">
                    {lang === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send Us A Message'}
                  </h2>
                  <span className="text-[11px] text-muted font-bn-sans">* {lang === 'bn' ? 'আবশ্যক তথ্য' : 'Required fields'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">{t('contact.name')} *</label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm font-bn-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">{t('register.phone')} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01717-279166"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm font-bn-sans transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">{lang === 'bn' ? 'বিষয় সিলেক্ট করুন' : 'Subject'}</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm font-bn-sans transition-all"
                  >
                    <option value="general">{lang === 'bn' ? 'সাধারণ বিষয় / প্রাক-ক্রয় তথ্য' : 'General Inquiry'}</option>
                    <option value="order">{lang === 'bn' ? 'অর্ডার ট্র্যাকিং ও ডেলিভারি' : 'Order Tracking & Delivery'}</option>
                    <option value="wholesale">{lang === 'bn' ? 'হোলসেল ও খামারি পার্টনারশিপ' : 'Wholesale & Partnership'}</option>
                    <option value="feedback">{lang === 'bn' ? 'ফিডব্যাক ও পরামর্শ' : 'Feedback & Suggestions'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">{t('contact.message')} *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder={lang === 'bn' ? 'আপনার কাঙ্ক্ষিত পণ্য বা প্রশ্ন বিস্তারিত লিখুন...' : 'Write your details or inquiry here...'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm font-bn-sans transition-all resize-none"
                  />
                </div>

                {/* Sleek Compact Action Button (Not bulky full-width) */}
                <div className="pt-2 flex justify-start sm:justify-end">
                  <Button type="submit" variant="accent" size="md" className="px-6 py-2.5 rounded-xl gap-2 font-bold shadow-xs">
                    {t('contact.send')} <Send size={15} />
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Quick Accordion Section */}
        <div className="pt-8 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center justify-center gap-1">
              <HelpCircle size={14} /> FAQ
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {lang === 'bn' ? 'সাধারণ জিজ্ঞাসাবলী' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3 font-bn-sans">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-surface border border-line rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-bg/40 transition-colors"
                >
                  <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                  <ChevronDown size={18} className={`text-accent shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-muted leading-relaxed border-t border-line/50">
                        {lang === 'bn' ? faq.aBn : faq.aEn}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
