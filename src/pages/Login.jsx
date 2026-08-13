import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।');
      return;
    }
    login(email, password);
    // Redirect back to intended page (e.g. /checkout) or default to /shop
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
              প্রকৃতি বার্তা সাইন ইন
            </span>
            <h2 className="font-display font-bold text-3xl text-surface leading-tight">
              আবারও স্বাগতম আপনার পছন্দের অর্গানিক শপে
            </h2>
            <p className="text-xs text-surface/80 font-bn-sans leading-relaxed">
              আপনার সংরক্ষিত উইশলিস্ট, কার্ট এবং সহজ চেকআউটের সুবিধা পেতে লগইন করুন।
            </p>
          </div>

          <div className="space-y-2 text-xs font-bn-sans text-surface/80 z-10">
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> খাঁটি সুন্দরবনের বুনো মধু</p>
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> দই মন্থন করা বিলোনা গাওয়া ঘি</p>
            <p className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> কাঠের ঘানির সরিষার তেল</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h1 className="font-display font-bold text-2xl text-primary">একাউন্টে লগইন করুন</h1>
            <p className="text-xs text-muted font-bn-sans">আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড লিখুন</p>
          </div>

          {error && (
            <div className="bg-accent-2/15 border border-accent-2 text-accent-2 text-xs p-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-ink mb-1">ইমেইল এড্রেস</label>
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
              <label className="block font-bold text-ink mb-1">পাসওয়ার্ড</label>
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
              লগইন করুন <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-xs text-muted text-center font-bn-sans">
            নতুন গ্রাহক? <Link to="/register" className="text-accent font-bold hover:underline">একাউন্ট তৈরি করুন</Link>
          </p>
        </div>

      </div>
    </motion.div>
  );
}
