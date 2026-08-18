import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowLeft, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaLoader from '../components/ui/AlponaLoader';

export default function Checkout() {
  const { cart, subtotal, deliveryCharge, total, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const { t, n, lang } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    division: 'Dhaka',
    address: user?.address || '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
        address: prev.address || user.address || ''
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalVal = name === 'phone' ? value.replace(/\D/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: finalVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const isValidBDMobile = /^01[3-9]\d{8}$/.test(cleanedPhone);

    if (!formData.name.trim()) {
      newErrors.name = lang === 'bn' ? 'দয়া করে আপনার পূর্ণ নাম লিখুন' : 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = lang === 'bn' ? 'দয়া করে আপনার ফোন নম্বর লিখুন' : 'Please enter your phone number';
    } else if (cleanedPhone.length !== 11) {
      newErrors.phone = lang === 'bn' 
        ? `ফোন নম্বরটি অবশ্যই ঠিক ১১ ডিজিটের হতে হবে (আপনি ${cleanedPhone.length} ডিজিট দিয়েছেন)` 
        : `Phone number must be exactly 11 digits (you entered ${cleanedPhone.length} digits)`;
    } else if (!isValidBDMobile) {
      newErrors.phone = lang === 'bn'
        ? 'অবৈধ মোবাইল নম্বর। ০১ দিয়ে শুরু হওয়া ১১ ডিজিটের সঠিক নম্বর দিন (যেমন: ০১৭১৭২৭৯১৬৬)'
        : 'Invalid mobile number. Must start with 013-019 and have exactly 11 digits';
    }
    if (!formData.address.trim()) {
      newErrors.address = lang === 'bn' ? 'দয়া করে পূর্ণ ডেলিভারি ঠিকানা লিখুন' : 'Please enter your full delivery address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const orderId = `PB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const cleanedPhone = formData.phone.replace(/\D/g, '');

      const newOrder = {
        id: orderId,
        userId: user?.id || null,
        userEmail: (user?.email || formData.email || '').toLowerCase(),
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
          name: formData.name.trim(),
          phone: cleanedPhone,
          email: (user?.email || formData.email || '').toLowerCase(),
          address: formData.address.trim(),
          city: formData.division
        }
      };

      try {
        const existing = JSON.parse(localStorage.getItem('pb_orders') || '[]');
        localStorage.setItem('pb_orders', JSON.stringify([newOrder, ...existing]));
      } catch (err) {
        console.error('Failed to store order in localStorage:', err);
      }

      // Auto-save user shipping details to their profile if not present
      if (user && updateUser) {
        updateUser({
          name: user.name || formData.name.trim(),
          phone: user.phone || cleanedPhone,
          address: user.address || formData.address.trim(),
          city: formData.division
        });
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

        <form onSubmit={handleSubmitOrder} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Details & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping Info Form */}
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line flex items-center gap-2">
                <Truck size={20} className="text-accent" /> {t('checkout.shipping')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-ink mb-1">{t('checkout.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('checkout.nameHolder')}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border ${errors.name ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-accent-2 font-bold mt-1.5 flex items-center gap-1 font-bn-sans">
                      <AlertCircle size={13} className="shrink-0 text-accent-2" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">{t('checkout.phone')} *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('checkout.phoneHolder')}
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border ${errors.phone ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-accent-2 font-bold mt-1.5 flex items-center gap-1 font-bn-sans">
                      <AlertCircle size={13} className="shrink-0 text-accent-2" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
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
                  <label className="block font-bold text-ink mb-1">{t('checkout.address')} *</label>
                  <textarea
                    rows="3"
                    name="address"
                    placeholder={t('checkout.addressHolder')}
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full bg-bg text-ink px-3.5 py-2.5 rounded-xl border ${errors.address ? 'border-accent-2/80 bg-accent-2/5' : 'border-line focus:border-accent'} outline-none transition-colors resize-none`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-accent-2 font-bold mt-1.5 flex items-center gap-1 font-bn-sans">
                      <AlertCircle size={13} className="shrink-0 text-accent-2" />
                      <span>{errors.address}</span>
                    </p>
                  )}
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

              <div className="space-y-3">
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

              <div className="pt-3 flex justify-center">
                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  className="px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 gap-2 min-w-[180px] mx-auto cursor-pointer"
                >
                  <span>{t('checkout.placeOrder')}</span>
                  <CheckCircle2 size={16} />
                </Button>
              </div>

              <p className="text-[11px] text-muted text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck size={14} className="text-accent" /> {t('checkout.guarantee')}
              </p>
            </div>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
