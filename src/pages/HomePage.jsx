import React from 'react';
import { ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle, FileText, MapPin, Vote, Bot, HelpCircle } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const steps = [
    {
      id: 1,
      title: 'Check Registration',
      text: 'Verify your name in the voter list before election day.',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Carry Documents',
      text: 'Bring your voter ID or approved identity proof.',
      icon: FileText
    },
    {
      id: 3,
      title: 'Visit Polling Booth',
      text: 'Go to your assigned polling station on voting day.',
      icon: MapPin
    },
    {
      id: 4,
      title: 'Cast Your Vote',
      text: 'Use the EVM machine and confirm your choice.',
      icon: Vote
    }
  ];

  return (
    <div className="w-full flex flex-col bg-white overflow-hidden pb-16 h-full overflow-y-auto flex-1">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto w-full px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 flex-shrink-0">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm border border-blue-100 shadow-sm">
            <Sparkles size={16} /> AI-Powered Voting Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Understand Elections with <span className="text-[#0014CC]">Confidence</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
            Learn how to register, prepare, and vote through a simple AI-powered guide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => onNavigate('learn')}
              className="px-8 py-3.5 bg-[#0014CC] text-white rounded-xl font-semibold shadow-md hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate('help')}
              className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold shadow-sm hover:border-[#0014CC] hover:text-[#0014CC] transition-colors flex items-center justify-center gap-2"
            >
              <Bot size={18} /> Ask AI Assistant
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
          <img 
            src="/hero-illustration.png" 
            alt="Citizen at polling booth" 
            className="w-full h-auto drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-700"
          />
        </div>
      </section>

      {/* Voting Steps Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How to Vote in 4 Simple Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative hover:shadow-md transition-shadow group">
                  <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#0014CC] text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {step.id}
                  </div>
                  <div className="w-16 h-16 bg-blue-50 text-[#0014CC] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
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
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Why This Matters</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Know Your Rights</h4>
                   <p className="text-sm text-slate-500">Understand your democratic power.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Avoid Common Mistakes</h4>
                   <p className="text-sm text-slate-500">Ensure your vote counts without errors.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-[#0014CC] transition-colors">
                 <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Vote with Confidence</h4>
                   <p className="text-sm text-slate-500">Walk into the booth fully prepared.</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-[#0014CC] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             <h2 className="text-3xl font-bold mb-8 relative z-10">Quick Access</h2>
             <div className="flex flex-col gap-4 relative z-10">
               <button 
                 onClick={() => onNavigate('learn')}
                 className="w-full bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>Learn More</span>
                 <ArrowRight size={20} />
               </button>
               <button 
                 onClick={() => onNavigate('help')}
                 className="w-full bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>Find Polling Booth</span>
                 <MapPin size={20} />
               </button>
               <button 
                 onClick={() => onNavigate('learn')}
                 className="w-full bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl font-semibold flex items-center justify-between transition-colors backdrop-blur-sm"
               >
                 <span>Check Special Cases</span>
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
