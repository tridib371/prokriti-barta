import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useLenis } from './lib/lenis';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Delivery from './pages/Delivery';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  useLenis();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-bg text-ink">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Routes>
          {/* Unauthenticated landing page by default on root, or full Home for returning users */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<OrderHistory />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <MainLayout />
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
