
prokriti-barta/
├─ public/
│  └─ images/
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css                 // Tailwind + CSS var tokens + font-face
│  ├─ lib/
│  │  ├─ lenis.js                // Lenis init + RAF loop hook
│  │  └─ motionVariants.js       // shared Framer Motion variants
│  ├─ context/
│  │  ├─ ThemeContext.jsx
│  │  ├─ CartContext.jsx
│  │  └─ WishlistContext.jsx
│  ├─ data/
│  │  ├─ products.json
│  │  ├─ categories.json
│  │  ├─ reviews.json
│  │  └─ orders.json             // dummy order history
│  ├─ hooks/
│  │  ├─ useLocalStorage.js
│  │  └─ useTheme.js
│  ├─ components/
│  │  ├─ layout/  (Navbar, Footer, MobileMenu, ThemeToggle)
│  │  ├─ home/    (HeroSlider, CategoryStrip, FeaturedGrid, BenefitsSection,
│  │  │            WhyChooseUs, ReviewsCarousel, NewsletterBox)
│  │  ├─ shop/    (ProductCard, FilterSidebar, SortDropdown, SearchBar)
│  │  ├─ product/ (ImageGallery, QuantitySelector, RelatedProducts)
│  │  ├─ cart/    (CartDrawer, CartItemRow, CartSummary)
│  │  ├─ checkout/(CheckoutForm, PaymentMethodPicker, OrderSummary)
│  │  ├─ account/ (ProfileCard, OrderHistoryTable, AddressBook)
│  │  └─ ui/      (Button, Badge, RatingStars, AlponaDivider, AlponaLoader,
│  │               CountdownTimer, Skeleton)
│  └─ pages/
│     ├─ Home.jsx
│     ├─ Shop.jsx
│     ├─ ProductDetails.jsx
│     ├─ Cart.jsx
│     ├─ Wishlist.jsx
│     ├─ Checkout.jsx
│     ├─ OrderSuccess.jsx
│     ├─ Profile.jsx
│     ├─ OrderHistory.jsx
│     ├─ About.jsx
│     ├─ Blog.jsx (+ BlogPost.jsx)
│     ├─ Contact.jsx
│     ├─ Offers.jsx
│     ├─ Delivery.jsx
│     ├─ Login.jsx
│     ├─ Register.jsx
│     └─ NotFound.jsx
