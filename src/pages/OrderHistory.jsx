import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Clock, CheckCircle2, Truck, ArrowLeft } from 'lucide-react';
import initialOrders from '../data/orders.json';
import { motion } from 'framer-motion';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pb_orders') || '[]');
      const combined = [...stored, ...initialOrders];
      setOrders(combined);
    } catch (e) {
      setOrders(initialOrders);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent mb-4">
          <ArrowLeft size={15} /> প্রোফাইলে ফেরত যান
        </Link>

        <h1 className="font-display font-bold text-3xl text-primary mb-6">
          আমার অর্ডার সমূহ (Order History)
        </h1>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-surface border border-line rounded-3xl p-6 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-2">
                <div>
                  <span className="text-xs text-muted font-mono">অর্ডার আইডি:</span>
                  <h3 className="font-display font-bold text-lg text-primary">{ord.id}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Calendar size={14} /> {ord.date}
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
                      {item.name} <span className="text-muted font-normal font-mono">x{item.quantity}</span>
                    </span>
                    <span className="font-mono font-bold text-primary">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-line flex justify-between items-center text-xs">
                <span className="text-muted">পেমেন্ট: <strong>{ord.paymentMethod}</strong></span>
                <span className="font-bold text-sm text-primary">
                  সর্বমোট: <strong className="font-display text-accent text-base">৳{ord.total}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
