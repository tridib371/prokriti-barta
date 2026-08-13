import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const { t, n, lang } = useLanguage();

  const slides = [
    {
      id: 1,
      title: t('hero.slide1.title'),
      highlight: t('hero.slide1.highlight'),
      subtitle: t('hero.slide1.subtitle'),
      ctaText: t('hero.slide1.cta'),
      ctaLink: "/shop",
      badge: t('hero.slide1.badge'),
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#E89814"
    },
    {
      id: 2,
      title: t('hero.slide2.title'),
      highlight: t('hero.slide2.highlight'),
      subtitle: t('hero.slide2.subtitle'),
      ctaText: t('hero.slide2.cta'),
      ctaLink: "/shop?category=ghee-oils",
      badge: t('hero.slide2.badge'),
      image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#E05A36"
    },
    {
      id: 3,
      title: t('hero.slide3.title'),
      highlight: t('hero.slide3.highlight'),
      subtitle: t('hero.slide3.subtitle'),
      ctaText: t('hero.slide3.cta'),
      ctaLink: "/shop?category=ghee-oils",
      badge: t('hero.slide3.badge'),
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#E89814"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] || slides[0];

  return (
    <section className="relative overflow-hidden bg-bg py-8 lg:py-14 border-b border-line">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0F4C3A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs">
                  <Sparkles size={14} />
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.15]">
                  {slide.title} <br />
                  <span className="text-accent underline decoration-accent/40 underline-offset-8">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl font-bn-sans">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link to={slide.ctaLink}>
                    <Button variant="accent" size="lg" className="shadow-lg gap-2">
                      {slide.ctaText} <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="gap-2">
                      <ShieldCheck size={18} /> {t('nav.about')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots / Controls */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      current === idx ? 'w-8 bg-accent' : 'w-2.5 bg-line hover:bg-muted'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted font-mono">
                {n('0' + (current + 1))} / {n('0' + slides.length)}
              </span>
            </div>
          </div>

          {/* Right Visual Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-surface bg-bg group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80" />

              {/* Prev / Next floating arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-2.5 rounded-xl bg-surface/90 text-ink hover:bg-surface transition-colors shadow-md backdrop-blur-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                  className="p-2.5 rounded-xl bg-surface/90 text-ink hover:bg-surface transition-colors shadow-md backdrop-blur-md"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
