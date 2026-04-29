import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Mic, Paperclip, Send, Lightbulb, MapPin, ListOrdered, UserPlus, 
  UserCheck, Gavel, SlidersVertical, FileText, Vote 
} from 'lucide-react';

const HelpPage = () => {
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
      // Remove options from the last assistant message
      const updated = [...prev];
      if (updated.length > 0 && updated[updated.length - 1].sender === 'assistant') {
        updated[updated.length - 1] = { ...updated[updated.length - 1], options: undefined };
      }
      
      let type = 'quick_steps';
      if (optionId === 'first_time') type = 'beginner_guide';
      else if (optionId === 'polling_booth') type = 'polling_booth_map';
      else if (optionId === 'evm_work') type = 'evm_guide';
      else if (optionId === 'code_conduct') type = 'code_conduct_guide';
      else if (optionId === 'check_name') type = 'check_name_guide';
      
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
      { id: Date.now() + 1, sender: 'assistant', text: "I am an interactive AI demo. Please use the suggested buttons on the sidebar to explore different guides and topics!" }
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

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <h4 className="font-bold text-slate-800">First Polling Officer:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">Verification of your name in the electoral roll and checking your ID proof.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <h4 className="font-bold text-slate-800">Second Polling Officer:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">Inking of your left index finger and taking your signature.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E5E7FA] text-[#0014CC] flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <h4 className="font-bold text-slate-800">Record your Vote:</h4>
                  <p className="text-slate-600 text-[15px] mt-1">Press the blue button on the EVM next to the candidate of your choice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (msg.type === 'evm_guide') {
       return (
         <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-4">How EVMs Work</h3>
           <p className="text-slate-600 mb-4">The Electronic Voting Machine (EVM) makes voting quick and secure. Simply find your candidate's name and symbol on the ballot unit, and press the blue button next to it.</p>
           <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-800">
             <Lightbulb size={24} className="flex-shrink-0" />
             <p className="text-sm">Verify your vote using the VVPAT machine. A slip will appear for 7 seconds behind the glass window showing your chosen candidate.</p>
           </div>
         </div>
       );
    }

    if (msg.type === 'check_name_guide') {
       return (
         <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-4">Check Your Name in the Electoral Roll</h3>
           <p className="text-slate-600 mb-4">You can easily verify if your name is on the voter list by visiting the National Voters' Service Portal (NVSP) or the official ECI website.</p>
           <ul className="list-disc pl-5 space-y-2 text-slate-600">
             <li>Search by your EPIC (Voter ID) number.</li>
             <li>Search by your personal details (Name, Age, State, District).</li>
             <li>Call the voter helpline at 1950.</li>
           </ul>
         </div>
       );
    }

    if (msg.type === 'code_conduct_guide') {
       return (
         <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-4">Model Code of Conduct (MCC)</h3>
           <p className="text-slate-600 mb-4">The Model Code of Conduct is a set of guidelines issued by the Election Commission of India to regulate political parties and candidates prior to elections.</p>
           <p className="text-slate-600">It ensures free and fair elections by preventing the ruling party from misusing its power and establishing rules for speeches, polling day, polling booths, and portfolios.</p>
         </div>
       );
    }

    return null;
  };

  return (
    <div className="flex h-full w-full bg-white border-t border-slate-200">
      {/* Sidebar */}
      <div className="w-[320px] bg-[#F4F4F9] border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Get Started</h2>

          <div className="space-y-3 mb-10">
            <button onClick={() => handleOptionClick('first_time', 'I am a first-time voter')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <UserPlus className="text-[#0014CC]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">I am a first-time voter</span>
            </button>
            <button onClick={() => handleOptionClick('voting_steps', 'Show voting steps')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <ListOrdered className="text-slate-600" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Show voting steps</span>
            </button>
            <button onClick={() => handleOptionClick('polling_booth', 'Find polling booth')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <MapPin className="text-[#8B7355]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Find polling booth</span>
            </button>
            <button onClick={() => handleOptionClick('check_name', 'How to check my name in the roll?')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <UserCheck className="text-[#0014CC]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Check name in roll</span>
            </button>
            <button onClick={() => handleOptionClick('code_conduct', 'What is the Model Code of Conduct?')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <Gavel className="text-slate-600" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">Model Code of Conduct</span>
            </button>
            <button onClick={() => handleOptionClick('evm_work', 'How does EVM work?')} className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] transition-colors">
              <SlidersVertical className="text-[#8B7355]" size={20} />
              <span className="text-[15px] text-slate-700 font-medium">How does EVM work?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
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

export default HelpPage;
