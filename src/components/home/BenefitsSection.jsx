import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, HeartHandshake, Box } from 'lucide-react';
import AlponaDivider from '../ui/AlponaDivider';

const benefits = [
  {
    icon: Leaf,
    title: "১০০% প্রাকৃতিক ও অর্গানিক",
    description: "কোনো প্রকার রাসায়নিক, কৃত্রিম সুবাস বা প্রিজারভেটিভ ছাড়াই প্রকৃতির নিজস্ব স্বাদে সমৃদ্ধ।"
  },
  {
    icon: HeartHandshake,
    title: "কৃষকের সাথে সরাসরি সম্পৃক্ততা",
    description: "মধ্যস্বত্বভোগী ছাড়া স্থানীয় মৌয়াল ও প্রান্তিক খামারিদের থেকে সরাসরি কাঁচামাল সংগ্রহ।"
  },
  {
    icon: Award,
    title: "ঐতিহ্যবাহী লোকজ পদ্ধতি",
    description: "বিলোনা পদ্ধতিতে তৈরি গাওয়া ঘি এবং কাঠের ঘানির কোল্ড-প্রেসড তেল সম্পূর্ণ পুষ্টি ধরে রাখে।"
  },
  {
    icon: Box,
    title: "পরিবেশবান্ধব ইকো প্যাকেজিং",
    description: "কাঁচের বয়াম, চটের থলে ও পুনর্ব্যবহারযোগ্য প্রাকৃতিক উপাদান দিয়ে পরিবেশসম্মত প্যাকিং।"
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-12 bg-surface border-t border-line">
      <AlponaDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">কেন আমরা আলাদা</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary mt-1">
            প্রকৃতি বার্তার মূল অঙ্গীকার
          </h2>
          <p className="text-muted text-xs sm:text-sm font-bn-sans mt-2">
            আমরা শুধু পণ্য বিক্রি করি না, প্রতিটি পরিবারের খাদ্য তালিকায় ফিরিয়ে আনি আমাদের ঐতিহ্যবাহী লোকজ বিশুদ্ধতা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-bg/60 border border-line rounded-2xl p-6 flex flex-col justify-between hover:border-accent transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-bn-sans">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
