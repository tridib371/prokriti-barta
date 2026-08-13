import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import AlponaDivider from '../ui/AlponaDivider';
import categories from '../../data/categories.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface text-ink border-t border-line mt-16 transition-colors">
      <AlponaDivider className="my-0" />

      {/* Value Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-line">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">১০০% খাঁটি ও অর্গানিক</h4>
              <p className="text-xs text-muted">রাসায়নিক ও প্রিজারভেটিভ মুক্ত</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">দ্রুত ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-muted">সারা বাংলাদেশে ১-৩ দিনে</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">সহজ রিটার্ন পলিসি</h4>
              <p className="text-xs text-muted">পণ্য অপছন্দে ৭ দিনে মানি-ব্যাক</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">২৪/৭ কাস্টমার সাপোর্ট</h4>
              <p className="text-xs text-muted">+880 1712-345678</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-accent flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4 C14 12, 14 28, 20 36 C26 28, 26 12, 20 4 Z" fill="currentColor" />
                <path d="M4 20 C12 14, 28 14, 36 20 C28 26, 12 26, 4 20 Z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-primary">প্রকৃতি বার্তা</span>
          </Link>
          <p className="text-xs text-muted leading-relaxed max-w-sm font-bn-sans">
            'প্রকৃতি বার্তা' বাংলাদেশের প্রত্যন্ত অঞ্চল, সুন্দরবনের গহীন অরণ্য এবং নিজস্ব কৃষি খামার থেকে সরাসরি সংগৃহীত খাঁটি খাদ্যসামগ্রী পৌঁছে দিচ্ছে আপনার দোরগোড়ায়।
          </p>
          <div className="space-y-1.5 text-xs text-muted">
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> বনানী, ঢাকা-১২১৩, বাংলাদেশ
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-accent" /> support@prokritibarta.com
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">প্রয়োজনীয় লিংক</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li><Link to="/about" className="hover:text-accent transition-colors">আমাদের পরিচয়</Link></li>
            <li><Link to="/shop" className="hover:text-accent transition-colors">সকল প্রোডাক্ট</Link></li>
            <li><Link to="/offers" className="hover:text-accent transition-colors font-semibold text-accent-2">বিশেষ অফার</Link></li>
            <li><Link to="/delivery" className="hover:text-accent transition-colors">ডেলিভারি সংক্রান্ত তথ্য</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">স্বাস্থ্যকণিকা ও ব্লগ</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">ক্যাটাগরি</h4>
          <ul className="space-y-2 text-xs text-muted">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link to={`/shop?category=${cat.slug}`} className="hover:text-accent transition-colors">
                  {cat.bnName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">নিউজলেটার</h4>
          <p className="text-xs text-muted mb-3">নতুন স্টক ও অর্গানিক অফারের আপডেট পেতে ইমেইল সাবস্ক্রাইব করুন।</p>
          
          {subscribed ? (
            <div className="bg-accent/15 border border-accent/30 p-3 rounded-xl flex items-center gap-2 text-xs text-accent font-medium">
              <CheckCircle size={16} /> ধন্যবাদ! আপডেট আপনার ইমেইলে পৌছে যাবে।
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                placeholder="আপনার ইমেইল এড্রেস"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg text-ink text-xs px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-surface hover:bg-primary/90 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                সাবস্ক্রাইব <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="border-t border-line/60 bg-bg/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} প্রকৃতি বার্তা (Prokriti-Barta). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
            <span className="px-2 py-1 bg-surface border border-line rounded">bKash</span>
            <span className="px-2 py-1 bg-surface border border-line rounded">Nagad</span>
            <span className="px-2 py-1 bg-surface border border-line rounded">Rocket</span>
            <span className="px-2 py-1 bg-surface border border-line rounded">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
