import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const slides = [
  {
    id: 1,
    title: "প্রকৃতির খাঁটি ছোঁয়া,",
    highlight: "আপনার পরিবারের সুস্থতা",
    subtitle: "সুন্দরবনের পদ্ম মধু, কাঠের ঘানির খাঁটি সরিষার তেল এবং হাতে মন্থন করা গাওয়া ঘি — কোনো প্রিজারভেটিভ ছাড়া সরাসরি খামার থেকে।",
    ctaText: "শপ ভিজিট করুন",
    ctaLink: "/shop",
    badge: "১০০% প্রিজারভেটিভ-মুক্ত harvest",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#E3A83B"
  },
  {
    id: 2,
    title: "প্রাচীন বৈদিক বিলোনা,",
    highlight: "গাওয়া ঘিয়ের সুবাস",
    subtitle: "দেশি গরুর দই মন্থন করে কাঠের পাত্রে তৈরি হাতে গড়া অর্গানিক ঘি। রান্নায় আনুন খাঁটি লোকজ স্বাদ।",
    ctaText: "ঘি কালেকশন দেখুন",
    ctaLink: "/shop?category=ghee-oils",
    badge: "ঐতিহ্যবাহী বিলোনা পদ্ধতি",
    image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#C6633B"
  },
  {
    id: 3,
    title: "কাঠের ঘানির আসল ঝাঁঝ,",
    highlight: "বিশুদ্ধ সরিষার তেল",
    subtitle: "কম তাপমাত্রায় নিষ্কাশিত কালো ও হলুদ সরিষার সেরা এক্সট্রাক্ট। খাঁটি ভর্তা ও রান্নার একমাত্র নির্ভরতা।",
    ctaText: "অর্ডার করুন",
    ctaLink: "/shop?category=ghee-oils",
    badge: "কোল্ড-প্রেসড এক্সট্রাকশন",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#E3A83B"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-bg py-8 lg:py-14 border-b border-line">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1F3A2E_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (40% span = 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pr-4 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-line text-xs font-semibold text-primary">
                  <ShieldCheck size={15} className="text-accent" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline with Editorial Serif */}
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.15]">
                  {slide.title}{' '}
                  <span className="text-accent italic font-serif underline decoration-accent/30 underline-offset-6">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-muted text-sm sm:text-base leading-relaxed font-bn-sans">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to={slide.ctaLink}>
                    <Button variant="accent" size="lg" className="shadow-md">
                      {slide.ctaText} <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="secondary" size="lg">
                      আমাদের কথা
                    </Button>
                  </Link>
                </div>

                {/* Micro Alpona Detail under CTA */}
                <div className="pt-3 flex items-center gap-2 text-muted text-xs">
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="text-accent">
                    <path d="M20 4 C14 12, 14 28, 20 36 C26 28, 26 12, 20 4 Z" fill="currentColor" />
                  </svg>
                  <span className="font-bn-sans">কাকডাকা ভোরে সংগ্রহ করা ১০০% খাঁটি পণ্য</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (60% span = 7 cols) with Organic Wave Clip Path */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden clip-organic-wave border border-line shadow-xl bg-surface">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-xs bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-line shadow-lg">
                <p className="text-xs font-bold text-primary">প্রকৃতি বার্তা গ্রান্টি</p>
                <p className="text-[11px] text-muted font-bn-sans mt-0.5">
                  সরাসরি গ্রামীন কৃষক ও মৌয়ালদের সহায়তায় উৎপাদিত।
                </p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-2.5 rounded-full bg-surface/80 text-ink hover:bg-surface transition-colors shadow"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                  className="p-2.5 rounded-full bg-surface/80 text-ink hover:bg-surface transition-colors shadow"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-8 bg-accent' : 'w-2 bg-line hover:bg-muted'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
