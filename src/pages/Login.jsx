import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const errs = {};
    const trimmedEmail = email.trim();
    const isGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(trimmedEmail);

    if (!trimmedEmail) {
      errs.email = lang === 'bn' ? 'দয়া করে আপনার ইমেইল এড্রেস লিখুন' : 'Please enter your email';
    } else if (!isGmail) {
      errs.email = lang === 'bn' 
        ? 'ইমেইল অবশ্যই @gmail.com যুক্ত হতে হবে (যেমন: example@gmail.com)' 
        : 'Email must be a valid Gmail address ending with @gmail.com';
    }
    if (!password) {
      errs.password = lang === 'bn' ? 'দয়া করে আপনার পাসওয়ার্ড লিখুন' : 'Please enter your password';
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

    const result = login(trimmedEmail, password);
    if (!result.success) {
      setError(lang === 'bn' ? result.errorBn : result.errorEn);
      return;
    }

    const destination = location.state?.from || '/profile';
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
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-accent/30 blur-[90px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.55, 0.3],
          x: [0, -35, 0],
          y: [0, 35, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
                <span>{lang === 'bn' ? 'নিরাপদ সাইন ইন' : 'Secure Sign In'}</span>
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-surface leading-snug">
              {t('login.banner.title')}
            </h2>
            <p className="text-xs text-surface/80 font-bn-sans leading-relaxed">
              {t('login.banner.subtitle')}
            </p>
          </div>

          <div className="space-y-2.5 text-xs font-bn-sans text-surface/85 z-10 pt-6 border-t border-white/10">
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? '১০০% খাঁটি সুন্দরবনের বুনো মধু' : '100% Raw Sundarban Wild Honey'}</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? 'দই মন্থন করা বৈদিক বিলোনা ঘি' : 'Cultured Vedic Bilona Ghee'}</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-accent shrink-0" />
              <span>{lang === 'bn' ? 'কাঠের ঘানির কোল্ড-প্রেসড তেল' : 'Cold-Pressed Wood-Milled Oils'}</span>
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">{t('login.title')}</h1>
            <p className="text-xs text-muted font-bn-sans">{t('login.subtitle')}</p>
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

          <form onSubmit={handleLogin} noValidate className="space-y-4 text-xs font-bn-sans">
            <div className="space-y-1.5">
              <label className="block font-bold text-ink text-xs">{t('login.email')}</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-3 pl-10 rounded-2xl border ${fieldErrors.email ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-muted group-focus-within:text-accent transition-colors" />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-accent-2 font-bold mt-1 flex items-center gap-1 font-bn-sans">
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-ink text-xs">{t('login.password')}</label>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: null }));
                  }}
                  className={`w-full bg-bg text-ink px-4 py-3 pl-10 pr-10 rounded-2xl border ${fieldErrors.password ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} focus:bg-surface outline-none transition-all`}
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-muted group-focus-within:text-accent transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-3.5 text-muted hover:text-ink transition-colors cursor-pointer"
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
              {password && (
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
              )}
            </div>

            {/* Short Centered Login Button */}
            <div className="pt-3 flex justify-center">
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 gap-2 min-w-[160px] cursor-pointer"
              >
                <span>{t('btn.login')}</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted text-center font-bn-sans pt-2 border-t border-line/50">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-accent font-bold hover:underline">
              {t('login.createAccount')}
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  </div>
  );
}
