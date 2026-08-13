import React from 'react';
import { Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Delivery() {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{t('delivery.title')}</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            {t('delivery.title')}
          </h1>
          <p className="text-xs text-muted font-bn-sans">{t('delivery.sub')}</p>
        </div>

        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-bn-sans leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
              <Truck className="text-accent" size={20} /> {lang === 'bn' ? 'ডেলিভারি চার্জ ও সময়সীমা' : 'Delivery Rates & Timelines'}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li><strong>{lang === 'bn' ? 'ঢাকা সিটি কর্পোরেশন এলাকা:' : 'Dhaka City Area:'}</strong> {lang === 'bn' ? '২৪ থেকে ৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি (চার্জ ৳৬০)।' : 'Home delivery within 24-48 hours (Charge ৳60).'}</li>
              <li><strong>{lang === 'bn' ? 'ঢাকার বাইরে (উপজেলা ও জেলা পর্যায়):' : 'Outside Dhaka:'}</strong> {lang === 'bn' ? '২ থেকে ৪ দিনের মধ্যে ডেলিভারি (চার্জ ৳১০০)।' : 'Delivery within 2-4 days (Charge ৳100).'}</li>
              <li><strong>{lang === 'bn' ? 'ফ্রি ডেলিভারি অফার:' : 'Free Shipping Offer:'}</strong> {t('nav.announcement')}</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-line">
            <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
              <RefreshCw className="text-accent" size={20} /> {t('footer.return.title')}
            </h2>
            <p className="text-muted">
              {t('footer.return.sub')} — {lang === 'bn' ? 'পরিবহনের সময় প্রোডাক্ট ক্ষতিগ্রস্ত হলে দ্রুত ফ্রি রিপ্লেসমেন্ট প্রদান করা হবে।' : 'Quick free replacement provided if products get damaged during transit.'}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
