import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, HeartHandshake, Award, Leaf, Box } from 'lucide-react';
import { promisesData } from '../data/promisesData';
import { useLanguage } from '../context/LanguageContext';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';

export default function PromiseDetail() {
  const { slug } = useParams();
  const { lang, t, n } = useLanguage();

  const promise = promisesData[slug];

  if (!promise) {
    return <Navigate to="/about" replace />;
  }

  const IconComponent = promise.icon;

  // Other 3 promises for quick navigation
  const otherPromises = Object.values(promisesData).filter((p) => p.slug !== slug);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12 text-ink select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted font-bn-sans">
          <Link to="/" className="hover:text-primary transition-colors">
            {lang === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <ChevronRight size={14} className="text-muted/60" />
          <Link to="/about" className="hover:text-primary transition-colors">
            {lang === 'bn' ? 'আমাদের অঙ্গীকার' : 'Our Promises'}
          </Link>
          <ChevronRight size={14} className="text-muted/60" />
          <span className="text-primary font-bold">
            {lang === 'bn' ? promise.badgeBn : promise.badgeEn}
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] text-white p-6 sm:p-10 lg:p-14 shadow-xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-2/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-wider shadow-md">
                <IconComponent size={15} />
                <span>{lang === 'bn' ? promise.badgeBn : promise.badgeEn}</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {lang === 'bn' ? promise.titleBn : promise.titleEn}
              </h1>

              <p className="text-sm sm:text-base text-white/85 font-bn-sans leading-relaxed max-w-xl">
                {lang === 'bn' ? promise.subtitleBn : promise.subtitleEn}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link to={`/shop?category=${promise.recommendedCategory}`}>
                  <Button variant="accent" size="lg" className="gap-2 shadow-lg font-bold">
                    {lang === 'bn' ? 'খাঁটি পণ্য দেখুন' : 'Explore Pure Products'} <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                    {lang === 'bn' ? 'সকল অঙ্গীকার' : 'All Promises'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                <img
                  src={promise.heroImage}
                  alt={lang === 'bn' ? promise.titleBn : promise.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-primary/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white font-bn-sans text-center">
                  {lang === 'bn' ? 'প্রকৃতি বার্তা লোকজ ঐতিহ্য ও শতভাগ বিশুদ্ধতা' : 'Prokriti Barta Authentic Purity Guarantee'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Impact Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {promise.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] shadow-xs text-center space-y-1 hover:border-accent transition-colors"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-accent">
                {stat.num}
              </div>
              <div className="text-xs sm:text-sm text-ink/75 font-bold font-bn-sans">
                {lang === 'bn' ? stat.labelBn : stat.labelEn}
              </div>
            </motion.div>
          ))}
        </div>

        <AlponaDivider />

        {/* Deep Dive 3 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'নিখুঁত কর্মপদ্ধতি' : 'In-Depth Standards'}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {lang === 'bn' ? 'কীভাবে আমরা এই মান বজায় রাখি' : 'How We Safeguard This Promise'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {promise.features.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Full Card Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <FeatIcon size={26} />
                      </div>
                      <span className="font-display font-extrabold text-2xl text-primary/20 group-hover:text-accent/50 transition-colors duration-300">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-primary group-hover:text-white transition-colors duration-300 leading-snug">
                      {lang === 'bn' ? feat.titleBn : feat.titleEn}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/90 font-bn-sans leading-relaxed transition-colors duration-300">
                      {lang === 'bn' ? feat.descBn : feat.descEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-primary/10 group-hover:border-white/20 flex items-center gap-1.5 text-xs font-bold text-accent relative z-10 transition-colors duration-300 font-bn-sans">
                    <CheckCircle2 size={15} />
                    <span>{lang === 'bn' ? 'শতভাগ পরীক্ষিত নিশ্চয়তা' : '100% Certified Standard'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight Quote Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-accent/10 via-primary/5 to-accent/15 border-2 border-accent/30 text-center max-w-3xl mx-auto space-y-3">
          <p className="font-display font-bold text-lg sm:text-2xl text-primary italic">
            "{lang === 'bn' ? promise.highlightQuoteBn : promise.highlightQuoteEn}"
          </p>
          <span className="text-xs text-muted font-bold font-bn-sans uppercase tracking-wider block">
            - {lang === 'bn' ? 'প্রকৃতি বার্তা পরিবার' : 'Prokriti Barta Philosophy'}
          </span>
        </div>

        <AlponaDivider />

        {/* Explore Other Core Promises */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-2xl text-primary">
                {lang === 'bn' ? 'অন্যান্য মূল অঙ্গীকারসমূহ' : 'Explore Other Core Promises'}
              </h3>
              <p className="text-xs text-muted font-bn-sans">
                {lang === 'bn' ? 'আমাদের প্রতিটি কাজের পেছনের স্বচ্ছতা জানুন:' : 'Discover our full commitment to pure wellness:'}
              </p>
            </div>
            <Link to="/about" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
              {lang === 'bn' ? 'সকল অঙ্গীকার দেখুন' : 'View All Promises'} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPromises.map((op, idx) => {
              const OtherIcon = op.icon;
              return (
                <Link
                  key={idx}
                  to={`/promise/${op.slug}`}
                  className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 flex flex-col justify-between shadow-[0_4px_14px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_16px_32px_-6px_rgba(27,59,43,0.4)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <OtherIcon size={24} />
                    </div>
                    <h4 className="font-display font-bold text-base text-primary group-hover:text-white transition-colors duration-300">
                      {lang === 'bn' ? op.badgeBn : op.badgeEn}
                    </h4>
                    <p className="text-xs text-ink/75 group-hover:text-white/85 font-bn-sans line-clamp-2 transition-colors duration-300">
                      {lang === 'bn' ? op.subtitleBn : op.subtitleEn}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-primary/10 group-hover:border-white/20 flex items-center justify-between relative z-10 text-xs font-bold text-primary group-hover:text-accent font-bn-sans transition-colors duration-300">
                    <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
