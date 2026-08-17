import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import chatbotFaqData from '../data/chatbotFaq.json';

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
 * Normalizes input text for multi-language and Banglish matching
 */
function normalizeQuery(input) {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/[?,.!/\\;:_`~*^%$#@!+()]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Checks if query is within the domain of Prokriti Barta and Organic Food
 */
function isRelevantDomainQuery(q) {
  const domainKeywords = [
    // Brand & Website
    'prokriti', 'barta', 'prokiti', 'prakriti', 'barta', 'website', 'store', 'shop', 'brand', 'company',
    'প্রকৃতি', 'বার্তা', 'ওয়েবসাইট', 'স্টোর', 'দোকান', 'কোম্পানি', 'ব্র্যান্ড',
    // Products & Food Items
    'organic', 'food', 'honey', 'modhu', 'ghee', 'oil', 'tel', 'mustard', 'sorisha', 'coconut', 'narkel',
    'kalijira', 'black seed', 'chia', 'seed', 'pumpkin', 'kumra', 'spice', 'turmeric', 'haldi', 'holud',
    'chili', 'morich', 'coriander', 'dhonia', 'tea', 'cha', 'blue tea', 'green tea', 'date', 'khejur',
    'অর্গানিক', 'খাবার', 'খাদ্য', 'মধু', 'ঘি', 'তেল', 'সরিষা', 'নারকেল', 'কালোজিরা', 'চিয়া', 'বীজ', 'কুমড়া',
    'মসলা', 'হলুদ', 'মরিচ', 'ধনিয়া', 'চা', 'খেজুর', 'খাঁটি', 'বিশুদ্ধ', 'বিলোনা', 'ঘানি', 'কোল্ড প্রেস',
    // Order, Delivery, Payment, Customer Care
    'order', 'buy', 'purchase', 'cart', 'checkout', 'delivery', 'shipping', 'charge', 'cost', 'fee',
    'payment', 'pay', 'cod', 'cash', 'bkash', 'nagad', 'rocket', 'card', 'return', 'refund', 'replace',
    'helpline', 'contact', 'support', 'phone', 'number', 'address', 'location', 'time', 'hours', 'tracking',
    'অর্ডার', 'কেনা', 'ক্রয়', 'কার্ট', 'চেকআউট', 'ডেলিভারি', 'শিপিং', 'চার্জ', 'খরচ', 'টাকা', 'পেমেন্ট',
    'ক্যাশ', 'বিকাশ', 'নগদ', 'রকেট', 'ফেরত', 'রিটার্ন', 'রিফান্ড', 'হেল্পলাইন', 'যোগাযোগ', 'ফোন', 'নম্বর', 'ঠিকানা',
    // Health & Nutrition
    'health', 'benefit', 'nutrition', 'purity', 'test', 'pure', 'fresh', 'raw', 'natural', 'chemical', 'weight',
    'স্বাস্থ্য', 'উপকার', 'উপকারিতা', 'পুষ্টি', 'পরীক্ষা', 'টেস্ট', 'ভেজাল', 'প্রাকৃতিক', 'ওজন', 'ডায়াবেটিস',
    // Greetings & Common conversational
    'hi', 'hello', 'hey', 'greetings', 'kemon', 'valo', 'help', 'shohayota',
    'হাই', 'হ্যালো', 'কেমন', 'ভালো', 'সাহায্য', 'সহায়তা', 'ধন্যবাদ', 'থ্যাংকস', 'thanks', 'thank you'
  ];

  return domainKeywords.some(keyword => q.includes(keyword));
}

/**
 * Intelligent Multi-Tier Knowledge & Conversational Engine
 */
export async function getIntelligentResponse(userInput, lang = 'bn') {
  const query = normalizeQuery(userInput);

  if (!query) {
    return {
      textBn: 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?',
      textEn: 'Please type your question. How can I help you today?',
      text: lang === 'bn' 
        ? 'দয়া করে আপনার প্রশ্নটি লিখুন। আমি কীভাবে আপনাকে সাহায্য করতে পারি?' 
        : 'Please type your question. How can I help you today?',
    };
  }

  // 1. Check if the question is outside our website and organic food domain
  const isRelevant = isRelevantDomainQuery(query);

  // 2. Try Gemini API if available in environment
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' && window.GEMINI_API_KEY);
  if (geminiApiKey) {
    try {
      const prompt = `You are 'প্রকৃতি মিত্র' (Prokriti Assistant), the official AI assistant of 'প্রকৃতি বার্তা' (Prokriti Barta), an authentic 100% pure organic food brand in Bangladesh.

Store Knowledge:
- Name: প্রকৃতি বার্তা (Prokriti Barta)
- Helpline: +880 1717-279166 (9:00 AM - 10:00 PM)
- Email: support@prokritibarta.com
- Address: House 12, Road 5, Dhanmondi, Dhaka - 1205
- Delivery: Inside Dhaka ৳60 (24-36h), Outside Dhaka ৳100 (2-3 days). FREE nationwide delivery on orders over ৳1,000.
- Payments: 100% Cash on Delivery (COD), bKash, Nagad, Rocket, Debit/Credit Cards.
- Products: Sundarban Raw Wild Honey, Vedic Bilona Ghee, Wood-Pressed Mustard/Coconut/Kalijira Oil, Chia Seeds, Pumpkin Seeds, Stone-Ground Spices, Sreemangal Organic Tea.

CRITICAL RULES:
1. If the user query is unrelated to Prokriti Barta, organic food, nutrition, health benefits of pure foods, store orders, delivery, or policies, POLITELY DECLINE. State that you specialize exclusively in Prokriti Barta and organic food, and provide our helpline (+880 1717-279166) and email (support@prokritibarta.com).
2. Never use any religious words, phrases, or religious greetings. Use universal, neutral, polite, and professional language (e.g. 'হ্যালো! প্রকৃতি বার্তায় আপনাকে স্বাগতম।').
3. Never use emojis.
4. Never use em-dashes (—); always use standard hyphens (-).
5. Provide output in valid JSON with "textBn" and "textEn" keys.

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
      console.warn('Gemini API fallback to local AI engine:', e);
    }
  }

  // 3. If query is clearly unrelated, return courteous out-of-scope response
  if (!isRelevant) {
    return {
      textBn: 'দুঃখিত, আমি প্রকৃতি বার্তার ভার্চুয়াল অ্যাসিস্ট্যান্ট।\n\nআমি শুধুমাত্র প্রকৃতি বার্তার খাঁটি অর্গানিক পণ্য, খাদ্যাভ্যাস ও অর্ডার সম্পর্কিত তথ্যে বিশেষভাবে নিয়োজিত। আপনার প্রশ্নটি আমাদের আওতাভুক্ত নয়।\n\nযেকোনো তথ্যের জন্য সরাসরি আমাদের কাস্টমার কেয়ারে যোগাযোগ করতে পারেন:\n• হেল্পলাইন: +880 1717-279166\n• ইমেইল: support@prokritibarta.com',
      textEn: 'I am the virtual assistant for Prokriti Barta.\n\nI specialize exclusively in our pure organic foods, nutrition guidance, and store inquiries. I do not have information regarding outside topics.\n\nFor direct customer assistance, please reach out to:\n• Helpline: +880 1717-279166\n• Email: support@prokritibarta.com',
      text: lang === 'bn'
        ? 'দুঃখিত, আমি প্রকৃতি বার্তার ভার্চুয়াল অ্যাসিস্ট্যান্ট।\n\nআমি শুধুমাত্র প্রকৃতি বার্তার খাঁটি অর্গানিক পণ্য, খাদ্যাভ্যাস ও অর্ডার সম্পর্কিত তথ্যে বিশেষভাবে নিয়োজিত। আপনার প্রশ্নটি আমাদের আওতাভুক্ত নয়।\n\nযেকোনো তথ্যের জন্য সরাসরি আমাদের কাস্টমার কেয়ারে যোগাযোগ করতে পারেন:\n• হেল্পলাইন: +880 1717-279166\n• ইমেইল: support@prokritibarta.com'
        : 'I am the virtual assistant for Prokriti Barta.\n\nI specialize exclusively in our pure organic foods, nutrition guidance, and store inquiries. I do not have information regarding outside topics.\n\nFor direct customer assistance, please reach out to:\n• Helpline: +880 1717-279166\n• Email: support@prokritibarta.com',
      actionLink: '/contact',
      actionLabelBn: 'কাস্টমার কেয়ারে যোগাযোগ',
      actionLabelEn: 'Contact Support'
    };
  }

  // 4. Match against FAQ Knowledge Base
  for (const entry of chatbotFaqData.faqEntries) {
    const isMatch = entry.keywords.some(k => query.includes(k.toLowerCase()));
    if (isMatch) {
      return {
        textBn: cleanText(entry.answerBn),
        textEn: cleanText(entry.answerEn),
        text: lang === 'bn' ? cleanText(entry.answerBn) : cleanText(entry.answerEn),
        actionLink: entry.actionLink,
        actionLabelBn: entry.actionLabelBn,
        actionLabelEn: entry.actionLabelEn,
        actionLabel: lang === 'bn' ? entry.actionLabelBn : entry.actionLabelEn,
      };
    }
  }

  // 5. Dynamic Product Matcher
  const matchedProducts = productsData.filter(p => {
    const pName = p.name.toLowerCase();
    const pBnName = (p.bnName || '').toLowerCase();
    const pCategory = p.category.toLowerCase();
    const pDesc = (p.description || '').toLowerCase();

    const searchTerms = query.split(' ');
    return searchTerms.some(term => 
      term.length > 2 && (
        pName.includes(term) ||
        pBnName.includes(term) ||
        pCategory.includes(term) ||
        pDesc.includes(term)
      )
    );
  });

  if (matchedProducts.length > 0) {
    const topMatches = matchedProducts.slice(0, 3);
    const productNamesBn = topMatches.map(p => `• ${p.bnName || p.name} - ৳${p.price}`).join('\n');
    const productNamesEn = topMatches.map(p => `• ${p.name} - ৳${p.price}`).join('\n');

    return {
      textBn: `আপনার কাঙ্ক্ষিত সম্পর্কিত পণ্যসমূহ:\n\n${productNamesBn}\n\nবিস্তারিত জানতে বা অর্ডার করতে নিচের পণ্য কার্ডে ক্লিক করুন।`,
      textEn: `Here are relevant organic products for you:\n\n${productNamesEn}\n\nClick any item below to view details and order.`,
      text: lang === 'bn'
        ? `আপনার কাঙ্ক্ষিত সম্পর্কিত পণ্যসমূহ:\n\n${productNamesBn}\n\nবিস্তারিত জানতে বা অর্ডার করতে নিচের পণ্য কার্ডে ক্লিক করুন।`
        : `Here are relevant organic products for you:\n\n${productNamesEn}\n\nClick any item below to view details and order.`,
      products: topMatches.map(p => ({
        id: p.id,
        name: p.name,
        bnName: p.bnName,
        price: p.price,
        image: p.image,
        category: p.category,
      })),
      actionLink: `/shop?category=${topMatches[0].category}`,
      actionLabelBn: 'সব পণ্য দেখুন',
      actionLabelEn: 'View All Products'
    };
  }

  // 6. Greetings & Standard Help Response
  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('হাই') || query.includes('হ্যালো') || query.includes('নমস্কার') || query.includes('সালাম')) {
    return {
      textBn: 'হ্যালো! প্রকৃতি বার্তায় আপনাকে স্বাগতম।\n\nসুন্দরবনের খাঁটি মধু, কাঠের ঘানির তেল, বিলোনা ঘি, সিডস ও খাঁটি মসলা সম্পর্কিত যেকোনো তথ্যে আমি কীভাবে আপনাকে সাহায্য করতে পারি?',
      textEn: 'Hello and welcome to Prokriti Barta!\n\nHow can I help you today regarding our pure raw honey, wood-pressed oils, bilona ghee, organic seeds, or spices?',
      text: lang === 'bn'
        ? 'হ্যালো! প্রকৃতি বার্তায় আপনাকে স্বাগতম।\n\nসুন্দরবনের খাঁটি মধু, কাঠের ঘানির তেল, বিলোনা ঘি, সিডস ও খাঁটি মসলা সম্পর্কিত যেকোনো তথ্যে আমি কীভাবে আপনাকে সাহায্য করতে পারি?'
        : 'Hello and welcome to Prokriti Barta!\n\nHow can I help you today regarding our pure raw honey, wood-pressed oils, bilona ghee, organic seeds, or spices?',
      actionLink: '/shop',
      actionLabelBn: 'শপ ব্রাউজ করুন',
      actionLabelEn: 'Browse Shop'
    };
  }

  // 7. General Domain Helpful Response
  return {
    textBn: 'প্রকৃতি বার্তার সকল পণ্য ১০০% প্রাকৃতিক ও ভেজালমুক্ত।\n\nআপনি জানতে চাইতে পারেন:\n• সুন্দরবনের খাঁটি মধু ও বিলোনা ঘি\n• কাঠের ঘানির তেল ও অর্গানিক সিডস\n• ডেলিভারি চার্জ ও পেমেন্ট পদ্ধতি\n\nসরাসরি সহায়তার জন্য হেল্পলাইন: +880 1717-279166',
    textEn: 'All Prokriti Barta products are 100% natural and pure.\n\nYou can ask about:\n• Raw Wild Honey & Vedic Bilona Ghee\n• Wood-Pressed Oils & Superfood Seeds\n• Delivery rates, timeline & payment methods\n\nFor direct assistance, call our helpline: +880 1717-279166',
    text: lang === 'bn'
      ? 'প্রকৃতি বার্তার সকল পণ্য ১০০% প্রাকৃতিক ও ভেজালমুক্ত।\n\nআপনি জানতে চাইতে পারেন:\n• সুন্দরবনের খাঁটি মধু ও বিলোনা ঘি\n• কাঠের ঘানির তেল ও অর্গানিক সিডস\n• ডেলিভারি চার্জ ও পেমেন্ট পদ্ধতি\n\nসরাসরি সহায়তার জন্য হেল্পলাইন: +880 1717-279166'
      : 'All Prokriti Barta products are 100% natural and pure.\n\nYou can ask about:\n• Raw Wild Honey & Vedic Bilona Ghee\n• Wood-Pressed Oils & Superfood Seeds\n• Delivery rates, timeline & payment methods\n\nFor direct assistance, call our helpline: +880 1717-279166',
    actionLink: '/contact',
    actionLabelBn: 'কাস্টমার কেয়ারে কল করুন',
    actionLabelEn: 'Call Customer Support'
  };
}
