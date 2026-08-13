import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${className}`}
      aria-label="Toggle light/dark theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'dark' ? (
          <Sun size={18} className="text-accent hover:rotate-45 transition-transform" />
        ) : (
          <Moon size={18} className="text-white hover:-rotate-12 transition-transform" />
        )}
      </motion.div>
    </button>
  );
}
