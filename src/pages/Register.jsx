import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { t, lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError(t('register.error'));
      return;
    }
    register(name, email, phone, password);
    const destination = location.state?.from || '/shop';
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-[85vh] bg-bg py-12 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Ambient Animated Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-4xl w-full bg-surface border border-line rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 relative z-10"
      >
        
        {/* Left Side Visual Banner */}
        <div className="md:col-span-5 bg-primary text-surface p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
              <img src="/PB.jpg" alt="Prokriti Barta" className="w-9 h-9 object-contain rounded-full shadow-sm" />
              <span className="font-display font-bold text-lg text-surface tracking-wide">
                {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}
              </span>
            </Link>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent/20 text-accent font-bold text-xs rounded-full border border-accent/30 shadow-2xs leading-none">
                <CheckCircle2 size={14} className="text-accent" />
                <span>{lang === 'bn' ? 'নতুন একাউন্ট' : 'Join Prokriti'}</span>
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-surface leading-snug">
              {lang === 'bn' ? 'যুক্ত হন প্রকৃতির সাথে, শুরু হোক নতুন অভিজ্ঞতা' : 'Join Nature, Begin a Pure Journey'}
            </h2>
            <p className="text-xs text-surface/80 font-bn-sans leading-relaxed">
              {lang === 'bn' 
                ? 'নতুন একাউন্ট খুলে পান দ্রুততম অর্ডার ও অর্গানিক লাইফস্টাইল সহায়তার সুবিধা।' 
                : 'Create an account for faster ordering, order tracking, and exclusive organic health offers.'}
            </p>
          </div>

          <div className="space-y-2.5 text-xs font-bn-sans text-surface/85 z-10 pt-6 border-t border-white/10">
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? '৳১০০০+ অর্ডারে সারা দেশে ফ্রি শিপিং' : 'Free Shipping Nationwide on ৳1000+'}</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি সুবিধা' : '100% Cash on Delivery (COD)'}</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? '১০০% খাঁটি ও নিরাপদ অর্গানিক পণ্য' : '100% Tested Pure Organic Food'}</span>
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">{t('register.title')}</h1>
            <p className="text-xs text-muted font-bn-sans">{t('register.subtitle')}</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent-2/15 border border-accent-2 text-accent-2 text-xs p-3 rounded-2xl font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5 text-xs font-bn-sans">
            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('register.name')} *</label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: সাব্বির রহমান' : 'Full Name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border border-line focus:border-accent focus:bg-surface outline-none transition-all"
                />
                <User size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('login.email')} *</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border border-line focus:border-accent focus:bg-surface outline-none transition-all"
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('register.phone')} *</label>
              <div className="relative group">
                <input
                  type="tel"
                  required
                  placeholder="01717-279166"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border border-line focus:border-accent focus:bg-surface outline-none transition-all"
                />
                <Phone size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('login.password')} *</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 pr-10 rounded-2xl border border-line focus:border-accent focus:bg-surface outline-none transition-all"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-3 text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Short Centered Register Button */}
            <div className="pt-3 flex justify-center">
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 gap-2 min-w-[170px] cursor-pointer"
              >
                <span>{t('btn.register')}</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted text-center font-bn-sans pt-2 border-t border-line/50">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="text-accent font-bold hover:underline">
              {t('register.loginLink')}
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
