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
      textBn: 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?',
      textEn: 'Please type your question. How can I help you today?',
      text: lang === 'bn' 
        ? 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?' 
        : 'Please type your question. How can I help you today?',
    };
  }

  // 1. Try Gemini API if available in env
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' && window.GEMINI_API_KEY);
  if (geminiApiKey) {
    try {
      const prompt = `You are 'প্রকৃতি মিত্র' (Prokriti Assistant), the friendly, professional, and knowledgeable AI assistant of 'প্রকৃতি বার্তা' (Prokriti Barta), a 100% natural organic food brand in Bangladesh.
Store information:
- Store Name: প্রকৃতি বার্তা (Prokriti Barta)
- Website: www.prokritibarta.com
- Delivery: Dhaka City ৳60 (24-36h), Outside Dhaka ৳100 (2-3 days). Free shipping over ৳1000.
- Payment: Cash on Delivery (COD), bKash, Nagad.
- Contact Helpline: +880 1717-279166 (9am - 10pm).
- Products: Sundarban Raw Wild Honey, Vedic Bilona Ghee, Wood-Pressed Mustard/Coconut/Kalijira Oil, Stone-Ground Turmeric & Spices, Organic Chia Seeds, Pumpkin Seeds, Madinah Dates, Sreemangal Tea, Butterfly Pea Blue Tea.
Rules:
- Never use em-dashes (—); always use standard hyphens (-).
- Never use emojis like sparkles.
- Understand Banglish (Bengali written in English alphabet) naturally.
- Provide response in JSON format with "textBn" (polite, fluent Bengali) and "textEn" (polite, fluent English).

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
          try {
            const parsed = JSON.parse(generatedText.replace(/```json/g, '').replace(/```/g, '').trim());
            if (parsed.textBn && parsed.textEn) {
              return {
                textBn: cleanText(parsed.textBn),
                textEn: cleanText(parsed.textEn),
                text: lang === 'bn' ? cleanText(parsed.textBn) : cleanText(parsed.textEn),
              };
            }
          } catch {
            const cleaned = cleanText(generatedText);
            return {
              textBn: cleaned,
              textEn: cleaned,
              text: cleaned,
            };
          }
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
 * Local Broad Knowledge & Context Matcher with Banglish support
 */
export function generateLocalIntelligentResponse(query, rawInput, lang = 'bn') {
  // --- A. Website & Brand Name Queries (Bangla & Banglish) ---
  if (
    query.includes('website') || query.includes('web site') || 
    query.includes('nam ki') || query.includes('name ki') || 
    query.includes('নাম কি') || query.includes('নাম কী') || 
    query.includes('কোম্পানির নাম') || query.includes('store name') ||
    query.includes('ব্র্যান্ড') || query.includes('brand') || query.includes('site er nam')
  ) {
    const textBn = 'আমাদের ওয়েবসাইটের নাম "প্রকৃতি বার্তা" (Prokriti Barta)। এটি বাংলাদেশের ১০০% খাঁটি, প্রাকৃতিক ও কেমিক্যাল-মুক্ত অর্গানিক খাবারের একটি বিশ্বস্ত প্রতিষ্ঠান। এখানে আপনি সুন্দরবনের বুনো মধু, বৈদিক বিলোনা ঘি, কাঠের ঘানির তেল, অর্গানিক বীজ ও সুপারফুড পাবেন।';
    const textEn = 'Our website name is "Prokriti Barta" (প্রকৃতি বার্তা). We are a trusted destination for 100% natural, unadulterated, and organic foods in Bangladesh, offering raw wild honey, Vedic Bilona ghee, wood-pressed oils, stone-ground spices, and superfoods.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/about',
      actionLabelBn: 'আমাদের সম্পর্কে জানুন',
      actionLabelEn: 'About Prokriti Barta',
      actionLabel: lang === 'bn' ? 'আমাদের সম্পর্কে জানুন' : 'About Prokriti Barta',
    };
  }

  // --- B. Chit-Chat & Greetings ---
  if (
    query.includes('কেমন আছেন') || query.includes('how are you') || 
    query.includes('kemon achen') || query.includes('kemon acho') || 
    query.includes('what\'s up') || query.includes('কী খবর') || query.includes('ki khobor')
  ) {
    const textBn = 'আমি ভালো আছি, ধন্যবাদ! আশা করি আপনিও সুস্থ ও ভালো আছেন। সুস্থ ও প্রাকৃতিক জীবনযাপনের যেকোনো বিষয়ে আপনাকে কীভাবে সাহায্য করতে পারি?';
    const textEn = 'I am doing well, thank you! I hope you are having a wonderful day. How can I assist you with your organic nutrition or health journey today?';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
    };
  }

  if (
    query.includes('hi') || query.includes('hello') || query.includes('hey') || 
    query.includes('হাই') || query.includes('হ্যালো') || query.includes('salam') || 
    query.includes('সালাম') || query.includes('নমস্কার') || query.includes('nomoshkar')
  ) {
    const textBn = 'প্রকৃতি বার্তায় আপনাকে স্বাগতম! আমি কীভাবে আপনাকে সহায়তা করতে পারি? আপনি আমাদের পণ্য, খাঁটি খাবার চেনার উপায় বা ডেলিভারি সম্পর্কে জানতে পারেন।';
    const textEn = 'Welcome to Prokriti Barta! How can I help you today? Feel free to ask about our pure organic products, natural health tips, or shipping policies.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
    };
  }

  if (
    query.includes('ধন্যবাদ') || query.includes('thanks') || 
    query.includes('thank you') || query.includes('shukriya') || query.includes('dhonnobad')
  ) {
    const textBn = 'আপনাকে অনেক ধন্যবাদ! সুস্থ থাকুন এবং খাঁটি প্রকৃতির সান্নিধ্যে থাকুন। যেকোনো প্রয়োজনে আমি সবসময় আপনার পাশে আছি।';
    const textEn = 'You are most welcome! Stay healthy and enjoy pure natural living. Let me know if you need anything else.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
    };
  }

  if (
    query.includes('কে তুমি') || query.includes('who are you') || 
    query.includes('tumi ke') || query.includes('apni ke') ||
    query.includes('তোমার পরিচয়') || query.includes('ki korte paro') || query.includes('what can you do')
  ) {
    const textBn = 'আমি প্রকৃতি মিত্র - প্রকৃতি বার্তার ভার্চুয়াল অ্যাসিস্ট্যান্ট। আমি অর্গানিক খাদ্য নির্বাচন, ডায়াবেটিস বা ওজন নিয়ন্ত্রণে প্রাকৃতিক পরামর্শ, খাঁটি মধু/ঘি/তেলের গুণাগুণ পরীক্ষা এবং অর্ডার সংক্রান্ত সহায়তায় সাহায্য করি।';
    const textEn = 'I am Prokriti Assistant - the virtual AI companion for Prokriti Barta. I help you explore organic foods, healthy dietary guidance, purity verification, and seamless ordering.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
    };
  }

  // --- C. Diabetes / Blood Sugar queries ---
  if (
    query.includes('ডায়াবেটিস') || query.includes('diabetes') || 
    query.includes('সুগার') || query.includes('sugar') || query.includes('diabetic')
  ) {
    const recs = productsData.filter(p => p.id.includes('chia') || p.id.includes('kalijira') || p.id.includes('tea'));
    const textBn = 'ডায়াবেটিস নিয়ন্ত্রণে সহায়ক প্রাকৃতিক খাবার:\n- কালোজিরা তেল: সকালে কুসুম গরম পানিতে কয়েক ফোঁটা কালোজিরা তেল ইনসুলিন কার্যক্ষমতা বাড়াতে সাহায্য করে।\n- অর্গানিক চিয়া সিড: উচ্চ দ্রবণীয় ফাইবার রক্তে গ্লুকোজের আকস্মিক বৃদ্ধি প্রতিরোধ করে।\n- অপরাজিতা চা / গ্রিন টি: প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট মেটাবলিজম সুস্থ রাখে।';
    const textEn = 'Natural Foods for Diabetes Management:\n- Cold-Pressed Black Seed Oil: Improves natural insulin sensitivity when taken with warm water.\n- Organic Chia Seeds: Soluble dietary fiber slows down carbohydrate absorption.\n- Green Tea & Butterfly Pea Infusions: Rich in natural antioxidants to boost metabolism.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop',
      actionLabelBn: 'উপকারী পণ্যসমূহ দেখুন',
      actionLabelEn: 'Explore Suitable Products',
      actionLabel: lang === 'bn' ? 'উপকারী পণ্যসমূহ দেখুন' : 'Explore Suitable Products',
      products: recs.slice(0, 2),
    };
  }

  // --- D. Weight Loss / Fat Burn / Diet ---
  if (
    query.includes('ওজন') || query.includes('weight') || 
    query.includes('মেদ') || query.includes('diet') || query.includes('ডায়েট') ||
    query.includes('fat') || query.includes('slimming') || query.includes('ojon')
  ) {
    const recs = productsData.filter(p => p.id.includes('chia') || p.id.includes('honey') || p.id.includes('tea'));
    const textBn = 'প্রাকৃতিক উপায়ে ওজন ব্যবস্থাপনার স্বাস্থ্যকর পরামর্শ:\n১. সকালের ডিটক্স ড্রিংক: হালকা গরম পানিতে ১ চামচ কাঁচা সুন্দরবনের মধু ও লেবুর রস মিশিয়ে পান করুন।\n২. চিয়া সিড: ১ চামচ চিয়া সিড পানিতে ভিজিয়ে খাবারের আগে পান করলে দীর্ঘক্ষণ ক্ষুধা নিয়ন্ত্রণে থাকে।\n৩. রান্না ও ফ্যাট: পরিশোধিত তেলের বদলে ঘানির সরিষার তেল ও পরিমিত বিলোনা গাওয়া ঘি গ্রহণ করুন।';
    const textEn = 'Natural Weight Management Routine:\n1. Morning Detox Drink: 1 glass warm water with 1 tsp raw wild honey and fresh lemon juice.\n2. Soaked Chia Seeds: Drink 1 tbsp soaked chia seeds before meals for natural satiety.\n3. Healthy Fats: Replace refined vegetable oils with traditional wood-pressed oils and measured Bilona ghee.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop?category=nuts-seeds',
      actionLabelBn: 'চিয়া সিড ও ডায়েট সুপারফুড',
      actionLabelEn: 'Explore Diet Superfoods',
      actionLabel: lang === 'bn' ? 'চিয়া সিড ও ডায়েট সুপারফুড' : 'Explore Diet Superfoods',
      products: recs.slice(0, 2),
    };
  }

  // --- E. Digestion, Gas, Acidity & Gut Health ---
  if (
    query.includes('গ্যাস') || query.includes('হজম') || query.includes('acidity') || 
    query.includes('digestion') || query.includes('এসিডিটি') || query.includes('pet') ||
    query.includes('gastric') || query.includes('gas')
  ) {
    const recs = productsData.filter(p => p.id.includes('ghee') || p.id.includes('honey') || p.id.includes('chia'));
    const textBn = 'হজমশক্তি বৃদ্ধি ও এসিডিটি প্রশমনে সহায়ক খাদ্য:\n- বৈদিক বিলোনা ঘি: এতে থাকা প্রাকৃতিক বুটিরিক এসিড অন্ত্রের আস্তরণ সুস্থ রাখে। রাতে হালকা গরম দুধে ১ চামচ ঘি হজমে খুবই উপকারী।\n- খাঁটি মধু: পাকস্থলীর প্রদাহ শান্ত করে এবং প্রাকৃতিক হজমকারক এনজাইম জোগায়।\n- দ্রবণীয় ফাইবার: চিয়া সিড পেটের স্বাভাবিক ক্রিয়া সচল রাখে।';
    const textEn = 'Natural Digestive Wellness Solutions:\n- Vedic Bilona Ghee: Rich in butyric acid, which supports intestinal lining health. 1 tsp in warm milk before sleep aids comfortable digestion.\n- Raw Honey: Soothes gastric lining with live natural enzymes.\n- Dietary Fiber: Chia seeds and whole grains support smooth digestion.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop?category=ghee-oils',
      actionLabelBn: 'বিলোনা ঘি ও মধু দেখুন',
      actionLabelEn: 'Explore Digestion Helpers',
      actionLabel: lang === 'bn' ? 'বিলোনা ঘি ও মধু দেখুন' : 'Explore Digestion Helpers',
      products: recs.slice(0, 2),
    };
  }

  // --- F. Honey & Purity Tests (Bangla & Banglish) ---
  if (
    query.includes('মধু') || query.includes('honey') || 
    query.includes('modhu') || query.includes('khati') || 
    query.includes('pure') || query.includes('সুন্দরবন') || query.includes('sundarban')
  ) {
    const honeyProducts = productsData.filter(p => p.category === 'honey').slice(0, 3);
    const textBn = 'সুন্দরবনের খাঁটি বুনো মধু চেনার ৩টি সহজ ঘরোয়া পরীক্ষা:\n১. পানির টেস্ট: এক গ্লাস পানিতে এক চামচ মধু ফেললে খাঁটি মধু সহজে না গুলে সরাসরি নিচে তলিয়ে যাবে।\n২. টিস্যু টেস্ট: টিস্যুতে এক ফোঁটা মধু রাখলে তা কাগজ ভিজিয়ে ছড়িয়ে পড়বে না।\n৩. কাঁচা সুবাস: এতে থাকবে প্রাকৃতিক ম্যানগ্রোভ ফুলের সুবাস ও প্রাকৃতিক এনজাইম।';
    const textEn = '3 Simple Home Tests for Pure Sundarban Honey:\n1. Water Dispersion Test: Drop 1 spoon of honey in clean water; pure honey settles straight to the bottom.\n2. Tissue Test: Place a drop on blotting paper; pure honey remains intact without soaking through.\n3. Raw Aroma: Features distinct floral mangrove scent with live natural enzymes.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop?category=honey',
      actionLabelBn: 'খাঁটি মধু কালেকশন দেখুন',
      actionLabelEn: 'Explore Honey Collection',
      actionLabel: lang === 'bn' ? 'খাঁটি মধু কালেকশন দেখুন' : 'Explore Honey Collection',
      products: honeyProducts,
    };
  }

  // --- G. Ghee & Bilona Queries ---
  if (
    query.includes('ঘি') || query.includes('ghee') || 
    query.includes('বিলোনা') || query.includes('bilona') ||
    query.includes('গাওয়া') || query.includes('ghi')
  ) {
    const gheeProducts = productsData.filter(p => p.category === 'ghee-oils').slice(0, 2);
    const textBn = 'আমাদের বৈদিক বিলোনা ঘি কেন অনন্য?\n- দেশি গরুর দুধের খাঁটি দই থেকে কাঠের মন্থনী দিয়ে মাখন আলাদা করে মৃদু আঁচে প্রস্তুত করা হয়।\n- এটি শতভাগ ল্যাকটোজ ও কেসিন মুক্ত, সুস্বাদু দানাদার ও সহজে হজমযোগ্য।';
    const textEn = 'Why Vedic Bilona Ghee is Superior:\n- Churned traditionally from cultured whole Deshi cow milk dahi with wooden churners.\n- 100% lactose & casein free, highly aromatic, golden granular, and easy to digest.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop?category=ghee-oils',
      actionLabelBn: 'বিলোনা ঘি কালেকশন দেখুন',
      actionLabelEn: 'Explore Bilona Ghee',
      actionLabel: lang === 'bn' ? 'বিলোনা ঘি কালেকশন দেখুন' : 'Explore Bilona Ghee',
      products: gheeProducts,
    };
  }

  // --- H. Mustard Oil & Cold Pressed Oils ---
  if (
    query.includes('সরিষা') || query.includes('mustard') || 
    query.includes('তেল') || query.includes('oil') || 
    query.includes('ঘানি') || query.includes('tel') || query.includes('shorisha') || query.includes('sorisha')
  ) {
    const oilProducts = productsData.filter(p => p.id.includes('mustard') || p.id.includes('coconut') || p.id.includes('kalijira'));
    const textBn = 'কাঠের ঘানির কোল্ড-প্রেসড তেল:\n- তেঁতুল কাঠের ঘানিতে ৪০ ডিগ্রি সেলসিয়াসের নিচে ধীরগতিতে কোল্ড-প্রেসড পদ্ধতিতে তেল নিষ্কাশন করা হয়।\n- ফলে ওমেগা-৩ ও প্রাকৃতিক এসেনশিয়াল উপাদান অক্ষুণ্ণ থাকে। কোনো ক্ষতিকর কেমিক্যাল ব্যবহার করা হয় না।';
    const textEn = 'Traditional Wood-Pressed Oils:\n- Cold-pressed slowly in wooden mills below 40°C.\n- Preserves natural Omega-3, antioxidants, and pungent flavor without chemical refining.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop?category=ghee-oils',
      actionLabelBn: 'ঘানির তেল কালেকশন দেখুন',
      actionLabelEn: 'Explore Pure Oils',
      actionLabel: lang === 'bn' ? 'ঘানির তেল কালেকশন দেখুন' : 'Explore Pure Oils',
      products: oilProducts.slice(0, 2),
    };
  }

  // --- I. Delivery, Shipping, Cost & Timeline queries ---
  if (
    query.includes('ডেলিভারি') || query.includes('delivery') || 
    query.includes('shipping') || query.includes('চার্জ') || 
    query.includes('charge') || query.includes('khoroch') ||
    query.includes('koto din') || query.includes('how long') || query.includes('courier')
  ) {
    const textBn = 'আমাদের ডেলিভারি পলিসি ও চার্জ:\n- ঢাকা সিটি এলাকা: ২৪ - ৩৬ ঘণ্টা (চার্জ ৳৬০)\n- ঢাকার বাইরে সকল জেলা: ২ - ৩ কার্যদিবস (চার্জ ৳১০০)\n- বিশেষ অফার: ৳১০০০ বা তার বেশি অর্ডারে সারা বাংলাদেশে ডেলিভারি ফ্রি!\n- ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে।';
    const textEn = 'Our Delivery Policy & Shipping Fees:\n- Dhaka City Corporation: 24 - 36 Hours (Delivery Fee ৳60)\n- Outside Dhaka (All Districts): 2 - 3 Business Days (Delivery Fee ৳100)\n- Special Offer: FREE Shipping nationwide on orders over ৳1000!\n- 100% Cash on Delivery (COD) available.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/delivery',
      actionLabelBn: 'সম্পূর্ণ ডেলিভারি পলিসি দেখুন',
      actionLabelEn: 'View Full Delivery Policy',
      actionLabel: lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি পলিসি দেখুন' : 'View Full Delivery Policy',
    };
  }

  // --- J. Ordering, Buying & Payment Methods ---
  if (
    query.includes('অর্ডার') || query.includes('order') || 
    query.includes('payment') || query.includes('পেমেন্ট') || 
    query.includes('kivabe') || query.includes('how to buy') || query.includes('bkash') || query.includes('বিকাশ')
  ) {
    const textBn = 'সহজেই অর্ডার করার নিয়ম:\n১. পছন্দের পণ্য Cart-এ যুক্ত করে Checkout পেজে নাম ও ঠিকানা দিন।\n২. পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য দিন), বিকাশ বা নগদ।\n৩. অর্ডার সাবমিট করলে সাথে সাথে এসএমএস ও কনফার্মেশন পাবেন।';
    const textEn = 'How to Place an Order:\n1. Add desired products to Cart and proceed to Checkout with your delivery address.\n2. Payment: Cash on Delivery (COD), bKash, or Nagad.\n3. You will receive an immediate SMS order confirmation.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/shop',
      actionLabelBn: 'শপে পণ্য ব্রাউজ করুন',
      actionLabelEn: 'Browse Shop Products',
      actionLabel: lang === 'bn' ? 'শপে পণ্য ব্রাউজ করুন' : 'Browse Shop Products',
    };
  }

  // --- K. Contact / Helpline / Support queries ---
  if (
    query.includes('ফোন') || query.includes('phone') || 
    query.includes('হেল্পলাইন') || query.includes('helpline') || 
    query.includes('যোগাযোগ') || query.includes('contact') || 
    query.includes('নাম্বার') || query.includes('number') || query.includes('thikana') || query.includes('address')
  ) {
    const textBn = 'প্রকৃতি বার্তা কাস্টমার সাপোর্ট:\n- সরাসরি কল ও হোয়াটসঅ্যাপ: +880 1717-279166 (সকাল ৯:০০ - রাত ১০:০০ প্রতিদিন)\n- অফিসিয়াল ইমেইল: support@prokritibarta.com\n- কার্যালয়: বনানী, ঢাকা-১২১৩, বাংলাদেশ।';
    const textEn = 'Prokriti Barta Customer Helpline:\n- Call & WhatsApp: +880 1717-279166 (9:00 AM - 10:00 PM Daily)\n- Official Email: support@prokritibarta.com\n- Office: Banani, Dhaka-1213, Bangladesh.';
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: '/contact',
      actionLabelBn: 'কন্টাক্ট পেজ ভিজিট করুন',
      actionLabelEn: 'Visit Contact Page',
      actionLabel: lang === 'bn' ? 'কন্টাক্ট পেজ ভিজিট করুন' : 'Visit Contact Page',
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
    const textBn = `${matchedProduct.bnName || matchedProduct.name}\n- মূল্য: ৳${matchedProduct.price}\n- বিবরণ: ${matchedProduct.bnShortDesc || matchedProduct.shortDesc}\n- প্রাপ্যতা: ইন-স্টক (অর্ডার করতে নিচের বাটনে ক্লিক করুন)।`;
    const textEn = `${matchedProduct.name}\n- Price: ৳${matchedProduct.price}\n- Overview: ${matchedProduct.shortDesc}\n- Status: In Stock (Click below to order).`;
    return {
      textBn,
      textEn,
      text: lang === 'bn' ? textBn : textEn,
      actionLink: `/product/${matchedProduct.id}`,
      actionLabelBn: 'পণ্যটি বিস্তারিত দেখুন',
      actionLabelEn: 'View Product Details',
      actionLabel: lang === 'bn' ? 'পণ্যটি বিস্তারিত দেখুন' : 'View Product Details',
      products: [matchedProduct],
    };
  }

  // --- M. Polite, Professional Fallback for Unrecognized Inquiries ---
  const textBn = 'আপনার বার্তার জন্য ধন্যবাদ। এই বিষয়ে আমার কাছে সুনির্দিষ্ট তথ্য নেই। তবে আমাদের অর্গানিক খাদ্যের স্বাস্থ্য উপকারিতা, খাঁটি মধু ও তেলের বিশুদ্ধতা যাচাই অথবা ডেলিভারি ও অর্ডার সংক্রান্ত যেকোনো তথ্যে আমি আপনাকে সাহায্য করতে পারি।\n\nসরাসরি আমাদের কাস্টমার সাপোর্টে কথা বলতে কল বা হোয়াটসঅ্যাপ করুন: +880 1717-279166 নম্বরে।';
  const textEn = 'Thank you for reaching out. I do not have specific information regarding that topic. However, I am ready to assist you with organic nutrition tips, purity verification (honey, ghee, oils), product recommendations, or delivery and order queries.\n\nYou can also contact our support team directly via Call or WhatsApp at +880 1717-279166.';
  return {
    textBn,
    textEn,
    text: lang === 'bn' ? textBn : textEn,
    actionLink: '/shop',
    actionLabelBn: 'সকল পণ্য ব্রাউজ করুন',
    actionLabelEn: 'Browse All Products',
    actionLabel: lang === 'bn' ? 'সকল পণ্য ব্রাউজ করুন' : 'Browse All Products',
  };
}
