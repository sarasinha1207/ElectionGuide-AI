import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, BookOpen, Clock, HelpCircle, MessageSquare, User, 
  UserPlus, ListOrdered, MapPin, Share2, Printer, Bot, Mic, Paperclip, Send, 
  Lightbulb, History, Megaphone, FileText, Users, CalendarDays, BarChart3, CheckCircle2,
  Globe, Moon, Sun, UserCheck, Vote, Gavel, SlidersVertical, Ban
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
    <div className="max-w-3xl mx-auto p-12 w-full">
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

const textDict = {
  EN: {
    title: 'Learn About Elections',
    desc: 'Explore essential topics to understand your rights, requirements, and the step-by-step process of participating in a democracy.',
    keySteps: 'Key Steps',
    proTip: 'Pro Tip',
    motivation: [
      "Your vote is your voice – use it to shape the future of our nation.",
      "Every single vote counts and can be the deciding factor in an election.",
      "Voting is not just a right, it is a fundamental duty of every responsible citizen.",
      "Democracy works best when everyone participates. Make sure you are heard!"
    ]
  },
  HI: {
    title: 'चुनावों के बारे में जानें',
    desc: 'लोकतंत्र में भाग लेने की चरण-दर-चरण प्रक्रिया, अपनी आवश्यकताओं और अधिकारों को समझने के लिए आवश्यक विषयों का अन्वेषण करें।',
    keySteps: 'मुख्य चरण',
    proTip: 'सुझाव',
    motivation: [
      "आपका वोट आपकी आवाज़ है - इसका उपयोग हमारे देश के भविष्य को आकार देने के लिए करें।",
      "हर एक वोट मायने रखता है और चुनाव में निर्णायक कारक हो सकता है।",
      "मतदान केवल एक अधिकार नहीं है, यह प्रत्येक जिम्मेदार नागरिक का मौलिक कर्तव्य है।",
      "लोकतंत्र तब सबसे अच्छा काम करता है जब सभी भाग लेते हैं। सुनिश्चित करें कि आपकी आवाज़ सुनी जाए!"
    ]
  }
};

const topicsData = [
  {
    id: 'registration', icon: UserPlus, color: 'text-blue-600', bgColor: 'bg-blue-100',
    EN: {
      title: 'Voter Registration', detailsTitle: 'How to Register to Vote',
      steps: ['Visit the National Voters Service Portal (NVSP).', 'Fill out Form 6 online or offline for new voter registration.', 'Upload required passport-size photographs and documents.', 'Track your application status using the reference ID.'],
      tip: 'Register at least one month before the election to ensure your name appears on the roll.'
    },
    HI: {
      title: 'मतदाता पंजीकरण', detailsTitle: 'पंजीकरण कैसे करें',
      steps: ['राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) पर जाएं।', 'नए मतदाता पंजीकरण के लिए ऑनलाइन या ऑफलाइन फॉर्म 6 भरें।', 'आवश्यक पासपोर्ट आकार के फोटो और दस्तावेज अपलोड करें।', 'संदर्भ आईडी का उपयोग करके अपने आवेदन की स्थिति को ट्रैक करें।'],
      tip: 'सुनिश्चित करने के लिए कि आपका नाम सूची में है, चुनाव से कम से कम एक महीने पहले पंजीकरण करें।'
    }
  },
  {
    id: 'documents', icon: FileText, color: 'text-purple-600', bgColor: 'bg-purple-100',
    EN: {
      title: 'Required Documents', detailsTitle: 'Documents Needed for Voting',
      steps: ['Valid EPIC (Voter ID Card) issued by the Election Commission.', 'If EPIC is not available, bring a recognized photo ID (e.g., Aadhaar, Passport).', 'Address proof might be required if registering for the first time.', 'Check the official ECI website for the full list of accepted documents.'],
      tip: 'Always carry the original physical copy of your ID, as digital copies might not be accepted.'
    },
    HI: {
      title: 'आवश्यक दस्तावेज', detailsTitle: 'मतदान के लिए आवश्यक दस्तावेज',
      steps: ['चुनाव आयोग द्वारा जारी वैध EPIC (वोटर आईडी कार्ड)।', 'यदि EPIC उपलब्ध नहीं है, तो एक मान्यता प्राप्त फोटो आईडी लाएं।', 'पहली बार पंजीकरण करने पर पते के प्रमाण की आवश्यकता हो सकती है।', 'स्वीकृत दस्तावेजों की पूरी सूची के लिए ECI वेबसाइट देखें।'],
      tip: 'हमेशा अपनी आईडी की मूल भौतिक प्रति साथ रखें, डिजिटल प्रतियां स्वीकार नहीं की जा सकती हैं।'
    }
  },
  {
    id: 'process', icon: Vote, color: 'text-green-600', bgColor: 'bg-green-100',
    EN: {
      title: 'Voting Process', detailsTitle: 'Step-by-Step Voting Process',
      steps: ['Present your ID to the First Polling Officer for identity verification.', 'Get your left index finger inked by the Second Polling Officer.', 'Hand over your voter slip to the Third Polling Officer.', 'Proceed to the voting compartment and press the button on the EVM.'],
      tip: 'After pressing the button, verify your vote by checking the printed slip inside the VVPAT machine.'
    },
    HI: {
      title: 'मतदान प्रक्रिया', detailsTitle: 'चरण-दर-चरण मतदान प्रक्रिया',
      steps: ['पहचान सत्यापन के लिए प्रथम मतदान अधिकारी को अपनी आईडी प्रस्तुत करें।', 'दूसरे मतदान अधिकारी द्वारा अपनी बायीं तर्जनी पर स्याही लगवाएं।', 'तीसरे मतदान अधिकारी को अपनी मतदाता पर्ची सौंपें।', 'मतदान कक्ष में जाएं और ईवीएम पर बटन दबाएं।'],
      tip: 'बटन दबाने के बाद, वीवीपीएटी मशीन के अंदर छपी पर्ची को देखकर अपने वोट की पुष्टि करें।'
    }
  },
  {
    id: 'timeline', icon: CalendarDays, color: 'text-amber-600', bgColor: 'bg-amber-100',
    EN: {
      title: 'Election Timeline', detailsTitle: 'Key Phases of the Election',
      steps: ['Announcement of election dates and Model Code of Conduct.', 'Filing of nominations by candidates and scrutiny of papers.', 'Public campaigning by political parties until 48 hours before polling.', 'Voting day, followed by secure counting and declaration of results.'],
      tip: 'Pay attention to the campaign deadline; all public meetings must stop 48 hours prior.'
    },
    HI: {
      title: 'चुनाव समयरेखा', detailsTitle: 'चुनाव के प्रमुख चरण',
      steps: ['चुनाव की तारीखों और आदर्श आचार संहिता की घोषणा।', 'उम्मीदवारों द्वारा नामांकन दाखिल करना और कागजात की जांच।', 'मतदान से 48 घंटे पहले तक राजनीतिक दलों द्वारा सार्वजनिक प्रचार।', 'मतदान का दिन, उसके बाद सुरक्षित मतगणना और परिणामों की घोषणा।'],
      tip: 'प्रचार की समय सीमा पर ध्यान दें; सभी जनसभाएं 48 घंटे पहले बंद होनी चाहिए।'
    }
  },
  {
    id: 'counting', icon: BarChart3, color: 'text-indigo-600', bgColor: 'bg-indigo-100',
    EN: {
      title: 'Vote Counting', detailsTitle: 'How Votes are Counted',
      steps: ['EVMs are securely transported to designated counting centers.', 'Seals are verified in the presence of candidate representatives.', 'Votes recorded in the Control Unit are tallied round by round.', 'Final results are declared by the Returning Officer.'],
      tip: 'You can track live counting trends and final results directly on the official ECI portal.'
    },
    HI: {
      title: 'मतगणना', detailsTitle: 'वोटों की गिनती कैसे की जाती है',
      steps: ['ईवीएम को सुरक्षित रूप से नामित मतगणना केंद्रों पर ले जाया जाता है।', 'उम्मीदवार के प्रतिनिधियों की उपस्थिति में सील का सत्यापन किया जाता है।', 'कंट्रोल यूनिट में दर्ज वोटों की राउंड दर राउंड गिनती की जाती है।', 'अंतिम परिणाम रिटर्निंग ऑफिसर द्वारा घोषित किए जाते हैं।'],
      tip: 'आप आधिकारिक ECI पोर्टल पर सीधे लाइव मतगणना रुझान और अंतिम परिणाम ट्रैक कर सकते हैं।'
    }
  },
  {
    id: 'rights', icon: Gavel, color: 'text-rose-600', bgColor: 'bg-rose-100',
    EN: {
      title: 'Voter Rights', detailsTitle: 'Understanding Voter Rights',
      steps: ['Right to vote freely without any pressure or coercion.', 'Right to secret ballot ensuring your vote remains confidential.', 'Right to know candidates through their submitted affidavits.', 'Right to NOTA (None of the Above) to reject all candidates.'],
      tip: 'No one can force you to vote for a specific candidate.'
    },
    HI: {
      title: 'मतदाता के अधिकार', detailsTitle: 'मतदाता अधिकारों को समझना',
      steps: ['बिना किसी दबाव या जोर-जबर्दस्ती के स्वतंत्र रूप से मतदान करने का अधिकार।', 'गुप्त मतदान का अधिकार जो सुनिश्चित करता है कि आपका वोट गोपनीय रहे।', 'हलफनामों के माध्यम से उम्मीदवारों को जानने का अधिकार।', 'सभी उम्मीदवारों को अस्वीकार करने के लिए नोटा का अधिकार।'],
      tip: 'कोई भी आपको किसी विशिष्ट उम्मीदवार को वोट देने के लिए मजबूर नहीं कर सकता।'
    }
  },
  {
    id: 'evm', icon: SlidersVertical, color: 'text-cyan-600', bgColor: 'bg-cyan-100',
    EN: {
      title: 'EVM Machines', detailsTitle: 'Electronic Voting Machines (EVM)',
      steps: ['Used to cast votes electronically instead of ballot papers.', 'Simple button-based voting system with candidates listed.', 'Connected to VVPAT (Voter Verifiable Paper Audit Trail) for verification.', 'Ensures fast, accurate counting and prevents invalid votes.'],
      tip: 'Always verify your vote on the VVPAT screen after pressing the button.'
    },
    HI: {
      title: 'ईवीएम मशीनें', detailsTitle: 'इलेक्ट्रॉनिक वोटिंग मशीन (EVM)',
      steps: ['मतपत्रों के बजाय इलेक्ट्रॉनिक रूप से वोट डालने के लिए उपयोग किया जाता है।', 'उम्मीदवारों की सूची के साथ सरल बटन-आधारित मतदान प्रणाली।', 'सत्यापन के लिए VVPAT से जुड़ा हुआ।', 'तेज, सटीक गिनती सुनिश्चित करता है और अवैध वोटों को रोकता है।'],
      tip: 'बटन दबाने के बाद हमेशा वीवीपीएटी स्क्रीन पर अपने वोट की पुष्टि करें।'
    }
  },
  {
    id: 'nota', icon: Ban, color: 'text-slate-600', bgColor: 'bg-slate-100',
    EN: {
      title: 'NOTA', detailsTitle: 'None of the Above (NOTA)',
      steps: ['Option to officially reject all contesting candidates in your constituency.', 'Available as the last button on the Electronic Voting Machine (EVM).', 'Your vote still counts towards total turnout, but not for any candidate.', 'It expresses dissatisfaction and promotes better candidate selection.'],
      tip: 'Use NOTA if you are genuinely not satisfied with any of the candidates.'
    },
    HI: {
      title: 'नोटा (NOTA)', detailsTitle: 'इनमें से कोई नहीं (NOTA)',
      steps: ['अपने निर्वाचन क्षेत्र में चुनाव लड़ रहे सभी उम्मीदवारों को अस्वीकार करने का विकल्प।', 'इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) पर अंतिम बटन के रूप में उपलब्ध।', 'आपका वोट कुल मतदान में गिना जाता है, लेकिन किसी उम्मीदवार के लिए नहीं।', 'यह असंतोष व्यक्त करता है और बेहतर उम्मीदवार चयन को बढ़ावा देता है।'],
      tip: 'यदि आप वास्तव में किसी भी उम्मीदवार से संतुष्ट नहीं हैं तो नोटा का प्रयोग करें।'
    }
  },
  {
    id: 'eligibility', icon: UserCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-100',
    EN: {
      title: 'Voter Eligibility', detailsTitle: 'Who Can Vote?',
      steps: ['Must be at least 18 years of age on the qualifying date.', 'Must be an Indian citizen.', 'Must be officially registered in the voter list (electoral roll).', 'Must possess a valid Voter ID (EPIC) or approved alternative ID.'],
      tip: 'Check your name in the voter list well before election day.'
    },
    HI: {
      title: 'मतदाता पात्रता', detailsTitle: 'कौन मतदान कर सकता है?',
      steps: ['अर्हता तिथि को आयु कम से कम 18 वर्ष होनी चाहिए।', 'भारतीय नागरिक होना चाहिए।', 'मतदाता सूची (निर्वाचक नामावली) में पंजीकृत होना चाहिए।', 'वैध मतदाता पहचान पत्र (EPIC) या स्वीकृत वैकल्पिक आईडी होनी चाहिए।'],
      tip: 'चुनाव के दिन से काफी पहले मतदाता सूची में अपना नाम जांच लें।'
    }
  }
];

const LearnSection = ({ language = 'EN' }) => {
  const [activeTopic, setActiveTopic] = useState(null);
  const tContent = textDict[language];

  return (
    <div className="max-w-5xl mx-auto p-8 md:p-12 w-full flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{tContent.title}</h2>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          {tContent.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-12 w-full max-w-4xl justify-center">
        {topicsData.map((topic) => {
          const Icon = topic.icon;
          const isActive = activeTopic?.id === topic.id;
          const topicContent = topic[language];
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(isActive ? null : topic)}
              className={`p-6 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-4 hover:-translate-y-1 ${
                isActive 
                  ? 'border-[#0014CC] bg-blue-50/50 shadow-md ring-1 ring-[#0014CC]' 
                  : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${topic.bgColor} ${topic.color}`}>
                <Icon size={24} />
              </div>
              <h3 className={`font-semibold text-[15px] leading-snug ${isActive ? 'text-[#0014CC]' : 'text-slate-800'}`}>
                {topicContent.title}
              </h3>
            </button>
          );
        })}
      </div>

      {activeTopic && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 mb-12 text-left">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTopic.bgColor} ${activeTopic.color}`}>
                <activeTopic.icon size={24} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900">{activeTopic[language].detailsTitle}</h3>
          </div>
          
          <div className="mb-8">
            <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-4">{tContent.keySteps}</h4>
            <ul className="space-y-4">
              {activeTopic[language].steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                     {idx + 1}
                   </div>
                   <p className="text-slate-700 leading-relaxed text-[15px]">{step}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F4F4FD] border border-indigo-100 rounded-2xl p-5 flex gap-4">
             <div className="bg-[#0014CC] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <Lightbulb size={20} className="text-white" />
             </div>
             <div>
               <h4 className="font-bold text-slate-900 text-[15px]">{tContent.proTip}</h4>
               <p className="text-slate-600 text-[14px] mt-1 leading-relaxed">
                 {activeTopic[language].tip}
               </p>
             </div>
          </div>
        </div>
      )}

      {/* Motivation Lines */}
      <div className="w-full max-w-4xl mt-8 pt-12 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tContent.motivation.map((line, idx) => (
             <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-slate-700 font-medium leading-relaxed italic text-[15px]">"{line}"</p>
             </div>
          ))}
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
    <div className="flex flex-1 h-full w-full bg-white overflow-hidden">
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

export default function App() {
  const [activeTab, setActiveTab] = useState('learn');
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
        {activeTab === 'learn' && <LearnSection language={language} />}
        
        {activeTab !== 'help' && activeTab !== 'timeline' && activeTab !== 'learn' && (
          <div className="p-12 text-center py-32 min-h-[600px]">
            <h2 className="text-3xl font-extrabold mb-4 capitalize">{activeTab} Section</h2>
            <p className="text-slate-500">Navigate to the Learn, Timeline, or Help section.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button 
                onClick={() => setActiveTab('learn')}
                className="px-6 py-2.5 bg-[#0014CC] text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Go to Learn
              </button>
              <button 
                onClick={() => setActiveTab('help')}
                className="px-6 py-2.5 bg-slate-100 text-slate-800 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Go to Help
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#F8FAFC] border-t border-slate-200 py-6 px-8 flex-shrink-0 w-full z-10">
          <div className="max-w-3xl">
              <h3 className="font-bold text-slate-900 text-[15px] mb-2">ElectionGuide AI</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                  © 2024 Election Commission Assistant. All rights reserved.<br/>
                  For educational purposes only. Empowering every citizen with accurate information.
              </p>
          </div>
      </footer>
    </div>
  );
}
