import React from 'react';
import { ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle, FileText, MapPin, Vote, Bot, HelpCircle } from 'lucide-react';
import { translations } from '../translations';

const HomePage = ({ onNavigate, language = 'EN' }) => {
  const t = translations[language].home;
  const icons = [CheckCircle, FileText, MapPin, Vote];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden pb-16 h-full overflow-y-auto flex-1 transition-colors">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto w-full px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 flex-shrink-0">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#0014CC] dark:text-[#6b7bff] font-medium text-sm border border-blue-100 dark:border-blue-800/50 shadow-sm">
            <Sparkles size={16} /> {t.tag}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            {t.title1} <span className="text-[#0014CC] dark:text-[#4d5fff]">{t.titleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => onNavigate('learn')}
              className="px-8 py-3.5 bg-[#0014CC] dark:bg-[#4d5fff] text-white rounded-xl font-semibold shadow-md hover:bg-blue-800 dark:hover:bg-[#3a48e6] transition-colors flex items-center justify-center gap-2"
            >
              {t.getStarted} <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate('help')}
              className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold shadow-sm hover:border-[#0014CC] dark:hover:border-[#4d5fff] hover:text-[#0014CC] dark:hover:text-[#4d5fff] transition-colors flex items-center justify-center gap-2"
            >
              <Bot size={18} /> {t.askAI}
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 -z-10"></div>
          <img 
            src="/hero-illustration.png" 
            alt="Citizen at polling booth" 
            className="w-full h-auto drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700 dark:brightness-90"
          />
        </div>
      </section>

      {/* Voting Steps Section */}
      <section className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-800 py-20 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.stepsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center relative hover:shadow-md transition-shadow group">
                  <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0014CC] dark:bg-[#4d5fff] text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 text-[#0014CC] dark:text-[#4d5fff] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Matters & Quick Access */}
      <section className="max-w-6xl mx-auto w-full px-8 py-20 flex-shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Why This Matters */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t.whyMatters}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] dark:hover:border-[#4d5fff] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">{t.reasons[0].title}</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400">{t.reasons[0].text}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] dark:hover:border-[#4d5fff] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">{t.reasons[1].title}</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400">{t.reasons[1].text}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] dark:hover:border-[#4d5fff] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#0014CC] dark:text-[#4d5fff] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">{t.reasons[2].title}</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400">{t.reasons[2].text}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-[#0014CC] dark:bg-slate-800 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             <h2 className="text-3xl font-bold mb-8 relative z-10">{t.quickAccess}</h2>
             <div className="flex flex-col gap-4 relative z-10">
               <button 
                 onClick={() => onNavigate('learn')}
                 className="w-full bg-white/10 dark:bg-slate-700 hover:bg-white/20 dark:hover:bg-slate-600 border border-white/20 dark:border-slate-600 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>{t.learnMore}</span>
                 <ArrowRight size={20} />
               </button>
               <button 
                 onClick={() => onNavigate('help')}
                 className="w-full bg-white/10 dark:bg-slate-700 hover:bg-white/20 dark:hover:bg-slate-600 border border-white/20 dark:border-slate-600 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>{t.findBooth}</span>
                 <MapPin size={20} />
               </button>
               <button 
                 onClick={() => onNavigate('learn')}
                 className="w-full bg-white/10 dark:bg-slate-700 hover:bg-white/20 dark:hover:bg-slate-600 border border-white/20 dark:border-slate-600 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>{t.specialCases}</span>
                 <HelpCircle size={20} />
               </button>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
