import React from 'react';
import MarqueeComponent from 'react-fast-marquee';
import { Quote, CheckCircle, Sparkles, MessageSquareHeart } from 'lucide-react';
import RatingStars from '../ui/RatingStars';
import reviews from '../../data/reviews.json';
import { useLanguage } from '../../context/LanguageContext';

const Marquee = (typeof MarqueeComponent === 'function' ? MarqueeComponent : MarqueeComponent?.default) || MarqueeComponent;

export default function ReviewsCarousel() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-14 bg-bg border-t border-line overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider mb-2">
          <MessageSquareHeart size={14} className="text-accent" />
          <span>{t('reviews.tag')}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
          {t('reviews.title')}
        </h2>
        <p className="text-xs sm:text-sm text-muted font-bn-sans mt-2 max-w-lg mx-auto leading-relaxed">
          {lang === 'bn' 
            ? 'সারাদেশের শত শত পরিবারের খাঁটি ও নিরাপদ খাবারের বিশ্বস্ত অভিজ্ঞতা।' 
            : 'Authentic feedback and verified experiences from organic food lovers nationwide.'}
        </p>
      </div>

      <div className="w-full py-6 overflow-hidden [scrollbar-width:none]">
        <Marquee
          speed={36}
          pauseOnHover={true}
          pauseOnClick={true}
          autoFill={true}
          gradient={true}
          gradientWidth={70}
          className="overflow-hidden py-2 [scrollbar-width:none]"
        >
          {reviews.map((rev, idx) => {
            const userName = lang === 'bn' ? (rev.userNameBn || rev.userName) : (rev.userNameEn || rev.userName);
            const userInitial = userName.trim().charAt(0);

            return (
              <div
                key={rev.id || idx}
                className="mx-3.5 w-[310px] sm:w-[360px] bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-primary p-5 sm:p-6 rounded-3xl flex flex-col justify-between shadow-[0_4px_16px_-3px_rgba(27,59,43,0.08)] hover:shadow-[0_14px_30px_-5px_rgba(27,59,43,0.25)] hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Top Subtle Amber Glow Backlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />

                {/* Top Row: Rating & Quote Badge */}
                <div className="flex items-center justify-between gap-3 relative z-10">
                  <RatingStars rating={rev.rating} size={15} />
                  
                  <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center shadow-sm shadow-accent/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                    <Quote size={16} className="fill-white" />
                  </div>
                </div>

                {/* Customer Comment Body */}
                <div className="my-3.5 relative z-10">
                  <p className="text-xs sm:text-[13px] text-ink font-bn-sans italic leading-relaxed min-h-[54px]">
                    "{lang === 'bn' ? (rev.commentBn || rev.comment) : (rev.commentEn || rev.comment)}"
                  </p>
                </div>

                {/* Bottom User Info & Verified Badge */}
                <div className="pt-3.5 border-t-2 border-[#D8CEAB] flex items-center justify-between gap-2.5 relative z-10">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* User Initial Avatar Badge */}
                    <div className="w-9 h-9 rounded-full bg-primary text-accent font-display font-bold text-xs flex items-center justify-center shrink-0 border border-accent/40 shadow-xs">
                      {userInitial}
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-primary truncate group-hover:text-accent transition-colors">
                        {userName}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-muted font-bn-sans truncate">
                        {lang === 'bn' ? (rev.userLocationBn || rev.userLocation) : (rev.userLocationEn || rev.userLocation)}
                      </p>
                    </div>
                  </div>

                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0 shadow-2xs font-bn-sans">
                      <CheckCircle size={11} className="text-emerald-700" />
                      <span>{t('reviews.verified')}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
