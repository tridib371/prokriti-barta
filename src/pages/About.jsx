import React from 'react';
import { ShieldCheck, Heart, Leaf, Users } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">আমাদের পরিচয়</span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            প্রকৃতির খাঁটি রূপ, বাংলা মাটির নির্যাস
          </h1>
          <p className="text-muted text-sm sm:text-base font-bn-sans max-w-2xl mx-auto leading-relaxed">
            'প্রকৃতি বার্তা' কেবল কোনো ই-কমার্স প্ল্যাটফর্ম নয় — এটি বাংলাদেশের হারানো লোকজ খাদ্য সংস্কৃতি ও বিশুদ্ধতার আন্দোলন।
          </p>
        </div>

        <AlponaDivider />

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm leading-relaxed text-ink font-bn-sans">
            <h2 className="font-display font-bold text-2xl text-primary">আমাদের পথচলা</h2>
            <p>
              আজকের এই ব্যস্ত নগরায়নে বাজার থেকে কেনা বেশিরভাগ খাদ্যে কোনো না কোনোভাবে কেমিক্যাল বা প্রিজারভেটিভ মিশে থাকে। সুন্দরবনের আসল বুনো মধুর স্বাদ কিংবা কাঠের ঘানির খাঁটি সরিষার তেলের ঝাঁঝ আজ দূরলভ।
            </p>
            <p>
              এই সংকট থেকে আমাদের জন্ম। আমরা সরাসরি প্রত্যন্ত অঞ্চলের কৃষক, মৌয়াল ও প্রথাগত গাওয়া ঘি তৈরির কারিগরদের সাথে যুক্ত হয়েছি।
            </p>
          </div>
          <div className="aspect-4/3 rounded-3xl overflow-hidden border border-line shadow-md">
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
              alt="Organic Honey Harvest"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-surface border border-line p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 bg-accent/15 text-accent rounded-xl flex items-center justify-center font-bold">
              <Leaf size={22} />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">১০০% প্রাকৃতিক সংস্থান</h3>
            <p className="text-xs text-muted font-bn-sans">কোনো প্রকার প্রিজারভেটিভ, আর্টিফিশিয়াল সুবাস বা কালার ছাড়া খাঁটি ফসল।</p>
          </div>

          <div className="bg-surface border border-line p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 bg-accent/15 text-accent rounded-xl flex items-center justify-center font-bold">
              <Users size={22} />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">কৃষকের সঠিক অধিকার</h3>
            <p className="text-xs text-muted font-bn-sans">মধ্যস্বত্বভোগী এড়িয়ে সরাসরি খামারিদের তাদের মেহনতের উপযুক্ত মূল্য নিশ্চিতকরণ।</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
