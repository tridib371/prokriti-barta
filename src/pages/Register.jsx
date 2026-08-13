import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = (e) => {
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
          <h1 className="font-display font-bold text-2xl text-primary">নতুন একাউন্ট খুলুন</h1>
          <p className="text-xs text-muted font-bn-sans">প্রকৃতি বার্তা পরিবারে আপনাকে স্বাগতম</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-ink mb-1">পূর্ণ নাম *</label>
            <input
              type="text"
              required
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">মোবাইল নম্বর *</label>
            <input
              type="tel"
              required
              placeholder="01700-000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
            />
          </div>

          <Button type="submit" variant="accent" size="lg" className="w-full gap-2 mt-2">
            রেজিস্টার করুন <ArrowRight size={16} />
          </Button>
        </form>

        <p className="text-xs text-muted text-center font-bn-sans">
          ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="text-accent font-bold hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </motion.div>
  );
}
