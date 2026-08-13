import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaLoader from '../components/ui/AlponaLoader';

export default function Checkout() {
  const { cart, subtotal, deliveryCharge, total, clearCart } = useCart();
  const { t, n, lang } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    division: 'Dhaka',
    address: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setLoading(true);

    setTimeout(() => {
      const orderId = `PB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'mbanking' ? 'Mobile Banking (bKash/Nagad)' : 'Card Payment',
        items: cart.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity
        })),
        subtotal,
        deliveryCharge,
        total,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.division
        }
      };

      try {
        const existing = JSON.parse(localStorage.getItem('pb_orders') || '[]');
        localStorage.setItem('pb_orders', JSON.stringify([newOrder, ...existing]));
      } catch (err) {
        console.error('Failed to store order in localStorage:', err);
      }

      clearCart();
      setLoading(false);
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 1500);
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-bg py-16 text-center px-4">
        <h1 className="font-display font-bold text-2xl text-primary mb-2">
          {lang === 'bn' ? 'চেকআউটের জন্য কোনো পণ্য নেই' : 'No items in cart for checkout'}
        </h1>
        <p className="text-xs text-muted mb-6">
          {lang === 'bn' ? 'আপনার কার্টে প্রথমে পণ্য যুক্ত করুন।' : 'Please add items to your cart first.'}
        </p>
        <Link to="/shop"><Button variant="accent">{t('btn.goToShop')}</Button></Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <AlponaLoader text={lang === 'bn' ? 'আপনার অর্ডার প্রসেস করা হচ্ছে...' : 'Processing your order...'} size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent mb-4">
          <ArrowLeft size={15} /> {lang === 'bn' ? 'কার্ট পেজে ফেরত যান' : 'Back to Cart'}
        </Link>

        <h1 className="font-display font-bold text-3xl text-primary mb-6">
          {t('checkout.title')}
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Details & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping Info Form */}
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line flex items-center gap-2">
                <Truck size={20} className="text-accent" /> {t('checkout.shipping')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-ink mb-1">{t('checkout.name')}</label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder={t('checkout.nameHolder')}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('checkout.phone')}</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder={t('checkout.phoneHolder')}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-ink mb-1">{t('login.email')} ({lang === 'bn' ? 'ঐচ্ছিক' : 'Optional'})</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('checkout.district')}</label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className="w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  >
                    <option value="Dhaka">Dhaka (ঢাকা)</option>
                    <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                    <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                    <option value="Khulna">Khulna (খুলনা)</option>
                    <option value="Barisal">Barisal (বরিশাল)</option>
                    <option value="Rangpur">Rangpur (রংপুর)</option>
                    <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-ink mb-1">{t('checkout.address')}</label>
                  <textarea
                    required
                    rows="3"
                    name="address"
                    placeholder={t('checkout.addressHolder')}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line flex items-center gap-2">
                <CreditCard size={20} className="text-accent" /> {t('checkout.payment.title')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'cod'
                      ? 'bg-accent/15 border-accent text-accent font-bold shadow-xs'
                      : 'bg-bg border-line text-ink hover:border-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote size={24} />
                    <input type="radio" name="pm" checked={paymentMethod === 'cod'} onChange={() => {}} className="accent-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{t('checkout.cod')}</h4>
                    <p className="text-[10px] text-muted font-normal mt-0.5">{t('checkout.payment.codDesc')}</p>
                  </div>
                </label>

                {/* Mobile Banking */}
                <label
                  onClick={() => setPaymentMethod('mbanking')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'mbanking'
                      ? 'bg-accent/15 border-accent text-accent font-bold shadow-xs'
                      : 'bg-bg border-line text-ink hover:border-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Smartphone size={24} />
                    <input type="radio" name="pm" checked={paymentMethod === 'mbanking'} onChange={() => {}} className="accent-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{t('checkout.payment.bkash')}</h4>
                    <p className="text-[10px] text-muted font-normal mt-0.5">{t('checkout.payment.bkashDesc')}</p>
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'card'
                      ? 'bg-accent/15 border-accent text-accent font-bold shadow-xs'
                      : 'bg-bg border-line text-ink hover:border-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard size={24} />
                    <input type="radio" name="pm" checked={paymentMethod === 'card'} onChange={() => {}} className="accent-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{lang === 'bn' ? 'কার্ড পেমেন্ট' : 'Card Payment'}</h4>
                    <p className="text-[10px] text-muted font-normal mt-0.5">{lang === 'bn' ? 'ডেবিট বা ক্রেডিট কার্ড' : 'Debit or Credit Card'}</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Summary & Final Submit (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 sticky top-24">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line">
                {t('checkout.orderSummary')}
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-line" />
                      <div>
                        <p className="font-bold text-primary line-clamp-1">
                          {lang === 'bn' ? (product.bnName || product.name) : product.name}
                        </p>
                        <p className="text-muted font-mono">x{n(quantity)}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-ink">৳{n(product.price * quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-line space-y-2 text-xs">
                <div className="flex justify-between text-muted">
                  <span>{t('cart.summary.subtotal')}</span>
                  <span className="font-mono font-bold text-ink">৳{n(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>{t('cart.summary.delivery')}</span>
                  <span className="font-mono font-bold text-ink">{deliveryCharge === 0 ? t('cart.summary.free') : `৳${n(deliveryCharge)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-line">
                  <span>{t('cart.summary.total')}</span>
                  <span className="font-display text-xl text-accent">৳{n(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full shadow-md mt-4"
              >
                {t('checkout.placeOrder')}
              </Button>

              <p className="text-[11px] text-muted text-center flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-accent" /> {t('checkout.guarantee')}
              </p>
            </div>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
