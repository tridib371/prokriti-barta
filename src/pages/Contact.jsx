import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const { t, lang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{t('nav.contact')}</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            {t('contact.title')}
          </h1>
          <p className="text-xs text-muted font-bn-sans">
            {t('contact.sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
              {lang === 'bn' ? 'হটলাইন ও এড্রেস' : 'Hotline & Address'}
            </h2>

            <div className="space-y-4 text-xs font-bn-sans">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{t('nav.helpline')}</h4>
                  <p className="text-muted mt-0.5">+880 1712-345678 (9 AM - 10 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{t('contact.email')}</h4>
                  <p className="text-muted mt-0.5">support@prokritibarta.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{lang === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}</h4>
                  <p className="text-muted mt-0.5">{t('footer.address')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-bold text-xl text-primary">{t('contact.success')}</h3>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>{t('contact.send')}</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
                  {t('contact.send')}
                </h2>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('contact.name')} *</label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('register.phone')} *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01700-000000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('contact.message')} *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder={lang === 'bn' ? 'আপনার বার্তাটি লিখুন...' : 'Write your message here...'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full gap-2">
                  {t('contact.send')} <Send size={16} />
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
