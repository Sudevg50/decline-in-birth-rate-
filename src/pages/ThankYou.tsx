import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const ThankYou: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="glass-panel rounded-3xl p-12 max-w-lg w-full text-center relative z-10 border border-white/50"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        >
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
          {t.thankYou}
        </h1>
        <p className="text-xl text-slate-600 mb-2 font-medium">
          {t.thankYouMessage}
        </p>
        <p className="text-md text-slate-500 mb-10">
          {t.successMessage}
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-white/80 hover:bg-white text-emerald-700 font-semibold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100"
        >
          Return Home
        </button>
      </motion.div>
    </div>
  );
};
