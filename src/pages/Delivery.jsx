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
                className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_16px_32px_-6px_rgba(232,152,20,0.22)] transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Top Accent Gradient Border Strip on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-xs">
                      {zone.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                      <Clock size={16} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                    {lang === 'bn' ? zone.titleBn : zone.titleEn}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-accent font-bold font-bn-sans">
                      <Clock size={13} className="shrink-0" />
                      <span>{lang === 'bn' ? 'সময়:' : 'Time:'} {lang === 'bn' ? zone.timeBn : zone.timeEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold font-bn-sans">
                      <Truck size={13} className="shrink-0 text-accent" />
                      <span>{lang === 'bn' ? 'চার্জ:' : 'Rate:'} {lang === 'bn' ? zone.chargeBn : zone.chargeEn}</span>
                    </div>
                  </div>

                  <p className="text-xs text-ink/75 font-bn-sans leading-relaxed pt-2 border-t border-primary/10">
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
                  className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent space-y-3.5 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_16px_32px_-6px_rgba(232,152,20,0.22)] transition-all duration-300 overflow-hidden cursor-default"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-13 h-13 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <span className="font-display font-extrabold text-2xl text-primary/15 group-hover:text-accent/30 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-primary group-hover:text-accent transition-colors relative z-10">
                    {lang === 'bn' ? step.titleBn : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-ink/75 font-bn-sans leading-relaxed relative z-10">
                    {lang === 'bn' ? step.descBn : step.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Delivery Fee Calculator Widget */}
        <div className="bg-gradient-to-br from-surface to-bg border border-line rounded-3xl p-6 sm:p-10 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-line">
            <div className="p-3 bg-accent/15 text-accent rounded-xl">
              <Calculator size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-primary">
                {lang === 'bn' ? 'ডেলিভারি চার্জ ক্যালকুলেটর' : 'Interactive Delivery Fee Estimator'}
              </h3>
              <p className="text-xs text-muted font-bn-sans">
                {lang === 'bn' ? 'অর্ডারের পরিমাণ অনুযায়ী আপনার আনুমানিক কুরিয়ার খরচ জানুন:' : 'Calculate your exact shipping cost based on order value:'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-ink">{lang === 'bn' ? '১. এলাকা নির্বাচন করুন' : '1. Select Location'}</label>
              <select
                value={calcZone}
                onChange={(e) => setCalcZone(e.target.value)}
                className="w-full bg-surface text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none text-xs sm:text-sm font-bn-sans"
              >
                <option value="dhaka">{lang === 'bn' ? 'ঢাকা সিটি কর্পোরেশন এলাকা' : 'Dhaka City Corporation'}</option>
                <option value="outside">{lang === 'bn' ? 'ঢাকার বাইরে (যে কোনো জেলা)' : 'Outside Dhaka (Any District)'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-ink">{lang === 'bn' ? '২. অর্ডারের আনুমানিক মূল্য (৳)' : '2. Estimated Cart Total (৳)'}</label>
              <input
                type="number"
                placeholder="1200"
                value={calcAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  setCalcAmount(val === '' ? '' : val.replace(/^0+(?=\d)/, ''));
                }}
                className="w-full bg-surface text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none text-xs sm:text-sm font-bn-sans font-bold"
              />
            </div>
          </div>

          {/* Calculator Output Display */}
          <div className="p-5 rounded-2xl bg-surface border border-accent/30 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted font-bn-sans">{lang === 'bn' ? 'আনুমানিক ডেলিভারি চার্জ:' : 'Estimated Shipping Fee:'}</span>
              <div className="font-display font-extrabold text-2xl text-accent">
                {calcDeliveryFee() === 0 ? (
                  <span className="text-emerald-600 font-bold">{lang === 'bn' ? '৳০ (ফ্রি ডেলিভারি!)' : '৳0 (FREE Shipping!)'}</span>
                ) : (
                  `৳${n(calcDeliveryFee())}`
                )}
              </div>
            </div>

            {currentAmount < 1000 && (
              <div className="text-right text-xs text-muted font-bn-sans">
                {lang === 'bn' ? (
                  <span>আর <strong className="text-accent font-bold">৳{n(1000 - currentAmount)}</strong> অর্ডারে ফ্রি ডেলিভারি!</span>
                ) : (
                  <span>Add <strong className="text-accent font-bold">৳{n(1000 - currentAmount)}</strong> more for FREE shipping!</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Safety & Damage Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyFeatures.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 space-y-3.5 shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_16px_32px_-6px_rgba(232,152,20,0.22)] transition-all duration-300 overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-13 h-13 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  <IconComponent size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors relative z-10">
                  {lang === 'bn' ? feat.titleBn : feat.titleEn}
                </h3>
                <p className="text-xs sm:text-[13px] text-ink/75 font-bn-sans leading-relaxed relative z-10">
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
