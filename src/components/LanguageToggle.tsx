import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative flex items-center glass-panel rounded-full p-1 shadow-lg border border-white/40">
        <button
          onClick={() => language !== 'en' && toggleLanguage()}
          className={`relative z-10 px-4 py-1.5 text-sm font-semibold transition-colors duration-300 rounded-full ${
            language === 'en' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => language !== 'ml' && toggleLanguage()}
          className={`relative z-10 px-4 py-1.5 text-sm font-semibold transition-colors duration-300 rounded-full ${
            language === 'ml' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          മല
        </button>
        
        {/* Sliding Highlight */}
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emerald-500 rounded-full shadow-sm z-0"
          initial={false}
          animate={{
            left: language === 'en' ? '4px' : 'calc(50%)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
};
