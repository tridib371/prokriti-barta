import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, UserPlus, LogIn, CheckCircle2, ChevronDown, Award, HeartHandshake, Leaf, Truck } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';

const faqs = [
  {
    q: "প্রকৃতি বার্তার মধু কেন বাজারের সাধারণ মধুর চেয়ে আলাদা?",
    a: "আমাদের মধু কোনো ফার্ম বা কৃত্রিমভাবে চিনি খাইয়ে পালিত মৌমাছির নয়। এটি সরাসরি সুন্দরবনের গহীন ম্যানগ্রোভ ফরেস্ট থেকে লোকজ 'মৌয়াল' ভাইদের মাধ্যমে সংগ্রহ করা হয়। এটি শতভাগ অপরিশোধিত (Raw & Unprocessed), ফলে প্রাকৃতিক পরাগরেণু ও অ্যান্টিঅক্সিডেন্ট অক্ষুণ্ণ থাকে।"
  },
  {
    q: "গাওয়া ঘি কীভাবে প্রস্তুত করা হয়?",
    a: "আমরা প্রাচীন বৈদিক 'বিলোনা' পদ্ধতি অনুসরণ করি। প্রথমে খাঁটি দেশি গরুর দুধ থেকে দই পাতানো হয়, তারপর কাঠের মন্থনী দিয়ে দই মন্থন করে মাখন আলাদা করে ধীর আঁচে ঘি তৈরি করা হয়। ফলে এটি দানাযুক্ত ও অপূর্ব সুবাসযুক্ত হয়।"
  },
  {
    q: "ডেলিভারি চার্জ এবং কত দিনের মধ্যে পাওয়া যাবে?",
    a: "ঢাকা সিটিতে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৪ দিনে হোম ডেলিভারি প্রদান করা হয়। ১০০০ টাকা বা তার বেশি টাকার অর্ডারে সারা বাংলাদেশে ডেলিভারি সম্পূর্ণ ফ্রি!"
  },
  {
    q: "পণ্য পাওয়ার পর অপছন্দ বা ক্ষতিগ্রস্ত হলে কী করণীয়?",
    a: "আমাদের রয়েছে ৭ দিনের ইজি রিটার্ন পলিসি। ডেলিভারির সময় পণ্য লিক হলে বা গুণগত মানে অসন্তুষ্ট হলে আমরা সাথে সাথে রিপ্লেসমেন্ট অথবা ১০০% রিফান্ড প্রদান করি।"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
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
                <span>বাংলাদেশের ১ নম্বর খাঁটি অর্গানিক প্ল্যাটফর্ম</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.15]">
                প্রকৃতির খাঁটি ছোঁয়া,{' '}
                <span className="text-accent italic font-serif underline decoration-accent/30 underline-offset-8">
                  পরিবারের সুস্থতার নতুন দিগন্ত
                </span>
              </h1>

              <p className="text-muted text-sm sm:text-base font-bn-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                সুন্দরবনের খাঁটি পদ্ম মধু, বৈদিক বিলোনা গাওয়া ঘি এবং কাঠের ঘানির কোল্ড-প্রেসড তেল — রসায়নবর্জিত প্রথাগত প্রক্রিয়ায় সরাসরি আপনার দোরগোড়ায়।
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <Link to="/register">
                  <Button variant="accent" size="lg" className="shadow-lg gap-2">
                    <UserPlus size={18} /> ফ্রী সাইন আপ করুন (Sign Up)
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <LogIn size={18} /> লগইন করুন (Log In)
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="ghost" size="lg" className="gap-1.5 text-primary font-bold">
                    পণ্য দেখুন <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bn-sans text-muted">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> ০% প্রিজারভেটিভ</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> প্রান্তিক কৃষক সোর্সিং</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-accent" /> ক্যাশ অন ডেলিভারি</span>
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
                  <p className="text-xs font-bold text-primary">স্বাস্থ্যের সুরক্ষায় প্রকৃতি বার্তা</p>
                  <p className="text-[11px] text-muted font-bn-sans mt-0.5">
                    আজই একাউন্ট খুলে পান প্রথম অর্ডারে ফ্রি ডেলিভারি অফার!
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
              <span className="font-display font-bold text-3xl sm:text-4xl text-accent">১০০%</span>
              <p className="text-xs text-muted font-bn-sans font-bold">কেমিক্যাল ও ভেজাল মুক্ত</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-primary">৫,০০০+</span>
              <p className="text-xs text-muted font-bn-sans font-bold">সুখী পরিবার</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-accent">১২০+</span>
              <p className="text-xs text-muted font-bn-sans font-bold">প্রান্তিক মৌয়াল ও কৃষক</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl sm:text-4xl text-primary">৭ দিন</span>
              <p className="text-xs text-muted font-bn-sans font-bold">সহজ রিটার্ন গ্যারান্টি</p>
            </div>
          </div>
        </div>
      </section>

      <AlponaDivider />

      {/* Organic Heritage Process */}
      <section className="py-14 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">আমাদের ঐতিহ্যগত প্রক্রিয়া</span>
            <h2 className="font-display font-bold text-3xl text-primary mt-1">
              প্রকৃতির খাঁটি রূপ ধরে রাখার গোপন রহস্য
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <Leaf size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">সুন্দরবনের বুনো পদ্ম মধু</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                গহীন ম্যানগ্রোভ বন থেকে সংগৃহীত। কৃত্রিম চিনি বা তাপ প্রয়োগ ছাড়া স্বাভাবিক ঘনত্বে রক্ষিত।
              </p>
            </div>

            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">বৈদিক বিলোনা গাওয়া ঘি</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                দই মন্থন করে কাঠের পাত্রে হাতে তৈরি ঘি। দানাদার টেক্সচার ও অপূর্ব সুবাসের অনন্য মেলবন্ধন।
              </p>
            </div>

            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-primary">কাঠের ঘানির সরিষার তেল</h3>
              <p className="text-xs text-muted font-bn-sans leading-relaxed">
                ধীরগতির ঘানিতে ৪০ ডিগ্রির নিচে নিষ্কাশিত তেল, যাতে পুষ্টি উপাদান ও আসল ঝাঁঝ বজায় থাকে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">প্রশ্নোত্তর</span>
            <h2 className="font-display font-bold text-3xl text-primary mt-1">
              সাধারণ জিজ্ঞাসা (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-bg border border-line rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-primary font-bn-sans"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`text-accent transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-muted font-bn-sans leading-relaxed border-t border-line/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action Banner */}
      <section className="py-16 bg-primary text-surface relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface">
            সুস্থ খাদ্যাভ্যাসের যাত্রা শুরু করুন আজই
          </h2>
          <p className="text-xs sm:text-sm text-surface/80 max-w-xl mx-auto font-bn-sans">
            এখনই আপনার একাউন্ট খুলুন এবং খাঁটি প্রাকৃতিক সামগ্রীর অনন্য অভিজ্ঞতা উপভোগ করুন।
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/register">
              <Button variant="accent" size="lg" className="shadow-lg gap-2">
                <UserPlus size={18} /> একাউন্ট তৈরি করুন (Sign Up)
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="bg-surface text-ink hover:bg-surface/90 gap-2">
                <LogIn size={18} /> লগইন করুন (Log In)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
