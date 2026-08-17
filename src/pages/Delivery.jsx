import React, { useState } from 'react';
import { Truck, RefreshCw, ShieldCheck, Clock, MapPin, PackageCheck, AlertCircle, PhoneCall, ChevronDown, CheckCircle2, Calculator, Box, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaDivider from '../components/ui/AlponaDivider';
import { useLanguage } from '../context/LanguageContext';

export default function Delivery() {
  const { t, n, lang } = useLanguage();

  const [calcZone, setCalcZone] = useState('dhaka');
  const [calcAmount, setCalcAmount] = useState('1200');
  const [openFaq, setOpenFaq] = useState(null);

  const currentAmount = Number(calcAmount) || 0;

  // Delivery Calculator Logic
  const calcDeliveryFee = () => {
    if (currentAmount >= 1000) return 0;
    return calcZone === 'dhaka' ? 60 : 100;
  };

  const deliveryZones = [
    {
      titleBn: 'ঢাকা সিটি কর্পোরেশন',
      titleEn: 'Dhaka City Corporation',
      timeBn: '২৪ - ৩৬ ঘণ্টা',
      timeEn: '24 - 36 Hours',
      chargeBn: '৳৬০ (৳১০০০+ অর্ডারে ফ্রি)',
      chargeEn: '৳60 (FREE over ৳1000)',
      descBn: 'মিরপুর, ধানমন্ডি, গুলশান, উত্তরা, পুরান ঢাকাসহ সকল সিটি এলাকায় হোম ডেলিভারি।',
      descEn: 'Direct doorstep home delivery across Mirpur, Dhanmondi, Gulshan, Uttara & Old Dhaka.',
      badge: 'Fastest'
    },
    {
      titleBn: 'গাজীপুর, সাভার ও নারায়ণগঞ্জ',
      titleEn: 'Gazipur, Savar & Narayanganj',
      timeBn: '২৪ - ৪৮ ঘণ্টা',
      timeEn: '24 - 48 Hours',
      chargeBn: '৳৮০ (৳১০০০+ অর্ডারে ফ্রি)',
      chargeEn: '৳80 (FREE over ৳1000)',
      descBn: 'ঢাকা সংলগ্ন শিল্পাঞ্চল ও সাবার/গাজীপুরের প্রধান প্রধান পয়েন্টে এক্সপ্রেস সার্ভিস।',
      descEn: 'Express courier coverage across key suburban centers and industrial hubs.',
      badge: 'Suburban'
    },
    {
      titleBn: 'সকল জেলা সদর (সারাদেশ)',
      titleEn: 'All District Headquarters',
      timeBn: '২ - ৩ কার্যদিবস',
      timeEn: '2 - 3 Business Days',
      chargeBn: '৳১০০ (৳১০০০+ অর্ডারে ফ্রি)',
      chargeEn: '৳100 (FREE over ৳1000)',
      descBn: 'চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা, বরিশাল, রংপুরসহ দেশের ৬৪টি জেলা শহরে।',
      descEn: 'Coverage across all 64 district headquarters including Ctg, Sylhet & Rajshahi.',
      badge: 'Nationwide'
    },
    {
      titleBn: 'উপজেলা ও থ্রি-কোয়ার্টার পয়েন্ট',
      titleEn: 'Upazila & Remote Thanas',
      timeBn: '৩ - ৪ কার্যদিবস',
      timeEn: '3 - 4 Business Days',
      chargeBn: '৳১২০ (৳১০০০+ অর্ডারে ফ্রি)',
      chargeEn: '৳120 (FREE over ৳1000)',
      descBn: 'প্রান্তিক ইউনিয়ন ও উপজেলা কুরিয়ার হাব থেকে সরাসরি গ্রাহকের ঠিকানা।',
      descEn: 'Reliable dispatch to local upazila hubs and rural doorstep delivery agents.',
      badge: 'Remote'
    }
  ];

  const processSteps = [
    {
      icon: Box,
      step: '01',
      titleBn: 'নিরাপদ ভেজালমুক্ত প্যাকিং',
      titleEn: 'Eco Shockproof Packing',
      descBn: 'মধুর কাঁচের পাত্র ও তেলের বোতল থার্মোকল ও শক্-প্রুফ বাবল র‌্যাপিং দিয়ে সুরক্ষিত করা হয়।',
      descEn: 'Glass jars & oil bottles are padded with food-grade bubble cushion & shockproof insulation.'
    },
    {
      icon: ShieldCheck,
      step: '02',
      titleBn: 'কোয়ালিটি ও লিকেজ চেক',
      titleEn: 'Quality Seal Inspection',
      descBn: 'প্রতিটি অর্ডারের ক্যাপ সিল, ব্যাচ নম্বর ও প্যাকেজিং মান নিখুঁতভাবে রি-চেক করা হয়।',
      descEn: 'Every order undergoes strict seal verification, leakproof check, and weight audit.'
    },
    {
      icon: Truck,
      step: '03',
      titleBn: 'লাইভ SMS ট্র্যাকিং কুরিয়ার',
      titleEn: 'Live SMS Courier Tracking',
      descBn: 'প্যাকেট কুরিয়ারে হ্যান্ডওভারের সাথে সাথে আপনার মোবাইলে ট্র্যাকিং আইডি কোড পাঠানো হয়।',
      descEn: 'Real-time SMS notification with tracking ID sent directly to your mobile phone.'
    },
    {
      icon: PackageCheck,
      step: '04',
      titleBn: 'পণ্য দেখে ক্যাশ অন ডেলিভারি',
      titleEn: 'Inspect & Pay (COD)',
      descBn: 'ডেলিভারিম্যানের সামনে প্যাকেট খুলে নিশ্চিত হয়ে তবেই মুল্য পরিশোধ করুন।',
      descEn: 'Open the package, inspect your organic products, and pay cash on delivery.'
    }
  ];

  const safetyFeatures = [
    {
      icon: Lock,
      titleBn: 'টেম্পার-প্রুফ অর্গানিক সিল',
      titleEn: 'Tamper-Proof Safety Seal',
      descBn: 'প্যাকিংয়ের পর পাত্র খোলা সম্ভব নয়। আপনার সামনেই সিল ভাঙা নিশ্চিত করা হয়।',
      descEn: 'Hermetically sealed caps ensure zero unauthorized opening or contamination in transit.'
    },
    {
      icon: RefreshCw,
      titleBn: '১০০% ফ্রি ভাঙা প্রোডাক্ট রিপ্লেসমেন্ট',
      titleEn: '100% Free Damage Guarantee',
      descBn: 'পরিবহনে কাঁচের বোতল ভাঙলে বা লিক হলে কোনো বাড়তি খরচ ছাড়া নতুন প্রোডাক্ট পাঠানো হয়।',
      descEn: 'If a jar breaks or leaks in transit, we issue a 100% free instant replacement.'
    },
    {
      icon: PhoneCall,
      titleBn: '২৪/৭ সাপোর্ট সার্ভিস',
      titleEn: 'Direct Logistics Helpline',
      descBn: 'ডেলিভারি বিলম্ব বা কুরিয়ার সম্পর্কিত যেকোনো সহায়তায় আমাদের সরাসরি ফোন দিন।',
      descEn: 'Have questions about your parcel location? Call our dedicated team anytime.'
    }
  ];

  const faqs = [
    {
      qBn: 'ফ্রি ডেলিভারি অফার পেতে সর্বনিম্ন কত টাকার অর্ডার করতে হবে?',
      qEn: 'What is the minimum order amount to get FREE delivery?',
      aBn: 'সারা বাংলাদেশে যেকোনো এলাকায় মোট অর্ডারের পরিমাণ ৳১০০০ বা তার বেশি হলেই ডেলিভারি চার্জ একদম ফ্রি!',
      aEn: 'Orders of ৳1000 or above automatically qualify for 100% FREE shipping anywhere in Bangladesh!'
    },
    {
      qBn: 'ডেলিভারি পাওয়ার সময় প্যাকেট খুলে দেখা যাবে কি?',
      qEn: 'Can I inspect the parcel inside before paying the delivery agent?',
      aBn: 'অবশ্যই! ডেলিভারিম্যানের সামনে বোতল বা জার খুলে নিশ্চিত হয়ে টাকা দিন। ক্ষতিগ্রস্ত পেলে সাথে সাথে ফেরত দিতে পারবেন।',
      aEn: 'Yes! You are fully encouraged to open and verify the items in front of the courier agent before paying COD.'
    },
    {
      qBn: 'পণ্য পরিবহনের সময় নষ্ট হলে কীভাবে রিপ্লেসমেন্ট পাবো?',
      qEn: 'How do I claim a replacement if my jar gets broken during delivery?',
      aBn: 'ভাঙা পাত্রের ছবি বা ভিডিও তুলে আমাদের হটলাইন নম্বর +880 1717-279166 হোয়াটসঅ্যাপে পাঠান। আমরা নতুন বোতল রি-শিপ করবো।',
      aEn: 'Simply snap a photo of the damaged jar and WhatsApp it to +880 1717-279166. We ship a new replacement within 24 hours.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider">
            <Truck size={14} /> {lang === 'bn' ? 'দেশব্যাপী নিরাপদ ডেলিভারি' : 'Nationwide Swift Shipping'}
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            {lang === 'bn' ? 'ডেলিভারি ও কুরিয়ার নীতিমালা' : 'Delivery & Logistics Policy'}
          </h1>
          <p className="text-sm sm:text-base text-muted font-bn-sans leading-relaxed">
            {lang === 'bn'
              ? 'খামার থেকে খাঁটি খাদ্যদ্রব্য কোনো প্রকার ক্ষতি ছাড়াই আপনার দোরগোড়ায় নিরাপদে পৌঁছে দেওয়ার সম্পূর্ণ দায়িত্ব প্রকৃতি বার্তার।'
              : 'From Sundarban moubals & organic farms directly to your dining table - insured with 100% damage protection.'}
          </p>
        </div>

        {/* Dynamic Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary via-primary to-primary/90 text-surface rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-0.5 rounded-full bg-accent text-white font-bold text-[11px] uppercase tracking-wider">
                {lang === 'bn' ? 'স্পেশাল ডেলিভারি অফার' : 'Special Shipping Offer'}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-surface">
                {lang === 'bn' ? '৳১০০০+ অর্ডারে সারা দেশে ডেলিভারি চার্জ একদম ফ্রি!' : 'FREE Shipping Nationwide On Orders Over ৳1000!'}
              </h2>
              <p className="text-xs sm:text-sm text-surface/85 font-bn-sans leading-relaxed">
                {lang === 'bn'
                  ? 'ঢাকা বা ঢাকার বাইরে যেকোনো থানা এবং জেলায় আপনার অর্ডারের মোট মান ৳১০০০ পার হলেই পাবেন শতভাগ ফ্রি হোম ডেলিভারি সুবিধা।'
                  : 'Add items worth ৳1000 to your cart and enjoy zero delivery charges anywhere across Bangladesh.'}
              </p>
            </div>

            <div className="shrink-0">
              <a href="/shop">
                <Button variant="accent" size="md" className="gap-2 font-bold shadow-md">
                  {t('btn.goToShop')} <ArrowRight size={16} />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        <AlponaDivider />

        {/* 4 Coverage Zones Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {lang === 'bn' ? 'ডেলিভারি কভারেজ এলাকা ও চার্জের বিবরণ' : 'Delivery Rates & Timelines By Zone'}
            </h2>
            <p className="text-xs sm:text-sm text-muted font-bn-sans">
              {lang === 'bn' ? 'আপনার এলাকার ওপর ভিত্তি করে সময় ও কুরিয়ার ফি নির্ধারণের তালিকা:' : 'Transparent delivery fees and guaranteed arrival schedules:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22, delay: idx * 0.08 }}
                className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* Full Card Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-xs group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {zone.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                      <Clock size={16} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-primary leading-snug group-hover:text-white transition-colors duration-300">
                    {lang === 'bn' ? zone.titleBn : zone.titleEn}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-accent font-bold font-bn-sans group-hover:text-accent transition-colors duration-300">
                      <Clock size={13} className="shrink-0" />
                      <span>{lang === 'bn' ? 'সময়:' : 'Time:'} {lang === 'bn' ? zone.timeBn : zone.timeEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold font-bn-sans group-hover:text-white transition-colors duration-300">
                      <Truck size={13} className="shrink-0 text-accent group-hover:text-accent" />
                      <span>{lang === 'bn' ? 'চার্জ:' : 'Rate:'} {lang === 'bn' ? zone.chargeBn : zone.chargeEn}</span>
                    </div>
                  </div>

                  <p className="text-xs text-ink/75 group-hover:text-white/85 font-bn-sans leading-relaxed pt-2 border-t border-primary/10 group-hover:border-white/15 transition-colors duration-300">
                    {lang === 'bn' ? zone.descBn : zone.descEn}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-accent font-bold flex items-center gap-1.5 font-bn-sans relative z-10">
                  <CheckCircle2 size={14} className="text-accent" />
                  <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি প্রযোজ্য' : 'COD Available'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step-by-step Fulfillment Process */}
        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'অর্ডার প্রক্রিয়া' : 'Order Journey'}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-1">
              {lang === 'bn' ? 'প্যাকেজিং থেকে হোম ডেলিভারি ধাপসমূহ' : '4-Step Safe Delivery Process'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent space-y-3.5 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Full Card Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-13 h-13 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <span className="font-display font-extrabold text-2xl text-primary/20 group-hover:text-accent/50 transition-colors duration-300">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-primary group-hover:text-white transition-colors duration-300 relative z-10">
                    {lang === 'bn' ? step.titleBn : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/85 font-bn-sans leading-relaxed relative z-10 transition-colors duration-300">
                    {lang === 'bn' ? step.descBn : step.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Delivery Fee Calculator Widget */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-[#1B3B2B] via-[#224b37] to-[#11281c] text-white border-2 border-accent/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(27,59,43,0.5)] max-w-3xl mx-auto space-y-6 overflow-hidden select-none"
        >
          {/* Ambient Glowing Background Lights */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-white/15 relative z-10">
            <div className="w-13 h-13 rounded-2xl bg-accent text-white flex items-center justify-center font-bold shadow-lg shadow-accent/30 ring-4 ring-white/10 shrink-0">
              <Calculator size={26} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {lang === 'bn' ? 'ডেলিভারি চার্জ ক্যালকুলেটর' : 'Interactive Delivery Fee Estimator'}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-bn-sans mt-0.5">
                {lang === 'bn' ? 'অর্ডারের পরিমাণ অনুযায়ী আপনার আনুমানিক কুরিয়ার খরচ জানুন:' : 'Calculate your exact shipping cost based on order value:'}
              </p>
            </div>
          </div>

          {/* Input Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
            
            {/* 1. Location Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white/90 flex items-center gap-1.5 font-bn-sans">
                <MapPin size={14} className="text-accent" />
                <span>{lang === 'bn' ? '১. এলাকা নির্বাচন করুন' : '1. Select Location'}</span>
              </label>
              <div className="relative">
                <select
                  value={calcZone}
                  onChange={(e) => setCalcZone(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20 focus:border-accent focus:bg-white/15 focus:ring-2 focus:ring-accent/30 outline-none text-xs sm:text-sm font-bn-sans appearance-none cursor-pointer transition-all"
                >
                  <option value="dhaka" className="bg-primary text-white">
                    {lang === 'bn' ? 'ঢাকা সিটি কর্পোরেশন এলাকা (৳৬০)' : 'Dhaka City Corporation (৳60)'}
                  </option>
                  <option value="outside" className="bg-primary text-white">
                    {lang === 'bn' ? 'ঢাকার বাইরে সারা বাংলাদেশ (৳১০০)' : 'Outside Dhaka Nationwide (৳100)'}
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* 2. Order Amount Input (Clean Blank Field) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white/90 flex items-center justify-between font-bn-sans">
                <span className="flex items-center gap-1.5">
                  <Box size={14} className="text-accent" />
                  {lang === 'bn' ? '২. অর্ডারের আনুমানিক মূল্য (৳)' : '2. Estimated Cart Total (৳)'}
                </span>
                <span className="text-[11px] text-accent font-bold">
                  {lang === 'bn' ? '৳১০০০+ এ ফ্রি' : 'FREE over ৳1000'}
                </span>
              </label>
              
              <div className="relative">
                <input
                  type="number"
                  placeholder="1200"
                  value={calcAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCalcAmount(val === '' ? '' : val.replace(/^0+(?=\d)/, ''));
                  }}
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20 focus:border-accent focus:bg-white/15 focus:ring-2 focus:ring-accent/30 outline-none text-base font-bold font-bn-sans transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-xs pointer-events-none">
                  BDT
                </span>
              </div>
            </div>

          </div>

          {/* Animated Free Delivery Progress Meter */}
          <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-xs border border-white/15 relative z-10">
            <div className="flex items-center justify-between text-xs font-bn-sans">
              <span className="text-white/85 flex items-center gap-1.5 font-bold">
                <Truck size={15} className="text-accent" />
                {lang === 'bn' ? 'ফ্রি ডেলিভারি টার্গেট প্রগ্রেস:' : 'FREE Shipping Target Meter:'}
              </span>
              <span className="font-bold">
                {currentAmount >= 1000 ? (
                  <span className="text-[#3E7A5E] bg-[#3E7A5E]/20 px-2.5 py-0.5 rounded-full border border-[#3E7A5E]/40 font-bold flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 size={13} /> {lang === 'bn' ? '১০০% অর্জিত (ফ্রি ডেলিভারি)' : '100% Achieved (FREE)'}
                  </span>
                ) : (
                  <span className="text-accent font-bold">
                    {Math.round((currentAmount / 1000) * 100)}%
                  </span>
                )}
              </span>
            </div>

            {/* Orange to Green Website Brand Gradient Meter */}
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, (currentAmount / 1000) * 100))}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-accent via-[#E89814] to-accent-2 shadow-[0_0_12px_rgba(200,109,59,0.5)] transition-all duration-300"
              />
            </div>

            {/* Scale Markers */}
            <div className="flex items-center justify-between text-[11px] font-bn-sans font-bold pt-0.5">
              <span className="text-accent">৳০ ({lang === 'bn' ? 'শুরু' : 'Start'})</span>
              <span className="text-white/40 font-normal">৳৫০০ (৫০%)</span>
              <span className="text-[#3E7A5E] text-emerald-400">৳১০০০ ({lang === 'bn' ? 'ফ্রি ডেলিভারি' : 'FREE'})</span>
            </div>
          </div>

          {/* Calculator Dynamic Output Display Box */}
          <motion.div
            key={`${calcDeliveryFee()}-${calcZone}-${calcAmount}`}
            initial={{ scale: 0.98, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-5 sm:p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 transition-all ${
              calcDeliveryFee() === 0
                ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-600/30 to-teal-500/20 border-emerald-400/60 shadow-[0_8px_24px_rgba(16,185,129,0.25)]'
                : 'bg-white/10 backdrop-blur-md border-accent/40 shadow-lg'
            }`}
          >
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-md ${
                  calcDeliveryFee() === 0
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-accent text-white shadow-accent/30'
                }`}
              >
                {calcDeliveryFee() === 0 ? <Truck size={24} /> : <Calculator size={24} />}
              </div>
              <div>
                <span className="text-xs text-white/80 font-bn-sans">
                  {lang === 'bn' ? 'আপনার আনুমানিক ডেলিভারি চার্জ:' : 'Your Estimated Shipping Fee:'}
                </span>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {calcDeliveryFee() === 0 ? (
                    <span className="text-emerald-400 font-bold">
                      {lang === 'bn' ? '৳০ (ফ্রি ডেলিভারি!)' : '৳0 (FREE Shipping!)'}
                    </span>
                  ) : (
                    <span className="text-accent">
                      ৳{n(calcDeliveryFee())}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentAmount < 1000 ? (
              <div className="text-center sm:text-right text-xs text-white/85 font-bn-sans bg-black/20 p-3 rounded-xl border border-white/10">
                {lang === 'bn' ? (
                  <span>
                    আর মাত্র <strong className="text-accent font-bold text-sm">৳{n(1000 - currentAmount)}</strong> টাকার পণ্য অর্ডারে পাবেন <strong className="text-emerald-400 font-bold">১০০% ফ্রি ডেলিভারি!</strong>
                  </span>
                ) : (
                  <span>
                    Add only <strong className="text-accent font-bold text-sm">৳{n(1000 - currentAmount)}</strong> more to unlock <strong className="text-emerald-400 font-bold">FREE Delivery!</strong>
                  </span>
                )}
              </div>
            ) : (
              <div className="text-center sm:text-right text-xs font-bold text-emerald-300 font-bn-sans flex items-center gap-1.5 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-400/30">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>{lang === 'bn' ? 'অভিনন্দন! আপনার অর্ডারে ফ্রি ডেলিভারি সক্রিয়।' : 'Congratulations! FREE Delivery is active.'}</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Safety & Damage Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyFeatures.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 space-y-3.5 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* Full Card Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                
                <div className="w-13 h-13 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  <IconComponent size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-primary group-hover:text-white transition-colors duration-300 relative z-10">
                  {lang === 'bn' ? feat.titleBn : feat.titleEn}
                </h3>
                <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/85 font-bn-sans leading-relaxed relative z-10 transition-colors duration-300">
                  {lang === 'bn' ? feat.descBn : feat.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {lang === 'bn' ? 'ডেলিভারি সম্পর্কিত সাধারণ জিজ্ঞাসা' : 'Delivery FAQ'}
            </h2>
          </div>

          <div className="space-y-4 font-bn-sans">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isOpen
                      ? 'bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] border-accent shadow-[0_16px_36px_-8px_rgba(27,59,43,0.5)] text-white'
                      : 'bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-[#E5DCB8] hover:border-accent shadow-[0_4px_16px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_12px_24px_-6px_rgba(232,152,20,0.2)] hover:-translate-y-0.5'
                  }`}
                >
                  {isOpen && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer relative z-10"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-accent text-white shadow-md'
                            : 'bg-primary text-accent shadow-xs group-hover:bg-accent group-hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className={`font-display transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-primary group-hover:text-accent'
                        }`}
                      >
                        {lang === 'bn' ? faq.qBn : faq.qEn}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-accent text-white rotate-180 shadow-md'
                          : 'bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/90 leading-relaxed border-t border-white/15 bg-black/10 backdrop-blur-xs relative z-10">
                          {lang === 'bn' ? faq.aBn : faq.aEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
