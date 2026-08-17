import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ShoppingBag, ArrowRight, Leaf, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t, lang, n } = useLanguage();

  const suggestedLinks = [
    { labelBn: 'খাঁটি মধু', labelEn: 'Raw Honey', path: '/shop?category=honey' },
    { labelBn: 'বৈদিক বিলোনা ঘি', labelEn: 'Vedic Ghee', path: '/shop?category=ghee' },
    { labelBn: 'কাঠের ঘানির তেল', labelEn: 'Wood-Pressed Oil', path: '/shop?category=oil' },
    { labelBn: 'চলতি অফারসমূহ', labelEn: 'Special Offers', path: '/offers' },
  ];

  return (
    <div className="min-h-[85vh] bg-bg flex flex-col items-center justify-center text-center p-4 sm:p-6 relative overflow-hidden select-none">
      
      {/* Deep Ambient Background Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/25 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -35, 0],
          y: [0, 35, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/35 blur-3xl pointer-events-none"
      />

      {/* Floating Organic Decorative Leaf 1 */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, -10, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 sm:left-24 text-accent/40 pointer-events-none hidden sm:block"
      >
        <Leaf size={44} />
      </motion.div>

      {/* Floating Organic Decorative Compass 2 */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -20, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-10 sm:right-24 text-primary/30 pointer-events-none hidden sm:block"
      >
        <Compass size={52} />
      </motion.div>

      {/* Main 404 Interactive Card */}
      <div className="relative max-w-xl w-full z-10 my-6">
        {/* Deep Backdrop Shadow Halo */}
        <div className="absolute -inset-2.5 bg-gradient-to-r from-primary/40 via-accent/35 to-primary/50 rounded-[34px] blur-2xl opacity-75 -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-accent rounded-3xl p-8 sm:p-12 shadow-[0_30px_80px_-15px_rgba(27,59,43,0.55),0_15px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-accent/30 space-y-6 relative overflow-hidden"
        >
          {/* Subtle Ambient Wave Backlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          {/* Floating 404 Badge with Continuous Smooth Shimmer & Levitation */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative inline-block"
            >
              <span className="font-display font-black text-7xl sm:text-9xl tracking-tight bg-gradient-to-r from-accent via-[#E89814] to-accent-2 bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-md select-none">
                {n('404')}
              </span>
            </motion.div>

            {/* Continuous Pulsing Search Lost Badge */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-1 -right-3 w-10 h-10 rounded-2xl bg-primary text-accent flex items-center justify-center shadow-lg border border-accent/40"
            >
              <SearchX size={20} />
            </motion.div>
          </div>

          {/* Continuously Animated Headline */}
          <div className="space-y-3">
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider">
                <Compass size={14} className="animate-spin" style={{ animationDuration: '10s' }} />
                <span>{lang === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}</span>
              </span>
            </motion.div>

            <motion.h1
              animate={{
                opacity: [0.92, 1, 0.92],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="font-display font-bold text-2xl sm:text-3xl text-primary leading-snug"
            >
              {lang === 'bn'
                ? 'প্রকৃতির গহীনে পথ হারিয়েছেন?'
                : 'Lost in the Depths of Nature?'}
            </motion.h1>

            {/* Continuously Animated Subtitle */}
            <motion.p
              animate={{
                opacity: [0.8, 1, 0.8],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="text-xs sm:text-sm text-ink/75 font-bn-sans leading-relaxed max-w-md mx-auto"
            >
              {lang === 'bn'
                ? 'আপনি যে পাতা বা পণ্যটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ভুল লিঙ্ক টাইপ করেছেন।'
                : 'The page or product you are searching for might have been moved or the address was mistyped.'}
            </motion.p>
          </div>

          <AlponaDivider className="my-2" />

          {/* Quick Helpful Category Chips */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-muted font-bn-sans uppercase tracking-wider block">
              {lang === 'bn' ? 'অথবা সরাসরি ঘুরে দেখুন:' : 'Or explore popular collections:'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {suggestedLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-accent hover:text-white border border-[#E5DCB8] hover:border-accent text-xs font-bold text-primary font-bn-sans transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95"
                >
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </Link>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all gap-2 font-bold px-8"
              >
                <Home size={18} />
                <span>{t('btn.backToHome')}</span>
              </Button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white/90 text-primary border-primary/20 hover:border-accent hover:bg-accent/10 transition-all gap-2 font-bold px-6"
              >
                <ShoppingBag size={18} />
                <span>{lang === 'bn' ? 'শপ দেখুন' : 'Explore Shop'}</span>
                <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
