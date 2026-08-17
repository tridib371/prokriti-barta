import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Users, ShieldCheck, Heart, ArrowRight, Sun, Award, CheckCircle2, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

function AnimatedCounter({ end, duration = 2, suffix = '', lang = 'en' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;
    const endValue = end;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + easedProgress * (endValue - startValue));
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, end, duration]);

  const formattedCount = () => {
    let str = count.toLocaleString();
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      str = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\d/g, d => bnDigits[d]);
    }
    return str;
  };

  return (
    <span ref={ref}>
      {formattedCount()}{suffix}
    </span>
  );
}

export default function About() {
  const { t, lang, n } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const processSteps = [
    {
      id: 'step1',
      titleBn: '১. সুন্দরবনের গহীন বন থেকে বুনো মধু সংগ্রহ',
      titleEn: '1. Wild Honey Harvest in Deep Sundarbans',
      descBn: 'আমাদের অভিজ্ঞ মৌয়ালরা ম্যানগ্রোভ বনের গভীর চাক থেকে ধোঁয়া ছাড়া ঐতিহ্যবাহী লোকজ উপায়ে খাঁটি পদ্ম ও বুনো মধু সংগ্রহ করেন। এতে অক্ষুণ্ণ থাকে পরাগ, রাজকীয় জেলি ও প্রাকৃতিক এনজাইম।',
      descEn: 'Trained traditional Moubals navigate deep mangrove biosphere reserves, hand-harvesting raw honey without heat or synthetic refining, preserving full royal jelly and pollen.',
      img: '/raw-honey.jpg',
      badgeBn: 'অপাস্তুরিত ও কাঁচা',
      badgeEn: 'Unheated & Raw',
    },
    {
      id: 'step2',
      titleBn: '২. খাঁটি দেশি দুধের বৈদিক বিলোনা মন্থন',
      titleEn: '2. Ancient Vedic Clay Handi Bilona Churning',
      descBn: 'ঘাসখাওয়া দেশি গরুর দুধ জ্বাল দিয়ে দই বানিয়ে প্রাচীন মাটির হাঁড়িতে কাঠের মন্থন দিয়ে মাখন তুলে ঘি তৈরি করা হয়। ফলে তৈরি হয় প্রিমিয়াম দানাদার ও প্রাক-হজম সুবাসিত ঘি।',
      descEn: 'Pure grass-fed cow milk is cultured into curd, then slow-churned bidirectionally in clay handis with wooden staffs to yield golden, aromatic granular Bilona ghee.',
      img: '/ghee.jpg',
      badgeBn: 'ঐতিহ্যবাহী বিলোনা',
      badgeEn: 'Artisanal Bilona',
    },
    {
      id: 'step3',
      titleBn: '৩. কাঠের ঘানিতে কোল্ড-প্রেসড তেল নিষ্কাশন',
      titleEn: '3. Low-Heat Wood-Pressed Seed Extraction',
      descBn: '৪০ ডিগ্রি সেলসিয়াসের নিচে ধীরগতিতে তেঁতুল কাঠের ঘানিতে চাপ দিয়ে সরিষা, তিল ও নারিকেল তেল বের করা হয়। কোনো প্রকার কেমিক্যাল বা দ্রাবক ছাড়া এটি শতভাগ প্রাকৃতিক।',
      descEn: 'Yellow mustard seeds, black sesame, and sun-dried barishal coconuts are gently crushed under 40°C in heavy tamarind wood mills, preserving natural vitamins & allyl isothiocyanate.',
      img: '/mustard-honey.jpg',
      badgeBn: 'কোল্ড-প্রেসড ঘানি',
      badgeEn: 'Cold-Pressed Ghani',
    },
    {
      id: 'step4',
      titleBn: '৪. গ্রানাইট পাথরে ধীরগতিতে বাঁটা খাঁটি মশলা',
      titleEn: '4. Granite Stone Slow-Ground Pure Spices',
      descBn: 'পার্বত্য এলাকার পাহাড়ি হলুদ শিকড়, শুকনা লাল মরিচ ও দেশি ধনিয়া রোদে শুকিয়ে পাথরে পিষে তৈরি করা হয়। এতে উদ্বায়ী সুবাস ও প্রাকৃতিক রঙের শতভাগ নিশ্চয়তা থাকে।',
      descEn: 'Sun-dried native turmeric roots, stemmed chillies, and coriander seeds are ground slowly on granite stone mills, safeguarding volatile essential oils and rich natural color.',
      img: '/turmeric-powder.jpg',
      badgeBn: 'পাথরে বাঁটা স্পাইস',
      badgeEn: 'Granite Stone Ground',
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      titleBn: '১০০% ভেজালমুক্ত অঙ্গীকার',
      titleEn: 'Zero Chemical Guarantee',
      descBn: 'কোনো প্রিজারভেটিভ, কৃত্রিম সুবাস বা কেমিক্যাল ছাড়াই প্রকৃতির নিজস্ব গুণাগুণে তৈরি।',
      descEn: 'Unadulterated food untouched by synthetic additives, lead oxides, or artificial colors.',
    },
    {
      icon: Users,
      titleBn: 'প্রান্তিক কৃষকের সরাসরি মর্যাদা',
      titleEn: 'Direct Fair-Trade Ecosystem',
      descBn: 'মধ্যস্বত্বভোগী ছাড়াই লোকজ মৌয়াল ও খামারিদের তাদের শ্রমের সর্বোচ্চ ন্যায্য মজুরি প্রদান।',
      descEn: 'Bypassing brokers to directly empower native honey-gatherers, dairy keepers, and growers.',
    },
    {
      icon: Sun,
      titleBn: 'ঐতিহ্যবাহী লোকজ পদ্ধতি',
      titleEn: 'Ancient Processing Heritage',
      descBn: 'বিলোনা মন্থন, কাঠের ঘানি ও পাথরে পিষে প্রাকৃতিক পুষ্টি অক্ষুণ্ণ রাখার শতবর্ষী প্রযুক্তি।',
      descEn: 'Preserving century-old Bangladeshi food craft techniques for genuine authentic nutrition.',
    },
    {
      icon: Heart,
      titleBn: 'পরিবারের দীর্ঘস্থায়ী সুস্থতা',
      titleEn: 'Family Wellness & Health',
      descBn: 'প্রতিদিনের খাবারের টেবিলে ফিরিয়ে আনা সুস্বাস্থ্য, রোগ প্রতিরোধ ক্ষমতা ও প্রাক-হজম শক্তি।',
      descEn: 'Nourishing modern households with clean, immunity-boosting heritage Superfoods.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider">
            <Leaf size={14} /> {t('about.heroBadge')}
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            {t('about.missionTitle')}
          </h1>
          <p className="text-muted text-sm sm:text-base font-bn-sans leading-relaxed">
            {t('about.missionDesc')}
          </p>
        </motion.div>

        <AlponaDivider />

        {/* Stats Counter Bar */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <motion.div variants={itemVariants} className="bg-surface border border-line p-5 rounded-2xl text-center space-y-1.5 shadow-xs">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-accent">
              <AnimatedCounter end={100} suffix="%" lang={lang} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary font-bn-sans">{t('about.stats.purity')}</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-surface border border-line p-5 rounded-2xl text-center space-y-1.5 shadow-xs">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-accent">
              <AnimatedCounter end={250} suffix="+" lang={lang} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary font-bn-sans">{t('about.stats.farmers')}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-surface border border-line p-5 rounded-2xl text-center space-y-1.5 shadow-xs">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-accent">
              <AnimatedCounter end={6} lang={lang} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary font-bn-sans">{t('about.stats.categories')}</div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-surface border border-line p-5 rounded-2xl text-center space-y-1.5 shadow-xs">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-accent">
              <AnimatedCounter end={10000} suffix="+" lang={lang} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-primary font-bn-sans">{t('about.stats.families')}</div>
          </motion.div>
        </motion.div>

        {/* Brand Story Narrative Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface border border-line rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">{t('about.storyTitle')}</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-snug">
              {lang === 'bn' 
                ? 'সুন্দরবনের বুনো গহীন অরণ্য থেকে আধুনিক বাংলাদেশের প্রতিটি ডাইনিং টেবিলে'
                : 'From Deep Mangrove Biospheres To Modern Urban Dining Tables'}
            </h2>
            <p className="text-sm text-ink font-bn-sans leading-relaxed">
              {t('about.storyText')}
            </p>
            <p className="text-sm text-muted font-bn-sans leading-relaxed pt-2 border-t border-line/60">
              {t('about.purityText')}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={16} className="text-accent" /> {lang === 'bn' ? 'অপাস্তুরিত কাঁচা মধু' : 'Raw Unheated Honey'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={16} className="text-accent" /> {lang === 'bn' ? 'বিলোনা গাওয়া ঘি' : 'Artisanal Bilona Ghee'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-bg border border-line group">
            <img
              src="/ghee.jpg"
              alt="Hand Churned Ghee Jar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-surface font-bn-sans text-xs font-bold bg-primary/80 backdrop-blur-md p-3 rounded-xl border border-white/20">
              {lang === 'bn' ? 'প্রকৃতি বার্তার শতভাগ খাঁটি গাওয়া ঘি ও লোকজ খাদ্যাভ্যাস' : 'Pure Hand-Churned Deshi Cow Ghee by Prokriti Barta'}
            </div>
          </div>
        </motion.div>

        {/* 4 Core Pillars of Purity */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {t('about.purityTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-muted font-bn-sans">
              {lang === 'bn' 
                ? 'আমাদের প্রতিটি অর্গানিক পণ্যের পেছনে রয়েছে প্রথাগত কাজের নিয়ম ও স্বচ্ছতা'
                : 'Every single jar and pouch is guided by traditional craft and complete transparency.'}
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Full Card Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon size={26} />
                      </div>
                      <span className="font-display font-extrabold text-2xl text-primary/20 group-hover:text-accent/50 transition-colors duration-300">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-primary group-hover:text-white transition-colors duration-300">
                      {lang === 'bn' ? p.titleBn : p.titleEn}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/90 font-bn-sans leading-relaxed transition-colors duration-300">
                      {lang === 'bn' ? p.descBn : p.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Process Breakdown Grid (Step by Step) */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              {lang === 'bn' ? 'আমাদের লোকজ উৎপাদন প্রণালী' : 'Our Traditional Food Crafts'}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {lang === 'bn' ? 'প্রকৃতি থেকে সরাসরি আপনার ঘরে' : 'Straight From Nature To Your Household'}
            </h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="bg-surface border border-line rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-all shadow-xs group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-accent/20 text-accent font-bold text-[11px]">
                      {lang === 'bn' ? step.badgeBn : step.badgeEn}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors">
                    {lang === 'bn' ? step.titleBn : step.titleEn}
                  </h3>
                  <p className="text-xs text-muted font-bn-sans leading-relaxed">
                    {lang === 'bn' ? step.descBn : step.descEn}
                  </p>
                </div>

                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-bg border border-line">
                  <img
                    src={step.img}
                    alt={step.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Farmer & Social Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-primary to-primary/95 text-surface rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-md"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent font-bold text-xs">
                <Users size={14} /> {t('about.farmerImpactTitle')}
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-surface leading-tight">
                {lang === 'bn' 
                  ? 'আপনার প্রতিটি কেনাকাটায় হাসে গ্রাম বাংলার লোকজ খামারি ও মৌয়াল পরিবার'
                  : 'Every Purchase Supports Traditional Farmers & Sundarbans Moubal Families'}
              </h2>
              <p className="text-sm text-surface/90 font-bn-sans leading-relaxed">
                {t('about.farmerImpactText')}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center gap-3">
              <Link to="/shop">
                <Button variant="accent" size="md" className="gap-2 shadow-md w-full sm:w-auto">
                  {t('btn.goToShop')} <ArrowRight size={16} />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-xs font-bold text-surface/80">
                <PhoneCall size={14} className="text-accent" />
                <span>+880 1717-279166</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
