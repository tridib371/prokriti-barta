import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import blogsData from '../data/blogs.json';

/**
 * Intelligent domain knowledge response generator for Prokriti Barta
 */
export function generateBotResponse(userInput, lang = 'bn') {
  const query = (userInput || '').trim().toLowerCase();

  if (!query) {
    return {
      text: lang === 'bn' 
        ? 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?' 
        : 'Please type your question. How can I help you today?',
    };
  }

  // 1. Delivery, Shipping, Cost & Timeline queries
  if (
    query.includes('ডেলিভারি') || query.includes('delivery') || 
    query.includes('shipping') || query.includes('চার্জ') || 
    query.includes('কুরিয়ার') || query.includes('courier') ||
    query.includes('কত দিন') || query.includes('how long') || query.includes('free delivery')
  ) {
    if (lang === 'bn') {
      return {
        text: 'আমাদের দেশব্যাপী ডেলিভারি নীতিমালা:\n- ঢাকা সিটি এলাকা: ২৪ - ৩৬ ঘণ্টা (চার্জ ৳৬০)\n- ঢাকার বাইরে সকল জেলা: ২ - ৩ কার্যদিবস (চার্জ ৳১০০)\n- বিশেষ অফার: ৳১০০০ বা তার বেশি অর্ডারে সারা বাংলাদেশে ডেলিভারি একদম ফ্রি!\n- ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে এবং পণ্য দেখে মূল্য পরিশোধের সুযোগ রয়েছে।',
        actionLink: '/delivery',
        actionLabel: 'সম্পূর্ণ ডেলিভারি পলিসি দেখুন',
      };
    } else {
      return {
        text: 'Our Nationwide Delivery Policy:\n- Dhaka City: 24 - 36 Hours (Fee ৳60)\n- Outside Dhaka (All Districts): 2 - 3 Business Days (Fee ৳100)\n- Special Offer: FREE Delivery all over Bangladesh on orders over ৳1000!\n- 100% Cash on Delivery (COD) available with package inspection before payment.',
        actionLink: '/delivery',
        actionLabel: 'View Full Delivery Policy',
      };
    }
  }

  // 2. Honey & Purity Check queries
  if (
    query.includes('মধু') || query.includes('honey') || 
    query.includes('খাঁটি') || query.includes('pure') || 
    query.includes('সুন্দরবন') || query.includes('sundarban') ||
    query.includes('চেনার উপায়') || query.includes('identify')
  ) {
    const honeyProducts = productsData.filter(p => p.category === 'honey').slice(0, 3);
    if (lang === 'bn') {
      return {
        text: 'সুন্দরবনের খাঁটি বুনো মধু চেনার ঘরোয়া উপায়:\n১. পানির টেস্ট: এক গ্লাস পানিতে এক চামচ মধু ঢাললে খাঁটি মধু সহজে না গুলে সরাসরি নিচে তলিয়ে যাবে।\n২. টিস্যু টেস্ট: টিস্যুতে এক ফোঁটা মধু রাখলে তা চারপাশের কাগজ ভিজিয়ে ফেলবে না।\n৩. বুনো সুবাস: এতে থাকবে প্রাকৃতিক ম্যানগ্রোভ ফুলের সুবাস ও প্রাকৃতিক এনজাইমের উপস্থিতি।\n\nপ্রকৃতি বার্তার মধু শতভাগ অপাস্তুরিত ও কাঁচা।',
        actionLink: '/shop?category=honey',
        actionLabel: 'মধু কালেকশন দেখুন',
        products: honeyProducts,
      };
    } else {
      return {
        text: 'How to verify pure Sundarban wild honey at home:\n1. Water Test: Pure raw honey sinks directly to the bottom without dissolving immediately.\n2. Tissue Test: A pure honey drop remains intact without soaking through absorbent paper.\n3. Wild Aroma: Features distinct floral mangrove scent with live diastase enzymes.\n\nAll Prokriti Barta honey is 100% raw, unheated, and unpasteurized.',
        actionLink: '/shop?category=honey',
        actionLabel: 'Explore Honey Collection',
        products: honeyProducts,
      };
    }
  }

  // 3. Ghee & Bilona Queries
  if (
    query.includes('ঘি') || query.includes('ghee') || 
    query.includes('বিলোনা') || query.includes('bilona') ||
    query.includes('গাওয়া')
  ) {
    const gheeProducts = productsData.filter(p => p.category === 'ghee-oils').slice(0, 2);
    if (lang === 'bn') {
      return {
        text: 'আমাদের বৈদিক বিলোনা ঘি কেন অনন্য?\n- সাধারণ বাণিজ্যিক ঘির মতো মাখন সরাসরি ফুটিয়ে তৈরি নয়; বরং খাঁটি দেশি গরুর দুধের মিষ্টি দই কাঠের মন্থনী দিয়ে মন্থন করে মাখন আলাদা করে হালকা আঁচে জ্বাল দেওয়া হয়।\n- এটি শতভাগ ল্যাকটোজ ও কেসিন মুক্ত, হজমে সহায়ক এবং বুটিরিক এসিডে ভরপুর।',
        actionLink: '/shop?category=ghee-oils',
        actionLabel: 'ঘি ও তেল কালেকশন দেখুন',
        products: gheeProducts,
      };
    } else {
      return {
        text: 'Why our Vedic Bilona Ghee is superior:\n- Unlike commercial butter-boiled ghee, our Bilona Ghee is crafted by culturing pure Deshi cow milk into dahi and churning it bidirectionally with wooden churners.\n- 100% lactose & casein free, rich in butyric acid, and highly digestive.',
        actionLink: '/shop?category=ghee-oils',
        actionLabel: 'Explore Ghee & Oils',
        products: gheeProducts,
      };
    }
  }

  // 4. Mustard Oil & Cold Pressed Oil queries
  if (
    query.includes('সরিষা') || query.includes('mustard') || 
    query.includes('তেল') || query.includes('oil') || 
    query.includes('ঘানি') || query.includes('cold-pressed')
  ) {
    const oilProducts = productsData.filter(p => p.id.includes('mustard') || p.id.includes('coconut') || p.id.includes('kalijira'));
    if (lang === 'bn') {
      return {
        text: 'প্রকৃতি বার্তার কাঠের ঘানির তেল:\n- তেঁতুল কাঠের ঘানিতে ৪০ ডিগ্রি সেলসিয়াসের নিচে ধীরগতিতে কোল্ড-প্রেসড পদ্ধতিতে ভাঙা হয়।\n- এতে প্রাকৃতিক ওমেগা-৩, ওমেগা-৬ এবং এসেনশিয়াল অয়েল অক্ষুণ্ণ থাকে। কোনো ক্ষতিকর কেমিক্যাল বা রিফাইনিং করা হয় না।',
        actionLink: '/shop?category=ghee-oils',
        actionLabel: 'তেল কালেকশন দেখুন',
        products: oilProducts.slice(0, 2),
      };
    } else {
      return {
        text: 'Prokriti Barta Wood-Pressed Oils:\n- Extracted below 40°C in traditional tamarind wood presses without heat or chemical solvents.\n- Preserves natural Omega-3, Omega-6 fatty acids, and active essential nutrients.',
        actionLink: '/shop?category=ghee-oils',
        actionLabel: 'View Oil Collection',
        products: oilProducts.slice(0, 2),
      };
    }
  }

  // 5. Seeds, Nuts, Chia & Dates queries
  if (
    query.includes('বাদাম') || query.includes('chia') || query.includes('চিয়া') ||
    query.includes('খেজুর') || query.includes('date') || query.includes('বীজ') ||
    query.includes('seed') || query.includes('nut') || query.includes('pumpkin')
  ) {
    const nutProducts = productsData.filter(p => p.category === 'nuts-seeds').slice(0, 3);
    if (lang === 'bn') {
      return {
        text: 'আমাদের অর্গানিক সুপারফুড বীজ ও বাদাম:\n- অর্গানিক চিয়া সিড: উচ্চ ওমেগা-৩ ও ডায়েটারি ফাইবার সমৃদ্ধ।\n- মিষ্টি কুমড়ার বীজ (পেপিতাস): জিংক ও ম্যাগনেসিয়ামের প্রাকৃতিক উৎস।\n- মদিনার প্রিমিয়াম মেদজুল ও মরিয়ম খেজুর: প্রাকৃতিক শক্তির অফুরন্ত ভাণ্ডার।',
        actionLink: '/shop?category=nuts-seeds',
        actionLabel: 'বীজ ও বাদাম কালেকশন দেখুন',
        products: nutProducts,
      };
    } else {
      return {
        text: 'Our Organic Superfood Seeds, Nuts & Dates:\n- Organic Chia Seeds: Rich in soluble fiber and plant Omega-3.\n- Raw Pumpkin Seeds: Natural powerhouse of Zinc and Magnesium.\n- Madinah Medjool & Maryam Dates: Instant clean stamina without refined sugars.',
        actionLink: '/shop?category=nuts-seeds',
        actionLabel: 'View Seeds & Nuts',
        products: nutProducts,
      };
    }
  }

  // 6. Spices, Turmeric, Chili & Stone Ground queries
  if (
    query.includes('হলুদ') || query.includes('turmeric') || 
    query.includes('মশলা') || query.includes('spice') || 
    query.includes('মরিচ') || query.includes('curcumin')
  ) {
    const spiceProducts = productsData.filter(p => p.category === 'spices').slice(0, 2);
    if (lang === 'bn') {
      return {
        text: 'আমাদের গ্রানাইট পাথরে বাঁটা মশলা:\n- উচ্চ কারকিউমিনযুক্ত দেশি হলুদ গুঁড়া (>৪% কারকিউমিন)।\n- পাথরে ধীরগতিতে পিষে প্রস্তুত হওয়ায় কোনো এসেনশিয়াল অয়েল নষ্ট হয় না।\n- কোনো কৃত্রিম রঙ, ধানের কুঁড়া বা প্রিজারভেটিভ নেই।',
        actionLink: '/shop?category=spices',
        actionLabel: 'খাঁটি মশলা দেখুন',
        products: spiceProducts,
      };
    } else {
      return {
        text: 'Granite Stone-Ground Pure Spices:\n- High-Curcumin Turmeric (>4% medicinal Curcumin).\n- Slow-crushed on stone mills to preserve volatile aroma oils.\n- 100% free from artificial dyes, starches, or preservatives.',
        actionLink: '/shop?category=spices',
        actionLabel: 'View Pure Spices',
        products: spiceProducts,
      };
    }
  }

  // 7. Tea & Botanical queries
  if (
    query.includes('চা') || query.includes('tea') || 
    query.includes('অপরাজিতা') || query.includes('butterfly') || 
    query.includes('গ্রিন টি') || query.includes('green tea')
  ) {
    const teaProducts = productsData.filter(p => p.category === 'tea-beverages').slice(0, 2);
    if (lang === 'bn') {
      return {
        text: 'আমাদের অর্গানিক চা ও ভেষজ সমাহার:\n- শ্রীমঙ্গলের কীটনাশক-মুক্ত ব্ল্যাক টি ও গ্রিন টি।\n- অপরাজিতা ব্লু টি (Butterfly Pea Tea): প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ও স্ট্রেস রিলিভার।\n- তুলসি ও লেমনগ্রাস ভেষজ ইনফ্লুশন।',
        actionLink: '/shop?category=tea-beverages',
        actionLabel: 'চা কালেকশন দেখুন',
        products: teaProducts,
      };
    } else {
      return {
        text: 'Artisanal Tea & Botanical Blends:\n- Single-origin pesticide-free Sreemangal Black & Green Tea.\n- Butterfly Pea Blue Flower Tea: Powerful antioxidants and soothing bedtime elixir.\n- Tulsi & Lemongrass herbal infusions.',
        actionLink: '/shop?category=tea-beverages',
        actionLabel: 'View Tea Collection',
        products: teaProducts,
      };
    }
  }

  // 8. Order Placement & Payment Methods
  if (
    query.includes('অর্ডার') || query.includes('order') || 
    query.includes('পেমেন্ট') || query.includes('payment') || 
    query.includes('টাকা') || query.includes('bkash') || query.includes('বিকাশ') ||
    query.includes('ক্যাশ') || query.includes('cod')
  ) {
    if (lang === 'bn') {
      return {
        text: 'সহজ অর্ডার ও পেমেন্ট পদ্ধতি:\n১. ওয়েবসাইটে পছন্দের পণ্য "Add to Cart" করে Checkout পেজে নাম ও ঠিকানা দিন।\n২. পেমেন্ট অপশন: ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা দিন), বিকাশ বা নগদ।\n৩. অর্ডার সম্পন্ন হলে আপনার নম্বরে একটি কনফার্মেশন SMS পাঠানো হবে।',
        actionLink: '/shop',
        actionLabel: 'শপে যান',
      };
    } else {
      return {
        text: 'Easy Ordering & Payment Methods:\n1. Add desired products to Cart and proceed to Checkout with your address.\n2. Payment: Cash on Delivery (COD), bKash, or Nagad.\n3. An instant SMS confirmation with order tracking will be sent to your phone.',
        actionLink: '/shop',
        actionLabel: 'Go to Shop',
      };
    }
  }

  // 9. Contact / Helpline / Support queries
  if (
    query.includes('ফোন') || query.includes('phone') || 
    query.includes('হেল্পলাইন') || query.includes('helpline') || 
    query.includes('যোগাযোগ') || query.includes('contact') || 
    query.includes('নাম্বার') || query.includes('number') || query.includes('support')
  ) {
    if (lang === 'bn') {
      return {
        text: 'প্রকৃতি বার্তা কাস্টমার সাপোর্ট:\n- সরাসরি কল / হোয়াটসঅ্যাপ: +880 1717-279166 (সকাল ৯টা - রাত ১০টা)\n- ইমেইল: support@prokritibarta.com\n- অফিস: বনানী, ঢাকা-১২১৩, বাংলাদেশ।',
        actionLink: '/contact',
        actionLabel: 'কন্টাক্ট পেজ ভিজিট করুন',
      };
    } else {
      return {
        text: 'Prokriti Barta Customer Support:\n- Direct Call / WhatsApp: +880 1717-279166 (9:00 AM - 10:00 PM Daily)\n- Email: support@prokritibarta.com\n- Office: Banani, Dhaka-1213, Bangladesh.',
        actionLink: '/contact',
        actionLabel: 'Visit Contact Page',
      };
    }
  }

  // 10. Direct Product Search by name match
  const matchedProduct = productsData.find(p => {
    const name = (p.name || '').toLowerCase();
    const bnName = (p.bnName || '').toLowerCase();
    return query.includes(name) || name.includes(query) || query.includes(bnName) || bnName.includes(query);
  });

  if (matchedProduct) {
    const isBn = lang === 'bn';
    return {
      text: isBn 
        ? `${matchedProduct.bnName || matchedProduct.name}\n- মূল্য: ৳${matchedProduct.price}\n- বিবরণ: ${matchedProduct.bnShortDesc || matchedProduct.shortDesc}\n- স্টক: উপলব্ধ রয়েছে।`
        : `${matchedProduct.name}\n- Price: ৳${matchedProduct.price}\n- Description: ${matchedProduct.shortDesc}\n- Stock: In Stock.`,
      actionLink: `/product/${matchedProduct.id}`,
      actionLabel: isBn ? 'পণ্যটি বিস্তারিত দেখুন' : 'View Product Details',
      products: [matchedProduct],
    };
  }

  // 11. General Default Fallback
  if (lang === 'bn') {
    return {
      text: 'ধন্যবাদ আপনার প্রশ্নের জন্য! প্রকৃতি বার্তা ১০০% খাঁটি সুন্দরবনের মধু, বৈদিক বিলোনা ঘি, কাঠের ঘানির তেল, ঐতিহ্যবাহী চাল, খাঁটি মশলা এবং সুপারফুড সরবরাহ করে।\n\nআপনি নির্দিষ্ট কোনো পণ্য, ডেলিভারি চার্জ বা পিউরিটি টেস্ট সম্পর্কে জানতে চান কি?',
      actionLink: '/shop',
      actionLabel: 'আমাদের শপ দেখুন',
    };
  } else {
    return {
      text: 'Thank you for reaching out! Prokriti Barta specializes in 100% pure Sundarban raw honey, Vedic Bilona ghee, wood-pressed oils, heritage rice, stone-ground spices, and organic superfoods.\n\nWould you like to know about a specific product, delivery rates, or purity verification?',
      actionLink: '/shop',
      actionLabel: 'Browse All Products',
    };
  }
}
