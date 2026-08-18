<div align="center">

# 🌿 প্রকৃতি বার্তা (Prokriti Barta)
### *100% Pure, Farm-Fresh & Traditional Organic Food E-Commerce Platform*

[![Live Demo](https://img.shields.io/badge/Live_Demo-prokriti--barta.vercel.app-1B3B2B?style=for-the-badge&logo=vercel&logoColor=white)](https://prokriti-barta.vercel.app/)
[![Frontend Project](https://img.shields.io/badge/Architecture-100%25_Frontend_SPA-C86D3B?style=for-the-badge&logo=react&logoColor=white)](https://prokriti-barta.vercel.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

### 🌐 **Live Website Link**
👉 **[https://prokriti-barta.vercel.app/](https://prokriti-barta.vercel.app/)** 👈

---

</div>

<br/>

## 🍃 About The Project

> [!NOTE]
> **💻 100% Frontend Web Application**:  
> **Prokriti Barta** is built entirely as a rich, client-side Single Page Application (SPA). All user authentication, persistent databases (`pb_users_db`, `pb_orders`), real-time cart calculations, checkout workflows, bilingual i18n translations, live order tracking, and AI chatbot responses operate completely on the frontend using React Context and Browser Storage APIs without requiring an external backend or database server.

**প্রকৃতি বার্তা (Prokriti Barta)** is a modern, high-performance, and culturally resonant organic e-commerce web application built for conscious consumers across Bangladesh. Rooted in traditional Bengali aesthetic heritage with **Alpona motifs**, hand-curated typography (**Noto Serif Bengali** & **Fraunces**), and a rich **Forest Green & Terracotta** palette, the platform delivers an extraordinary user experience for shopping chemical-free organic groceries, Vedic raw honey, mustard oil, ghee, and traditional spices.

---

## ✨ Key Features & Capabilities

### 🌐 1. Full Bilingual Experience (বাংলা & English)
- Instant, seamless toggle between **Bangla (বাংলা)** and **English (EN)** across all navigation bars, product cards, checkout flows, order trackers, footer payment badges, and system alerts.
- Formatted Bengali numerals (`১, ২, ৩...`) and currency standards (`৳`) for authentic localization.

### 🛍️ 2. Modern E-Commerce Shopping Experience
- **Dynamic Category & Search Filtering**: Filter by organic categories (Raw Honey, Vedic Ghee & Oils, Pure Spices, Natural Seeds, Superfoods).
- **Stock & Rating Filters**: Instant client-side search with live keyword matching and stock validation.
- **Product Details Showcase**: Multi-image galleries, certification badges, nutritional insights, and customer reviews.
- **Interactive Cart & Flyout Drawer**: Real-time quantity management, coupon code discounts, free delivery threshold meter (Free shipping on ৳1000+), and persistent storage.

### 📦 3. Live Order Tracking & History Management
- **Single-Order Live Tracking View**: Isolated real-time 3-step visual delivery tracker (`Confirmed` ➔ `Processing` ➔ `Delivered`) showing recipient destination, itemized prices, and delivery breakdown.
- **Full History Hub**: Filter orders by status (*All*, *Processing*, *Delivered*), search by Order ID or purchased items, and review past invoices.

### 👤 4. Comprehensive Customer Profile Dashboard
- **Personal Info & Security**: Update profile name, phone number, default address, and change account passwords with live validation.
- **Persistent User Authentication**: Secure local user database maintaining customer identities, joined dates, and order relationships.
- **Bangladeshi Mobile Phone Validation**: Enforces exact 11-digit Bangladeshi mobile numbers (`013`–`019`).
- **Saved Addresses & Eco Club Rewards**: Manage multiple delivery addresses and collect green reward points on every purchase.

### 🤖 5. "Prakritik Bondhu" (AI Nutrition & Shopping Assistant)
- Built-in intelligent conversational assistant providing instant answers about organic benefits, Vedic remedies, delivery timelines, payment options, and personalized product recommendations.

### 🎨 6. Rich Organic Aesthetics & Physics Animations
- **Lenis Smooth Scroll** integration for butter-smooth webpage motion.
- **Falling Leaves Physics**: Interactive animated organic leaves floating across banners and the custom 404 page.
- **Day & Night Themes**: Cohesive HSL color tokens preserving natural forest vibes across light and dark modes.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ESNext), HTML5 Semantic Structure |
| **Build & Bundler** | Vite 8 (Hot Module Replacement, Dynamic Splitting) |
| **Styling & CSS** | Tailwind CSS 4, Modern CSS Custom Properties, Glassmorphism |
| **Animations & Motion**| Framer Motion, Lenis Smooth Scroll |
| **Routing** | React Router v7 (SPA with client-side rewrite rules) |
| **Icons & Media** | Lucide React |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 📂 Project Architecture

```plaintext
prokriti-barta/
├── public/                # Static assets, logos, and favicons
├── src/
│   ├── components/        # Reusable UI & Layout Components
│   │   ├── auth/          # ProtectedRoute, Auth modals
│   │   ├── cart/          # CartDrawer, CartItems
│   │   ├── chat/          # ChatbotWidget ("প্রাকৃতিক বন্ধু")
│   │   ├── home/          # HeroSection, CategoryGrid, TrustBadges
│   │   ├── layout/        # Navbar, Footer, Mobile Drawer
│   │   ├── shop/          # ProductCard, FilterSidebar, QuickView
│   │   └── ui/            # Button, AlponaDivider, FallingLeaves
│   ├── context/           # React Context Providers
│   │   ├── AuthContext.jsx       # User auth & persistent database
│   │   ├── CartContext.jsx       # Cart state & discount calculations
│   │   ├── LanguageContext.jsx   # i18n & Bengali numeral formatter
│   │   ├── ThemeContext.jsx      # Day/Night theme switcher
│   │   └── WishlistContext.jsx   # Wishlist storage & quick-add
│   ├── data/              # Static Datasets (products, categories, blogs, FAQ)
│   ├── i18n/              # Complete bilingual translation dictionaries
│   ├── lib/               # Utility libraries (Lenis scroll setup)
│   ├── pages/             # Core Route Pages
│   │   ├── Home.jsx              # Landing Page
│   │   ├── Shop.jsx              # Product Catalogue & Filters
│   │   ├── ProductDetails.jsx    # Item Showcase & Reviews
│   │   ├── Cart.jsx              # Shopping Cart Page
│   │   ├── Checkout.jsx          # Secure Checkout & Payment
│   │   ├── OrderHistory.jsx      # Order Tracking & History Hub
│   │   ├── Profile.jsx           # User Account Dashboard
│   │   ├── Wishlist.jsx          # Saved Items Page
│   │   ├── Blog.jsx              # Organic Lifestyle Articles
│   │   ├── Contact.jsx           # Customer Support & FAQ
│   │   ├── Delivery.jsx          # Shipping Policies & Coverage
│   │   ├── Offers.jsx            # Seasonal Discounts & Combos
│   │   └── NotFound.jsx          # Custom Interactive 404 Page
│   ├── App.jsx            # Application Router & Layout Wrapper
│   ├── index.css          # Global Theme Tokens & Scrollbar Styling
│   └── main.jsx           # React Root Entry Point
├── vercel.json            # Vercel SPA Routing & Deep Linking Rules
└── package.json           # Project Dependencies & Build Scripts
```

---

## 🚀 Getting Started Locally

To run **Prokriti Barta** on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/tridib371/prokriti-barta.git
cd prokriti-barta
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The application will launch at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 💳 Payment & Delivery Options

- 💵 **Cash on Delivery (COD)**: 100% Doorstep package inspection across all 64 districts in Bangladesh.
- 📱 **Mobile Financial Services**: bKash, Nagad, Rocket.
- 💳 **Cards**: Visa, Mastercard, Debit & Credit Cards.
- 🚚 **Delivery Timelines**: 24–36 hours inside Dhaka, 48–72 hours across all 64 districts.

---

## 📄 License & Attribution

Developed with 💚 by **Tridib** for **প্রকৃতি বার্তা (Prokriti Barta)**.  
All organic products, branding, and assets are curated to showcase authentic Bangladeshi heritage.

---

<div align="center">

**[🌿 Explore Live Website](https://prokriti-barta.vercel.app/)** • **[Report a Bug](https://github.com/tridib371/prokriti-barta/issues)** • **[Request a Feature](https://github.com/tridib371/prokriti-barta/issues)**

</div>
