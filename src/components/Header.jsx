import React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, language, setLanguage, theme, setTheme }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 flex-shrink-0">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900">
          ElectionGuide AI
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'learn', label: 'Learn' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'help', label: 'Help' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[15px] font-semibold transition-all flex flex-col items-center justify-center h-16 border-b-2 ${activeTab === tab.id
                ? 'text-[#E84E1B] border-[#E84E1B]'
                : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Globe size={16} className="text-slate-500" />
            <span className="flex items-center">
              <span className={language === 'EN' ? 'text-slate-800' : 'text-slate-400'}>EN</span>
              <span className="mx-1 text-slate-300">|</span>
              <span className={language === 'HI' ? 'text-slate-800' : 'text-slate-400'}>HI</span>
            </span>
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
