import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const profileData = {
    name: user?.name || (lang === 'bn' ? 'সাব্বির রহমান' : 'Sabbir Rahman'),
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+880 1717-279166',
    address: 'House 42, Road 11, Block D, Banani, Dhaka-1213',
    memberSince: 'January 2026'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-3xl text-primary mb-6">
          {t('profile.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Account Menu Navigation */}
          <div className="lg:col-span-4">
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-line">
                <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center font-bold text-xl">
                  {profileData.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-primary">{profileData.name}</h3>
                  <p className="text-xs text-muted">{profileData.email}</p>
                </div>
              </div>

              <nav className="space-y-1 text-xs font-semibold">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-accent/15 text-accent rounded-xl">
                  <User size={16} /> {lang === 'bn' ? 'প্রোফাইল তথ্য' : 'Profile Information'}
                </Link>
                <Link to="/profile/orders" className="flex items-center gap-3 px-4 py-3 text-ink hover:bg-bg rounded-xl transition-colors">
                  <Package size={16} /> {t('profile.orders')}
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-ink hover:bg-bg rounded-xl transition-colors">
                  <Heart size={16} /> {t('btn.wishlist')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Profile Details Box */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
                {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bn-sans">
                <div>
                  <span className="text-muted font-bold block mb-1">{t('register.name')}:</span>
                  <p className="font-bold text-primary text-sm">{profileData.name}</p>
                </div>
                <div>
                  <span className="text-muted font-bold block mb-1">{t('register.phone')}:</span>
                  <p className="font-bold text-primary text-sm flex items-center gap-1.5">
                    <Phone size={14} className="text-accent" /> {profileData.phone}
                  </p>
                </div>
                <div>
                  <span className="text-muted font-bold block mb-1">{t('login.email')}:</span>
                  <p className="font-bold text-primary text-sm flex items-center gap-1.5">
                    <Mail size={14} className="text-accent" /> {profileData.email}
                  </p>
                </div>
                <div>
                  <span className="text-muted font-bold block mb-1">{lang === 'bn' ? 'মেম্বারশিপ শুরু:' : 'Member Since:'}</span>
                  <p className="font-bold text-primary text-sm">{profileData.memberSince}</p>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-line">
                  <span className="text-muted font-bold block mb-1">{lang === 'bn' ? 'ডিফল্ট ডেলিভারি এড্রেস:' : 'Default Shipping Address:'}</span>
                  <p className="font-bold text-primary text-sm flex items-start gap-1.5">
                    <MapPin size={16} className="text-accent shrink-0 mt-0.5" /> {profileData.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
