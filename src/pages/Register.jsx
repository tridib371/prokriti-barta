import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2, Eye, EyeOff, ShieldCheck, Star } from 'lucide-react';
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
  const [fieldErrors, setFieldErrors] = useState({});

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUpper && hasLower && hasNumber && hasSpecial && hasMinLength;

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    const cleanedPhone = phone.replace(/\D/g, '');

    if (!name.trim()) {
      errs.name = lang === 'bn' ? 'দয়া করে আপনার পূর্ণ নাম লিখুন' : 'Please enter your full name';
    }
    if (!email.trim()) {
      errs.email = lang === 'bn' ? 'দয়া করে আপনার ইমেইল এড্রেস লিখুন' : 'Please enter your email address';
    }
    if (!phone.trim()) {
      errs.phone = lang === 'bn' ? 'দয়া করে আপনার ফোন নম্বর লিখুন' : 'Please enter your phone number';
    } else if (cleanedPhone.length !== 11) {
      errs.phone = lang === 'bn' 
        ? 'ফোন নম্বরটি অবশ্যই ১১ ডিজিটের হতে হবে (যেমন: ০১৭১৭২৭৯১৬৬)' 
        : 'Phone number must be exactly 11 digits (e.g. 01717279166)';
    }

    if (!password) {
      errs.password = lang === 'bn' ? 'দয়া করে একটি শক্তিশালী পাসওয়ার্ড লিখুন' : 'Please enter a password';
    } else if (!isPasswordValid) {
      errs.password = lang === 'bn' 
        ? 'পাসওয়ার্ডে বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা ও বিশেষ চিহ্ন থাকতে হবে' 
        : 'Password must include uppercase, lowercase, number and special character';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    register(name, email, cleanedPhone, password);
    const destination = location.state?.from || '/shop';
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-[85vh] bg-bg py-12 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Ambient Deep Animated Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-accent/30 blur-[90px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.55, 0.3],
          x: [0, -35, 0],
          y: [0, 35, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/45 dark:bg-primary/70 blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-4xl w-full z-10">
        {/* Deep Radiant Background Shadow Halo */}
        <div className="absolute -inset-3 bg-gradient-to-r from-primary/50 via-accent/40 to-primary/60 rounded-[34px] blur-2xl opacity-80 -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full bg-surface border-2 border-accent rounded-3xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(27,59,43,0.55),0_15px_40px_-10px_rgba(0,0,0,0.45)] dark:shadow-[0_35px_100px_-15px_rgba(0,0,0,0.95)] ring-1 ring-accent/30 grid grid-cols-1 md:grid-cols-12 relative"
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
                <ShieldCheck size={14} className="text-accent" />
                <span>{lang === 'bn' ? 'নতুন একাউন্ট' : 'Join Prokriti'}</span>
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl lg:text-3xl text-surface leading-snug">
              {lang === 'bn' ? 'যুক্ত হন প্রকৃতির সাথে, শুরু হোক নতুন অভিজ্ঞতা' : 'Join Nature, Begin a Pure Journey'}
            </h2>
            <p className="text-xs text-surface/80 font-bn-sans leading-relaxed">
              {lang === 'bn' 
                ? 'নতুন একাউন্ট খুলে পান দ্রুততম অর্ডার, অর্ডার ট্র্যাকিং ও সরাসরি অর্গানিক লাইফস্টাইল সহায়তার সুবিধা।' 
                : 'Create an account for faster checkout, live tracking, and exclusive pure food privileges.'}
            </p>
          </div>

          <div className="space-y-3 z-10 pt-6 border-t border-white/10">
            <div className="space-y-2 text-xs font-bn-sans text-surface/85">
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

            <div className="pt-3 flex items-center gap-2 text-[11px] text-surface/75 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="flex text-amber-400">
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
              </div>
              <span>{lang === 'bn' ? '৪.৯/৫ কাস্টমার ট্রাস্ট রেটিং' : '4.9/5 Customer Trust Rating'}</span>
            </div>
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
              className="bg-accent-2/15 border border-accent-2 text-accent-2 text-xs p-3.5 rounded-2xl font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} noValidate className="space-y-3 text-xs font-bn-sans">
            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('register.name')} *</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'যেমন: সাব্বির রহমান' : 'Full Name'}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border ${fieldErrors.name ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
                />
                <User size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
              {fieldErrors.name && (
                <p className="text-[11px] text-accent-2 font-bold mt-1 flex items-center gap-1 font-bn-sans">
                  <span>{fieldErrors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('login.email')} *</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border ${fieldErrors.email ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-accent-2 font-bold mt-1 flex items-center gap-1 font-bn-sans">
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('register.phone')} ({lang === 'bn' ? '১১ ডিজিট' : '11 Digits'}) *</label>
              <div className="relative group">
                <input
                  type="tel"
                  placeholder="01717279166"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setPhone(val);
                    if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-2xl border ${fieldErrors.phone ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
                />
                <Phone size={16} className="absolute left-3.5 top-3 text-muted group-focus-within:text-accent transition-colors" />
              </div>
              {fieldErrors.phone && (
                <p className="text-[11px] text-accent-2 font-bold mt-1 flex items-center gap-1 font-bn-sans">
                  <span>{fieldErrors.phone}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-ink text-xs">{t('login.password')} *</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-2.5 pl-10 pr-10 rounded-2xl border ${fieldErrors.password ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
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
              {fieldErrors.password && (
                <p className="text-[11px] text-accent-2 font-bold mt-1 flex items-center gap-1 font-bn-sans">
                  <span>{fieldErrors.password}</span>
                </p>
              )}

              {/* Real-time Password Requirement Checklist */}
              <div className="pt-2 p-2.5 rounded-xl bg-bg/80 border border-line/70 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-bn-sans">
                <div className={`flex items-center gap-1.5 transition-colors ${hasUpper ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-muted'}`}>
                  <CheckCircle2 size={13} className={hasUpper ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted/40'} />
                  <span>{lang === 'bn' ? 'বড় হাতের অক্ষর (A-Z)' : 'Uppercase (A-Z)'}</span>
                </div>
                <div className={`flex items-center gap-1.5 transition-colors ${hasLower ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-muted'}`}>
                  <CheckCircle2 size={13} className={hasLower ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted/40'} />
                  <span>{lang === 'bn' ? 'ছোট হাতের অক্ষর (a-z)' : 'Lowercase (a-z)'}</span>
                </div>
                <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-muted'}`}>
                  <CheckCircle2 size={13} className={hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted/40'} />
                  <span>{lang === 'bn' ? 'সংখ্যা (০-৯ / 0-9)' : 'Number (0-9)'}</span>
                </div>
                <div className={`flex items-center gap-1.5 transition-colors ${hasSpecial ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-muted'}`}>
                  <CheckCircle2 size={13} className={hasSpecial ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted/40'} />
                  <span>{lang === 'bn' ? 'বিশেষ চিহ্ন (!@#$%^&*)' : 'Special char (!@#$)'}</span>
                </div>
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
  </div>
  );
}
