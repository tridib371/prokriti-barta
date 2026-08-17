import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowRight, CornerDownLeft, RefreshCw, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { getIntelligentResponse } from '../../utils/chatbotEngine';
import { Link } from 'react-router-dom';

/**
 * Formats bot messages with structured bullet lists, numbered steps, and clean typography
 */
function BotMessageFormatter({ content }) {
  if (!content) return null;
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-ink font-bn-sans text-left">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point item (•, -, *)
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const text = trimmed.replace(/^[•\-*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <span className="flex-1 text-ink/90 font-medium">{text}</span>
            </div>
          );
        }

        // Numbered list item (1., 2., ১., ২.)
        const matchNumbered = trimmed.match(/^([0-9১-৯]+)\.\s*(.*)$/);
        if (matchNumbered) {
          const num = matchNumbered[1];
          const text = matchNumbered[2];
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="w-4 h-4 rounded-full bg-accent/20 text-accent font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {num}
              </span>
              <span className="flex-1 text-ink/90 font-medium">{text}</span>
            </div>
          );
        }

        // Section Heading ending with a colon
        if (trimmed.endsWith(':')) {
          return (
            <p key={idx} className="font-bold text-primary text-[13px] pt-1 pb-0.5 inline-block border-b border-line/60">
              {trimmed}
            </p>
          );
        }

        // Regular sentence paragraph
        return (
          <p key={idx} className="text-ink/90 leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatbotWidget() {
  const { t, lang, n } = useLanguage();
  const { isCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Initial welcome message with both Bangla & English
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          textBn: 'প্রকৃতি বার্তায় আপনাকে স্বাগতম!\n\nআমি প্রকৃতি মিত্র - প্রকৃতি বার্তার ভার্চুয়াল অ্যাসিস্ট্যান্ট। পণ্য, বিশুদ্ধতা যাচাই বা ডেলিভারি সম্পর্কিত যেকোনো প্রশ্ন আমাকে করতে পারেন।',
          textEn: 'Welcome to Prokriti Barta!\n\nI am your Prokriti Assistant. Ask me anything about our organic products, purity tests, or delivery policies!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  }, []);

  const quickQuestions = lang === 'bn' ? [
    'মধু খাঁটি কিনা কীভাবে বুঝবো?',
    'ডেলিভারি চার্জ ও সময় কত?',
    'অর্ডার ও পেমেন্ট পদ্ধতি',
    'কাস্টমার কেয়ার নম্বর'
  ] : [
    'How to verify pure honey?',
    'What are delivery rates & time?',
    'Payment & Ordering methods',
    'Customer Helpline'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query || !query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getIntelligentResponse(query, lang);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        textBn: response.textBn || response.text,
        textEn: response.textEn || response.text,
        text: response.text,
        actionLink: response.actionLink,
        actionLabelBn: response.actionLabelBn || response.actionLabel,
        actionLabelEn: response.actionLabelEn || response.actionLabel,
        actionLabel: response.actionLabel,
        products: response.products,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Bot response error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  if (isCartOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex flex-col items-end pointer-events-none [&>*]:pointer-events-auto">
      
      {/* 1. Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent="true"
            className="w-[calc(100vw-2rem)] sm:w-[390px] max-w-[390px] h-[70vh] sm:h-[500px] max-h-[540px] bg-surface border border-line rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-3 sm:mb-4"
          >
            {/* Header */}
            <div className="bg-primary text-surface p-4 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-surface leading-tight">
                    {lang === 'bn' ? 'প্রকৃতি মিত্র (AI Assistant)' : 'Prokriti Assistant'}
                  </h3>
                  <p className="text-[11px] text-surface/80 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    {lang === 'bn' ? 'সক্রিয় - তাৎক্ষণিক সহায়তা' : 'Online - Instant Support'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-surface/80 hover:text-surface hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Questions Chips */}
            <div className="bg-bg/60 border-b border-line/60 p-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1 bg-surface border border-line rounded-full text-[11px] font-semibold text-primary hover:border-accent hover:text-accent whitespace-nowrap transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Stream (Scrollable) */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 min-h-0 p-4 overflow-y-auto overscroll-contain space-y-4 font-bn-sans text-xs sm:text-sm bg-bg/20"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1">
                      <Bot size={15} />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-xs leading-relaxed text-right'
                          : 'bg-surface text-ink border border-line rounded-tl-xs'
                      }`}
                    >
                      {msg.sender === 'bot' ? (
                        <BotMessageFormatter
                          content={lang === 'bn' ? (msg.textBn || msg.text) : (msg.textEn || msg.text)}
                        />
                      ) : (
                        <p className="text-white leading-relaxed text-xs sm:text-[13px]">{msg.text}</p>
                      )}
                    </div>

                    {/* Embedded Product Recommendation Card */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {msg.products.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-surface border border-line rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs hover:border-accent/40 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={(prod.images && prod.images[0]) || prod.image || '/PB.jpg'}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-lg bg-bg shrink-0 border border-line"
                                onError={(e) => { e.target.src = '/PB.jpg'; }}
                              />
                              <div>
                                <h4 className="font-bold text-xs text-primary line-clamp-1">
                                  {lang === 'bn' ? (prod.bnName || prod.name) : prod.name}
                                </h4>
                                <span className="text-[11px] font-mono font-bold text-accent">৳{n(prod.price)}</span>
                              </div>
                            </div>

                            <Link
                              to={`/product/${prod.id}`}
                              onClick={() => setIsOpen(false)}
                              className="px-2.5 py-1 bg-accent text-white text-[10px] font-bold rounded-lg hover:bg-accent/90 transition-colors shrink-0"
                            >
                              {lang === 'bn' ? 'দেখুন' : 'View'}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Direct Action Link Button */}
                    {msg.actionLink && (
                      <div className="pt-0.5">
                        <Link
                          to={msg.actionLink}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 border border-accent/30 text-accent hover:bg-accent hover:text-white rounded-full text-[11px] font-bold transition-all shadow-2xs"
                        >
                          <span>
                            {lang === 'bn' ? (msg.actionLabelBn || msg.actionLabel || 'বিস্তারিত দেখুন') : (msg.actionLabelEn || msg.actionLabel || 'View More')}
                          </span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}

                    <div className={`text-[10px] text-muted ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-muted text-xs">
                  <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    <Bot size={15} />
                  </div>
                  <div className="bg-surface border border-line px-3.5 py-2 rounded-2xl rounded-tl-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-muted/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-surface border-t border-line shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার প্রশ্নটি লিখুন...' : 'Type your question...'}
                  className="flex-1 bg-bg text-ink text-xs px-3.5 py-2.5 rounded-full border border-line focus:border-accent outline-none font-bn-sans"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-accent text-white rounded-full hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Launcher Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary/95 transition-all border-2 border-surface relative group cursor-pointer"
        aria-label="Open Live Chat"
      >
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-accent rounded-full border-2 border-surface"></div>
        {isOpen ? (
          <X size={20} className="text-white sm:w-6 sm:h-6" />
        ) : (
          <MessageCircle size={22} className="text-white sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
        )}
      </motion.button>

    </div>
  );
}
