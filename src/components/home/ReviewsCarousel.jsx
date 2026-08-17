import React from 'react';
import Marquee from 'react-fast-marquee';
import { Quote, CheckCircle } from 'lucide-react';
import RatingStars from '../ui/RatingStars';
import reviews from '../../data/reviews.json';
import { useLanguage } from '../../context/LanguageContext';

export default function ReviewsCarousel() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-14 bg-bg border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-xs font-bold text-accent uppercase tracking-wider">{t('reviews.tag')}</span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-1">
          {t('reviews.title')}
        </h2>
        <p className="text-xs text-muted font-bn-sans mt-1.5 max-w-lg mx-auto">
          {lang === 'bn' 
            ? 'সারাদেশের শত শত পরিবারের খাঁটি ও নিরাপদ খাবারের বিশ্বস্ত অভিজ্ঞতা।' 
            : 'Authentic feedback and verified experiences from organic food lovers nationwide.'}
        </p>
      </div>

      <div className="w-full py-2">
        <Marquee
          speed={38}
          pauseOnHover={true}
          pauseOnClick={true}
          autoFill={true}
          gradient={true}
          gradientWidth={60}
          className="overflow-y-visible"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="mx-3.5 w-[300px] sm:w-[350px] bg-surface border border-line p-5 rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md hover:border-accent/40 transition-all relative select-none"
            >
              <Quote className="text-accent/20 absolute top-4 right-4" size={28} />

              <div className="space-y-3 relative z-10">
                <RatingStars rating={rev.rating} size={15} />
                <p className="text-xs text-ink leading-relaxed font-bn-sans italic min-h-[48px]">
                  "{lang === 'bn' ? (rev.commentBn || rev.comment) : (rev.commentEn || rev.comment)}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-primary">
                    {lang === 'bn' ? (rev.userNameBn || rev.userName) : (rev.userNameEn || rev.userName)}
                  </h4>
                  <p className="text-[10px] text-muted">
                    {lang === 'bn' ? (rev.userLocationBn || rev.userLocation) : (rev.userLocationEn || rev.userLocation)}
                  </p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-[10px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-md">
                    <CheckCircle size={11} /> {t('reviews.verified')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
