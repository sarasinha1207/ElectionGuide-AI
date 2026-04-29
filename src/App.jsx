import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, BookOpen, Clock, HelpCircle, MessageSquare, User, 
  UserPlus, ListOrdered, MapPin, Share2, Printer, Bot, Mic, Paperclip, Send, 
  Lightbulb, History
} from 'lucide-react';

const HelpSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm your Civic Assistant. Are you a first-time voter, or do you just need a quick refresher on the voting steps?",
      options: [
        { label: 'I am a first-time voter', value: 'first_time' },
        { label: 'Show voting steps', value: 'voting_steps' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: option.label || option.text
    };
    
    setMessages(prev => {
      // Remove options from the last message
      const updatedPrev = prev.map((msg, index) => 
        index === prev.length - 1 ? { ...msg, options: null } : msg
      );
      return [...updatedPrev, userMsg];
    });
    
    // Simulate assistant response
    setTimeout(() => {
      let assistantResponse = {};
      
      if (option.value === 'first_time') {
        assistantResponse = {
          id: Date.now() + 1,
          sender: 'assistant',
          type: 'beginner_guide',
        };
      } else if (option.value === 'voting_steps') {
        assistantResponse = {
          id: Date.now() + 1,
          sender: 'assistant',
          type: 'quick_steps',
        };
      } else if (option.value === 'polling_booth') {
         assistantResponse = {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "To find your polling booth, you can search using your EPIC number on the official voter portal.",
          options: [
             { label: 'Show voting steps', value: 'voting_steps' }
          ]
        };
      } else {
        // Fallback for custom text
        assistantResponse = {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I can help guide you through the election process. Do you need the beginner guide or just the quick steps?",
          options: [
            { label: 'I am a first-time voter', value: 'first_time' },
            { label: 'Show voting steps', value: 'voting_steps' }
          ]
        };
      }
      
      setMessages(prev => [...prev, assistantResponse]);
    }, 600);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    handleOptionClick({ text: inputValue, value: 'custom_input' });
    setInputValue('');
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'beginner_guide' || msg.type === 'quick_steps') {
      return (
        <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-1 h-6 bg-[#0014CC] rounded-full"></div>
             <h3 className="text-2xl font-medium text-[#0014CC]">
               {msg.type === 'beginner_guide' ? 'Beginner Voting Guide' : 'How to Vote'}
             </h3>
          </div>
          <p className="text-slate-600 mb-6">
            {msg.type === 'beginner_guide' 
              ? 'A complete step-by-step guide for new voters.' 
              : 'A step-by-step guide for your visit to the polling station.'}
          </p>

          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-4 pb-2">
            <ListOrdered size={20} className="text-[#0014CC]" />
            <span>{msg.type === 'beginner_guide' ? 'The Complete Process' : 'The Polling Station Process'}</span>
          </div>

          <div className="space-y-6">
            {msg.type === 'beginner_guide' && (
              <>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Registration</h4>
                    <p className="text-slate-600 text-sm mt-1">Register online via the National Voters' Service Portal or fill Form 6. You need passport-size photos and ID/address proof.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Verification</h4>
                    <p className="text-slate-600 text-sm mt-1">Verify your name in the electoral roll once your application is processed. You will receive your EPIC (Voter ID) card.</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">
                {msg.type === 'beginner_guide' ? '3' : '1'}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">First Polling Officer:</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Verification of your name in the electoral roll and checking your ID proof (like EPIC card).
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">
                {msg.type === 'beginner_guide' ? '4' : '2'}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Second Polling Officer:</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Inking of your left index finger, providing a voter slip, and taking your signature in the register.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">
                {msg.type === 'beginner_guide' ? '5' : '3'}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Third Polling Officer:</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Checking the ink mark and taking the voter slip. You will then be directed to the voting compartment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0">
                {msg.type === 'beginner_guide' ? '6' : '4'}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Record your Vote:</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Press the blue button on the Electronic Voting Machine (EVM) next to the candidate of your choice.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#F4F4FD] border border-indigo-100 rounded-xl p-4 flex gap-4">
            <div className="bg-[#0014CC] w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
               <Lightbulb size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Pro Tip: Verify your Vote</h4>
              <p className="text-slate-600 text-sm mt-1">
                After pressing the button, wait for the red light on the VVPAT machine. A slip will be visible for 7 seconds showing your selected candidate.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="flex h-[calc(100vh-64px-132px)] min-h-[600px] bg-white border-t border-slate-200">
      {/* Sidebar */}
      <div className="w-80 bg-[#F4F4F9] border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Get Started</h2>
          
          <div className="space-y-3 mb-10">
            <button onClick={() => handleOptionClick({label: 'I am a first-time voter', value: 'first_time'})} className="w-full bg-white border border-slate-200 hover:border-[#0014CC] hover:text-[#0014CC] hover:shadow-sm transition-all rounded-xl p-4 flex items-center gap-4 text-left group">
              <UserPlus className="text-[#0014CC]" size={20} />
              <span className="font-medium text-slate-700 group-hover:text-[#0014CC]">I am a first-time voter</span>
            </button>
            <button onClick={() => handleOptionClick({label: 'Show voting steps', value: 'voting_steps'})} className="w-full bg-white border border-slate-200 hover:border-[#0014CC] hover:text-[#0014CC] hover:shadow-sm transition-all rounded-xl p-4 flex items-center gap-4 text-left group">
              <ListOrdered className="text-[#0014CC]" size={20} />
              <span className="font-medium text-slate-700 group-hover:text-[#0014CC]">Show voting steps</span>
            </button>
            <button onClick={() => handleOptionClick({label: 'Find polling booth', value: 'polling_booth'})} className="w-full bg-white border border-slate-200 hover:border-[#0014CC] hover:text-[#0014CC] hover:shadow-sm transition-all rounded-xl p-4 flex items-center gap-4 text-left group">
              <MapPin className="text-[#E84E1B]" size={20} />
              <span className="font-medium text-slate-700 group-hover:text-[#0014CC]">Find polling booth</span>
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
             <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Recent Inquiries</span>
             <History size={14} className="text-slate-400 ml-auto" />
          </div>
          
          <div className="space-y-5 mt-4">
             {[
               "Voter ID Card registration process",
               "Election dates for Bangalore South",
               "Check my name in electoral roll",
               "Candidates in Mumbai North-West"
             ].map((inquiry, idx) => (
               <div key={idx} className="flex items-start gap-3 cursor-pointer group">
                 <MessageSquare size={18} className="text-slate-500 group-hover:text-[#0014CC]" />
                 <span className="text-[15px] text-slate-700 group-hover:text-[#0014CC] leading-tight">{inquiry}</span>
               </div>
             ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6">
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
        <div className="h-20 border-b border-slate-200 px-8 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#0014CC] rounded-full flex items-center justify-center shadow-sm">
                <Bot size={22} className="text-white" />
             </div>
             <div>
               <h2 className="font-bold text-lg text-slate-900 leading-tight">Civic Assistant</h2>
               <div className="flex items-center gap-1.5 mt-0.5">
                 <span className="w-2 h-2 rounded-full bg-[#0014CC]"></span>
                 <p className="text-[#0014CC] text-[13px] font-medium">Online & ready to help</p>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-6 text-slate-600">
             <button className="hover:text-[#0014CC] transition-colors"><Share2 size={22} /></button>
             <button className="hover:text-[#0014CC] transition-colors"><Printer size={22} /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white scroll-smooth pb-20">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-8">
            ElectionGuide AI Response
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 w-full`}>
              <div className={`max-w-[85%] ${msg.sender === 'user' ? '' : 'w-full'}`}>
                {msg.text && (
                  <div className={`rounded-2xl p-4 ${
                    msg.sender === 'user' 
                      ? 'bg-[#F0F0F8] text-slate-800 ml-auto w-fit text-[15px]' 
                      : 'text-slate-700 text-[15px] mb-2'
                  }`}>
                    {msg.text}
                  </div>
                )}
                
                {msg.sender === 'assistant' && renderMessageContent(msg)}
                
                {msg.options && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionClick(opt)}
                        className="px-5 py-2.5 bg-white border border-[#0014CC] text-[#0014CC] hover:bg-[#F0F0F8] rounded-full text-[15px] font-medium transition-all shadow-sm active:scale-[0.98]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white flex-shrink-0 w-full border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto relative flex items-center">
             <input 
               type="text" 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Ask a question about voting..."
               className="w-full h-14 pl-6 pr-32 rounded-[2rem] border-2 border-slate-200 focus:border-[#0014CC] focus:ring-0 transition-all outline-none text-slate-700 text-[15px]"
             />
             <div className="absolute right-16 flex items-center gap-4 text-slate-500">
                <button className="hover:text-slate-800"><Mic size={20} /></button>
                <button className="hover:text-slate-800"><Paperclip size={20} /></button>
             </div>
             <button 
               onClick={handleSend}
               className="absolute right-2 w-10 h-10 bg-[#0014CC] hover:bg-blue-800 rounded-full flex items-center justify-center text-white shadow-md transition-colors"
             >
                <Send size={18} className="ml-0.5" />
             </button>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-4">
            ElectionGuide AI can make mistakes. Verify important info at the Official ECI Portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('help'); // default to help for this task

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
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

          <div className="flex items-center gap-4">
             <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50">
               <User size={16} />
             </button>
             <button className="bg-[#0014CC] hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
               Start Guide
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto bg-white">
        {activeTab === 'help' && <HelpSection />}
        
        {activeTab !== 'help' && (
          <div className="p-12 text-center py-32">
            <h2 className="text-3xl font-extrabold mb-4 capitalize">{activeTab} Section</h2>
            <p className="text-slate-500">Navigate to the Help section to see the Chatbot.</p>
            <button 
              onClick={() => setActiveTab('help')}
              className="mt-8 px-6 py-2 bg-[#0014CC] text-white rounded-lg font-medium"
            >
              Go to Help
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      {activeTab === 'help' && (
        <footer className="bg-[#F8FAFC] border-t border-slate-200 py-8 px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-500 gap-6">
                <div className="max-w-xl">
                    <p className="font-bold text-slate-900 text-base mb-2">ElectionGuide AI</p>
                    <p className="leading-relaxed">© 2024 Election Commission Assistant. All rights reserved.<br/>For educational purposes only. Empowering every citizen with accurate information.</p>
                </div>
                <div className="flex flex-wrap gap-6 md:gap-8 font-medium">
                    <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-800 transition-colors">Accessibility Settings</a>
                    <a href="#" className="hover:text-slate-800 transition-colors">Contact Support</a>
                    <a href="#" className="text-[#E84E1B] hover:underline transition-all">Official ECI Portal</a>
                </div>
            </div>
        </footer>
      )}
    </div>
  );
}
