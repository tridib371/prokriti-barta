import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, BookOpen, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';

export default function Blog() {
  const { t, n, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', nameBn: 'সব আর্টিকেল', nameEn: 'All Articles' },
    { id: 'Organic Living', nameBn: 'অর্গানিক জীবনযাপন', nameEn: 'Organic Living' },
    { id: 'Health & Nutrition', nameBn: 'স্বাস্থ্য ও পুষ্টি', nameEn: 'Health & Nutrition' },
    { id: 'Purity Guide', nameBn: 'বিশুদ্ধতা নির্দেশিকা', nameEn: 'Purity Guide' },
    { id: 'Herbal Wellness', nameBn: 'ভেষজ যত্ন', nameEn: 'Herbal Wellness' },
  ];

  const featuredPost = blogsData[0];
  const filteredPosts = activeCategory === 'all'
    ? blogsData
    : blogsData.filter(b => b.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider">
            <BookOpen size={14} /> {t('nav.blog')}
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            {t('blog.title')}
          </h1>
          <p className="text-sm sm:text-base text-muted font-bn-sans leading-relaxed">
            {t('blog.sub')}
          </p>
        </div>

        <AlponaDivider />

        {/* Hero Featured Journal Article Banner */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-surface border border-line rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group"
          >
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-bg">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                  {lang === 'bn' ? 'ফিচার্ড জার্নাল' : 'Featured Journal'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted font-semibold">
                  <span className="text-accent uppercase font-bold tracking-wider">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {n(featuredPost.readTime)}</span>
                </div>

                <Link to={`/blog/${featuredPost.slug}`} className="block">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary hover:text-accent transition-colors leading-tight">
                    {lang === 'bn' ? featuredPost.title : (featuredPost.titleEn || featuredPost.title)}
                  </h2>
                </Link>

                <p className="text-sm text-muted font-bn-sans leading-relaxed line-clamp-3">
                  {lang === 'bn' ? featuredPost.excerpt : (featuredPost.excerptEn || featuredPost.excerpt)}
                </p>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                <span className="text-xs text-primary font-bold flex items-center gap-1.5 font-bn-sans">
                  <User size={14} className="text-accent" /> {lang === 'bn' ? featuredPost.author : (featuredPost.authorEn || featuredPost.author)}
                </span>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button variant="accent" size="sm" className="gap-1.5 shadow-xs">
                    {t('btn.readMore')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-sm scale-105'
                  : 'bg-surface text-muted border border-line hover:text-primary hover:border-muted/40'
              }`}
            >
              {lang === 'bn' ? cat.nameBn : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((blog) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                layout
                className="bg-surface border border-line rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-accent/40 transition-all group"
              >
                <div className="aspect-16/10 overflow-hidden bg-bg relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-lg bg-surface/90 backdrop-blur-md text-accent text-[11px] font-bold border border-line">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-muted font-semibold">
                      <span>{n(blog.date)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {n(blog.readTime)}</span>
                    </div>

                    <Link to={`/blog/${blog.slug}`} className="block font-display font-bold text-base sm:text-lg text-primary hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {lang === 'bn' ? blog.title : (blog.titleEn || blog.title)}
                    </Link>

                    <p className="text-xs text-muted font-bn-sans line-clamp-3 leading-relaxed">
                      {lang === 'bn' ? blog.excerpt : (blog.excerptEn || blog.excerpt)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                    <span className="text-[11px] text-muted font-semibold font-bn-sans flex items-center gap-1 line-clamp-1 max-w-[170px]">
                      <User size={13} className="text-accent shrink-0" /> {lang === 'bn' ? blog.author : (blog.authorEn || blog.author)}
                    </span>
                    <Link to={`/blog/${blog.slug}`} className="text-xs font-bold text-accent hover:underline flex items-center gap-1 shrink-0">
                      {t('btn.readMore')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Newsletter & Wellness Advice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-primary to-primary/95 text-surface rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-md"
        >
          <div className="absolute -right-8 -bottom-8 w-56 h-56 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-bold text-xs uppercase tracking-wider">
              {lang === 'bn' ? 'দৈনন্দিন স্বাস্থ্য বার্তা' : 'Weekly Organic Journal'}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-surface leading-tight">
              {lang === 'bn'
                ? 'নিয়মিত খাঁটি খাদ্যাভ্যাস ও স্বাস্থ্য টিপস পেতে যুক্ত থাকুন'
                : 'Subscribe To Get Authentic Nutrition Guides & Seasonal Harvest Updates'}
            </h2>
            <p className="text-xs sm:text-sm text-surface/85 font-bn-sans leading-relaxed">
              {lang === 'bn'
                ? 'সুন্দরবনের মধুর নতুন হারভেস্ট, কোল্ড-প্রেসড তেলের ব্যবহার এবং লোকজ স্বাস্থ্যকণিকা সম্পর্কে জানতে আমাদের কমিউনিটিতে যোগ দিন।'
                : 'Join over 10,000+ health-conscious households receiving verified nutritional articles directly from organic experts.'}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert(lang === 'bn' ? 'ধন্যবাদ! আপনার সাবস্ক্রিপশন সফল হয়েছে।' : 'Thank you for subscribing!'); }} className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={lang === 'bn' ? 'আপনার ইমেইল এড্রেস লিখুন...' : 'Enter your email address...'}
                required
                className="px-4 py-2.5 rounded-xl bg-surface text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent flex-1"
              />
              <Button type="submit" variant="accent" size="md" className="gap-1 shadow-md shrink-0">
                {lang === 'bn' ? 'সাবস্ক্রাইব করুন' : 'Subscribe'} <ArrowRight size={15} />
              </Button>
            </form>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
