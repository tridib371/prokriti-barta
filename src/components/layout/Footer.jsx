import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import AlponaDivider from '../ui/AlponaDivider';
import categories from '../../data/categories.json';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t, n, lang } = useLanguage();

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
              <h4 className="font-bold text-sm text-primary">{t('footer.pure.title')}</h4>
              <p className="text-xs text-muted">{t('footer.pure.sub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{t('footer.cod.title')}</h4>
              <p className="text-xs text-muted">{t('footer.cod.sub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{t('footer.return.title')}</h4>
              <p className="text-xs text-muted">{t('footer.return.sub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{t('footer.support.title')}</h4>
              <p className="text-xs text-muted">{n('+880 1712-345678')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/PB.jpg"
              alt="Prokriti Barta Logo"
              className="w-10 h-10 object-contain drop-shadow-xs"
            />
            <span className="font-display font-bold text-xl text-primary">
              {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}
            </span>
          </Link>
          <p className="text-xs text-muted leading-relaxed max-w-sm font-bn-sans">
            {t('footer.brand.desc')}
          </p>
          <div className="space-y-1.5 text-xs text-muted">
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> {t('footer.address')}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-accent" /> support@prokritibarta.com
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li><Link to="/about" className="hover:text-accent transition-colors">{t('nav.about')}</Link></li>
            <li><Link to="/shop" className="hover:text-accent transition-colors">{t('nav.shop')}</Link></li>
            <li><Link to="/offers" className="hover:text-accent transition-colors font-semibold text-accent-2">{t('nav.offers')}</Link></li>
            <li><Link to="/delivery" className="hover:text-accent transition-colors">{t('delivery.title')}</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">{t('nav.blog')}</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">{t('footer.categories')}</h4>
          <ul className="space-y-2 text-xs text-muted">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link to={`/shop?category=${cat.slug}`} className="hover:text-accent transition-colors">
                  {lang === 'bn' ? cat.bnName : cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display font-bold text-sm text-primary mb-4">{t('footer.newsletter')}</h4>
          <p className="text-xs text-muted mb-3">{t('footer.newsletter.desc')}</p>

          {subscribed ? (
            <div className="bg-accent/15 border border-accent/30 p-3 rounded-xl flex items-center gap-2 text-xs text-accent font-medium">
              <CheckCircle size={16} /> {t('footer.newsletter.success')}
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg text-ink text-xs px-3.5 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-surface hover:bg-primary/90 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                {t('footer.newsletter.btn')} <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="border-t border-line/60 bg-bg/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {n(new Date().getFullYear())} {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}. {t('footer.rights')}</p>
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
