import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import RatingStars from '../ui/RatingStars';
import reviews from '../../data/reviews.json';

export default function ReviewsCarousel() {
  return (
    <section className="py-12 bg-bg border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">গ্রাহকদের মতামত</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-1">
            সুখী গ্রাহকদের অনুভূতির গল্প
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-surface border border-line p-5 rounded-2xl flex flex-col justify-between shadow-2xs relative"
            >
              <Quote className="text-accent/20 absolute top-4 right-4" size={32} />

              <div className="space-y-3 relative z-10">
                <RatingStars rating={rev.rating} size={15} />
                <p className="text-xs text-ink leading-relaxed font-bn-sans italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-primary">{rev.userName}</h4>
                  <p className="text-[10px] text-muted">{rev.userLocation}</p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
                    <CheckCircle size={12} /> Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
