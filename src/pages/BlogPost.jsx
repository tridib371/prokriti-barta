import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { motion } from 'framer-motion';
import AlponaDivider from '../components/ui/AlponaDivider';
import { useLanguage } from '../context/LanguageContext';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent">
          <ArrowLeft size={15} /> {t('btn.backToBlog')}
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{blog.category}</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary leading-tight">
            {lang === 'bn' ? blog.title : (blog.titleEn || blog.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-bn-sans pt-2 border-b border-line pb-4">
            <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {n(blog.date)}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {n(blog.readTime)}</span>
          </div>
        </div>

        <div className="aspect-16/9 rounded-3xl overflow-hidden border border-line shadow-sm">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-4 text-sm leading-relaxed text-ink font-bn-sans">
          <p className="font-semibold text-base text-primary leading-relaxed">{blog.excerpt}</p>
          <AlponaDivider className="my-4" />
          <p>{blog.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
