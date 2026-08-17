import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowRight, Leaf, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t, lang, n } = useLanguage();

  const suggestedLinks = [
    { labelBn: 'খাঁটি মধু', labelEn: 'Raw Honey', path: '/shop?category=honey' },
    { labelBn: 'গাওয়া ঘি ও তেল', labelEn: 'Vedic Ghee & Oils', path: '/shop?category=ghee-oils' },
    { labelBn: 'খাঁটি মশলা', labelEn: 'Pure Spices', path: '/shop?category=spices' },
    { labelBn: 'চলতি অফারসমূহ', labelEn: 'Special Offers', path: '/offers' },
  ];

  return (
    <div className="min-h-[85vh] bg-bg flex flex-col items-center justify-center text-center p-4 sm:p-6 relative overflow-hidden select-none">
      
      {/* Deep Ambient Background Glow Blobs (Smooth 10s GPU Glide) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none"
      />

      {/* Floating Deep Rich Orange Leaf 1 (Top Left) */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [-8, 10, -8],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute top-16 left-8 sm:left-24 text-accent drop-shadow-[0_8px_16px_rgba(200,109,59,0.35)] pointer-events-none hidden sm:block"
      >
        <Leaf size={48} className="fill-accent/20 text-accent stroke-[2.2]" />
      </motion.div>

      {/* Floating Deep Rich Orange Leaf 2 (Bottom Right) */}
      <motion.div
        animate={{
          y: [12, -12, 12],
          rotate: [10, -10, 10],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute bottom-16 right-8 sm:right-24 text-accent drop-shadow-[0_8px_16px_rgba(200,109,59,0.35)] pointer-events-none hidden sm:block"
      >
        <Leaf size={52} className="fill-accent/20 text-accent stroke-[2.2]" />
      </motion.div>

      {/* Main 404 Interactive Card */}
      <div className="relative max-w-xl w-full z-10 my-6">
        {/* Deep Backdrop Shadow Halo */}
        <div className="absolute -inset-2.5 bg-gradient-to-r from-primary/40 via-accent/35 to-primary/50 rounded-[34px] blur-2xl opacity-75 -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-accent rounded-3xl p-8 sm:p-12 shadow-[0_30px_80px_-15px_rgba(27,59,43,0.55),0_15px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-accent/30 space-y-6 relative overflow-hidden"
          style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Subtle Ambient Wave Backlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          {/* Smooth Floating 404 Visual Anchor */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
            className="relative inline-block"
          >
            <span className="font-display font-black text-7xl sm:text-9xl tracking-tight bg-gradient-to-r from-accent via-[#E89814] to-accent bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-md select-none inline-block">
              {n('404')}
            </span>

            {/* Smooth Floating Search Badge */}
            <div className="absolute -top-1 -right-3 w-10 h-10 rounded-2xl bg-primary text-accent flex items-center justify-center shadow-lg border border-accent/40">
              <SearchX size={20} />
            </div>
          </motion.div>

          {/* Smooth Cohesive Floating Content Section */}
          <motion.div
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
            className="space-y-3"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider">
                <Leaf size={13} className="text-accent" />
                <span>{lang === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}</span>
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-snug">
              {lang === 'bn'
                ? 'প্রকৃতির গহীনে পথ হারিয়েছেন?'
                : 'Lost in the Depths of Nature?'}
            </h1>

            <p className="text-xs sm:text-sm text-ink/80 font-bn-sans leading-relaxed max-w-md mx-auto">
              {lang === 'bn'
                ? 'আপনি যে পাতা বা পণ্যটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ভুল লিঙ্ক টাইপ করেছেন।'
                : 'The page or product you are searching for might have been moved or the address was mistyped.'}
            </p>
          </motion.div>

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
                  className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-accent hover:text-white border border-[#E5DCB8] hover:border-accent text-xs font-bold text-primary font-bn-sans transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95"
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
                className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all gap-2 font-bold px-8 cursor-pointer"
              >
                <Home size={18} />
                <span>{t('btn.backToHome')}</span>
              </Button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white/90 text-primary border-primary/20 hover:border-accent hover:bg-accent/10 transition-all gap-2 font-bold px-6 cursor-pointer"
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
