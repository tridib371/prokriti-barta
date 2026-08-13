import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Truck, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaDivider from '../components/ui/AlponaDivider';
import { useLanguage } from '../context/LanguageContext';

export default function OrderSuccess() {
  const { id } = useParams();
  const location = useLocation();
  const { t, n, lang } = useLanguage();

  const order = location.state?.order || {
    id: id || 'PB-2026-9900',
    date: new Date().toISOString().split('T')[0],
    status: 'Confirmed',
    paymentMethod: 'Cash on Delivery',
    total: 1250,
    items: [],
    shippingAddress: { name: 'Customer', phone: '01700-000000', address: 'Dhaka' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12 flex items-center justify-center px-4"
    >
      <div className="max-w-xl w-full bg-surface border border-line rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-lg">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={48} />
        </div>

        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest font-mono">
            ORDER CONFIRMED
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-1">
            {t('success.heading')}
          </h1>
          <p className="text-xs text-muted font-bn-sans mt-2">
            {t('success.orderId')} <strong className="text-primary font-mono">{n(order.id)}</strong>
          </p>
        </div>

        <AlponaDivider className="my-2" />

        {/* Order Details Card */}
        <div className="bg-bg/60 border border-line rounded-2xl p-4 text-left text-xs space-y-3 font-bn-sans">
          <div className="flex justify-between items-center pb-2 border-b border-line">
            <span className="text-muted flex items-center gap-1"><Calendar size={14} /> {t('orders.date')}</span>
            <span className="font-bold text-primary font-mono">{n(order.date)}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-line">
            <span className="text-muted flex items-center gap-1"><Truck size={14} /> {t('checkout.payment.title')}</span>
            <span className="font-bold text-primary">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-line">
            <span className="text-muted flex items-center gap-1"><MapPin size={14} /> {t('checkout.address')}</span>
            <span className="font-bold text-primary max-w-[200px] text-right line-clamp-1">{order.shippingAddress?.address}</span>
          </div>

          <div className="flex justify-between items-center pt-1 font-bold text-sm text-primary">
            <span>{t('cart.summary.total')}</span>
            <span className="font-display text-accent text-lg">৳{n(order.total)}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/profile/orders" className="flex-1">
            <Button variant="secondary" size="md" className="w-full">
              {t('profile.orders')}
            </Button>
          </Link>
          <Link to="/shop" className="flex-1">
            <Button variant="accent" size="md" className="w-full">
              <ShoppingBag size={16} /> {t('btn.continueShopping')}
            </Button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
