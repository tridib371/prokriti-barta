import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('pb_isLoggedIn', 'true');
    navigate('/profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-16 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="font-display font-bold text-2xl text-primary">সাইন ইন (Sign In)</h1>
          <p className="text-xs text-muted font-bn-sans">আপনার প্রকৃতি বার্তা একাউন্টে লগইন করুন</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-ink mb-1">ইমেইল বা মোবাইল নম্বর</label>
            <input
              type="text"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
            />
          </div>

          <Button type="submit" variant="accent" size="lg" className="w-full gap-2 mt-2">
            লগইন করুন <ArrowRight size={16} />
          </Button>
        </form>

        <p className="text-xs text-muted text-center font-bn-sans">
          একাউন্ট নেই? <Link to="/register" className="text-accent font-bold hover:underline">নতুন একাউন্ট খুলুন</Link>
        </p>
      </div>
    </motion.div>
  );
}
