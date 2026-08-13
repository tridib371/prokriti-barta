import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Blog() {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">{t('nav.blog')}</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary mt-1">
            {t('blog.title')}
          </h1>
          <p className="text-xs sm:text-sm text-muted font-bn-sans mt-2">
            {t('blog.sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <div key={blog.id} className="bg-surface border border-line rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div className="aspect-16/10 overflow-hidden bg-bg">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted font-semibold">
                    <span className="text-accent uppercase">{blog.category}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {n(blog.readTime)}</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`} className="block font-display font-bold text-lg text-primary hover:text-accent line-clamp-2">
                    {lang === 'bn' ? blog.title : (blog.titleEn || blog.title)}
                  </Link>
                  <p className="text-xs text-muted font-bn-sans line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-[11px] text-muted flex items-center gap-1"><User size={12} /> {blog.author}</span>
                  <Link to={`/blog/${blog.slug}`} className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                    {t('btn.readMore')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
