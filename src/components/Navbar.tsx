import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-700 hidden sm:block">Kerala Birth Rate Survey</span>
        </button>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Pill */}
          <div className="relative flex items-center bg-white/60 backdrop-blur-sm border border-white/50 rounded-full p-0.5 shadow-sm">
            <button
              onClick={() => language !== 'en' && toggleLanguage()}
              className={`relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-300 rounded-full ${
                language === 'en' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => language !== 'ml' && toggleLanguage()}
              className={`relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-300 rounded-full ${
                language === 'ml' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              മല
            </button>
            {/* Sliding Highlight */}
            <motion.div
              className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-emerald-500 rounded-full z-0"
              initial={false}
              animate={{ left: language === 'en' ? '2px' : 'calc(50%)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>

          {/* Admin link (only on public pages) */}
          {!isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="text-xs text-slate-400 hover:text-emerald-600 font-medium transition-colors hidden sm:block"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
