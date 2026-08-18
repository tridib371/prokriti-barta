import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Phone, 
  Mail, 
  Edit3, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  LogOut, 
  ChevronRight, 
  Gift, 
  Clock, 
  Truck, 
  Check, 
  ShoppingBag,
  ExternalLink,
  Plus,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { t, n, lang } = useLanguage();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'addresses' | 'rewards'
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Edit form state with strictly real user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || ''
  });

  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pb_orders') || '[]');
      if (Array.isArray(stored) && user?.email) {
        const userOrders = stored.filter(ord => 
          ord.userEmail?.toLowerCase() === user.email.toLowerCase() ||
          ord.userId === user.id ||
          ord.shippingAddress?.email?.toLowerCase() === user.email.toLowerCase()
        );
        setOrders(userOrders);
      } else {
        setOrders([]);
      }
    } catch (e) {
      setOrders([]);
    }
  }, [user]);

  // Sync user state with formData
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city
      }));
    }
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const errs = {};
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const isValidBDMobile = /^01[3-9]\d{8}$/.test(cleanedPhone);

    if (!formData.name.trim()) {
      errs.name = lang === 'bn' ? 'দয়া করে নাম লিখুন' : 'Name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = lang === 'bn' ? 'দয়া করে ফোন নম্বর লিখুন' : 'Phone is required';
    } else if (cleanedPhone.length !== 11) {
      errs.phone = lang === 'bn' 
        ? `ফোন নম্বরটি অবশ্যই ঠিক ১১ ডিজিটের হতে হবে (আপনি ${cleanedPhone.length} ডিজিট দিয়েছেন)` 
        : `Phone number must be exactly 11 digits (you entered ${cleanedPhone.length} digits)`;
    } else if (!isValidBDMobile) {
      errs.phone = lang === 'bn'
        ? 'অবৈধ মোবাইল নম্বর। ০১ দিয়ে শুরু হওয়া ১১ ডিজিটের সঠিক নম্বর দিন (যেমন: ০১৭১৭২৭৯১৬৬)'
        : 'Invalid mobile number. Must start with 013-019 and have exactly 11 digits';
    }
    if (!formData.address.trim()) {
      errs.address = lang === 'bn' ? 'দয়া করে ঠিকানা লিখুন' : 'Address is required';
    }

    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }

    setEditErrors({});
    updateUser({
      name: formData.name.trim(),
      phone: cleanedPhone,
      address: formData.address.trim(),
      city: formData.city.trim()
    });

    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper to smoothly scroll to exact section in mobile view
  const scrollToSection = (elementId = 'profile-tab-content') => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const el = document.getElementById(elementId) || document.getElementById('profile-tab-content');
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 80);
    }
  };

  const handleTabChange = (tabName, editMode = false, targetId = 'profile-tab-content') => {
    setActiveTab(tabName);
    setIsEditing(editMode);
    scrollToSection(targetId);
  };

  const totalSpent = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const ecoPoints = Math.floor(totalSpent * 0.1);
  const displayName = user?.name || formData.name || (user?.email ? user.email.split('@')[0] : 'User');
  const userInitial = displayName.trim().charAt(0).toUpperCase() || 'U';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12 relative select-none"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-5 z-50 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 font-bn-sans text-xs sm:text-sm font-bold border border-primary/40"
          >
            <CheckCircle2 size={18} className="text-accent shrink-0" />
            <span>{lang === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Profile updated successfully!'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Gorgeous Brand Hero Header Banner (Compact in Y-Axis) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-[#1c4230] to-[#0f2319] text-white p-4 sm:p-6 shadow-md border-2 border-primary/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* User Identity Column */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-accent text-white font-display font-bold text-lg sm:text-xl flex items-center justify-center ring-4 ring-white/20 shadow-md">
                  {userInitial}
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-primary shadow-xs flex items-center justify-center">
                  <Check size={9} className="text-white stroke-[3]" />
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-bold text-lg sm:text-2xl text-white tracking-wide">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full shadow-2xs font-bn-sans">
                    <Award size={12} className="text-amber-300" />
                    <span>{lang === 'bn' ? 'অর্গানিক সদস্য' : 'Organic Member'}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5 text-xs text-white/80 font-bn-sans">
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-accent" />
                    {user?.email || 'user@gmail.com'}
                  </span>
                  {(user?.phone || formData.phone) && (
                    <span className="flex items-center gap-1">
                      <Phone size={13} className="text-accent" />
                      {n(user?.phone || formData.phone)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action Header Buttons */}
            <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
              <button
                onClick={() => handleTabChange('overview', true, 'profile-personal-info')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <Edit3 size={13} />
                <span>{lang === 'bn' ? 'প্রোফাইল এডিট' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-1.5 sm:px-3.5 sm:py-1.5 bg-accent/90 hover:bg-accent text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                title={t('nav.logout')}
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Banner Strip (Compact Height) */}
          <div className="mt-4 pt-3.5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
            <div 
              onClick={() => handleTabChange('orders', false, 'profile-orders-section')}
              className="bg-white/10 hover:bg-white/15 transition-colors cursor-pointer backdrop-blur-md border border-white/10 px-3 py-2 sm:py-2.5 rounded-xl"
            >
              <span className="text-[10px] text-white/70 block font-bn-sans">{lang === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}</span>
              <p className="font-display font-bold text-base sm:text-xl text-white mt-0.5">
                {n(orders.length)}
              </p>
            </div>

            <div 
              onClick={() => handleTabChange('orders', false, 'profile-orders-section')}
              className="bg-white/10 hover:bg-white/15 transition-colors cursor-pointer backdrop-blur-md border border-white/10 px-3 py-2 sm:py-2.5 rounded-xl"
            >
              <span className="text-[10px] text-white/70 block font-bn-sans">{lang === 'bn' ? 'সর্বমোট কেনাকাটা' : 'Total Spend'}</span>
              <p className="font-bn-sans font-bold text-base sm:text-xl text-accent mt-0.5">
                ৳{n(totalSpent)}
              </p>
            </div>

            <div 
              onClick={() => handleTabChange('rewards', false, 'profile-rewards-section')}
              className="bg-white/10 hover:bg-white/15 transition-colors cursor-pointer backdrop-blur-md border border-white/10 px-3 py-2 sm:py-2.5 rounded-xl"
            >
              <span className="text-[10px] text-white/70 block font-bn-sans">{lang === 'bn' ? 'ইকো রিওয়ার্ড পয়েন্ট' : 'Eco Reward Points'}</span>
              <p className="font-display font-bold text-base sm:text-xl text-amber-300 mt-0.5">
                {n(ecoPoints)} <span className="text-[10px] font-normal text-white/70">Pts</span>
              </p>
            </div>

            <Link 
              to="/wishlist"
              className="bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md border border-white/10 px-3 py-2 sm:py-2.5 rounded-xl block"
            >
              <span className="text-[10px] text-white/70 block font-bn-sans">{lang === 'bn' ? 'পছন্দের পণ্য' : 'Wishlist Items'}</span>
              <p className="font-display font-bold text-base sm:text-xl text-white mt-0.5">
                {n(wishlist.length)}
              </p>
            </Link>
          </div>
        </div>

        {/* 2. Interactive Navigation Tabs & Content Layout with Green-Bordered Cream Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Account Menu Card - Organic Cream with Signature Green Border */}
            <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 space-y-4 shadow-xs transition-colors">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block pb-3 border-b-2 border-primary/20">
                {lang === 'bn' ? 'অ্যাকাউন্ট মেনু' : 'Account Menu'}
              </span>

              <nav className="space-y-2 text-xs sm:text-sm font-bold font-bn-sans">
                <button
                  onClick={() => handleTabChange('overview', false, 'profile-personal-info')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-ink hover:bg-white/80 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <User size={18} className={activeTab === 'overview' ? 'text-accent' : 'text-primary/70'} />
                    <span>{lang === 'bn' ? 'ব্যক্তিগত তথ্য ও নিরাপত্তা' : 'Personal Info & Security'}</span>
                  </span>
                  <ChevronRight size={16} className={activeTab === 'overview' ? 'text-accent' : 'text-muted/40'} />
                </button>

                <button
                  onClick={() => handleTabChange('orders', false, 'profile-orders-section')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-ink hover:bg-white/80 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Package size={18} className={activeTab === 'orders' ? 'text-accent' : 'text-primary/70'} />
                    <span>{t('profile.orders')}</span>
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                    activeTab === 'orders' ? 'bg-accent text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {n(orders.length)}
                  </span>
                </button>

                <button
                  onClick={() => handleTabChange('addresses', false, 'profile-addresses-section')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === 'addresses'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-ink hover:bg-white/80 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <MapPin size={18} className={activeTab === 'addresses' ? 'text-accent' : 'text-primary/70'} />
                    <span>{lang === 'bn' ? 'সংরক্ষিত ঠিকানা' : 'Saved Addresses'}</span>
                  </span>
                  <ChevronRight size={16} className={activeTab === 'addresses' ? 'text-accent' : 'text-muted/40'} />
                </button>

                <button
                  onClick={() => handleTabChange('rewards', false, 'profile-rewards-section')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all cursor-pointer ${
                    activeTab === 'rewards'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-ink hover:bg-white/80 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Gift size={18} className={activeTab === 'rewards' ? 'text-accent' : 'text-primary/70'} />
                    <span>{lang === 'bn' ? 'ইকো ক্লাব ও রিওয়ার্ড' : 'Eco Club & Rewards'}</span>
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'rewards' ? 'bg-amber-400 text-primary' : 'bg-amber-400/20 text-amber-700'
                  }`}>
                    {n(ecoPoints)} Pts
                  </span>
                </button>

                <Link
                  to="/wishlist"
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-ink hover:bg-white/80 hover:text-primary transition-all font-bn-sans"
                >
                  <span className="flex items-center gap-3">
                    <Heart size={18} className="text-accent" />
                    <span>{t('btn.wishlist')}</span>
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/20 text-accent font-mono font-bold">
                    {n(wishlist.length)}
                  </span>
                </Link>
              </nav>
            </div>

            {/* Organic Assurance Card - Green Border */}
            <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 space-y-3.5 shadow-xs flex-1 flex flex-col justify-between transition-colors">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-9 h-9 rounded-xl bg-white/80 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck size={20} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-primary">
                    {lang === 'bn' ? 'নিরাপদ অর্গানিক সেবা' : '100% Organic Guarantee'}
                  </h4>
                </div>
                <p className="text-xs text-muted font-bn-sans leading-relaxed">
                  {lang === 'bn' 
                    ? 'আপনার প্রতিটি অর্ডার সর্বোচ্চ প্রাকৃতিক বিশুদ্ধতায় প্রক্রিয়াজাত ও দ্রুত ডেলিভারি করা হয়।' 
                    : 'Every organic harvest is authentic, lab-tested, and freshly packaged upon your order.'}
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline font-bn-sans pt-2 border-t border-primary/20">
                <span>{lang === 'bn' ? 'কাস্টমার কেয়ার হেল্পলাইন' : 'Contact Customer Care'}</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>

          {/* Right Detailed Tab Content Area */}
          <div id="profile-tab-content" className="lg:col-span-8 space-y-6 scroll-mt-24">
            
            {/* TAB 1: OVERVIEW & PERSONAL INFORMATION */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Personal Information Box - Green Border */}
                <div id="profile-personal-info" className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs transition-colors scroll-mt-24">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-primary/20">
                    <div>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                        {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
                      </h2>
                      <p className="text-xs text-muted font-bn-sans mt-0.5">
                        {lang === 'bn' ? 'আপনার ডেলিভারি ও যোগাযোগের প্রাথমিক বিবরণী' : 'Your shipping and primary contact details'}
                      </p>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => { setIsEditing(true); scrollToSection('profile-personal-info'); }}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Edit3 size={14} />
                        <span>{lang === 'bn' ? 'সম্পাদনা' : 'Edit'}</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-bold text-primary text-xs">{t('register.name')} *</label>
                          <input
                            type="text"
                            placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className={`w-full bg-white text-ink px-4 py-2.5 rounded-2xl border-2 ${editErrors.name ? 'border-accent-2' : 'border-primary/30 focus:border-primary'} outline-none text-xs sm:text-sm font-bn-sans`}
                          />
                          {editErrors.name && <p className="text-[11px] text-accent-2 font-bold">{editErrors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="block font-bold text-primary text-xs">{t('register.phone')} ({lang === 'bn' ? '১১ ডিজিট' : '11 Digits'}) *</label>
                          <input
                            type="tel"
                            maxLength={15}
                            placeholder="01XXXXXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                            className={`w-full bg-white text-ink px-4 py-2.5 rounded-2xl border-2 ${editErrors.phone ? 'border-accent-2' : 'border-primary/30 focus:border-primary'} outline-none text-xs sm:text-sm font-bn-sans`}
                          />
                          {editErrors.phone && <p className="text-[11px] text-accent-2 font-bold">{editErrors.phone}</p>}
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="block font-bold text-primary text-xs">{t('login.email')} (Gmail)</label>
                          <input
                            type="email"
                            disabled
                            value={user?.email || 'user@gmail.com'}
                            className="w-full bg-black/5 text-muted px-4 py-2.5 rounded-2xl border border-primary/20 outline-none text-xs sm:text-sm cursor-not-allowed"
                          />
                          <span className="text-[10px] text-muted font-bn-sans">{lang === 'bn' ? 'ইমেইল পরিবর্তন করতে সাপোর্টে যোগাযোগ করুন।' : 'Contact support to modify primary email.'}</span>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="block font-bold text-primary text-xs">{lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Shipping Address'} *</label>
                          <textarea
                            rows={3}
                            placeholder={lang === 'bn' ? 'বাসা/রোড নম্বর, এলাকা, জেলা' : 'House/Road number, Area, District'}
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            className={`w-full bg-white text-ink px-4 py-2.5 rounded-2xl border-2 ${editErrors.address ? 'border-accent-2' : 'border-primary/30 focus:border-primary'} outline-none text-xs sm:text-sm font-bn-sans`}
                          />
                          {editErrors.address && <p className="text-[11px] text-accent-2 font-bold">{editErrors.address}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3">
                        <Button type="submit" variant="accent" size="sm" className="rounded-xl font-bold shadow-sm">
                          {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="rounded-xl font-bold">
                          {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-bn-sans">
                      {/* Name Tile */}
                      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <User size={18} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted text-[11px] font-semibold block">{t('register.name')}:</span>
                          <p className="font-bold text-primary text-sm sm:text-base truncate">{user?.name || formData.name || '-'}</p>
                        </div>
                      </div>

                      {/* Phone Tile */}
                      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Phone size={18} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted text-[11px] font-semibold block">{t('register.phone')}:</span>
                          <p className="font-bold text-primary text-sm sm:text-base truncate">
                            {(user?.phone || formData.phone) ? n(user?.phone || formData.phone) : <span className="text-muted text-xs italic">{lang === 'bn' ? 'যুক্ত করা হয়নি' : 'Not set'}</span>}
                          </p>
                        </div>
                      </div>

                      {/* Email Tile */}
                      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Mail size={18} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted text-[11px] font-semibold block">{t('login.email')}:</span>
                          <p className="font-bold text-primary text-sm sm:text-base truncate">{user?.email || 'user@gmail.com'}</p>
                        </div>
                      </div>

                      {/* Member Since Tile */}
                      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Calendar size={18} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted text-[11px] font-semibold block">{lang === 'bn' ? 'মেম্বারশিপ শুরু:' : 'Member Since:'}</span>
                          <p className="font-bold text-primary text-sm sm:text-base truncate">{user?.joinedDate ? n(user.joinedDate) : (lang === 'bn' ? 'আজ' : 'Today')}</p>
                        </div>
                      </div>

                      {/* Default Delivery Address Tile */}
                      <div className="sm:col-span-2 flex items-start gap-3.5 p-4.5 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={18} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-muted text-[11px] font-semibold block">{lang === 'bn' ? 'ডিফল্ট ডেলিভারি ঠিকানা:' : 'Default Delivery Address:'}</span>
                          {(user?.address || formData.address) ? (
                            <p className="font-bold text-primary text-sm sm:text-base mt-0.5">
                              {user?.address || formData.address}
                            </p>
                          ) : (
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-muted italic text-xs">
                                {lang === 'bn' ? 'কোনো ডেলিভারি ঠিকানা এখনো সেট করা হয়নি।' : 'No delivery address added yet.'}
                              </span>
                              <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1 bg-accent/15 text-accent rounded-lg text-xs font-bold hover:bg-accent/25 flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Plus size={13} />
                                <span>{lang === 'bn' ? 'ঠিকানা যোগ করুন' : 'Add Address'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Security & Health Card - Green Border */}
                <div id="profile-security-section" className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs transition-colors scroll-mt-24">
                  <div className="flex items-center justify-between pb-3.5 border-b-2 border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/80 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                        <ShieldCheck size={22} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-primary">
                          {lang === 'bn' ? 'অ্যাকাউন্ট নিরাপত্তা ও সুরক্ষা' : 'Account Security & Health'}
                        </h3>
                        <p className="text-xs text-muted font-bn-sans">
                          {lang === 'bn' ? 'এনক্রিপ্টেড ও সম্পূর্ণ সুরক্ষিত ক্রেতা অ্যাকাউন্ট' : 'Encrypted & completely protected user account'}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-primary border border-primary/20 font-bn-sans flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle2 size={13} className="text-accent" />
                      <span>{lang === 'bn' ? '১০০% সুরক্ষিত' : '100% Secure'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bn-sans">
                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Lock size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-primary text-xs sm:text-sm">{lang === 'bn' ? 'কঠোর পাসওয়ার্ড মানদণ্ড' : 'Strict Password Standards'}</p>
                        <p className="text-[11px] text-muted">{lang === 'bn' ? 'বড়, ছোট অক্ষর, সংখ্যা ও স্পেশাল চিহ্ন সক্রিয়' : 'Upper, lower, number & symbol enforced'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/85 border border-primary/20 shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-primary text-xs sm:text-sm">{lang === 'bn' ? 'ভেরিফাইড জিমেইল ডোমেইন' : 'Verified Gmail Domain'}</p>
                        <p className="text-[11px] text-muted">{lang === 'bn' ? 'নিরাপদ অর্গানিক নোটিফিকেশন চালু' : 'Secure order notifications active'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: RECENT ORDERS */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                id="profile-orders-section"
                className="space-y-4 scroll-mt-24"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-xl text-primary">
                    {t('profile.orders')} ({n(orders.length)})
                  </h2>
                  {orders.length > 0 && (
                    <Link to="/profile/orders" className="text-xs font-bold text-accent hover:underline font-bn-sans flex items-center gap-1">
                      <span>{lang === 'bn' ? 'সকল অর্ডার দেখুন' : 'View Full History'}</span>
                      <ExternalLink size={13} />
                    </Link>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 rounded-3xl p-12 text-center space-y-4 shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-white/80 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-2xs">
                      <ShoppingBag size={28} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-primary">{t('orders.empty')}</h3>
                    <p className="text-xs text-muted font-bn-sans max-w-sm mx-auto">
                      {lang === 'bn' ? 'আমাদের সংগ্রহশালা থেকে খাঁটি ও অর্গানিক পণ্য এখনই অর্ডার করুন।' : 'Start your journey with 100% natural, farm-fresh organic essentials.'}
                    </p>
                    <Link to="/shop">
                      <Button variant="accent" size="sm" className="rounded-full font-bold mt-2">
                        {lang === 'bn' ? 'পণ্য কেনাকাটা শুরু করুন' : 'Explore Shop'}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-primary/20 gap-2">
                          <div>
                            <span className="text-xs text-muted font-mono">{t('orders.id')}:</span>
                            <h3 className="font-display font-bold text-base sm:text-lg text-primary">{n(ord.id)}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted flex items-center gap-1 font-bn-sans">
                              <Calendar size={14} className="text-accent" /> {n(ord.date)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold font-bn-sans ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {ord.status === 'Delivered' ? (lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered') : (lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing')}
                            </span>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="space-y-2">
                          {ord.items?.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs font-bn-sans text-ink bg-white/60 p-2.5 rounded-xl border border-primary/20">
                              <span className="truncate pr-2 font-medium">{item.name} × {n(item.quantity)}</span>
                              <span className="font-bold font-bn-sans shrink-0 text-primary">৳{n(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-primary/20 flex items-center justify-between">
                          <div className="text-xs text-muted font-bn-sans">
                            {lang === 'bn' ? 'সর্বমোট পরিশোধ:' : 'Total Amount:'}{' '}
                            <strong className="text-primary font-bold text-sm font-bn-sans">৳{n(ord.total)}</strong>
                          </div>
                          <Link to="/profile/orders" className="text-xs font-bold text-accent hover:underline font-bn-sans">
                            {lang === 'bn' ? 'বিস্তারিত ট্র্যাকিং' : 'View Tracking'} →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                id="profile-addresses-section"
                className="space-y-5 scroll-mt-24"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-xl text-primary">
                    {lang === 'bn' ? 'সংরক্ষিত ডেলিভারি ঠিকানা' : 'Saved Shipping Addresses'}
                  </h2>
                  <button
                    onClick={() => handleTabChange('overview', true, 'profile-personal-info')}
                    className="px-3.5 py-1.5 bg-accent text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Plus size={14} />
                    <span>{(user?.address || formData.address) ? (lang === 'bn' ? 'ঠিকানা পরিবর্তন' : 'Edit Address') : (lang === 'bn' ? 'ঠিকানা যোগ করুন' : 'Add Address')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(user?.address || formData.address) ? (
                    <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-5 space-y-3 shadow-xs relative sm:col-span-2 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-primary bg-white/80 border border-primary/20 px-2.5 py-0.5 rounded-full font-bn-sans shadow-2xs">
                          {lang === 'bn' ? 'ডিফল্ট ডেলিভারি ঠিকানা' : 'Primary Delivery Address'}
                        </span>
                        <CheckCircle2 size={16} className="text-primary" />
                      </div>

                      <h4 className="font-bold text-sm text-primary">{user?.name || formData.name}</h4>
                      <p className="text-xs text-muted font-bn-sans leading-relaxed">
                        {user?.address || formData.address}
                      </p>
                      <p className="text-xs text-primary font-bold font-bn-sans flex items-center gap-1.5 pt-2 border-t border-primary/20">
                        <Phone size={13} className="text-accent" /> {n(user?.phone || formData.phone)}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-dashed border-primary/40 rounded-3xl p-8 text-center space-y-3 sm:col-span-2 shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-white/80 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-2xs">
                        <MapPin size={22} className="text-accent" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-primary">
                        {lang === 'bn' ? 'কোনো সংরক্ষিত ঠিকানা নেই' : 'No Saved Address Yet'}
                      </h4>
                      <p className="text-xs text-muted font-bn-sans max-w-xs mx-auto">
                        {lang === 'bn' ? 'দ্রুত চেকআউট ও পণ্য ডেলিভারির সুবিধার্থে আপনার ঠিকানা যুক্ত করুন।' : 'Add your primary home delivery address for seamless checkout.'}
                      </p>
                      <Button
                        onClick={() => handleTabChange('overview', true, 'profile-personal-info')}
                        variant="accent"
                        size="sm"
                        className="rounded-xl font-bold"
                      >
                        <Plus size={14} />
                        <span>{lang === 'bn' ? 'ঠিকানা যোগ করুন' : 'Add Delivery Address'}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 4: REWARDS & ECO CLUB BENEFITS */}
            {activeTab === 'rewards' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                id="profile-rewards-section"
                className="space-y-6 scroll-mt-24"
              >
                {/* Eco Club Membership Card */}
                <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#2D5A43] via-[#1B3B2B] to-[#10241A] text-white border-2 border-amber-400/50 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 mb-2">
                        <Award size={15} />
                        <span>{lang === 'bn' ? 'প্রকৃতি বার্তা ইকো ক্লাব' : 'Prokriti Barta Eco Club'}</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white">
                        {lang === 'bn' ? 'ইকো ক্লাব সদস্য সুবিধাসমূহ' : 'Eco Club Privileges'}
                      </h3>
                      <p className="text-xs text-white/80 font-bn-sans mt-1">
                        {orders.length > 0 
                          ? (lang === 'bn' ? `আপনার কেনাকাটায় মোট ${n(ecoPoints)} পয়েন্ট অর্জিত হয়েছে` : `You have earned ${n(ecoPoints)} points on your orders`)
                          : (lang === 'bn' ? 'প্রতিটি অর্ডারে ১০% হারে অর্গানিক রিওয়ার্ড পয়েন্ট অর্জন করুন' : 'Earn 10% eco points on every order you place')}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center shrink-0">
                      <span className="text-[10px] text-white/70 block uppercase font-bold">{lang === 'bn' ? 'রিওয়ার্ড ব্যালেন্স' : 'Points Balance'}</span>
                      <span className="font-display font-bold text-2xl text-amber-300">{n(ecoPoints)} Pts</span>
                    </div>
                  </div>

                  {/* Benefit perks grid */}
                  <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bn-sans">
                    <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-2xl border border-white/10">
                      <Truck size={17} className="text-emerald-400 shrink-0" />
                      <span>{lang === 'bn' ? '৳১০০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free delivery on ৳1000+'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-2xl border border-white/10">
                      <Gift size={17} className="text-amber-300 shrink-0" />
                      <span>{lang === 'bn' ? 'অর্ডার প্রতি ১০% রিওয়ার্ড পয়েন্ট' : '10% Eco Reward Points'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-2xl border border-white/10">
                      <Clock size={17} className="text-teal-300 shrink-0" />
                      <span>{lang === 'bn' ? 'অগ্রাধিকার ভিত্তিতে দ্রুত শিপিং' : 'Priority Same-Day Dispatch'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </motion.div>
  );
}
