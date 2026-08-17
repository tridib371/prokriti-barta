import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowRight, Leaf, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import FallingLeaves from '../components/ui/FallingLeaves';
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
    <div className="min-h-[calc(100vh-140px)] bg-bg flex items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none">
      
      {/* Interactive Falling & Floating Leaves Physics Layer */}
      <FallingLeaves count={34} />
      
      {/* Deep Ambient Background Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/30 blur-3xl pointer-events-none"
      />

      {/* Floating Deep Rich Orange Leaf 1 (Top Left) */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-8, 8, -8],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute top-8 left-6 sm:left-16 text-accent drop-shadow-[0_6px_12px_rgba(200,109,59,0.3)] pointer-events-none hidden lg:block"
      >
        <Leaf size={42} className="fill-accent/20 text-accent stroke-[2.2]" />
      </motion.div>

      {/* Floating Deep Rich Orange Leaf 2 (Bottom Right) */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [8, -8, 8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        className="absolute bottom-8 right-6 sm:right-16 text-accent drop-shadow-[0_6px_12px_rgba(200,109,59,0.3)] pointer-events-none hidden lg:block"
      >
        <Leaf size={46} className="fill-accent/20 text-accent stroke-[2.2]" />
      </motion.div>

      {/* Main 404 Horizontal (X-Axis) Card Container */}
      <div className="relative max-w-3xl lg:max-w-4xl w-full z-20 my-auto">
        {/* Deep Backdrop Shadow Halo */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 via-accent/35 to-primary/50 rounded-[34px] blur-2xl opacity-75 -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-accent rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_25px_60px_-15px_rgba(27,59,43,0.5),0_10px_30px_-10px_rgba(0,0,0,0.3)] ring-1 ring-accent/30 relative overflow-hidden"
          style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Subtle Ambient Wave Backlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          {/* 2-Column Responsive Layout (X-Axis Landscape on Desktop / Compact on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center text-center md:text-left">
            
            {/* Left Column (X-Axis Side 1): 404 Visual, Badge & Quick Actions */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3.5 border-b-2 md:border-b-0 md:border-r-2 border-[#D8CEAB] pb-5 md:pb-0 md:pr-7">
              
              {/* Smooth Floating 404 Number */}
              <div className="relative inline-block">
                <motion.div
                  animate={{
                    y: [-4, 4, -4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
                  className="relative inline-block"
                >
                  <span className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight bg-gradient-to-r from-accent via-[#E89814] to-accent bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-md select-none inline-block">
                    {n('404')}
                  </span>
                </motion.div>

                {/* Search Badge */}
                <div className="absolute -top-1 -right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-primary text-accent flex items-center justify-center shadow-md border border-accent/40">
                  <SearchX size={17} />
                </div>
              </div>

              {/* Status Pill Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                <Leaf size={12} className="text-accent" />
                <span>{lang === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}</span>
              </span>

              {/* Primary Action Buttons (Sleek & perfectly proportioned) */}
              <div className="pt-2 flex flex-row items-center justify-center gap-2.5 w-full">
                <Link to="/" className="inline-block">
                  <Button
                    variant="accent"
                    size="sm"
                    className="rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all gap-1.5 font-bold px-4 py-2 text-xs cursor-pointer whitespace-nowrap"
                  >
                    <Home size={14} />
                    <span>{t('btn.backToHome')}</span>
                  </Button>
                </Link>
                <Link to="/shop" className="inline-block">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full bg-white/90 text-primary border-primary/20 hover:border-accent hover:bg-accent/10 transition-all gap-1.5 font-bold px-4 py-2 text-xs cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingBag size={14} />
                    <span>{lang === 'bn' ? 'শপ দেখুন' : 'Explore Shop'}</span>
                    <ArrowRight size={12} />
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Column (X-Axis Side 2): Context, Description & Popular Category Chips */}
            <div className="md:col-span-7 space-y-3.5">
              
              <div className="space-y-1.5">
                <h1 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-primary leading-tight">
                  {lang === 'bn'
                    ? 'প্রকৃতির গহীনে পথ হারিয়েছেন?'
                    : 'Lost in the Depths of Nature?'}
                </h1>

                <p className="text-xs sm:text-[13px] text-ink/80 font-bn-sans leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনি যে পাতা বা পণ্যটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ভুল লিঙ্ক টাইপ করেছেন।'
                    : 'The page or product you are searching for might have been moved or the address was mistyped.'}
                </p>
              </div>

              {/* Quick Helpful Category Chips with Bold Deep Divider */}
              <div className="pt-3 border-t-2 border-[#D8CEAB] space-y-2">
                <span className="text-[11px] font-bold text-muted font-bn-sans uppercase tracking-wider block">
                  {lang === 'bn' ? 'সরাসরি ঘুরে দেখতে পারেন:' : 'Or explore popular collections:'}
                </span>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {suggestedLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-accent hover:text-white border border-[#E5DCB8] hover:border-accent text-xs font-bold text-primary font-bn-sans transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95"
                    >
                      {lang === 'bn' ? item.labelBn : item.labelEn}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>

    </div>
  );
}
