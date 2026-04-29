import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import TimelinePage from './pages/TimelinePage';
import HelpPage from './pages/HelpPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#F9FAFB] text-slate-900'} flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200`}>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme} 
        setTheme={setTheme} 
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'learn' && <LearnPage language={language} />}
        {activeTab === 'timeline' && <TimelinePage />}
        {activeTab === 'help' && <HelpPage />}
      </main>

      <Footer />
    </div>
  );
}
