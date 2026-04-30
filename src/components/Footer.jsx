import React from 'react';
import { translations } from '../translations';

const Footer = ({ language = 'EN' }) => {
  const t = translations[language].footer;

  return (
    <footer className="bg-[#F8FAFC] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 px-8 mt-auto flex-shrink-0 w-full z-10 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-500 dark:text-slate-400 gap-6">
        <div className="max-w-xl">
          <p className="font-bold text-slate-900 dark:text-white text-base mb-2">ElectionGuide AI</p>
          <p className="leading-relaxed">
            {t.rights}<br />
            {t.purpose}
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8 font-medium">
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">{t.privacy}</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">{t.accessibility}</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">{t.support}</a>
          <a href="#" className="text-[#0014CC] dark:text-[#4d5fff] hover:underline transition-all">{t.portal}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
