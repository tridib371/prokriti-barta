import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, UserPlus, LogIn, CheckCircle2, ChevronDown, Award, HeartHandshake, Leaf, Truck, HelpCircle } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

const faqs = [
  {
    qBn: "প্রকৃতি বার্তার মধু কেন বাজারের সাধারণ মধুর চেয়ে আলাদা?",
    qEn: "Why is Prokriti Barta raw honey different from market honey?",
    aBn: "আমাদের মধু কোনো ফার্ম বা কৃত্রিমভাবে চিনি খাইয়ে পালিত মৌমাছির নয়। এটি সরাসরি সুন্দরবনের গহীন ম্যানগ্রোভ ফরেস্ট থেকে লোকজ 'মৌয়াল' ভাইদের মাধ্যমে সংগ্রহ করা হয়। এটি শতভাগ অপরিশোধিত (Raw & Unprocessed), ফলে প্রাকৃতিক পরাগরেণু ও অ্যান্টিঅক্সিডেন্ট অক্ষুণ্ণ থাকে।",
    aEn: "Our honey comes from deep Sundarbans mangrove biosphere reserves collected by native Moubals. It is 100% raw, unheated, and unfiltered, preserving living pollen, royal jelly, and potent bioactive enzymes."
  },
  {
    qBn: "গাওয়া ঘি কীভাবে প্রস্তুত করা হয়?",
    qEn: "How is artisanal Vedic Bilona Ghee made?",
    aBn: "আমরা প্রাচীন বৈদিক 'বিলোনা' পদ্ধতি অনুসরণ করি। প্রথমে খাঁটি দেশি গরুর দুধ থেকে দই পাতানো হয়, তারপর কাঠের মন্থনী দিয়ে দই মন্থন করে মাখন আলাদা করে ধীর আঁচে ঘি তৈরি করা হয়। ফলে এটি দানাযুক্ত ও অপূর্ব সুবাসযুক্ত হয়।",
    aEn: "We follow the ancient Vedic Bilona method: fresh grass-fed cow milk is cultured into curd, bidirectional slow-churned with wooden staffs in clay handis, and simmered slowly into rich granular ghee."
  },
  {
    qBn: "ডেলিভারি চার্জ এবং কত দিনের মধ্যে পাওয়া যাবে?",
    qEn: "What are the shipping charges and delivery timelines?",
    aBn: "ঢাকা সিটিতে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৪ দিনে হোম ডেলিভারি প্রদান করা হয়। ১০০০ টাকা বা তার বেশি টাকার অর্ডারে সারা বাংলাদেশে ডেলিভারি সম্পূর্ণ ফ্রি!",
    aEn: "Inside Dhaka within 24-48 hours, and 2-4 business days nationwide. All orders over ৳1000 receive 100% FREE doorstep delivery anywhere in Bangladesh!"
  },
  {
    qBn: "পণ্য পাওয়ার পর অপছন্দ বা ক্ষতিগ্রস্ত হলে কী করণীয়?",
    qEn: "What is your replacement policy if items arrive damaged?",
    aBn: "আমাদের রয়েছে ৭ দিনের ইজি রিটার্ন পলিসি। ডেলিভারির সময় পণ্য লিক হলে বা গুণগত মানে অসন্তুষ্ট হলে আমরা সাথে সাথে রিপ্লেসমেন্ট অথবা ১০০% রিফান্ড প্রদান করি।",
    aEn: "We offer a 7-day hassle-free damage guarantee. If a jar breaks or leaks in transit, simply message our helpline and we issue an immediate free replacement."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, lang, n } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg text-ink overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-b from-surface via-bg to-bg border-b border-line">
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1F3A2E_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent">
                <Leaf size={15} />
                <span>{lang === 'bn' ? 'বাংলাদেশের ১ নম্বর খাঁটি অর্গানিক প্ল্যাটফর্ম' : "Bangladesh's #1 Authentic Organic Platform"}</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.15]">
                {lang === 'bn' ? 'প্রকৃতির খাঁটি ছোঁয়া, ' : 'Purity of Nature, '}
                <span className="text-accent italic font-serif underline decoration-accent/30 underline-offset-8">
                  {lang === 'bn' ? 'পরিবারের সুস্থতার নতুন দিগন্ত' : 'A New Dawn for Family Health'}
                </span>
              </h1>

              <p className="text-muted text-sm sm:text-base font-bn-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {lang === 'bn' 
                  ? 'সুন্দরবনের খাঁটি পদ্ম মধু, বৈদিক বিলোনা গাওয়া ঘি এবং কাঠের ঘানির কোল্ড-প্রেসড তেল - রসায়নবর্জিত প্রথাগত প্রক্রিয়ায় সরাসরি আপনার দোরগোড়ায়।'
                  : 'Wild mangrove honey from Sundarbans, Vedic Bilona cow ghee, and cold-pressed ghani oils - chemical-free traditional wellness delivered straight to your doorstep.'}
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <Link to="/register">
                  <Button variant="accent" size="lg" className="shadow-lg gap-2">
                    <UserPlus size={18} /> {lang === 'bn' ? 'ফ্রী সাইন আপ করুন (Sign Up)' : 'Free Sign Up'}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <LogIn size={18} /> {lang === 'bn' ? 'লগইন করুন (Log In)' : 'Log In'}
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="ghost" size="lg" className="gap-1.5 text-primary font-bold">
                    {lang === 'bn' ? 'পণ্য দেখুন' : 'Explore Shop'} <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bn-sans text-muted">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> {lang === 'bn' ? '০% প্রিজারভেটিভ' : '0% Preservatives'}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> {lang === 'bn' ? 'প্রান্তিক কৃষক সোর্সিং' : 'Direct Farmer Sourcing'}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash On Delivery'}</span>
              </div>
            </div>

            {/* Hero Right Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden clip-organic-wave border border-line shadow-2xl bg-surface">
                <img
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=80"
                  alt="Pure Organic Harvest"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-line shadow-lg">
                  <p className="text-xs font-bold text-primary">{lang === 'bn' ? 'স্বাস্থ্যের সুরক্ষায় প্রকৃতি বার্তা' : 'Health Shield by Prokriti Barta'}</p>
                  <p className="text-[11px] text-muted font-bn-sans mt-0.5">
                    {lang === 'bn' ? 'আজই একাউন্ট খুলে পান প্রথম অর্ডারে ফ্রি ডেলিভারি অফার!' : 'Create an account today to enjoy FREE delivery on your first order!'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Impact Stats */}
      <section className="py-8 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-accent">100%</span>
              <p className="text-xs text-muted font-bn-sans font-bold">{lang === 'bn' ? 'কেমিক্যাল ও ভেজাল মুক্ত' : 'Zero Synthetic Additives'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-primary">{n('5,000+')}</span>
              <p className="text-xs text-muted font-bn-sans font-bold">{lang === 'bn' ? 'সুখী পরিবার' : 'Happy Families'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-accent">{n('120+')}</span>
              <p className="text-xs text-muted font-bn-sans font-bold">{lang === 'bn' ? 'প্রান্তিক মৌয়াল ও কৃষক' : 'Empowered Farmers & Moubals'}</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-primary">{lang === 'bn' ? '৭ দিন' : '7 Days'}</span>
              <p className="text-xs text-muted font-bn-sans font-bold">{lang === 'bn' ? 'সহজ রিটার্ন গ্যারান্টি' : 'Hassle-Free Returns'}</p>
            </div>
          </div>
        </div>
      </section>

      <AlponaDivider />

      {/* Organic Heritage Process */}
      <section className="py-14 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">{lang === 'bn' ? 'আমাদের ঐতিহ্যগত প্রক্রিয়া' : 'Our Heritage Craft'}</span>
            <h2 className="font-display font-bold text-3xl text-primary mt-1">
              {lang === 'bn' ? 'প্রকৃতির খাঁটি রূপ ধরে রাখার গোপন রহস্য' : 'The Secrets to Preserving Living Nutrition'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <Leaf size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">{lang === 'bn' ? 'সুন্দরবনের বুনো পদ্ম মধু' : 'Wild Sundarbans Mangrove Honey'}</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                {lang === 'bn' 
                  ? 'গহীন ম্যানগ্রোভ বন থেকে সংগৃহীত। কৃত্রিম চিনি বা তাপ প্রয়োগ ছাড়া স্বাভাবিক ঘনত্বে রক্ষিত।'
                  : 'Hand-harvested from deep mangrove forests. Retaining pure raw viscosity without sugar feeding or heating.'}
              </p>
            </div>

            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">{lang === 'bn' ? 'বৈদিক বিলোনা গাওয়া ঘি' : 'Ancient Vedic Bilona Ghee'}</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                {lang === 'bn'
                  ? 'দই মন্থন করে কাঠের পাত্রে হাতে তৈরি ঘি। দানাদার টেক্সচার ও অপূর্ব সুবাসের অনন্য মেলবন্ধন।'
                  : 'Slow-churned from cultured curd in clay handis. Aromatic, pre-digested golden granular wellness.'}
              </p>
            </div>

            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">{lang === 'bn' ? 'কাঠের ঘানির সরিষার তেল' : 'Wood-Pressed Mustard Oil'}</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                {lang === 'bn'
                  ? 'ধীরগতির ঘানিতে ৪০ ডিগ্রির নিচে নিষ্কাশিত তেল, যাতে পুষ্টি উপাদান ও আসল ঝাঁঝ বজায় থাকে।'
                  : 'Cold-pressed below 40°C in heavy tamarind wood mills, preserving natural pungent aroma and vitamin E.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center justify-center gap-1">
              <HelpCircle size={14} /> FAQ
            </span>
            <h2 className="font-display font-bold text-3xl text-primary mt-1">
              {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
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
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold font-bn-sans relative z-10 cursor-pointer"
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
                        className={`text-sm sm:text-base font-display transition-colors duration-300 ${
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
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/90 font-bn-sans leading-relaxed border-t border-white/15 bg-black/10 backdrop-blur-xs relative z-10">
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
      </section>

      {/* Final Call To Action Banner */}
      <section className="py-16 bg-primary text-surface relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface">
            {lang === 'bn' ? 'সুস্থ খাদ্যাভ্যাসের যাত্রা শুরু করুন আজই' : 'Start Your Pure Organic Lifestyle Today'}
          </h2>
          <p className="text-xs sm:text-sm text-surface/80 max-w-xl mx-auto font-bn-sans">
            {lang === 'bn' 
              ? 'এখনই আপনার একাউন্ট খুলুন এবং খাঁটি প্রাকৃতিক সামগ্রীর অনন্য অভিজ্ঞতা উপভোগ করুন।'
              : 'Create your account today and experience the authentic goodness of unadulterated nature.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/register">
              <Button variant="accent" size="lg" className="shadow-lg gap-2">
                <UserPlus size={18} /> {lang === 'bn' ? 'একাউন্ট তৈরি করুন (Sign Up)' : 'Create Free Account'}
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="bg-surface text-ink hover:bg-surface/90 gap-2">
                <LogIn size={18} /> {lang === 'bn' ? 'লগইন করুন (Log In)' : 'Log In'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
