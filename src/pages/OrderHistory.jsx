import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Calendar, 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Search, 
  ExternalLink, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  ReceiptText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Processing' | 'Delivered'
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { t, n, lang } = useLanguage();

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

  const filteredOrders = orders.filter(ord => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchesSearch = searchQuery.trim() === '' || 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.items?.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalSpent = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const processingCount = orders.filter(o => o.status !== 'Delivered').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between">
          <Link 
            to="/profile" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface border border-line hover:border-primary/40 text-xs sm:text-sm font-bold text-ink hover:text-primary transition-all shadow-xs"
          >
            <ArrowLeft size={16} className="text-accent" />
            <span>{lang === 'bn' ? 'প্রোফাইল ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}</span>
          </Link>

          <Link to="/shop">
            <Button variant="accent" size="sm" className="rounded-2xl font-bold shadow-xs">
              <ShoppingBag size={15} />
              <span>{lang === 'bn' ? 'নতুন কেনাকাটা' : 'Continue Shopping'}</span>
            </Button>
          </Link>
        </div>

        {/* 1. Gorgeous Brand Hero Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-[#1c4230] to-[#0f2319] text-white p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(27,59,43,0.4)] border-2 border-primary/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-accent font-bn-sans">
                <ReceiptText size={14} />
                <span>{lang === 'bn' ? 'অর্ডার ট্র্যাকিং ও ইতিহাস' : 'Order History & Real-Time Tracking'}</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-4xl text-white">
                {t('orders.title')}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 font-bn-sans max-w-xl">
                {lang === 'bn' 
                  ? 'আপনার সম্পন্ন ও প্রক্রিয়াধীন সকল অর্গানিক অর্ডারের বিস্তারিত তথ্য এবং ডেলিভারি স্ট্যাটাস।' 
                  : 'Track your organic purchases, live delivery updates, and view invoices seamlessly.'}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-2xl text-center min-w-[90px] sm:min-w-[110px]">
                <span className="text-[10px] text-white/70 block uppercase font-bold">{lang === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}</span>
                <span className="font-display font-bold text-lg sm:text-2xl text-white mt-0.5 block">{n(orders.length)}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-2xl text-center min-w-[90px] sm:min-w-[110px]">
                <span className="text-[10px] text-white/70 block uppercase font-bold">{lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing'}</span>
                <span className="font-display font-bold text-lg sm:text-2xl text-amber-300 mt-0.5 block">{n(processingCount)}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-2xl text-center min-w-[90px] sm:min-w-[110px]">
                <span className="text-[10px] text-white/70 block uppercase font-bold">{lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}</span>
                <span className="font-display font-bold text-lg sm:text-2xl text-emerald-400 mt-0.5 block">{n(deliveredCount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Filter Tabs & Search Bar */}
        {orders.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border-2 border-line rounded-3xl p-4 sm:p-5 shadow-xs">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold font-bn-sans transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-bg text-ink hover:bg-line/60'
                }`}
              >
                {lang === 'bn' ? 'সকল অর্ডার' : 'All Orders'} ({n(orders.length)})
              </button>

              <button
                onClick={() => setFilterStatus('Processing')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold font-bn-sans transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === 'Processing'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-bg text-ink hover:bg-line/60'
                }`}
              >
                {lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing'} ({n(processingCount)})
              </button>

              <button
                onClick={() => setFilterStatus('Delivered')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold font-bn-sans transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === 'Delivered'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-bg text-ink hover:bg-line/60'
                }`}
              >
                {lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'} ({n(deliveredCount)})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={lang === 'bn' ? 'অর্ডার আইডি বা পণ্য খুঁজুন...' : 'Search by Order ID or Product...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg text-ink pl-9 pr-4 py-2 rounded-2xl border border-line focus:border-primary outline-none text-xs font-bn-sans transition-colors"
              />
            </div>
          </div>
        )}

        {/* 3. Orders List & Cards */}
        {orders.length === 0 ? (
          <div className="bg-surface border-2 border-line rounded-3xl p-12 sm:p-16 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <ShoppingBag size={30} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-xl text-primary">{t('orders.empty')}</h3>
            <p className="text-xs sm:text-sm text-muted font-bn-sans max-w-md mx-auto leading-relaxed">
              {lang === 'bn' 
                ? 'আপনার একাউন্টে এখনো কোনো অর্ডার করা হয়নি। আমাদের তাজা ও খাঁটি অর্গানিক পণ্য এখনই অর্ডার করুন।' 
                : 'You have not placed any orders yet. Discover our 100% natural and certified organic goods.'}
            </p>
            <Link to="/shop">
              <Button variant="accent" size="md" className="rounded-full font-bold mt-2 shadow-xs">
                <ShoppingBag size={16} />
                <span>{lang === 'bn' ? 'পণ্য কেনাকাটা শুরু করুন' : 'Explore Organic Shop'}</span>
              </Button>
            </Link>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-surface border-2 border-line rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <Filter size={32} className="mx-auto text-muted" />
            <h4 className="font-bold text-base text-primary">
              {lang === 'bn' ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি' : 'No matching orders found'}
            </h4>
            <p className="text-xs text-muted font-bn-sans">
              {lang === 'bn' ? 'অনুগ্রহ করে অন্য শব্দ দিয়ে অনুসন্ধান করুন।' : 'Try adjusting your search query or filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((ord) => {
              const isDelivered = ord.status === 'Delivered';

              return (
                <div 
                  key={ord.id} 
                  className="bg-surface border-2 border-line hover:border-primary/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs transition-all"
                >
                  {/* Card Header Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted font-bold uppercase tracking-wider font-mono">{t('orders.id')}:</span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-primary">{n(ord.id)}</h3>
                      </div>
                      <span className="text-xs text-muted flex items-center gap-1.5 font-bn-sans">
                        <Calendar size={14} className="text-accent" />
                        <span>{lang === 'bn' ? 'অর্ডারের তারিখ:' : 'Order Date:'} {n(ord.date)}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Pill */}
                      <span className={`px-3.5 py-1 rounded-full text-xs font-bold font-bn-sans flex items-center gap-1.5 shadow-2xs ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {isDelivered ? <CheckCircle2 size={14} className="text-emerald-700" /> : <Clock size={14} className="text-amber-700" />}
                        <span>{isDelivered ? (lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered') : (lang === 'bn' ? 'প্রক্রিয়াধীন' : 'Processing')}</span>
                      </span>

                      {/* Payment Method Badge */}
                      <span className="px-3 py-1 rounded-full text-xs font-medium font-bn-sans bg-bg border border-line text-ink flex items-center gap-1.5">
                        <CreditCard size={13} className="text-accent" />
                        <span>{ord.paymentMethod}</span>
                      </span>
                    </div>
                  </div>

                  {/* Delivery Stepper Progress Bar */}
                  <div className="bg-bg/60 border border-line rounded-2xl p-4 sm:p-5">
                    <div className="grid grid-cols-3 gap-2 relative">
                      <div className="text-center space-y-1 z-10">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-primary block font-bn-sans">{lang === 'bn' ? 'অর্ডার গৃহীত' : 'Confirmed'}</span>
                      </div>

                      <div className="text-center space-y-1 z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold shadow-xs ${
                          isDelivered ? 'bg-primary text-white' : 'bg-accent text-white animate-pulse'
                        }`}>
                          <Truck size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-primary block font-bn-sans">{lang === 'bn' ? 'প্রক্রিয়াধীন ও শিপিং' : 'Processing'}</span>
                      </div>

                      <div className="text-center space-y-1 z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold shadow-xs ${
                          isDelivered ? 'bg-emerald-600 text-white' : 'bg-line text-muted'
                        }`}>
                          <Package size={16} />
                        </div>
                        <span className={`text-[11px] font-bold block font-bn-sans ${isDelivered ? 'text-emerald-700' : 'text-muted'}`}>
                          {lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items List & Details Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left: Purchased Products List */}
                    <div className="lg:col-span-7 space-y-3">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider block font-bn-sans">
                        {lang === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ' : 'Ordered Products'} ({n(ord.items?.length || 0)})
                      </span>

                      <div className="space-y-2.5">
                        {ord.items?.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-bg/80 border border-line"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                {idx + 1}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-primary text-xs sm:text-sm truncate font-bn-sans">{item.name}</h4>
                                <span className="text-[11px] text-muted font-bn-sans">
                                  ৳{n(item.price)} × {n(item.quantity)}
                                </span>
                              </div>
                            </div>

                            <span className="font-bold font-bn-sans text-xs sm:text-sm text-primary shrink-0">
                              ৳{n(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Shipping Address & Cost Summary */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Shipping Address Pill */}
                      {ord.shippingAddress && (
                        <div className="p-4 rounded-2xl bg-bg/80 border border-line space-y-2">
                          <span className="text-[11px] font-bold text-accent uppercase tracking-wider block font-bn-sans flex items-center gap-1.5">
                            <MapPin size={13} />
                            <span>{lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Shipping Destination'}</span>
                          </span>
                          <p className="font-bold text-xs sm:text-sm text-primary font-bn-sans">{ord.shippingAddress.name}</p>
                          <p className="text-xs text-muted font-bn-sans leading-relaxed">{ord.shippingAddress.address}, {ord.shippingAddress.city}</p>
                          <p className="text-xs text-primary font-bold font-bn-sans flex items-center gap-1 pt-1 border-t border-line/60">
                            <Phone size={12} className="text-accent" /> {n(ord.shippingAddress.phone)}
                          </p>
                        </div>
                      )}

                      {/* Financial Cost Strip */}
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2 text-xs font-bn-sans">
                        <div className="flex justify-between text-muted">
                          <span>{t('cart.subtotal')}:</span>
                          <span className="font-bold text-primary">৳{n(ord.subtotal || ord.total)}</span>
                        </div>
                        {ord.deliveryCharge !== undefined && (
                          <div className="flex justify-between text-muted">
                            <span>{t('cart.delivery')}:</span>
                            <span className="font-bold text-primary">{ord.deliveryCharge === 0 ? (lang === 'bn' ? 'ফ্রি' : 'Free') : `৳${n(ord.deliveryCharge)}`}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-primary/20 flex justify-between items-center text-sm font-bold text-primary">
                          <span>{t('orders.total')}:</span>
                          <span className="text-base sm:text-lg text-accent font-display">৳{n(ord.total)}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </motion.div>
  );
}
