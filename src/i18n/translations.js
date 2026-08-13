/**
 * Prokriti-Barta — Translation strings
 * Usage: t('key') where t comes from useLanguage()
 * Add new keys here as the app grows.
 */
const translations = {

  // ── Navbar ─────────────────────────────────────────────────────────────────
  'nav.announcement': {
    bn: '১০০০ টাকার যেকোনো অর্ডারে সারা বাংলাদেশে ডেলিভারি একদম ফ্রি!',
    en: 'FREE delivery all over Bangladesh on orders over ৳1000!',
  },
  'nav.helpline': { bn: 'হেল্পলাইন: +880 1712-345678', en: 'Helpline: +880 1712-345678' },
  'nav.search.placeholder': {
    bn: 'খুঁজুন... (যেমন: মধু, ঘি, চা, তেল)',
    en: 'Search... (e.g. honey, ghee, tea, oil)',
  },
  'nav.cart': { bn: 'কার্ট', en: 'Cart' },
  'nav.signin': { bn: 'সাইন ইন', en: 'Sign In' },
  'nav.signup': { bn: 'সাইন আপ', en: 'Sign Up' },
  'nav.logout': { bn: 'লগআউট', en: 'Log Out' },
  'nav.menu': { bn: 'মেন্যু', en: 'Menu' },
  'nav.categories': { bn: 'ক্যাটাগরি সমূহ', en: 'All Categories' },
  'nav.categories.mobile': { bn: 'ক্যাটাগরি', en: 'Categories' },
  'nav.search.mobile': { bn: 'পণ্য খুঁজুন...', en: 'Search products...' },

  // Nav links
  'nav.home': { bn: 'হোম', en: 'Home' },
  'nav.shop': { bn: 'শপ', en: 'Shop' },
  'nav.offers': { bn: 'অফারসমুহ', en: 'Offers' },
  'nav.about': { bn: 'আমাদের কথা', en: 'About Us' },
  'nav.blog': { bn: 'ব্লগ', en: 'Blog' },
  'nav.contact': { bn: 'যোগাযোগ', en: 'Contact' },

  // ── Common / Buttons ────────────────────────────────────────────────────────
  'btn.addToCart': { bn: 'কার্টে যোগ করুন', en: 'Add to Cart' },
  'btn.buyNow': { bn: 'এখনই কিনুন', en: 'Buy Now' },
  'btn.viewAll': { bn: 'সব দেখুন', en: 'View All' },
  'btn.goToShop': { bn: 'শপে যান', en: 'Go to Shop' },
  'btn.checkout': { bn: 'চেকআউটে যান', en: 'Proceed to Checkout' },
  'btn.placeOrder': { bn: 'অর্ডার দিন', en: 'Place Order' },
  'btn.login': { bn: 'লগইন করুন', en: 'Login' },
  'btn.register': { bn: 'একাউন্ট তৈরি করুন', en: 'Create Account' },
  'btn.continueShopping': { bn: 'কেনাকাটা চালিয়ে যান', en: 'Continue Shopping' },
  'btn.clearCart': { bn: 'কার্ট খালি করুন', en: 'Clear Cart' },
  'btn.wishlist': { bn: 'উইশলিস্ট', en: 'Wishlist' },
  'btn.backToHome': { bn: 'হোমে ফিরুন', en: 'Back to Home' },

  // ── Home ────────────────────────────────────────────────────────────────────
  'home.hero.badge': { bn: 'খাঁটি অর্গানিক পণ্য', en: '100% Organic Products' },
  'home.hero.title': {
    bn: 'প্রকৃতির সেরা উপহার আপনার দোরগোড়ায়',
    en: "Nature's finest gifts at your doorstep",
  },
  'home.hero.subtitle': {
    bn: 'সুন্দরবনের বুনো মধু, বিলোনা গাওয়া ঘি, কাঠের ঘানির তেল — সরাসরি উৎস থেকে আপনার রান্নাঘরে।',
    en: 'Wild Sundarbans honey, bilona ghee, wood-pressed oil — straight from the source to your kitchen.',
  },
  'home.featured.title': { bn: 'বাছাই করা পণ্যসমূহ', en: 'Featured Products' },
  'home.featured.subtitle': {
    bn: 'আমাদের সবচেয়ে জনপ্রিয় এবং গ্রাহকপ্রিয় পণ্য',
    en: 'Our most popular and customer-loved products',
  },
  'home.categories.title': { bn: 'ক্যাটাগরি অনুযায়ী কেনাকাটা করুন', en: 'Shop by Category' },
  'home.benefits.title': { bn: 'কেন প্রকৃতি বার্তা?', en: 'Why Prokriti Barta?' },
  'home.reviews.title': { bn: 'গ্রাহকদের মতামত', en: 'Customer Reviews' },

  // ── Shop ───────────────────────────────────────────────────────────────────
  'shop.title': { bn: 'সব পণ্য', en: 'All Products' },
  'shop.filter.title': { bn: 'ফিল্টার করুন', en: 'Filter' },
  'shop.filter.category': { bn: 'ক্যাটাগরি', en: 'Category' },
  'shop.filter.all': { bn: 'সব পণ্য', en: 'All Products' },
  'shop.filter.price': { bn: 'মূল্য সীমা', en: 'Price Range' },
  'shop.sort.label': { bn: 'সাজান:', en: 'Sort:' },
  'shop.sort.default': { bn: 'ডিফল্ট', en: 'Default' },
  'shop.sort.priceLow': { bn: 'কম দাম আগে', en: 'Price: Low to High' },
  'shop.sort.priceHigh': { bn: 'বেশি দাম আগে', en: 'Price: High to Low' },
  'shop.sort.rating': { bn: 'রেটিং', en: 'Rating' },
  'shop.empty': { bn: 'কোনো পণ্য পাওয়া যায়নি', en: 'No products found' },
  'shop.results': { bn: 'টি পণ্য পাওয়া গেছে', en: 'products found' },
  'shop.inStock': { bn: 'স্টকে আছে', en: 'In Stock' },
  'shop.outOfStock': { bn: 'স্টক শেষ', en: 'Out of Stock' },

  // ── Cart ───────────────────────────────────────────────────────────────────
  'cart.title': { bn: 'আপনার কার্ট', en: 'Your Cart' },
  'cart.items': { bn: 'টি পণ্য', en: 'items' },
  'cart.empty.title': { bn: 'আপনার শপিং কার্ট খালি', en: 'Your shopping cart is empty' },
  'cart.empty.subtitle': {
    bn: 'সুন্দরবনের বুনো মধু, খাঁটি বিলোনা ঘি ও কাঠের ঘানির তেল দেখতে আমাদের শপে যান।',
    en: 'Explore our organic products — wild honey, bilona ghee, wood-pressed oil and more.',
  },
  'cart.freeShipping.reached': {
    bn: '🎉 আপনি ১০০০+ টাকার অর্ডারে ফ্রি ডেলিভারি পাচ্ছেন!',
    en: '🎉 You have unlocked FREE delivery on this order!',
  },
  'cart.freeShipping.remaining': {
    bn: 'ফ্রি ডেলিভারির জন্য আরও',
    en: 'Add',
  },
  'cart.freeShipping.remainingMore': {
    bn: 'টাকার পণ্য যোগ করুন।',
    en: 'more to unlock free delivery.',
  },
  'cart.summary.title': { bn: 'অর্ডার সামারি', en: 'Order Summary' },
  'cart.summary.subtotal': { bn: 'পণ্যের মূল্য', en: 'Subtotal' },
  'cart.summary.delivery': { bn: 'ডেলিভারি চার্জ', en: 'Delivery Charge' },
  'cart.summary.total': { bn: 'সর্বমোট', en: 'Total' },
  'cart.summary.free': { bn: 'ফ্রি', en: 'FREE' },
  'cart.auth.prompt': {
    bn: 'অর্ডার করতে',
    en: 'To place an order, please',
  },
  'cart.auth.login': { bn: 'লগইন করুন', en: 'Login' },
  'cart.auth.or': { bn: 'অথবা', en: 'or' },
  'cart.auth.register': { bn: 'অ্যাকাউন্ট তৈরি করুন', en: 'Create an account' },

  // ── Checkout ───────────────────────────────────────────────────────────────
  'checkout.title': { bn: 'চেকআউট', en: 'Checkout' },
  'checkout.shipping': { bn: 'শিপিং তথ্য', en: 'Shipping Information' },
  'checkout.name': { bn: 'পূর্ণ নাম', en: 'Full Name' },
  'checkout.phone': { bn: 'মোবাইল নম্বর', en: 'Phone Number' },
  'checkout.address': { bn: 'পূর্ণ ঠিকানা', en: 'Full Address' },
  'checkout.district': { bn: 'জেলা', en: 'District' },
  'checkout.payment': { bn: 'পেমেন্ট পদ্ধতি', en: 'Payment Method' },
  'checkout.cod': { bn: 'ক্যাশ অন ডেলিভারি', en: 'Cash on Delivery' },
  'checkout.bkash': { bn: 'বিকাশ', en: 'bKash' },
  'checkout.nagad': { bn: 'নগদ', en: 'Nagad' },
  'checkout.orderSummary': { bn: 'অর্ডার সামারি', en: 'Order Summary' },

  // ── Login / Register ───────────────────────────────────────────────────────
  'login.title': { bn: 'একাউন্টে লগইন করুন', en: 'Login to Your Account' },
  'login.subtitle': { bn: 'আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড লিখুন', en: 'Enter your registered email and password' },
  'login.email': { bn: 'ইমেইল এড্রেস', en: 'Email Address' },
  'login.password': { bn: 'পাসওয়ার্ড', en: 'Password' },
  'login.noAccount': { bn: 'নতুন গ্রাহক?', en: 'New customer?' },
  'login.createAccount': { bn: 'একাউন্ট তৈরি করুন', en: 'Create an account' },
  'login.error': { bn: 'অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।', en: 'Please provide your email and password.' },
  'login.banner.title': { bn: 'আবারও স্বাগতম আপনার পছন্দের অর্গানিক শপে', en: 'Welcome back to your favourite organic shop' },
  'login.banner.subtitle': {
    bn: 'আপনার সংরক্ষিত উইশলিস্ট, কার্ট এবং সহজ চেকআউটের সুবিধা পেতে লগইন করুন।',
    en: 'Login to access your saved wishlist, cart and easy checkout.',
  },

  'register.title': { bn: 'নতুন একাউন্ট তৈরি করুন', en: 'Create a New Account' },
  'register.subtitle': { bn: 'আপনার তথ্য দিয়ে নিবন্ধন করুন', en: 'Register with your details' },
  'register.name': { bn: 'পূর্ণ নাম', en: 'Full Name' },
  'register.phone': { bn: 'মোবাইল নম্বর', en: 'Phone Number' },
  'register.haveAccount': { bn: 'ইতিমধ্যে একাউন্ট আছে?', en: 'Already have an account?' },
  'register.loginLink': { bn: 'লগইন করুন', en: 'Login here' },
  'register.error': { bn: 'অনুগ্রহ করে সকল তথ্য পূরণ করুন।', en: 'Please fill in all fields.' },

  // ── Profile / Orders ───────────────────────────────────────────────────────
  'profile.title': { bn: 'আমার প্রোফাইল', en: 'My Profile' },
  'profile.orders': { bn: 'আমার অর্ডারসমূহ', en: 'My Orders' },
  'profile.wishlist': { bn: 'উইশলিস্ট', en: 'Wishlist' },
  'profile.logout': { bn: 'লগআউট', en: 'Logout' },
  'profile.member': { bn: 'সদস্য', en: 'Member' },

  // ── Footer ─────────────────────────────────────────────────────────────────
  'footer.tagline': {
    bn: 'প্রকৃতির সেরা পণ্য সরাসরি আপনার দোরগোড়ায়।',
    en: "Nature's finest products, delivered to your doorstep.",
  },
  'footer.links': { bn: 'দ্রুত লিঙ্ক', en: 'Quick Links' },
  'footer.contact': { bn: 'যোগাযোগ', en: 'Contact' },
  'footer.rights': { bn: 'সর্বস্বত্ব সংরক্ষিত।', en: 'All rights reserved.' },

  // ── Order Success ──────────────────────────────────────────────────────────
  'success.title': { bn: 'অর্ডার সফল হয়েছে!', en: 'Order Placed Successfully!' },
  'success.subtitle': {
    bn: 'আপনার অর্ডার গ্রহণ করা হয়েছে। শীঘ্রই ডেলিভারি দেওয়া হবে।',
    en: 'Your order has been received. Delivery will follow shortly.',
  },
  'success.orderNo': { bn: 'অর্ডার নম্বর', en: 'Order No.' },

  // ── Not Found ──────────────────────────────────────────────────────────────
  'notfound.title': { bn: 'পৃষ্ঠা পাওয়া যায়নি', en: 'Page Not Found' },
  'notfound.subtitle': {
    bn: 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।',
    en: "The page you're looking for doesn't exist.",
  },

  // ── Language toggle ────────────────────────────────────────────────────────
  'lang.toggle': { bn: 'EN', en: 'বাং' },
  'lang.label': { bn: 'Switch to English', en: 'বাংলায় যান' },
};

export default translations;
