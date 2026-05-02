import React, { useState } from 'react';
import { UserPlus, FileText, Vote, CalendarDays, BarChart3, Gavel, SlidersVertical, Ban, UserCheck, Lightbulb } from 'lucide-react';

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
    id: 'registration', icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30',
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
    id: 'documents', icon: FileText, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30',
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
    id: 'process', icon: Vote, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30',
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
    id: 'timeline', icon: CalendarDays, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/30',
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
    id: 'counting', icon: BarChart3, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
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
    id: 'rights', icon: Gavel, color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-100 dark:bg-rose-900/30',
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
    id: 'evm', icon: SlidersVertical, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
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
    id: 'nota', icon: Ban, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-800',
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
    id: 'eligibility', icon: UserCheck, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
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

// Memoize individual topic cards
const TopicButton = React.memo(({ topic, isActive, onClick, language }) => {
  const Icon = topic.icon;
  const topicContent = topic[language];
  return (
    <button
      onClick={onClick}
      aria-expanded={isActive}
      aria-controls="topic-details"
      className={`p-6 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-4 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0014CC] focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
        isActive 
          ? 'border-[#0014CC] dark:border-[#4d5fff] bg-blue-50/50 dark:bg-blue-900/30 shadow-md ring-1 ring-[#0014CC] dark:ring-[#4d5fff]' 
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${topic.bgColor} ${topic.color}`}>
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className={`font-semibold text-[15px] leading-snug ${isActive ? 'text-[#0014CC] dark:text-[#4d5fff]' : 'text-slate-800 dark:text-slate-200'}`}>
        {topicContent.title}
      </h3>
    </button>
  );
});

// Memoize the details section
const TopicDetails = React.memo(({ activeTopic, language, tContent }) => (
  <section id="topic-details" aria-live="polite" aria-labelledby="topic-details-title" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 mb-12 text-left">
    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTopic.bgColor} ${activeTopic.color}`}>
          <activeTopic.icon size={24} aria-hidden="true" />
       </div>
       <h3 id="topic-details-title" className="text-2xl font-bold text-slate-900 dark:text-white">{activeTopic[language].detailsTitle}</h3>
    </div>
    
    <div className="mb-8">
      <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-4">{tContent.keySteps}</h4>
      <ul className="space-y-4">
        {activeTopic[language].steps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-3">
             <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
               {idx + 1}
             </div>
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">{step}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-[#F4F4FD] dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-5 flex gap-4">
       <div className="bg-[#0014CC] dark:bg-[#4d5fff] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <Lightbulb size={20} className="text-white" aria-hidden="true" />
       </div>
       <div>
         <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">{tContent.proTip}</h4>
         <p className="text-slate-600 dark:text-slate-400 text-[14px] mt-1 leading-relaxed">
           {activeTopic[language].tip}
         </p>
       </div>
    </div>
  </section>
));

const LearnPage = ({ language = 'EN' }) => {
  const [activeTopic, setActiveTopic] = useState(null);
  const tContent = textDict[language];

  return (
    <div className="max-w-5xl mx-auto p-8 md:p-12 w-full flex flex-col items-center flex-1 h-full overflow-y-auto transition-colors hide-scrollbar">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{tContent.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          {tContent.desc}
        </p>
      </div>

      <div role="group" aria-label="Learning Topics" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12 w-full max-w-4xl justify-center">
        {topicsData.map((topic) => (
          <TopicButton 
            key={topic.id} 
            topic={topic} 
            isActive={activeTopic?.id === topic.id} 
            onClick={() => setActiveTopic(activeTopic?.id === topic.id ? null : topic)}
            language={language}
          />
        ))}
      </div>

      {activeTopic && (
        <TopicDetails activeTopic={activeTopic} language={language} tContent={tContent} />
      )}

      {/* Motivation Lines */}
      <div className="w-full max-w-4xl mt-8 pt-12 border-t border-slate-200 dark:border-slate-800 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tContent.motivation.map((line, idx) => (
             <div key={idx} className="bg-[#F8FAFC] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic text-[15px]">"{line}"</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
