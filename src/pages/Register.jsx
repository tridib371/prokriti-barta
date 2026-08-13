import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
      return;
    }
    register(name, email, phone, password);
    const destination = location.state?.from || '/shop';
    navigate(destination, { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[85vh] bg-bg py-12 flex items-center justify-center px-4"
    >
      <div className="max-w-4xl w-full bg-surface border border-line rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side Visual Banner */}
        <div className="bg-primary text-surface p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="space-y-4 z-10">
            <span className="px-3 py-1 bg-accent/20 text-accent font-bold text-xs rounded-full inline-block">
              প্রকৃতি বার্তা রেজিস্ট্রেশন
            </span>
            <h2 className="font-display font-bold text-3xl text-surface leading-tight">
              যুক্ত হন প্রকৃতির সাথে, শুরু হোক নতুন অভিজ্ঞতা
            </h2>
            <p className="text-xs text-surface/80 font-bn-sans leading-relaxed">
              নতুন একাউন্ট খুলে পান প্রথম অর্ডারে বিশেষ ফ্রি ডেলিভারি অফার ও সরাসরি অর্ডার করার সুযোগ।
            </p>
          </div>

          <div className="space-y-2 text-xs font-bn-sans text-surface/80 z-10">
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> ১০০০+ অর্ডারে সারা দেশে ফ্রি শিপিং</p>
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> দ্রুততম ক্যাশ অন ডেলিভারি</p>
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> ১০০% প্রিজারভেটিভ-মুক্ত ক্যাচ</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1">
            <h1 className="font-display font-bold text-2xl text-primary">নতুন একাউন্ট খুলুন</h1>
            <p className="text-xs text-muted font-bn-sans">আপনার সঠিক তথ্য প্রদান করে সাইন আপ সম্পন্ন করুন</p>
          </div>

          {error && (
            <div className="bg-accent-2/15 border border-accent-2 text-accent-2 text-xs p-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-ink mb-1">আপনার পূর্ণ নাম *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="যেমন: সাব্বির রহমান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-xl border border-line focus:border-accent outline-none"
                />
                <User size={16} className="absolute left-3.5 top-3 text-muted" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-ink mb-1">ইমেইল এড্রেস *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-xl border border-line focus:border-accent outline-none"
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-muted" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-ink mb-1">মোবাইল নম্বর *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="01700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-xl border border-line focus:border-accent outline-none"
                />
                <Phone size={16} className="absolute left-3.5 top-3 text-muted" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-ink mb-1">পাসওয়ার্ড *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg text-ink px-4 py-2.5 pl-10 rounded-xl border border-line focus:border-accent outline-none"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-muted" />
              </div>
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full gap-2 shadow-md">
              রেজিস্ট্রেশন করুন (Sign Up) <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-xs text-muted text-center font-bn-sans">
            ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="text-accent font-bold hover:underline">লগইন করুন</Link>
          </p>
        </div>

      </div>
    </motion.div>
  );
}
