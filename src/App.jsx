import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const TimelinePage = React.lazy(() => import('./pages/TimelinePage'));
const HelpPage = React.lazy(() => import('./pages/HelpPage'));

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-white dark:bg-slate-900">
    <Loader2 className="w-10 h-10 animate-spin text-[#0014CC] dark:text-[#4d5fff]" />
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');

  return (
    <div className={`h-screen overflow-hidden ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#F9FAFB] text-slate-900'} flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200`}>
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0014CC] focus:text-white focus:rounded-lg shadow-lg font-bold"
      >
        Skip to main content
      </a>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme} 
        setTheme={setTheme} 
      />

      {/* Main Content */}
      <main id="main-content" className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col min-h-0" role="main">
        <React.Suspense fallback={<PageLoader />}>
          {activeTab === 'home' && <HomePage onNavigate={setActiveTab} language={language} />}
          {activeTab === 'learn' && <LearnPage language={language} />}
          {activeTab === 'timeline' && <TimelinePage language={language} />}
          {activeTab === 'help' && <HelpPage language={language} />}
        </React.Suspense>
      </main>

      <Footer language={language} />
    </div>
  );
}
