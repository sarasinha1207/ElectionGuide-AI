import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { translations } from '../translations';

const Header = ({ activeTab, setActiveTab, language, setLanguage, theme, setTheme }) => {
  const t = translations[language].header;

  // Toggle dark class on document element for tailwind
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 flex-shrink-0 transition-colors">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900 dark:text-white">
          {t.title}
        </div>

        <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: t.home },
            { id: 'learn', label: t.learn },
            { id: 'timeline', label: t.timeline },
            { id: 'help', label: t.help },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={`text-[15px] font-semibold transition-all flex flex-col items-center justify-center h-16 border-b-2 ${activeTab === tab.id
                ? 'text-[#0014CC] dark:text-[#4d5fff] border-[#0014CC] dark:border-[#4d5fff]'
                : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            aria-label={`Switch language to ${language === 'EN' ? 'Hindi' : 'English'}`}
            className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 text-[13px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0014CC]"
          >
            <Globe size={16} className="text-slate-500 dark:text-slate-400" />
            <span className="flex items-center">
              <span className={language === 'EN' ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}>EN</span>
              <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
              <span className={language === 'HI' ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}>HI</span>
            </span>
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0014CC]"
          >
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
