// Shared Framer Motion Variants for Prokriti-Barta

const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export const fadeIn = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.08,
      delayChildren: 0.1
    }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideRight = {
  hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const drawerSlide = {
  hidden: { x: '100%' },
  visible: { 
    x: 0, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    x: '100%', 
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const heroHeadline = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const pathDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};
