import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

/**
 * Clean text by removing emojis and converting em-dashes to standard hyphens
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // remove emojis
    .replace(/—/g, '-'); // convert em-dashes to hyphens
}

/**
 * Intelligent Multi-Tier Knowledge & Conversational Engine
 */
export async function getIntelligentResponse(userInput, lang = 'bn') {
  const query = (userInput || '').trim().toLowerCase();

  if (!query) {
    return {
      text: lang === 'bn' 
        ? 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?' 
        : 'Please type your question. How can I help you today?',
    };
  }

  // 1. Try Gemini API if available in env
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' && window.GEMINI_API_KEY);
  if (geminiApiKey) {
    try {
      const prompt = `You are 'প্রকৃতি মিত্র' (Prokriti Assistant), the friendly, knowledgeable AI assistant of 'প্রকৃতি বার্তা' (Prokriti Barta), a 100% natural organic food brand in Bangladesh.
Store information:
- Delivery: Dhaka City ৳60 (24-36h), Outside Dhaka ৳100 (2-3 days). Free shipping over ৳1000.
- Payment: Cash on Delivery (COD), bKash, Nagad.
- Contact Helpline: +880 1717-279166 (9am - 10pm).
- Products: Sundarban Raw Wild Honey, Vedic Bilona Ghee, Wood-Pressed Mustard/Coconut/Kalijira Oil, Stone-Ground Turmeric & Spices, Organic Chia Seeds, Pumpkin Seeds, Madinah Dates, Sreemangal Tea, Butterfly Pea Blue Tea.
Rules:
- Never use em-dashes (—); always use standard hyphens (-).
- Never use emojis like sparkles.
- If asked in Bengali or if user language is Bengali, reply in polite, fluent Bengali.
- If asked in English, reply in English.
- Answer accurately about organic health, diet tips, nutrition, recipes, and store info.

User query: ${userInput}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return {
            text: cleanText(generatedText)
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to comprehensive local AI engine:', e);
    }
  }

  // 2. Comprehensive Local Domain & General Intelligence Engine
  return generateLocalIntelligentResponse(query, userInput, lang);
}

/**
 * Local Broad Knowledge & Context Matcher
 */
export function generateLocalIntelligentResponse(query, rawInput, lang = 'bn') {
  const isBn = lang === 'bn';

  // --- A. Chit-Chat & Greetings ---
  if (
    query.includes('কেমন আছেন') || query.includes('how are you') || 
    query.includes('kemon achen') || query.includes('what\'s up') || query.includes('কী খবর')
  ) {
    return {
      text: isBn
        ? 'আমি খুব ভালো আছি, ধন্যবাদ! আপনার দিনটি কেমন কাটছে? সুস্থ ও অর্গানিক জীবনযাপনের যেকোনো বিষয়ে আমি আপনাকে সহায়তা করতে প্রস্তুত।'
        : 'I am doing great, thank you! How is your day going? I am ready to help you with anything related to healthy organic living.',
    };
  }

  if (
    query.includes('ধন্যবাদ') || query.includes('thanks') || 
    query.includes('thank you') || query.includes('shukriya')
  ) {
    return {
      text: isBn
        ? 'আপনাকে অনেক ধন্যবাদ! সুস্থ থাকুন, প্রকৃতির সাথে থাকুন। আর কোনো তথ্য জানার থাকলে নির্দ্বিধায় বলুন।'
        : 'You are most welcome! Stay healthy and close to nature. Feel free to ask if you need anything else.',
    };
  }

  if (
    query.includes('কে তুমি') || query.includes('who are you') || 
    query.includes('তোমার নাম') || query.includes('what is your name') ||
    query.includes('পরিচয়')
  ) {
    return {
      text: isBn
        ? 'আমি প্রকৃতি মিত্র - প্রকৃতি বার্তার এআই অ্যাসিস্ট্যান্ট। আমি খাঁটি অর্গানিক খাবার, পুষ্টিগুণ, ঘরোয়া রেসিপি, বিশুদ্ধতা যাচাই এবং আমাদের পণ্যের বিস্তারিত তথ্য দিয়ে আপনাকে সাহায্য করি।'
        : 'I am Prokriti Assistant - the AI guide for Prokriti Barta. I help you with pure organic foods, nutrition benefits, healthy recipes, purity verification, and our products.',
    };
  }

  // --- B. Diabetes / Blood Sugar queries ---
  if (
    query.includes('ডায়াবেটিস') || query.includes('diabetes') || 
    query.includes('সুগার') || query.includes('sugar') || query.includes('রক্তের শর্করা')
  ) {
    const recs = productsData.filter(p => p.id.includes('chia') || p.id.includes('kalijira') || p.id.includes('tea'));
    return {
      text: isBn
        ? 'ডায়াবেটিস নিয়ন্ত্রণে সহায়ক প্রাকৃতিক খাবার:\n- কালোজিরা তেল: নিয়মিত সকালে হালকা গরম পানিতে কয়েক ফোঁটা কালোজিরা তেল ইনসুলিন সংবেদনশীলতা বাড়াতে সহায়তা করে।\n- অর্গানিক চিয়া সিড: উচ্চ দ্রবণীয় ফাইবার সমৃদ্ধ যা রক্তে শর্করার দ্রুত বৃদ্ধি প্রতিরোধ করে।\n- অপরাজিতা চা / গ্রিন টি: অ্যান্টিঅক্সিডেন্টে ভরপুর এবং প্রাকৃতিক মেটাবলিজম বুস্টার।\n- পরিহার করুন: চিনি ও কৃত্রিম মিষ্টিযুক্ত প্রক্রিয়াজাত খাদ্য।'
        : 'Natural Organic Foods for Diabetes Management:\n- Cold-Pressed Black Seed Oil: Promotes healthy insulin sensitivity when taken with warm water.\n- Organic Chia Seeds: Rich in soluble dietary fiber that stabilizes blood glucose spikes.\n- Green Tea & Butterfly Pea Infusions: Loaded with polyphenols that boost metabolic wellness.\n- Avoid: Refined sugars and artificially sweetened foods.',
      actionLink: '/shop',
      actionLabel: isBn ? 'উপকারী পণ্যসমূহ দেখুন' : 'Explore Suitable Products',
      products: recs.slice(0, 2),
    };
  }

  // --- C. Weight Loss / Fat Burn / Diet ---
  if (
    query.includes('ওজন কমানো') || query.includes('weight loss') || 
    query.includes('মেদ') || query.includes('diet') || query.includes('ডায়েট') ||
    query.includes('fat burn') || query.includes('চিকন')
  ) {
    const recs = productsData.filter(p => p.id.includes('chia') || p.id.includes('honey') || p.id.includes('tea'));
    return {
      text: isBn
        ? 'প্রাকৃতিক উপায়ে ওজন কমানোর স্বাস্থ্যকর রুটিন:\n১. সকালের ডিটক্স পানীয়: এক গ্লাস হালকা গরম পানিতে ১ চামচ কাঁচা সুন্দরবনের মধু ও লেবুর রস মিশিয়ে পান করুন।\n২. চিয়া ওয়াটার: ১ চামচ চিয়া সিড ১৫ মিনিট পানিতে ভিজিয়ে পান করুন, এটি দীর্ঘক্ষণ পেট ভরা রাখে।\n৩. রান্নায় খাঁটি ঘানির তেল বা পরিমিত গাওয়া ঘি ব্যবহার করুন, যা শরীরের ভালো ফ্যাট নিশ্চিত করে।\n৪. চিনিযুক্ত পানীয়ের বদলে গ্রিন টি বা হারবাল চা পান করুন।'
        : 'Healthy Natural Routine for Weight Management:\n1. Morning Detox Drink: 1 glass warm water with 1 tsp raw wild honey and fresh lemon juice.\n2. Soaked Chia Seeds: Drink 1 tbsp soaked chia seeds before meals to reduce cravings naturally.\n3. Cooking Oils: Use cold-pressed oils or measured Vedic Ghee for essential healthy fatty acids.\n4. Herbal Beverage: Swap sugary drinks with pesticide-free green tea.',
      actionLink: '/shop?category=nuts-seeds',
      actionLabel: isBn ? 'চিয়া সিড ও ডায়েট সুপারফুড' : 'Explore Diet Superfoods',
      products: recs.slice(0, 2),
    };
  }

  // --- D. Digestion, Gas, Acidity & Gut Health ---
  if (
    query.includes('গ্যাস') || query.includes('হজম') || query.includes('acidity') || 
    query.includes('digestion') || query.includes('এসিডিটি') || query.includes('কোষ্ঠকাঠিন্য') ||
    query.includes('constipation') || query.includes('পেট')
  ) {
    const recs = productsData.filter(p => p.id.includes('ghee') || p.id.includes('honey') || p.id.includes('chia'));
    return {
      text: isBn
        ? 'হজমশক্তি বৃদ্ধি ও গ্যাস্ট্রিক দূর করার প্রাকৃতিক উপায়:\n- বৈদিক বিলোনা ঘি: পেটের মাইক্রোবায়োম ও অন্ত্রের আস্তরণ সুস্থ রাখে এবং প্রাকৃতিক বাটাইরেট সরবরাহ করে। রাতে গরম দুধে ১ চামচ ঘি হজমে দারুণ কার্যকরী।\n- খাঁটি মধু: পাকস্থলীর প্রদাহ প্রশমিত করে এবং হজমে সহায়ক এনজাইম দেয়।\n- পর্যাপ্ত ফাইবার: চিয়া সিড এবং ঐতিহ্যবাহী লাল চালের অদ্রবণীয় ফাইবার কোষ্ঠকাঠিন্য দূর করে।'
        : 'Natural Remedies for Digestion & Acidity Relief:\n- Vedic Bilona Ghee: Contains natural butyric acid that repairs the gut lining and nourishes beneficial gut flora. 1 tsp with warm milk at bedtime aids smooth digestion.\n- Raw Honey: Soothes stomach inflammation with active digestive enzymes.\n- High Dietary Fiber: Chia seeds and unpolished red rice keep the digestive tract clean.',
      actionLink: '/shop?category=ghee-oils',
      actionLabel: isBn ? 'বিলোনা ঘি ও মধু দেখুন' : 'Explore Digestion Helpers',
      products: recs.slice(0, 2),
    };
  }

  // --- E. Skin Glow & Hair Care ---
  if (
    query.includes('ত্বক') || query.includes('skin') || 
    query.includes('চুল') || query.includes('hair') || 
    query.includes('উজ্জ্বল') || query.includes('glow') || query.includes('hair fall')
  ) {
    const recs = productsData.filter(p => p.id.includes('coconut') || p.id.includes('mustard') || p.id.includes('honey'));
    return {
      text: isBn
        ? 'ত্বক ও চুলের প্রাকৃতিক যত্ন:\n- খাঁটি কাঠের ঘানির নারকেল তেল: চুলে পুষ্টি যোগায় ও চুল পড়া কমাতে সাহায্য করে।\n- কাঁচা মধুর ফেসপ্যাক: মুখে ১০-১৫ মিনিট কাঁচা মধু লাগিয়ে ধুয়ে ফেললে ত্বক প্রাকৃতিক উজ্জ্বলতা পায় ও আর্দ্র থাকে।\n- খাঁটি সরিষার তেল: প্রাচীনকাল থেকেই স্কিন ম্যাসাজ ও রক্ত সঞ্চালন বাড়াতে অনন্য।'
        : 'Natural Glow & Hair Care Remedies:\n- Cold-Pressed Extra Virgin Coconut Oil: Deeply conditions roots and prevents hair breakage.\n- Raw Honey Face Mask: Applying pure unpasteurized honey for 15 minutes provides deep hydration and antibacterial glow.\n- Wood-Pressed Mustard Oil: Traditional therapeutic body massage oil for improved skin circulation.',
      actionLink: '/shop?category=ghee-oils',
      actionLabel: isBn ? 'নারকেল ও খাঁটি তেল দেখুন' : 'Explore Natural Oils',
      products: recs.slice(0, 2),
    };
  }

  // --- F. Calcium, Bone Strength & Joint Pain ---
  if (
    query.includes('ক্যালসিয়াম') || query.includes('calcium') || 
    query.includes('হাড়') || query.includes('bone') || 
    query.includes('ব্যাথ') || query.includes('pain') || query.includes('হাঁটু')
  ) {
    const recs = productsData.filter(p => p.id.includes('pumpkin') || p.id.includes('chia') || p.id.includes('ghee'));
    return {
      text: isBn
        ? 'হাড় ও জয়েন্টের যত্নে ক্যালসিয়াম সমৃদ্ধ প্রাকৃতিক খাদ্য:\n১. মিষ্টি কুমড়ার বীজ ও চিয়া সিড: প্রচুর পরিমাণে ম্যাগনেসিয়াম, ক্যালসিয়াম ও ফসফরাস থাকে যা হাড়ের ঘনত্ব বজায় রাখে।\n২. খাঁটি বিলোনা গাওয়া ঘি: জয়েন্টের লুব্রিকেশন উন্নত করতে এবং হাড়ের ক্ষয় রোধে সহায়ক।\n৩. কালোজিরা তেল কুসুম গরম করে জয়েন্টে ম্যাসাজ করলে প্রদাহ ও ব্যথা কমে।'
        : 'Calcium & Bone Health Powerhouses:\n1. Raw Pumpkin Seeds & Chia Seeds: Packed with plant calcium, magnesium, and phosphorus for strong bone density.\n2. Vedic Bilona Ghee: Natural lubricant for joints, reducing stiffness and wear.\n3. Black Seed Oil Massage: Gently warmed black seed oil reduces joint inflammation and soreness.',
      actionLink: '/shop?category=nuts-seeds',
      actionLabel: isBn ? 'সুপারফুড বীজ কালেকশন' : 'View Bone Health Superfoods',
      products: recs.slice(0, 2),
    };
  }

  // --- G. Honey & Purity Tests ---
  if (
    query.includes('মধু') || query.includes('honey') || 
    query.includes('খাঁটি') || query.includes('pure') || 
    query.includes('সুন্দরবন') || query.includes('sundarban') ||
    query.includes('চেনার উপায়')
  ) {
    const honeyProducts = productsData.filter(p => p.category === 'honey').slice(0, 3);
    return {
      text: isBn
        ? 'সুন্দরবনের খাঁটি বুনো মধু চেনার ৩টি সহজ ঘরোয়া পরীক্ষা:\n১. পানির গ্লাস টেস্ট: এক গ্লাস সাধারণ পানিতে এক চামচ মধু ফেলুন। খাঁটি মধু সরাসরি নিচে জমা হবে, নিজে থেকে দ্রবীভূত হবে না।\n২. টিস্যু টেস্ট: ব্লটিং পেপার বা টিস্যুর ওপর এক ফোঁটা মধু দিন। যদি চারপাশে ভিজে ছড়িয়ে না যায়, তবে তা খাঁটি ও জলীয় অংশমুক্ত।\n৩. প্রাকৃতিকভাবে জমাট বাঁধা: খাঁটি মধু শীতকালে বা তাপমাত্রার তারতম্যে ক্রিস্টালাইজড (জমাট) হতে পারে, যা এর কাঁচা ও অপাস্তুরিত থাকার প্রমাণ।'
        : '3 Simple Home Tests for Pure Sundarban Honey:\n1. Water Dispersion Test: Drop 1 spoon of honey in clean water. Pure honey settles straight to the bottom without dissolving on its own.\n2. Tissue Absorbency Test: Place a drop on blotting paper; pure honey remains a bead without soaking through.\n3. Natural Crystallization: Pure raw honey may naturally crystallize in cooler temperatures, which proves it is unheated and rich in natural enzymes.',
      actionLink: '/shop?category=honey',
      actionLabel: isBn ? 'খাঁটি মধু কালেকশন দেখুন' : 'Explore Honey Collection',
      products: honeyProducts,
    };
  }

  // --- H. Ghee & Bilona Queries ---
  if (
    query.includes('ঘি') || query.includes('ghee') || 
    query.includes('বিলোনা') || query.includes('bilona') ||
    query.includes('গাওয়া')
  ) {
    const gheeProducts = productsData.filter(p => p.category === 'ghee-oils').slice(0, 2);
    return {
      text: isBn
        ? 'বিলোনা গাওয়া ঘি কেন সাধারণ ঘির চেয়ে বহুগুণ স্বাস্থ্যকর?\n- সাধারণ বাণিজ্যিক ঘি সরাসরি দুধের ক্রিম বা মাখন জ্বাল দিয়ে তৈরি হয়।\n- আমাদের বৈদিক বিলোনা ঘি তৈরিতে দেশি গরুর দুধ জ্বাল দিয়ে দই পাতা হয়, এরপর কাঠের মন্থনী দিয়ে দই মন্থন করে মাখন আলাদা করা হয় এবং মৃদু আঁচে সোনালী দানাযুক্ত ঘি তৈরি করা হয়।\n- এটি শতভাগ ল্যাকটোজ ও কেসিন মুক্ত, হজমে সহায়ক এবং ভিটামিন এ, ডি, ই এবং কে সমৃদ্ধ।'
        : 'Why Vedic Bilona Ghee is Superior to Commercial Ghee:\n- Commercial ghee is boiled directly from factory cream or raw butter.\n- Our Vedic Bilona Ghee is crafted by culturing whole A2 Deshi cow milk into dahi, churning with traditional wooden churners, and simmering on low flame.\n- 100% lactose & casein free, highly bioavailable, and packed with fat-soluble vitamins A, D, E & K.',
      actionLink: '/shop?category=ghee-oils',
      actionLabel: isBn ? 'বিলোনা ঘি কালেকশন দেখুন' : 'Explore Bilona Ghee',
      products: gheeProducts,
    };
  }

  // --- I. Mustard Oil & Cold Pressed Oils ---
  if (
    query.includes('সরিষা') || query.includes('mustard') || 
    query.includes('তেল') || query.includes('oil') || 
    query.includes('ঘানি') || query.includes('cold-pressed')
  ) {
    const oilProducts = productsData.filter(p => p.id.includes('mustard') || p.id.includes('coconut') || p.id.includes('kalijira'));
    return {
      text: isBn
        ? 'কাঠের ঘানির কোল্ড-প্রেসড তেলের বিশেষত্ব:\n- কাঠের ঘানিতে ধীরগতিতে বীজ ভাঙানো হয় যাতে তাপমাত্রা ৪০ ডিগ্রি সেলসিয়াসের নিচে থাকে।\n- ফলে তেলের প্রাকৃতিক গন্ধ, স্বাদ, ওমেগা-৩ ও এসেনশিয়াল ফ্যাটি এসিড সম্পূর্ণ বজায় থাকে।\n- কোনো কৃত্রিম দ্রাবক, রাসায়নিক বা ক্ষতিকর ব্লিচিং করা হয় না।'
        : 'Benefits of Traditional Wood-Pressed Oils:\n- Slow-pressed in seasoned tamarind wood presses below 40°C.\n- Retains natural pungency, volatile aromatic oils, and essential Omega-3 & Omega-6 fatty acids.\n- 100% free of chemical solvents, artificial refining, or bleaching.',
      actionLink: '/shop?category=ghee-oils',
      actionLabel: isBn ? 'ঘানির তেল কালেকশন দেখুন' : 'Explore Pure Oils',
      products: oilProducts.slice(0, 2),
    };
  }

  // --- J. Delivery, Shipping, Cost & Timeline queries ---
  if (
    query.includes('ডেলিভারি') || query.includes('delivery') || 
    query.includes('shipping') || query.includes('চার্জ') || 
    query.includes('কুরিয়ার') || query.includes('courier') ||
    query.includes('কত দিন') || query.includes('how long') || query.includes('খরচ')
  ) {
    return {
      text: isBn
        ? 'আমাদের ডেলিভারি পলিসি ও চার্জ:\n- ঢাকা সিটি এলাকা: ২৪ - ৩৬ ঘণ্টা (চার্জ ৳৬০)\n- ঢাকার বাইরে সকল জেলা: ২ - ৩ কার্যদিবস (চার্জ ৳১০০)\n- বিশেষ সুবিধা: ৳১০০০ বা তার বেশি অর্ডারে সারা বাংলাদেশে ফ্রি ডেলিভারি!\n- ক্যাশ অন ডেলিভারি (COD) উপলব্ধ এবং ডেলিভারিম্যানের সামনে পণ্য দেখে নেওয়ার শতভাগ নিশ্চয়তা।'
        : 'Our Nationwide Delivery Policy:\n- Dhaka City Corporation: 24 - 36 Hours (Delivery Fee ৳60)\n- Outside Dhaka (All Districts): 2 - 3 Business Days (Delivery Fee ৳100)\n- Special Offer: FREE Shipping across Bangladesh on orders over ৳1000!\n- 100% Cash on Delivery (COD) available with parcel inspection before payment.',
      actionLink: '/delivery',
      actionLabel: isBn ? 'সম্পূর্ণ ডেলিভারি পলিসি দেখুন' : 'View Full Delivery Policy',
    };
  }

  // --- K. Contact / Helpline / Support queries ---
  if (
    query.includes('ফোন') || query.includes('phone') || 
    query.includes('হেল্পলাইন') || query.includes('helpline') || 
    query.includes('যোগাযোগ') || query.includes('contact') || 
    query.includes('নাম্বার') || query.includes('number') || query.includes('support')
  ) {
    return {
      text: isBn
        ? 'প্রকৃতি বার্তা কাস্টমার সাপোর্ট:\n- সরাসরি কল ও হোয়াটসঅ্যাপ: +880 1717-279166 (সকাল ৯:০০ - রাত ১০:০০ প্রতিদিন)\n- অফিসিয়াল ইমেইল: support@prokritibarta.com\n- ঠিকানা: বনানী, ঢাকা-১২১৩, বাংলাদেশ।'
        : 'Prokriti Barta Customer Helpline:\n- Call & WhatsApp: +880 1717-279166 (9:00 AM - 10:00 PM Daily)\n- Email: support@prokritibarta.com\n- Office: Banani, Dhaka-1213, Bangladesh.',
      actionLink: '/contact',
      actionLabel: isBn ? 'কন্টাক্ট পেজ ভিজিট করুন' : 'Visit Contact Page',
    };
  }

  // --- L. Direct Product Search by name / keyword ---
  const matchedProduct = productsData.find(p => {
    const name = (p.name || '').toLowerCase();
    const bnName = (p.bnName || '').toLowerCase();
    const tags = (p.tags || []).map(t => t.toLowerCase());
    return query.includes(name) || name.includes(query) || 
           query.includes(bnName) || bnName.includes(query) ||
           tags.some(t => query.includes(t));
  });

  if (matchedProduct) {
    return {
      text: isBn 
        ? `${matchedProduct.bnName || matchedProduct.name}\n- মূল্য: ৳${matchedProduct.price}\n- বিবরণ: ${matchedProduct.bnShortDesc || matchedProduct.shortDesc}\n- স্টক: ইন-স্টক (অর্ডার করতে ক্লিক করুন)।`
        : `${matchedProduct.name}\n- Price: ৳${matchedProduct.price}\n- Overview: ${matchedProduct.shortDesc}\n- Availability: In Stock (Click below to order).`,
      actionLink: `/product/${matchedProduct.id}`,
      actionLabel: isBn ? 'পণ্যটি বিস্তারিত দেখুন' : 'View Product Details',
      products: [matchedProduct],
    };
  }

  // --- M. Comprehensive Conversational Fallback ---
  if (isBn) {
    return {
      text: `আপনার প্রশ্নের জন্য ধন্যবাদ! "${rawInput}" সম্পর্কিত যেকোনো অর্গানিক সমাধান দিতে আমি প্রস্তুত।\n\nপ্রকৃতি বার্তার সকল পণ্য ১০০% রাসায়নিক ও প্রিজারভেটিভ মুক্ত। আপনি চাইলে:\n- মধু বা ঘির বিশুদ্ধতা যাচাই\n- সঠিক ডায়েট ও পুষ্টি পরিকল্পনা\n- ডেলিভারি চার্জ ও অর্ডার পদ্ধতি\nসম্পর্কে যেকোনো প্রশ্ন করতে পারেন।`,
      actionLink: '/shop',
      actionLabel: 'সকল পণ্য দেখুন',
    };
  } else {
    return {
      text: `Thank you for your question! I am happy to help with "${rawInput}".\n\nAll Prokriti Barta products are 100% pure, unadulterated, and free from preservatives. You can ask me about:\n- Testing honey & ghee purity\n- Personalized diet & nutrition advice\n- Delivery timelines & ordering guidance`,
      actionLink: '/shop',
      actionLabel: 'Browse All Products',
    };
  }
}
