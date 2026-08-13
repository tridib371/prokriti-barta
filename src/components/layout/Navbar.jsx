import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Sparkles, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import categories from '../../data/categories.json';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
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
    { name: 'হোম (Home)', path: '/' },
    { name: 'শপ (Shop)', path: '/shop' },
    { name: 'অফারসমুহ (Offers)', path: '/offers', badge: 'DEALS' },
    { name: 'আমাদের কথা (About)', path: '/about' },
    { name: 'ব্লগ (Blog)', path: '/blog' },
    { name: 'যোগাযোগ (Contact)', path: '/contact' },
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-line transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-surface text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="flex items-center gap-1">
          <Sparkles size={14} className="text-accent animate-spin" style={{ animationDuration: '6s' }} />
          ১০০০ টাকার যেকোনো অর্ডারে সারা বাংলাদেশে ডেলিভারি একদম ফ্রি!
        </span>
        <span className="hidden sm:inline text-surface/40">|</span>
        <span className="hidden sm:inline">হেল্পলাইন: +880 1712-345678</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-ink hover:bg-bg rounded-xl transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4 C14 12, 14 28, 20 36 C26 28, 26 12, 20 4 Z" fill="currentColor" opacity="0.9" />
                <path d="M4 20 C12 14, 28 14, 36 20 C28 26, 12 26, 4 20 Z" fill="currentColor" opacity="0.9" />
                <circle cx="20" cy="20" r="3" fill="#1F3A2E" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl sm:text-2xl text-primary tracking-tight leading-tight">
                প্রকৃতি বার্তা
              </span>
              <span className="text-[10px] tracking-widest text-muted uppercase font-sans font-medium">
                Prokriti-Barta
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="খুঁজুন... (যেমন: মধু, ঘি, চা, তেল)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg text-ink text-sm px-4 py-2.5 pl-10 pr-10 rounded-full border border-line focus:border-accent focus:bg-surface transition-all outline-none"
          />
          <Search size={18} className="absolute left-3.5 top-3 text-muted" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-muted hover:text-ink text-xs"
            >
              ✕
            </button>
          )}
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          <Link
            to="/wishlist"
            className="p-2.5 rounded-xl text-ink hover:bg-bg transition-colors relative"
            title="Wishlist"
          >
            <Heart size={21} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent-2 text-surface text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="p-2.5 rounded-xl text-ink hover:bg-bg transition-colors relative flex items-center gap-1.5"
            title="Cart"
          >
            <div className="relative">
              <ShoppingBag size={21} className="text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-accent text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-primary">কার্ট</span>
          </button>

          {/* User Auth Buttons / Profile Avatar */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-line/60">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1.5 hover:bg-bg rounded-xl transition-colors"
                title="My Account"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden xl:inline text-xs font-bold text-primary line-clamp-1">{user?.name}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-muted hover:text-accent-2 transition-colors hidden sm:block"
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 pl-2">
              <Link to="/login">
                <button className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-bg rounded-xl transition-colors hidden sm:flex items-center gap-1">
                  <LogIn size={15} /> সাইন ইন
                </button>
              </Link>
              <Link to="/register">
                <button className="px-3 py-1.5 bg-accent text-ink hover:bg-accent/90 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shadow-xs">
                  <UserPlus size={15} /> সাইন আপ
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav className="hidden md:block border-t border-line/60 bg-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm">
          {/* Category Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(prev => !prev)}
              className="py-2.5 px-4 bg-primary text-surface font-medium flex items-center gap-2 rounded-t-xl hover:bg-primary/90 transition-colors"
            >
              <span>ক্যাটাগরি সমূহ</span>
              <ChevronDown size={16} className={`transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Dropdown */}
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
                    className="flex items-center justify-between px-4 py-2.5 text-ink hover:bg-bg hover:text-accent transition-colors"
                  >
                    <span className="font-bn-sans">{cat.bnName}</span>
                    <span className="text-[11px] text-muted">{cat.itemCount} items</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2.5 transition-colors relative flex items-center gap-1.5 ${
                    isActive ? 'text-accent font-semibold' : 'text-ink hover:text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-accent-2 text-surface px-1.5 py-0.2 rounded font-bold">
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
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-ink/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-surface h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <span className="font-display font-bold text-lg text-primary">মেন্যু (Menu)</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Auth status */}
            {!isAuthenticated ? (
              <div className="my-4 flex gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2 bg-bg border border-line rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1">
                    <LogIn size={14} /> সাইন ইন
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-2 bg-accent text-ink rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <UserPlus size={14} /> সাইন আপ
                  </button>
                </Link>
              </div>
            ) : (
              <div className="my-4 p-3 bg-bg rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-primary">{user?.name}</p>
                  <p className="text-[10px] text-muted">{user?.email}</p>
                </div>
                <button onClick={logout} className="text-xs text-accent-2 font-bold">লগআউট</button>
              </div>
            )}

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg text-ink text-sm px-4 py-2 rounded-xl border border-line"
              />
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-3 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-ink hover:text-accent border-b border-line/40 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-accent-2 text-surface px-1.5 py-0.5 rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Categories */}
            <div className="mt-6 pt-4 border-t border-line">
              <h4 className="text-xs uppercase tracking-wider text-muted font-bold mb-3">ক্যাটাগরি</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-ink hover:text-primary py-1"
                  >
                    {cat.bnName}
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
