import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent mb-4">
          <ArrowLeft size={15} /> {lang === 'bn' ? 'প্রোফাইলে ফেরত যান' : 'Back to Profile'}
        </Link>

        <h1 className="font-display font-bold text-3xl text-primary mb-6">
          {t('orders.title')}
        </h1>

        {orders.length === 0 ? (
          <div className="bg-surface border border-line rounded-3xl p-12 text-center space-y-3">
            <Package size={40} className="mx-auto text-muted" />
            <h3 className="font-bold text-lg text-primary">{t('orders.empty')}</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-2">
                  <div>
                    <span className="text-xs text-muted font-mono">{t('orders.id')}:</span>
                    <h3 className="font-display font-bold text-lg text-primary">{n(ord.id)}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Calendar size={14} /> {n(ord.date)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ord.status === 'Delivered'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-bn-sans">
                      <span className="font-semibold text-ink">
                        {item.name} <span className="text-muted font-normal font-mono">x{n(item.quantity)}</span>
                      </span>
                      <span className="font-mono font-bold text-primary">৳{n(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-line flex justify-between items-center text-xs">
                  <span className="text-muted">{lang === 'bn' ? 'পেমেন্ট:' : 'Payment:'} <strong>{ord.paymentMethod}</strong></span>
                  <span className="font-bold text-sm text-primary">
                    {t('orders.total')}: <strong className="font-display text-accent text-base">৳{n(ord.total)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}
