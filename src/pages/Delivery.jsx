import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Delivery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">নীতিমালা</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            ডেলিভারি ও রিটার্ন সংক্রান্ত তথ্য
          </h1>
        </div>

        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-bn-sans leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
              <Truck className="text-accent" size={20} /> ডেলিভারি চার্জ ও সময়সীমা
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li><strong>ঢাকা সিটি কর্পোরেশন এলাকা:</strong> ২৪ থেকে ৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি (চার্জ ৳৬০)।</li>
              <li><strong>ঢাকার বাইরে (উপজেলা ও জেলা পর্যায়):</strong> ২ থেকে ৪ দিনের মধ্যে ডেলিভারি (চার্জ ৳১০০)।</li>
              <li><strong>ফ্রি ডেলিভারি অফার:</strong> ১০০০ টাকা বা তার বেশি টাকার কেনাকাটায় সারা বাংলাদেশে ডেলিভারি ফ্রি!</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-line">
            <h2 className="font-display font-bold text-xl text-primary flex items-center gap-2">
              <RefreshCw className="text-accent" size={20} /> ৭ দিনের রিটার্ন পলিসি
            </h2>
            <p className="text-muted">
              ডেলিভারিকৃত পণ্যের সীল খোলা না থাকলে অথবা পরিবহনের সময় বয়াম ভেঙে বা লিক হয়ে থাকলে ডেলিভারিম্যানের সামনেই রিটার্ন করা যাবে অথবা আমাদের হটলাইনে জানালে ২৪ ঘণ্টার মধ্যে রিপ্লেসমেন্ট প্রদান করা হবে।
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
