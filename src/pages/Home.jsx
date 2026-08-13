import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import CategoryStrip from '../components/home/CategoryStrip';
import FeaturedGrid from '../components/home/FeaturedGrid';
import BenefitsSection from '../components/home/BenefitsSection';
import ReviewsCarousel from '../components/home/ReviewsCarousel';
import AlponaDivider from '../components/ui/AlponaDivider';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg"
    >
      <HeroSlider />
      <CategoryStrip />
      <AlponaDivider />
      <FeaturedGrid />
      <BenefitsSection />
      <ReviewsCarousel />
    </motion.div>
  );
}
