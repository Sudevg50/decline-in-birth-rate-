import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from "framer-motion";

export const Landing: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Staggered animation variants
 import { Variants } from "framer-motion";

 const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel rounded-3xl p-10 md:p-14 max-w-2xl w-full text-center relative z-10"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight"
        >
          {t.landingTitle}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-light"
        >
          {t.landingSubtitle}
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/survey')}
            className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-emerald-600 border border-transparent rounded-full hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 overflow-hidden"
          >
            <span className="relative z-10">{t.startSurvey}</span>
            {/* Hover Glint Effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[glint_1s_ease-in-out_forwards]"></div>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Admin Panel Link */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 z-10"
      >
        <button 
          onClick={() => navigate('/admin')}
          className="text-emerald-700/60 hover:text-emerald-800 text-sm font-medium transition-colors hover:underline underline-offset-4"
        >
          {t.adminLogin}
        </button>
      </motion.div>
    </div>
  );
};
