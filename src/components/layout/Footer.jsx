import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';
import categories from '../../data/categories.json';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { t, n, lang } = useLanguage();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError(lang === 'bn' ? 'দয়া করে একটি সঠিক ইমেইল এড্রেস লিখুন' : 'Please enter a valid email address');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      {/* 1. Value Badges Banner (Body Color) */}
      <section className="bg-bg border-t border-line py-8 transition-colors select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent shadow-[0_4px_14px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_12px_24px_-6px_rgba(232,152,20,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{t('footer.pure.title')}</h4>
                <p className="text-xs text-ink/75 font-bn-sans">{t('footer.pure.sub')}</p>
              </div>
            </div>

            <div className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent shadow-[0_4px_14px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_12px_24px_-6px_rgba(232,152,20,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{t('footer.cod.title')}</h4>
                <p className="text-xs text-ink/75 font-bn-sans">{t('footer.cod.sub')}</p>
              </div>
            </div>

            <div className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent shadow-[0_4px_14px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_12px_24px_-6px_rgba(232,152,20,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{t('footer.return.title')}</h4>
                <p className="text-xs text-ink/75 font-bn-sans">{t('footer.return.sub')}</p>
              </div>
            </div>

            <div className="group relative flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent shadow-[0_4px_14px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_12px_24px_-6px_rgba(232,152,20,0.2)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{t('footer.support.title')}</h4>
                <Link to="/contact" className="text-xs text-accent font-bold hover:underline">
                  {n('+880 1717-279166')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Deep Forest Green Footer */}
      <footer className="bg-primary text-white relative overflow-hidden select-none">
        
        {/* Ambient Decorative Lighting Blurs */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl pointer-events-none" />

        {/* Main Footer Content Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
              <img
                src="/PB.jpg"
                alt="Prokriti Barta Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display font-bold text-2xl text-white block leading-tight">
                {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}
              </span>
              <span className="text-[10px] text-accent uppercase font-bold tracking-wider font-bn-sans">
                {lang === 'bn' ? 'বিশুদ্ধতাই সুস্থতার বার্তা' : 'Pure Organic Living'}
              </span>
            </div>
          </Link>

          <p className="text-xs text-white/75 leading-relaxed max-w-sm font-bn-sans">
            {t('footer.brand.desc')}
          </p>

          <div className="space-y-2 text-xs text-white/80 font-bn-sans pt-1">
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-accent shrink-0" /> {t('footer.address')}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={15} className="text-accent shrink-0" /> support@prokritibarta.com
            </p>
          </div>

          <div className="pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 text-white text-xs font-bold hover:bg-accent hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Phone size={13} className="text-accent" />
              <span>{lang === 'bn' ? 'হেল্পলাইন:' : 'Helpline:'} {n('+880 1717-279166')}</span>
            </Link>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="font-display font-bold text-sm text-white mb-4 pb-1.5 border-b-2 border-accent inline-block">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li><Link to="/about" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('nav.about')}</Link></li>
            <li><Link to="/shop" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('nav.shop')}</Link></li>
            <li><Link to="/offers" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('nav.offers')}</Link></li>
            <li><Link to="/delivery" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('delivery.title')}</Link></li>
            <li><Link to="/blog" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('nav.blog')}</Link></li>
            <li><Link to="/contact" className="hover:text-accent hover:translate-x-1 inline-block transition-transform">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        {/* Organic Categories */}
        <div>
          <h4 className="font-display font-bold text-sm text-white mb-4 pb-1.5 border-b-2 border-accent inline-block">
            {t('footer.categories')}
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80 font-bn-sans">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link to={`/shop?category=${cat.slug}`} className="hover:text-accent hover:translate-x-1 inline-block transition-transform">
                  {lang === 'bn' ? cat.bnName : cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-display font-bold text-sm text-white mb-4 pb-1.5 border-b-2 border-accent inline-block">
            {t('footer.newsletter')}
          </h4>
          <p className="text-xs text-white/75 mb-3 font-bn-sans leading-relaxed">
            {t('footer.newsletter.desc')}
          </p>

          {subscribed ? (
            <div className="bg-accent/20 border border-accent/40 p-3 rounded-2xl flex items-center gap-2 text-xs text-accent font-bold">
              <CheckCircle size={16} /> {t('footer.newsletter.success')}
            </div>
          ) : (
            <form onSubmit={handleNewsletter} noValidate className="flex flex-col items-center gap-2 w-full">
              <div className="w-full">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full bg-white/10 text-white placeholder-white/50 text-xs px-3.5 py-2.5 rounded-xl border ${emailError ? 'border-accent-2/80 bg-accent-2/10' : 'border-white/20 focus:border-accent focus:bg-white/15'} outline-none transition-all`}
                />
                {emailError && (
                  <p className="text-[11px] text-accent font-bold mt-1 text-center font-bn-sans">
                    {emailError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-2 bg-accent text-white hover:bg-accent/90 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer"
              >
                <span>{t('footer.newsletter.btn')}</span>
                <Send size={13} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Methods */}
      <div className="border-t border-white/10 bg-black/30 py-5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© {n(new Date().getFullYear())} {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}. {t('footer.rights')}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-wider">
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">bKash</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">Nagad</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">Rocket</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">Visa</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">Mastercard</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-md text-white/90">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
