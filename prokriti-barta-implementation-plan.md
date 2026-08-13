# Prokriti-Barta — Frontend Implementation Plan

A complete build brief for an AI coding agent (Claude Code, Cursor, etc.) to implement a frontend-only organic products e-commerce site: React + Vite + Tailwind CSS, with Lenis smooth scroll, Framer Motion animation, cart/wishlist via Context + localStorage, and light/dark mode.

Hand this whole document to the agent as its spec. Sections are ordered so it can be built phase by phase.

---

## 1. Design Direction (read this before writing any code)

Avoid the generic "green nature template" — pale sage backgrounds, stock leaf icons, rounded-everything cards. Ground the identity in real Bengali agrarian/organic material culture instead: turmeric, clay, jute, rice paper, indigo, harvest baskets, and **alpona** (আলপনা) — the traditional Bengali rice-paste floor art used at festivals and thresholds. Alpona motifs are the site's signature: used sparingly as line-art dividers, loading states, and section transitions — never as literal photos of it, but as abstracted linework echoing its swirl-and-petal geometry.

### 1.1 Color tokens

Define as CSS variables (for instant light/dark theme swap) and mirror in `tailwind.config.js`.

**Light mode**
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F2E7` (rice-paper cream) | page background |
| `--surface` | `#FFFDF8` | cards, nav |
| `--ink` | `#1F2A22` (deep forest-black) | primary text |
| `--muted` | `#6B7263` | secondary text |
| `--primary` | `#1F3A2E` (deep forest) | headings, primary buttons |
| `--accent` | `#E3A83B` (turmeric gold) | CTAs, price highlights, active states |
| `--accent-2` | `#C6633B` (terracotta clay) | discount badges, hover accents |
| `--line` | `#E4DCC8` | hairline borders/dividers |

**Dark mode**
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#131C16` (indigo-forest night) | page background |
| `--surface` | `#1B2620` | cards, nav |
| `--ink` | `#F2EDDF` | primary text |
| `--muted` | `#A5AC9B` | secondary text |
| `--primary` | `#E3A83B` (turmeric flips to accent role) | headings, links |
| `--accent` | `#E3A83B` | CTAs |
| `--accent-2` | `#E08A5C` | discount badges |
| `--line` | `#2B372F` | hairline borders |

Theme is a `data-theme="light|dark"` attribute on `<html>`, toggled and persisted to `localStorage`. No Tailwind `dark:` class strategy needed — use CSS variables consumed by Tailwind via `theme.extend.colors` referencing `var(--token)`, so every utility class (`bg-surface`, `text-ink`, `border-line`) auto-adapts.

### 1.2 Typography

- **Display (headings):** `Fraunces` (variable, use optical size + soft italic for a few accent words like product names in hero) — warm, editorial serif, not the generic AI-cream-serif look because it's paired with a saturated palette, not a beige one.
- **Body / UI:** `Inter` for Latin text.
- **Bengali script support:** `Noto Serif Bengali` (pairs with Fraunces for headings) and `Noto Sans Bengali` (pairs with Inter for body) — load both so the site can mix বাংলা copy (category names, taglines) with English UI naturally.
- Type scale: `text-sm(14) / base(16) / lg(18) / xl(20) / 2xl(24) / 3xl(30) / 4xl(38) / 5xl(48) / 6xl(64)` with `font-display` at 600–700 weight for headings, `font-body` at 400/500 for copy.

### 1.3 Layout concept

- Hero: full-bleed slider, NOT a centered-text-on-photo cliché — use an asymmetric split: left 40% column with display headline + CTA + a small alpona line-art flourish under the CTA button; right 60% is the sliding product/lifestyle imagery with a soft clip-path edge (organic wave, not a hard rectangle).
- Home page below the hero uses a **complex bento-style grid** (not equal-width cards): a 12-column CSS grid where "Featured" spans 6 cols tall, "New Arrivals" spans 3x2 small tiles, category strip spans full width as a horizontal scroll-snap row. This is the "look like a professional agency built it" request — irregular spans, not a uniform card grid everywhere.
- Section dividers: thin alpona-inspired SVG line motif (a repeating petal/swirl stroke path), full width, 24–40px tall, in `--line` color. Used between hero→featured, benefits→reviews, etc. — sparingly, 3–4 times total on the home page.

### 1.4 Motion principles

- **Lenis** drives all scroll (buttery inertia scroll, required by the brief).
- **Framer Motion** handles: page-load hero sequence (headline chars/words stagger in, CTA fades up last), scroll-triggered reveals (`whileInView`, once) for grid sections, hover micro-interactions on product cards (image scale 1.04, "Add to Cart" slides up from bottom edge), and cart drawer slide-in.
- Respect `prefers-reduced-motion`: wrap all motion variants behind a check that disables transforms and keeps opacity fades only.
- One orchestrated moment, not scattered effects: the hero load sequence is the "big" choreographed animation. Everything else is short (150–300ms), consistent easing (`cubic-bezier(0.22, 1, 0.36, 1)` — a soft "ease-out-quint" feel), and restrained.

### 1.5 Signature element

The **alpona divider/loader system**: a small reusable `<AlponaDivider />` SVG component (line-art, animates its stroke drawing in on scroll via Framer Motion `pathLength`) used as section separators, and a matching `<AlponaLoader />` (looping stroke animation) for async states (e.g., "Placing your order..."). This is the one motif that ties the whole site's Bengali-organic identity together without resorting to leaf-icon clichés.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Build tool | Vite (React + TypeScript template recommended, or JS if agent/user prefers) |
| Styling | Tailwind CSS v3, CSS variables for theming |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Smooth scroll | `lenis` (`@studio-freight/lenis` / current `lenis` package) synced to Framer Motion's scroll hooks |
| State | React Context + `useReducer` for Cart and Wishlist; persisted to `localStorage` |
| Icons | `lucide-react` |
| Forms | plain controlled inputs + simple client-side validation (no backend) |
| Data | static JSON files under `src/data/` acting as a mock "API" |
| Image handling | placeholder organic product photography (Unsplash-style URLs or `/public/images` assets the agent generates/sources) |

No backend, no real auth, no real payment — everything is simulated per the original brief.

---

## 3. Project Structure

```
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
```

---

## 4. Routing Map

```
/                     Home
/shop                 Product listing (query params: ?category=&sort=&q=)
/product/:slug        Product details
/cart                 Cart page (+ persistent mini CartDrawer accessible anywhere)
/wishlist             Wishlist
/checkout             Checkout form
/order-success/:id    Order confirmation
/profile              Profile UI
/profile/orders       Order history
/about                About Us
/blog                 Blog index
/blog/:slug           Blog post
/contact              Contact form
/offers               Offers & discounts
/delivery             Delivery info
/login
/register
*                     404
```

---

## 5. Data Model (mock JSON)

**`products.json`** — each product:
```json
{
  "id": "honey-sundarban",
  "slug": "organic-sundarban-honey",
  "name": "Organic Sundarban Honey",
  "category": "honey",
  "price": 750,
  "originalPrice": 850,
  "rating": 4.8,
  "reviewCount": 132,
  "images": ["/images/honey-1.jpg", "/images/honey-2.jpg"],
  "shortDesc": "Raw wild honey harvested from the Sundarbans mangrove forest.",
  "description": "...",
  "ingredients": ["100% raw honey"],
  "benefits": ["Antibacterial", "Boosts immunity"],
  "weight": "500g",
  "inStock": true,
  "isFeatured": true,
  "isNew": false,
  "tags": ["bestseller"]
}
```
Also: `categories.json` (id, name, icon, image), `reviews.json` (productId, name, rating, comment, date), `orders.json` (id, date, items, total, status).

---

## 6. Core Functional Requirements

### 6.1 Cart (`CartContext`)
- Reducer actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR_CART`.
- Persist entire cart state to `localStorage` on every change; hydrate on mount.
- Derived values via `useMemo`: subtotal, item count, delivery charge (flat rate, or free over a threshold — define one, e.g. free over ৳1000), total.
- `CartDrawer` slides in from the right (Framer Motion `x` transform) on "Add to Cart", auto-closes after a few seconds or on outside click.

### 6.2 Wishlist (`WishlistContext`)
- Same localStorage pattern. Toggle heart icon on `ProductCard` and `ProductDetails`. "Move to Cart" action from the Wishlist page.

### 6.3 Theme (`ThemeContext`)
- Reads system preference on first load (`prefers-color-scheme`), then respects explicit user toggle stored in `localStorage`, taking precedence on repeat visits.
- Toggle animates icon (sun/moon morph) and cross-fades background color via CSS transition on `--bg`/`--ink` variables (200ms).

### 6.4 Search / Filter / Sort (Shop page)
- Client-side filtering over the static `products.json` array — no debounce needed for this dataset size, but add a light 200ms debounce on the search input for polish.
- Filters: category (checkbox list), price range (slider), rating (min stars). Sort: price asc/desc, popularity (reviewCount), newest (isNew flag / mock date).
- Sync filter/sort/search state to URL query params so results are shareable/bookmarkable.

### 6.5 Checkout (simulated)
- Controlled form with inline validation (required fields, phone/email pattern).
- On submit: generate a dummy order ID (`PB` + timestamp/random), write an order object into `orders.json`-shaped state (kept in memory/localStorage, not the actual file), clear the cart, navigate to `/order-success/:id` passing order data via route state or localStorage lookup.
- Payment method is a visual radio-card picker (COD / Online / Mobile Banking) with no real gateway integration — just UI state.

### 6.6 Login/Register
- UI-only forms; on submit, show a success toast and redirect to `/profile` (no real auth, no persisted session beyond maybe a `isLoggedIn` flag in localStorage for demo continuity).

### 6.7 Newsletter / Contact forms
- Client-side validation + a success confirmation state (no backend call) — e.g. swap the form for a checkmark + "Thanks, we'll be in touch" message.

---

## 7. Lenis + Framer Motion Setup Notes

- Initialize Lenis once in a top-level hook (`useLenis` in `lib/lenis.js`), driven by `requestAnimationFrame`, and wrap the app in a root div Lenis controls.
- Sync Lenis's scroll position into Framer Motion's `useScroll` (pass `lenis.on('scroll', ...)` to keep parallax/scroll-triggered `whileInView` animations accurate).
- Disable Lenis (or set reduced duration) when `prefers-reduced-motion: reduce` is set, and skip smooth scroll for in-page anchor jumps like skip-to-content links.
- Clean up the RAF loop and Lenis instance on unmount to avoid leaks between route changes if the app ever unmounts the root (not an issue with a single persistent Lenis instance at `App` level, but note it for the agent).

---

## 8. Accessibility & Quality Bar

- Keyboard focus states visible on all interactive elements (buttons, cards, form fields) — don't rely on Tailwind's default `outline-none` without a replacement ring.
- All images have descriptive `alt` text drawn from product/category names.
- Color contrast checked for both themes, especially turmeric-on-cream and turmeric-on-dark combinations for text (use turmeric for backgrounds/accents/large text, not small body text, if contrast fails).
- Fully responsive: mobile (< 640px), tablet (640–1024px), desktop (1024px+) — mobile nav collapses into a slide-out menu; bento grid collapses to single/double column.
- Reduced-motion users get instant/opacity-only transitions everywhere Framer Motion is used.

---

## 9. Build Phases (give the agent this order)

**Phase 1 — Scaffold**
Vite + React + Tailwind init, install dependencies (`framer-motion`, `lenis`, `react-router-dom`, `lucide-react`), set up CSS variable theme tokens + `tailwind.config.js` color mapping, fonts loaded, folder structure created.

**Phase 2 — Layout shell**
Navbar (with mega-menu for categories, cart/wishlist icon counts, theme toggle, mobile menu), Footer, route scaffolding with placeholder pages, Lenis wired up globally.

**Phase 3 — Data + state**
`products.json` and other mock data authored (15–25 realistic organic products across all listed categories), Cart/Wishlist/Theme contexts built and localStorage-persisted.

**Phase 4 — Home page**
Hero slider (with the asymmetric layout + entrance animation), category strip, featured/new-arrivals bento grid, benefits section, "Why Choose Us," reviews carousel, newsletter box, alpona dividers between sections.

**Phase 5 — Shop + Product Details**
Product grid with filter sidebar, search, sort; product details page with gallery, quantity selector, add-to-cart/wishlist, related products.

**Phase 6 — Cart, Wishlist, Checkout, Order Success**
Full cart page + drawer, wishlist page, checkout form with validation and payment-method UI, order success page with generated order ID and alpona loader during the "processing" transition.

**Phase 7 — Account, Content, Support pages**
Profile UI, order history table with status badges, About, Blog (index + post), Contact form, Offers page (with countdown timer), Delivery info, Login/Register UI.

**Phase 8 — Polish pass**
Dark/light mode contrast audit, responsive audit at all breakpoints, reduced-motion audit, empty-state and loading-state design (skeletons, alpona loader), 404 page, final animation timing pass so nothing feels scattered.

---

## 10. Explicit Non-Goals (per original brief)

- No real backend, database, authentication, or payment processing — everything is simulated with local state/localStorage and dummy data.
- No real-time inventory or order tracking beyond static dummy statuses.

---

Give this document to your AI agent as-is; it has enough detail to scaffold, theme, and build the site phase by phase without further clarification, while leaving room for the agent's own implementation judgment inside each phase.
