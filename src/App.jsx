import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, BookOpen, Clock, HelpCircle, MessageSquare, User, 
  UserPlus, ListOrdered, MapPin, Share2, Printer, Bot, Mic, Paperclip, Send, 
  Lightbulb, History, Megaphone, FileText, Users, CalendarDays, BarChart3, CheckCircle2,
  Globe, Moon, Sun, UserCheck, Vote, Gavel, SlidersVertical
} from 'lucide-react';

const TimelineSection = () => {
  const steps = [
    {
      id: 1,
      title: "Announcement",
      description: "The Election Commission announces the election schedule, invoking the Model Code of Conduct.",
      icon: Megaphone,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Nomination",
      description: "Candidates file their nomination papers and affidavits. Scrutiny and withdrawal follows.",
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      title: "Campaign",
      description: "Political parties and candidates campaign to reach out to voters. Ends 48 hours before voting.",
      icon: Users,
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 4,
      title: "Voting Day",
      description: "Registered voters cast their ballots at designated polling stations using EVMs and VVPATs.",
      icon: CalendarDays,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200"
    },
    {
      id: 5,
      title: "Results",
      description: "Votes are counted under strict security, and the results are officially declared.",
      icon: BarChart3,
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Election Process Timeline</h2>
        <p className="text-slate-500 mt-3 text-lg">A clear overview of how the democratic process unfolds.</p>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>

        <div className="space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative flex items-start gap-6 group">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                  <Icon size={24} />
                </div>
                
                <div className={`flex-1 bg-white border ${step.borderColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-400">Phase {step.id}</span>
                    <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                
                {index < 2 && (
                   <div className="absolute left-[38px] top-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm z-20">
                      <CheckCircle2 size={20} className="text-green-500" />
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HelpSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm your Civic Assistant. How can I assist you with your voting journey today?",
      options: [
        { id: 'first_time', label: 'I am a first-time voter' },
        { id: 'voting_steps', label: 'Show voting steps' },
        { id: 'polling_booth', label: 'Find polling booth' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleOptionClick = (optionId, optionLabel) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], options: undefined };
      
      let type = 'quick_steps';
      if (optionId === 'first_time') type = 'beginner_guide';
      else if (optionId === 'polling_booth') type = 'polling_booth_map';
      
      return [
        ...updated,
        { id: Date.now(), sender: 'user', text: optionLabel },
        { id: Date.now() + 1, sender: 'assistant', type }
      ];
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: inputValue },
      { id: Date.now() + 1, sender: 'assistant', text: "I'm a demo assistant. Please select from the options provided or use the sidebar." }
    ]);
    setInputValue('');
  };
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (msg) => {
    if (msg.text && msg.sender === 'assistant') {
      return (
        <div className="flex flex-col items-start w-full">
          <div className="rounded-[20px] p-5 bg-white border border-slate-200 text-slate-800 text-[16px] leading-relaxed w-fit shadow-sm">
            {msg.text}
          </div>
          {msg.options && (
            <div className="flex flex-wrap gap-3 mt-4">
              {msg.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id, opt.label)}
                  className="px-5 py-2.5 rounded-full border border-[#0014CC] text-[#0014CC] text-sm font-semibold hover:bg-[#0014CC] hover:text-white transition-colors bg-white shadow-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (msg.type === 'beginner_guide') {
      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Beginner's Election Guide
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0014CC] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 text-[#0014CC] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2">1. Registration</h4>
              <p className="text-slate-600 text-[14px] leading-relaxed">Register in the electoral roll and get your Voter ID (EPIC).</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-purple-600 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <UserCheck size={24} />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2">2. Verification</h4>
              <p className="text-slate-600 text-[14px] leading-relaxed">Verify your name on the voter list and find your polling booth.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-green-600 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Vote size={24} />
              </div>
              <h4 className="text-[17px] font-bold text-slate-800 mb-2">3. Polling Day</h4>
              <p className="text-slate-600 text-[14px] leading-relaxed">Visit the booth, get verified, and cast your vote on the EVM.</p>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'polling_booth_map') {
      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Nearby Polling Booths
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="text-[#E84E1B]" /> Polling Booths Near You
            </h3>
            <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
               <iframe 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 loading="lazy" 
                 allowFullScreen 
                 src="https://www.google.com/maps?q=polling+station+near+me&output=embed"
                 title="Google Maps Polling Booths"
               ></iframe>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-slate-500 text-[13px]">Showing approximate locations based on your current area.</p>
              <button className="px-5 py-2.5 bg-[#0014CC] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
                 Get Directions
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'quick_steps') {
      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            ElectionGuide AI Response
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
            <div className="flex items-start gap-4 mb-6">
               <div className="w-1 h-8 bg-[#0014CC]"></div>
               <div>
                 <h3 className="text-2xl font-medium text-[#0014CC] leading-none">How to Vote</h3>
                 <p className="text-slate-600 mt-2">A step-by-step guide for your visit to the polling station.</p>
               </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-semibold mb-6">
              <ListOrdered size={20} className="text-slate-500" />
              <span>The Polling Station Process</span>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <h4 className="font-bold text-slate-800">First Polling Officer:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">
                    Verification of your name in the electoral roll and checking your ID proof (like EPIC card).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <h4 className="font-bold text-slate-800">Second Polling Officer:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">
                    Inking of your left index finger, providing a voter slip, and taking your signature in the register.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <h4 className="font-bold text-slate-800">Third Polling Officer:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">
                    Checking the ink mark and taking the voter slip. You will then be directed to the voting compartment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
                <div>
                  <h4 className="font-bold text-slate-800">Record your Vote:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">
                    Press the blue button on the Electronic Voting Machine (EVM) next to the candidate of your choice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#F4F4FD] border border-[#E0E0F8] rounded-xl p-5 flex gap-4">
              <div className="bg-[#0014CC] w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                 <Lightbulb size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-[15px] text-slate-800">Pro Tip: Verify your Vote</h4>
                <p className="text-slate-600 text-[15px] mt-1 leading-relaxed">
                  After pressing the button, wait for the red light on the VVPAT machine. A slip will be visible for 7 seconds showing your selected candidate.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white">
      {/* Sidebar */}
      <div className="w-[320px] bg-[#F4F4F9] border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Get Started</h2>
          
          <div className="space-y-3 mb-10">
            <button 
              onClick={() => handleOptionClick('first_time', 'I am a first-time voter')}
              className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <UserPlus className="text-[#0014CC]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">I am a first-time voter</span>
            </button>
            <button 
              onClick={() => handleOptionClick('voting_steps', 'Show voting steps')}
              className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <ListOrdered className="text-slate-600" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Show voting steps</span>
            </button>
            <button 
              onClick={() => handleOptionClick('polling_booth', 'Find polling booth')}
              className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <MapPin className="text-[#8B7355]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Find polling booth</span>
            </button>
            <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <UserCheck className="text-[#0014CC]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Check name in roll</span>
            </button>
            <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <Gavel className="text-slate-600" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Model Code of Conduct</span>
            </button>
            <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <SlidersVertical className="text-[#8B7355]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">How does EVM work?</span>
            </button>
          </div>
        </div>
        {/* User Profile */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center gap-3 bg-[#EAEAF3] p-4 rounded-xl">
             <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
               <User size={20} className="text-white" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-800 leading-tight">Arjun Sharma</p>
               <p className="text-[13px] text-slate-600 mt-0.5">Verified Citizen</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-[72px] border-b border-slate-200 px-8 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#0014CC] rounded-xl flex items-center justify-center shadow-sm">
                <Bot size={22} className="text-white" />
             </div>
             <div>
               <h2 className="font-bold text-[17px] text-slate-900 leading-tight">Civic Assistant</h2>
               <div className="flex items-center gap-1.5 mt-0.5">
                 <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                 <p className="text-slate-500 text-[13px] font-medium">Online & ready to help</p>
               </div>
             </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-12 space-y-8 bg-white scroll-smooth pb-20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
              <div className={`${msg.sender === 'user' ? 'max-w-[70%]' : 'w-full'}`}>
                {msg.text && msg.sender === 'user' && (
                  <div className="rounded-[20px] p-5 bg-[#F1F3F5] text-slate-800 text-[16px] leading-relaxed w-fit ml-auto">
                    {msg.text}
                  </div>
                )}
                
                {msg.sender === 'assistant' && renderMessageContent(msg)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="px-12 py-6 bg-white flex-shrink-0 w-full border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto flex gap-4 items-center">
             <div className="flex-1 relative">
               <input 
                 type="text" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                 placeholder="Ask a question about voting..."
                 className="w-full h-[60px] pl-6 pr-24 rounded-full border border-slate-300 focus:border-[#0014CC] focus:ring-0 transition-all outline-none text-slate-700 text-[15px]"
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 text-slate-500">
                  <button className="hover:text-slate-800"><Mic size={20} /></button>
                  <button className="hover:text-slate-800"><Paperclip size={20} /></button>
               </div>
             </div>
             <button 
               onClick={handleSendMessage}
               className="w-[60px] h-[60px] bg-[#0014CC] hover:bg-blue-800 rounded-[14px] flex items-center justify-center text-white shadow-md transition-colors flex-shrink-0"
             >
                <Send size={22} className="ml-0.5" />
             </button>
          </div>
          <p className="text-center text-[12px] text-slate-500 mt-5">
            ElectionGuide AI can make mistakes. Verify important info at the Official ECI Portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('help');
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');

  return (
    <div className="h-screen overflow-hidden bg-[#F9FAFB] flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
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
                 className={`text-[15px] font-semibold transition-all flex flex-col items-center justify-center h-16 border-b-2 ${
                   activeTab === tab.id 
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

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col overflow-y-auto">
        {activeTab === 'help' && <HelpSection />}
        {activeTab === 'timeline' && <TimelineSection />}
        
        {activeTab !== 'help' && activeTab !== 'timeline' && (
          <div className="p-12 text-center py-32 min-h-[600px]">
            <h2 className="text-3xl font-extrabold mb-4 capitalize">{activeTab} Section</h2>
            <p className="text-slate-500">Navigate to the Help section to see the Chatbot, or Timeline for the election process.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button 
                onClick={() => setActiveTab('help')}
                className="px-6 py-2.5 bg-[#0014CC] text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Go to Help
              </button>
              <button 
                onClick={() => setActiveTab('timeline')}
                className="px-6 py-2.5 bg-slate-100 text-slate-800 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                View Timeline
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
