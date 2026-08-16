import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Sparkles, LogIn, UserPlus, LogOut, LayoutGrid, Phone, ShieldCheck, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import categories from '../../data/categories.json';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { itemCount, openCart, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { t, n, lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.shop', path: '/shop' },
    { key: 'nav.offers', path: '/offers', badge: 'DEALS' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.blog', path: '/blog' },
    { key: 'nav.contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface border-b border-line shadow-xs transition-colors">
      {/* 1. Top Announcement Bar */}
      <div className="bg-primary text-surface text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-accent">
              <Phone size={13} />
              <span className="text-surface font-mono text-[11px] sm:text-xs">{n('+880 1712-345678')}</span>
            </span>
            <span className="hidden md:inline text-surface/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-surface/90">
              <Sparkles size={13} className="text-accent" />
              {t('nav.announcement')}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* 2. Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-ink hover:bg-bg rounded-xl transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img
              src="/PB.jpg"
              alt="Prokriti Barta Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-2xl text-primary tracking-tight leading-none">
                {lang === 'bn' ? 'প্রকৃতি বার্তা' : 'Prokriti Barta'}
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest text-muted uppercase font-sans font-semibold mt-0.5">
                {lang === 'bn' ? '১০০% খাঁটি জৈব পণ্য' : 'PURE ORGANIC HARVEST'}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-lg mx-6 relative">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder={t('nav.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg text-ink text-xs sm:text-sm px-4 py-2.5 pl-10 pr-10 rounded-full border border-line focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20 transition-all outline-none"
            />
            <Search size={17} className="absolute left-3.5 text-muted pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-muted hover:text-ink text-xs font-bold"
              >
              <X size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Right: User Actions (Wishlist, Cart Pill, Auth) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Wishlist Icon Button */}
          <Link
            to="/wishlist"
            className="p-2 sm:p-2.5 rounded-2xl text-ink hover:bg-bg border border-transparent hover:border-line transition-all relative"
            title="Wishlist"
          >
            <Heart size={20} className="text-ink" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-2 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {n(wishlistCount)}
              </span>
            )}
          </Link>

          {/* Cart Pill Button */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-2xl transition-all group"
            title="Cart"
          >
            <div className="relative">
              <ShoppingBag size={19} className="text-primary group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {n(itemCount)}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col items-start leading-none text-left">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider">{t('nav.cart')}</span>
              <span className="text-xs font-mono font-bold text-primary">
                {subtotal > 0 ? `৳${n(subtotal)}` : (lang === 'bn' ? 'ফাঁকা' : 'Empty')}
              </span>
            </div>
          </button>

          {/* Mobile User Profile Quick Button (Mobile Only) */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="md:hidden p-1.5 hover:bg-bg rounded-xl border border-line transition-colors"
              title="My Profile"
            >
              <div className="w-7 h-7 rounded-lg bg-accent text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </Link>
          ) : null}

          {/* Desktop User Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-line">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1.5 hover:bg-bg rounded-2xl border border-transparent hover:border-line transition-colors"
                title="My Account"
              >
                <div className="w-8 h-8 rounded-xl bg-accent text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden xl:inline text-xs font-bold text-primary line-clamp-1">{user?.name}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-muted hover:text-accent-2 transition-colors"
                title={t('nav.logout')}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-line">
              <Link to="/login">
                <button className="px-3.5 py-2 text-xs font-bold text-primary hover:bg-bg rounded-xl transition-colors flex items-center gap-1.5">
                  <LogIn size={15} /> {t('nav.signin')}
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-accent text-white hover:bg-accent/90 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm">
                  <UserPlus size={15} /> {t('nav.signup')}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 2.1 Mobile Search Bar Row (Mobile Only) */}
      <div className="px-3 pb-2.5 pt-0.5 md:hidden border-t border-line/30 bg-surface">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            placeholder={t('nav.search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg text-ink text-xs px-3.5 py-2 pl-9 pr-8 rounded-full border border-line focus:border-accent focus:bg-surface focus:ring-1 focus:ring-accent/20 transition-all outline-none"
          />
          <Search size={15} className="absolute left-3 text-muted pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-muted hover:text-ink text-xs font-bold"
            >
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      {/* 3. Navigation Sub-Bar (Desktop Category Button + Links) */}
      <nav className="hidden md:block border-t border-line bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Category Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(prev => !prev)}
                className="py-2.5 px-5 bg-primary text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-t-xl hover:bg-primary/95 transition-all shadow-xs"
              >
                <LayoutGrid size={15} className="text-accent" />
                <span>{t('nav.categories')}</span>
                <ChevronDown size={15} className={`transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {categoryDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                  className="absolute top-full left-0 w-64 bg-surface border border-line rounded-b-2xl shadow-xl z-50 py-2 animate-fadeIn"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.slug}`}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-ink hover:bg-bg hover:text-accent font-semibold transition-colors"
                    >
                      <span className="font-bn-sans">{lang === 'bn' ? cat.bnName : cat.name}</span>
                      <span className="text-[10px] text-muted font-mono bg-bg px-2 py-0.5 rounded-full border border-line">
                        {n(cat.itemCount)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Links naturally spaced next to Category Button */}
            <div className="flex items-center gap-7 text-xs font-bold uppercase tracking-wider">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-3 transition-colors relative flex items-center gap-1.5 ${
                      isActive ? 'text-accent font-bold' : 'text-ink/80 hover:text-primary'
                    }`}
                  >
                    <span>{t(link.key)}</span>
                    {link.badge && (
                      <span className="text-[9px] bg-accent-2 text-white px-1.5 py-0.2 rounded font-bold">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Trust Badge Highlight */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-muted">
            <ShieldCheck size={16} className="text-primary" />
            <span>{lang === 'bn' ? '১০০% প্রিজারভেটিভ-মুক্ত জৈব পণ্য' : '100% Chemical-Free Guarantee'}</span>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-ink/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-surface h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <span className="font-display font-bold text-lg text-primary">{t('nav.menu')}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted hover:text-ink">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Auth status */}
            {!isAuthenticated ? (
              <div className="my-4 flex gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 bg-bg border border-line rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1.5 hover:bg-line/20">
                    <LogIn size={15} /> {t('nav.signin')}
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2.5 bg-accent text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-accent/90">
                    <UserPlus size={15} /> {t('nav.signup')}
                  </button>
                </Link>
              </div>
            ) : (
              <div className="my-4 p-3 bg-bg rounded-xl flex items-center justify-between border border-line">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent text-white font-bold flex items-center justify-center text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-primary">{user?.name}</p>
                    <p className="text-[10px] text-muted">{user?.email}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-xs text-accent-2 font-bold px-2 py-1 bg-surface border border-line rounded-lg">{t('nav.logout')}</button>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-3 font-medium my-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-ink hover:text-accent border-b border-line/40 flex items-center justify-between font-bn-sans text-sm"
                >
                  <span>{t(link.key)}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-accent-2 text-white px-1.5 py-0.5 rounded font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Categories */}
            <div className="mt-4 pt-4 border-t border-line">
              <h4 className="text-xs uppercase tracking-wider text-muted font-bold mb-3">{t('nav.categories.mobile')}</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-ink hover:text-accent py-1.5 border-b border-line/20 font-bn-sans"
                  >
                    {lang === 'bn' ? cat.bnName : cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
