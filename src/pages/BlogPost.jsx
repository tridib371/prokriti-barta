import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Share2, BookOpen, CheckCircle2 } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { motion } from 'framer-motion';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, n, lang } = useLanguage();
  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];

  const relatedBlogs = blogsData.filter(b => b.id !== blog.id).slice(0, 3);

  const rawContent = lang === 'bn' ? blog.content : (blog.contentEn || blog.content);
  const paragraphs = rawContent ? rawContent.split('\n\n') : [];
  const currentExcerpt = lang === 'bn' ? blog.excerpt : (blog.excerptEn || blog.excerpt);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-accent transition-colors">
          <ArrowLeft size={16} /> {t('btn.backToBlog')}
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider">
              {blog.category}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-primary leading-tight">
            {lang === 'bn' ? blog.title : (blog.titleEn || blog.title)}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted font-bn-sans pt-2 border-b border-line pb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-primary font-bold"><User size={14} className="text-accent" /> {blog.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {n(blog.date)}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {n(blog.readTime)}</span>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: blog.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(lang === 'bn' ? 'লিঙ্ক কপি করা হয়েছে!' : 'Article link copied!');
                }
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-accent transition-colors cursor-pointer"
            >
              <Share2 size={14} /> {lang === 'bn' ? 'শেয়ার করুন' : 'Share'}
            </button>
          </div>
        </div>

        {/* Article Cover Image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden border border-line shadow-sm bg-bg">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-10 space-y-6 text-sm sm:text-base leading-relaxed text-ink font-bn-sans shadow-xs">
          {/* Highlight Excerpt Box */}
          <div className="bg-bg/80 border-l-4 border-accent p-4 sm:p-5 rounded-r-2xl text-primary font-medium italic text-base sm:text-lg leading-relaxed">
            "{currentExcerpt}"
          </div>

          <AlponaDivider className="my-6" />

          {/* Render Multi-Paragraph Article Content */}
          <div className="space-y-5">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed whitespace-pre-line text-ink/90">
                {p}
              </p>
            ))}
          </div>

          {/* Author Callout Box */}
          <div className="mt-8 pt-6 border-t border-line/60 flex items-center gap-4 bg-bg/50 p-4 rounded-2xl border border-line">
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-lg shrink-0">
              <User size={22} />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-primary">{blog.author}</div>
              <div className="text-xs text-muted">
                {lang === 'bn' ? 'প্রকৃতি বার্তা অর্গানিক নিউট্রিশন ও লোকজ খাদ্য প্যানেল' : 'Prokriti Barta Organic Nutrition & Research Panel'}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-primary">
                {lang === 'bn' ? 'আরও পড়ুন' : 'Related Articles'}
              </h3>
              <Link to="/blog">
                <Button variant="outline" size="sm" className="gap-1">
                  {lang === 'bn' ? 'সব ব্লগ দেখুন' : 'View All'} <ArrowRight size={15} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <div key={b.id} className="bg-surface border border-line rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div className="aspect-16/10 overflow-hidden bg-bg">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-accent uppercase">{b.category}</span>
                      <Link to={`/blog/${b.slug}`} className="block font-display font-bold text-sm text-primary hover:text-accent line-clamp-2 leading-snug">
                        {lang === 'bn' ? b.title : (b.titleEn || b.title)}
                      </Link>
                    </div>
                    <Link to={`/blog/${b.slug}`} className="text-xs font-bold text-accent hover:underline flex items-center gap-1 pt-2 border-t border-line/60">
                      {t('btn.readMore')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
