export const translations = {
  EN: {
    // Header
    header: {
      title: 'ElectionGuide AI',
      home: 'Home',
      learn: 'Learn',
      timeline: 'Timeline',
      help: 'Help',
    },
    // Footer
    footer: {
      rights: '© 2024 Election Commission Assistant. All rights reserved.',
      purpose: 'For educational purposes only. Empowering every citizen with accurate information.',
      privacy: 'Privacy Policy',
      accessibility: 'Accessibility Settings',
      support: 'Contact Support',
      portal: 'Official ECI Portal'
    },
    // Home Page
    home: {
      tag: 'AI-Powered Voting Guide',
      title1: 'Understand Elections with ',
      titleHighlight: 'Confidence',
      subtitle: 'Learn how to register, prepare, and vote through a simple AI-powered guide.',
      getStarted: 'Get Started',
      askAI: 'Ask AI Assistant',
      stepsTitle: 'How to Vote in 4 Simple Steps',
      steps: [
        { title: 'Check Registration', text: 'Verify your name in the voter list before election day.' },
        { title: 'Carry Documents', text: 'Bring your voter ID or approved identity proof.' },
        { title: 'Visit Polling Booth', text: 'Go to your assigned polling station on voting day.' },
        { title: 'Cast Your Vote', text: 'Use the EVM machine and confirm your choice.' }
      ],
      whyMatters: 'Why This Matters',
      reasons: [
        { title: 'Know Your Rights', text: 'Understand your democratic power.' },
        { title: 'Avoid Common Mistakes', text: 'Ensure your vote counts without errors.' },
        { title: 'Vote with Confidence', text: 'Walk into the booth fully prepared.' }
      ],
      quickAccess: 'Quick Access',
      learnMore: 'Learn More',
      findBooth: 'Find Polling Booth',
      specialCases: 'Check Special Cases'
    },
    // Learn Page
    learn: {
      pageTitle: 'Learn About Elections',
      pageSubtitle: 'A comprehensive guide to understanding your role, rights, and the democratic process.',
      registration: {
        title: 'Voter Registration',
        steps: [
          'Fill Form 6 online via NVSP portal or Voter Helpline App',
          'Submit required documents (Age & Address proof)',
          'Wait for BLO (Booth Level Officer) verification',
          'Track application status using your reference ID'
        ],
        tip: 'You can register up to 10 days before the last date of filing nominations in your constituency.'
      },
      documents: {
        title: 'Required Documents',
        steps: [
          'EPIC (Voter ID Card) is the primary document',
          'Aadhaar Card, PAN Card, or Driving License',
          'Passport or Passbook with photograph',
          'MGNREGA Job Card or Health Insurance Smart Card'
        ],
        tip: 'Even if your name is on the voter list, you MUST carry one of the 12 approved identity documents to vote.'
      },
      votingProcess: {
        title: 'Voting Process',
        steps: [
          'First polling officer checks your name and ID',
          'Second officer inks your finger and takes signature',
          'Third officer takes the slip and allows you to vote',
          'Press the button on EVM next to your chosen candidate'
        ],
        tip: 'Your vote is completely secret. Nobody, including the polling officers, can see who you voted for.'
      },
      voterRights: {
        title: 'Voter Rights',
        steps: [
          'Right to vote freely without fear or coercion',
          'Right to a secret ballot',
          'Right to know the criminal antecedents of candidates',
          'Right to choose NOTA (None of the Above)'
        ],
        tip: 'No one can force you to vote for a specific candidate or party.'
      },
      evm: {
        title: 'EVM Machines',
        steps: [
          'EVMs are standalone machines, not connected to any network',
          'They have two units: Control Unit and Ballot Unit',
          'A beep sound confirms your vote is recorded',
          'VVPAT machine prints a paper slip for verification'
        ],
        tip: 'Always verify your vote on the VVPAT screen. The slip is visible for 7 seconds.'
      },
      nota: {
        title: 'NOTA Option',
        steps: [
          'NOTA stands for "None of the Above"',
          'It is the last option on every EVM',
          'It allows you to reject all candidates in your constituency',
          'It does NOT invalidate the election even if it gets majority'
        ],
        tip: 'While NOTA expresses dissatisfaction, the candidate with the highest votes among the others still wins.'
      },
      eligibility: {
        title: 'Voter Eligibility',
        steps: [
          'Must be a citizen of India',
          'Must be 18 years of age on the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1)',
          'Must be ordinarily resident in the constituency',
          'Must not be disqualified under any law'
        ],
        tip: 'NRIs can also vote, but they must register using Form 6A and be physically present at the polling booth.'
      },
      mcc: {
        title: 'Model Code of Conduct',
        steps: [
          'Guidelines for political parties and candidates',
          'Comes into effect immediately after election dates are announced',
          'Prevents ruling party from using official machinery for campaigns',
          'Bans appeals to caste or communal feelings'
        ],
        tip: 'You can report MCC violations using the cVIGIL app directly to the Election Commission.'
      },
      offences: {
        title: 'Electoral Offences',
        steps: [
          'Bribery or intimidation of voters is a criminal offence',
          'Impersonation (voting in someone else\'s name) is strictly punishable',
          'Canvassing within 100 meters of a polling station is banned',
          'Transporting voters to the booth by a candidate is illegal'
        ],
        tip: 'If anyone offers you money or gifts for your vote, report it immediately on the cVIGIL app.'
      }
    },
    // Timeline Page
    timeline: {
      title: 'Election Process Timeline',
      subtitle: 'A clear overview of how the democratic process unfolds.',
      phasePrefix: 'Phase',
      reminderBtn: 'Set Reminder',
      reminderTitle: 'Election Reminder',
      reminderDesc: 'Important election phase: ',
      steps: [
        { title: 'Announcement', desc: 'The Election Commission announces the election schedule, invoking the Model Code of Conduct.' },
        { title: 'Nomination', desc: 'Candidates file their nomination papers and affidavits. Scrutiny and withdrawal follows.' },
        { title: 'Campaign', desc: 'Political parties and candidates campaign to reach out to voters. Ends 48 hours before voting.' },
        { title: 'Voting Day', desc: 'Registered voters cast their ballots at designated polling stations using EVMs and VVPATs.' },
        { title: 'Results', desc: 'Votes are counted under strict security, and the results are officially declared.' }
      ]
    },
    // Help Page
    help: {
      sidebarTitle: 'Get Started',
      sidebar: {
        firstTime: 'I am a first-time voter',
        votingSteps: 'Show voting steps',
        findBooth: 'Find polling booth',
        checkName: 'Check name in roll',
        mcc: 'Model Code of Conduct',
        evm: 'How does EVM work?'
      },
      chatTitle: 'Civic Assistant',
      chatStatus: 'Online & ready to help',
      inputPlaceholder: 'Ask a question about voting...',
      disclaimer: 'ElectionGuide AI can make mistakes. Verify important info at the Official ECI Portal.',
      defaultReply: 'I am an interactive AI demo. Please use the suggested buttons on the sidebar to explore different guides and topics!',
      greeting: "Hi! I'm your Civic Assistant. How can I assist you with your voting journey today?",
      options: [
        { id: 'first_time', label: 'I am a first-time voter' },
        { id: 'voting_steps', label: 'Show voting steps' },
        { id: 'polling_booth', label: 'Find polling booth' }
      ],
      beginnerGuide: {
        title: "Beginner's Election Guide",
        step1: { title: '1. Registration', text: 'Register in the electoral roll and get your Voter ID (EPIC).' },
        step2: { title: '2. Verification', text: 'Verify your name on the voter list and find your polling booth.' },
        step3: { title: '3. Polling Day', text: 'Visit the booth, get verified, and cast your vote on the EVM.' }
      },
      pollingBoothMap: {
        subtitle: 'Nearby Polling Booths',
        title: 'Polling Booths Near You',
        desc: 'Showing approximate locations based on your current area.',
        btn: 'Get Directions'
      },
      quickSteps: {
        subtitle: 'ElectionGuide AI Response',
        title: 'How to Vote',
        desc: 'A step-by-step guide for your visit to the polling station.',
        processHeading: 'The Polling Station Process',
        step1: { title: 'First Polling Officer:', text: 'Verification of your name in the electoral roll and checking your ID proof.' },
        step2: { title: 'Second Polling Officer:', text: 'Inking of your left index finger and taking your signature.' },
        step3: { title: 'Record your Vote:', text: 'Press the blue button on the EVM next to the candidate of your choice.' }
      },
      evmGuide: {
        title: 'How EVMs Work',
        desc: 'The Electronic Voting Machine (EVM) makes voting quick and secure. Simply find your candidate\'s name and symbol on the ballot unit, and press the blue button next to it.',
        tip: 'Verify your vote using the VVPAT machine. A slip will appear for 7 seconds behind the glass window showing your chosen candidate.'
      },
      checkNameGuide: {
        title: 'Check Your Name in the Electoral Roll',
        desc: 'You can easily verify if your name is on the voter list by visiting the National Voters\' Service Portal (NVSP) or the official ECI website.',
        items: [
          'Search by your EPIC (Voter ID) number.',
          'Search by your personal details (Name, Age, State, District).',
          'Call the voter helpline at 1950.'
        ]
      },
      mccGuide: {
        title: 'Model Code of Conduct (MCC)',
        desc1: 'The Model Code of Conduct is a set of guidelines issued by the Election Commission of India to regulate political parties and candidates prior to elections.',
        desc2: 'It ensures free and fair elections by preventing the ruling party from misusing its power and establishing rules for speeches, polling day, polling booths, and portfolios.'
      }
    }
  },
  HI: {
    // Header
    header: {
      title: 'इलेक्शनगाइड एआई (ElectionGuide AI)',
      home: 'होम',
      learn: 'सीखें',
      timeline: 'समयरेखा',
      help: 'सहायता',
    },
    // Footer
    footer: {
      rights: '© 2024 चुनाव आयोग सहायक। सर्वाधिकार सुरक्षित।',
      purpose: 'केवल शैक्षिक उद्देश्यों के लिए। सटीक जानकारी के साथ प्रत्येक नागरिक को सशक्त बनाना।',
      privacy: 'गोपनीयता नीति',
      accessibility: 'पहुंच सेटिंग्स',
      support: 'संपर्क समर्थन',
      portal: 'आधिकारिक ECI पोर्टल'
    },
    // Home Page
    home: {
      tag: 'एआई-संचालित मतदान गाइड',
      title1: 'चुनावों को ',
      titleHighlight: 'आत्मविश्वास के साथ समझें',
      subtitle: 'एक सरल एआई-संचालित गाइड के माध्यम से पंजीकरण, तैयारी और मतदान करना सीखें।',
      getStarted: 'शुरू करें',
      askAI: 'एआई से पूछें',
      stepsTitle: '4 सरल चरणों में मतदान कैसे करें',
      steps: [
        { title: 'पंजीकरण जांचें', text: 'चुनाव के दिन से पहले मतदाता सूची में अपना नाम सत्यापित करें।' },
        { title: 'दस्तावेज साथ रखें', text: 'अपना मतदाता पहचान पत्र या स्वीकृत पहचान प्रमाण लाएं।' },
        { title: 'मतदान केंद्र पर जाएं', text: 'मतदान के दिन अपने निर्धारित मतदान केंद्र पर जाएं।' },
        { title: 'अपना वोट डालें', text: 'ईवीएम मशीन का उपयोग करें और अपनी पसंद की पुष्टि करें।' }
      ],
      whyMatters: 'यह क्यों मायने रखता है',
      reasons: [
        { title: 'अपने अधिकार जानें', text: 'अपनी लोकतांत्रिक शक्ति को समझें।' },
        { title: 'सामान्य गलतियों से बचें', text: 'सुनिश्चित करें कि आपका वोट बिना किसी त्रुटि के गिना जाए।' },
        { title: 'आत्मविश्वास से वोट करें', text: 'पूरी तैयारी के साथ बूथ में प्रवेश करें।' }
      ],
      quickAccess: 'त्वरित पहुँच',
      learnMore: 'और जानें',
      findBooth: 'मतदान केंद्र खोजें',
      specialCases: 'विशेष मामलों की जाँच करें'
    },
    // Learn Page
    learn: {
      pageTitle: 'चुनावों के बारे में जानें',
      pageSubtitle: 'आपकी भूमिका, अधिकारों और लोकतांत्रिक प्रक्रिया को समझने के लिए एक व्यापक मार्गदर्शिका।',
      registration: {
        title: 'मतदाता पंजीकरण',
        steps: [
          'NVSP पोर्टल या वोटर हेल्पलाइन ऐप के माध्यम से फॉर्म 6 ऑनलाइन भरें',
          'आवश्यक दस्तावेज (आयु और पते का प्रमाण) जमा करें',
          'बीएलओ (बूथ लेवल ऑफिसर) के सत्यापन की प्रतीक्षा करें',
          'अपनी संदर्भ आईडी का उपयोग करके आवेदन की स्थिति को ट्रैक करें'
        ],
        tip: 'आप अपने निर्वाचन क्षेत्र में नामांकन दाखिल करने की अंतिम तिथि से 10 दिन पहले तक पंजीकरण करा सकते हैं।'
      },
      documents: {
        title: 'आवश्यक दस्तावेज़',
        steps: [
          'EPIC (वोटर आईडी कार्ड) प्राथमिक दस्तावेज है',
          'आधार कार्ड, पैन कार्ड या ड्राइविंग लाइसेंस',
          'पासपोर्ट या फोटोयुक्त पासबुक',
          'मनरेगा जॉब कार्ड या स्वास्थ्य बीमा स्मार्ट कार्ड'
        ],
        tip: 'भले ही आपका नाम मतदाता सूची में हो, आपको मतदान करने के लिए 12 अनुमोदित पहचान दस्तावेजों में से एक साथ ले जाना होगा।'
      },
      votingProcess: {
        title: 'मतदान प्रक्रिया',
        steps: [
          'पहला मतदान अधिकारी आपका नाम और आईडी जांचता है',
          'दूसरा अधिकारी आपकी उंगली पर स्याही लगाता है और हस्ताक्षर लेता है',
          'तीसरा अधिकारी पर्ची लेता है और आपको वोट देने की अनुमति देता है',
          'अपने चुने हुए उम्मीदवार के बगल में ईवीएम पर बटन दबाएं'
        ],
        tip: 'आपका वोट पूरी तरह से गुप्त है। कोई भी, मतदान अधिकारी भी नहीं, यह देख सकता है कि आपने किसे वोट दिया है।'
      },
      voterRights: {
        title: 'मतदाता अधिकार',
        steps: [
          'बिना किसी डर या दबाव के स्वतंत्र रूप से वोट देने का अधिकार',
          'गुप्त मतदान का अधिकार',
          'उम्मीदवारों के आपराधिक इतिहास को जानने का अधिकार',
          'नोटा (इनमें से कोई नहीं) चुनने का अधिकार'
        ],
        tip: 'कोई भी आपको किसी विशिष्ट उम्मीदवार या पार्टी को वोट देने के लिए मजबूर नहीं कर सकता है।'
      },
      evm: {
        title: 'ईवीएम मशीन',
        steps: [
          'ईवीएम स्टैंडअलोन मशीन हैं, किसी भी नेटवर्क से जुड़ी नहीं हैं',
          'इनकी दो इकाइयाँ हैं: कंट्रोल यूनिट और बैलेट यूनिट',
          'एक बीप ध्वनि पुष्टि करती है कि आपका वोट दर्ज किया गया है',
          'VVPAT मशीन सत्यापन के लिए एक पेपर स्लिप प्रिंट करती है'
        ],
        tip: 'VVPAT स्क्रीन पर हमेशा अपने वोट की पुष्टि करें। पर्ची 7 सेकंड तक दिखाई देती है।'
      },
      nota: {
        title: 'नोटा (NOTA) विकल्प',
        steps: [
          'NOTA का अर्थ है "इनमें से कोई नहीं"',
          'यह प्रत्येक ईवीएम पर अंतिम विकल्प है',
          'यह आपको अपने निर्वाचन क्षेत्र के सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है',
          'बहुमत मिलने पर भी यह चुनाव को अमान्य नहीं करता है'
        ],
        tip: 'जबकि नोटा असंतोष व्यक्त करता है, अन्य उम्मीदवारों में सबसे अधिक वोट पाने वाला उम्मीदवार ही जीतता है।'
      },
      eligibility: {
        title: 'मतदाता पात्रता',
        steps: [
          'भारत का नागरिक होना चाहिए',
          'अर्हक तिथि (1 जनवरी, 1 अप्रैल, 1 जुलाई, 1 अक्टूबर) को 18 वर्ष की आयु पूरी कर लेनी चाहिए',
          'निर्वाचन क्षेत्र में सामान्य रूप से निवासी होना चाहिए',
          'किसी भी कानून के तहत अयोग्य नहीं होना चाहिए'
        ],
        tip: 'NRI भी मतदान कर सकते हैं, लेकिन उन्हें फॉर्म 6A का उपयोग करके पंजीकरण करना होगा और मतदान केंद्र पर शारीरिक रूप से उपस्थित होना होगा।'
      },
      mcc: {
        title: 'आदर्श आचार संहिता',
        steps: [
          'राजनीतिक दलों और उम्मीदवारों के लिए दिशानिर्देश',
          'चुनाव की तारीखों की घोषणा के तुरंत बाद लागू होता है',
          'सत्तारूढ़ दल को चुनाव प्रचार के लिए आधिकारिक मशीनरी का उपयोग करने से रोकता है',
          'जाति या सांप्रदायिक भावनाओं की अपील पर प्रतिबंध लगाता है'
        ],
        tip: 'आप चुनाव आयोग को सीधे cVIGIL ऐप का उपयोग करके एमसीसी उल्लंघन की रिपोर्ट कर सकते हैं।'
      },
      offences: {
        title: 'चुनावी अपराध',
        steps: [
          'मतदाताओं को रिश्वत देना या डराना एक आपराधिक कृत्य है',
          'प्रतिरूपण (किसी और के नाम पर मतदान करना) सख्ती से दंडनीय है',
          'मतदान केंद्र के 100 मीटर के दायरे में प्रचार करना प्रतिबंधित है',
          'उम्मीदवार द्वारा मतदाताओं को बूथ तक ले जाना अवैध है'
        ],
        tip: 'यदि कोई आपको आपके वोट के लिए पैसे या उपहार देता है, तो तुरंत cVIGIL ऐप पर इसकी रिपोर्ट करें।'
      }
    },
    // Timeline Page
    timeline: {
      title: 'चुनाव प्रक्रिया समयरेखा',
      subtitle: 'लोकतांत्रिक प्रक्रिया कैसे सामने आती है, इसका स्पष्ट अवलोकन।',
      phasePrefix: 'चरण',
      reminderBtn: 'रिमाइंडर सेट करें',
      reminderTitle: 'चुनाव रिमाइंडर',
      reminderDesc: 'महत्वपूर्ण चुनाव चरण: ',
      steps: [
        { title: 'घोषणा', desc: 'चुनाव आयोग चुनाव कार्यक्रम की घोषणा करता है, आदर्श आचार संहिता लागू करता है।' },
        { title: 'नामांकन', desc: 'उम्मीदवार अपना नामांकन पत्र और हलफनामा दाखिल करते हैं। जांच और वापसी होती है।' },
        { title: 'प्रचार', desc: 'राजनीतिक दल और उम्मीदवार मतदाताओं तक पहुंचने के लिए प्रचार करते हैं। मतदान से 48 घंटे पहले समाप्त होता है।' },
        { title: 'मतदान का दिन', desc: 'पंजीकृत मतदाता ईवीएम और वीवीपीएटी का उपयोग करके निर्धारित मतदान केंद्रों पर अपना वोट डालते हैं।' },
        { title: 'परिणाम', desc: 'कड़ी सुरक्षा के बीच वोटों की गिनती की जाती है, और परिणाम आधिकारिक रूप से घोषित किए जाते हैं।' }
      ]
    },
    // Help Page
    help: {
      sidebarTitle: 'शुरू करें',
      sidebar: {
        firstTime: 'मैं पहली बार मतदान कर रहा हूँ',
        votingSteps: 'मतदान के चरण दिखाएं',
        findBooth: 'मतदान केंद्र खोजें',
        checkName: 'सूची में नाम जांचें',
        mcc: 'आदर्श आचार संहिता',
        evm: 'ईवीएम कैसे काम करता है?'
      },
      chatTitle: 'नागरिक सहायक',
      chatStatus: 'ऑनलाइन और मदद के लिए तैयार',
      inputPlaceholder: 'मतदान के बारे में एक प्रश्न पूछें...',
      disclaimer: 'इलेक्शनगाइड एआई से गलतियां हो सकती हैं। आधिकारिक ECI पोर्टल पर महत्वपूर्ण जानकारी की पुष्टि करें।',
      defaultReply: 'मैं एक इंटरैक्टिव एआई डेमो हूं। विभिन्न गाइड और विषयों का पता लगाने के लिए कृपया साइडबार पर सुझाए गए बटनों का उपयोग करें!',
      greeting: "नमस्ते! मैं आपका नागरिक सहायक हूँ। आज मैं आपकी मतदान यात्रा में कैसे सहायता कर सकता हूँ?",
      options: [
        { id: 'first_time', label: 'मैं पहली बार मतदान कर रहा हूँ' },
        { id: 'voting_steps', label: 'मतदान के चरण दिखाएं' },
        { id: 'polling_booth', label: 'मतदान केंद्र खोजें' }
      ],
      beginnerGuide: {
        title: "शुरुआती चुनाव गाइड",
        step1: { title: '1. पंजीकरण', text: 'मतदाता सूची में पंजीकरण करें और अपना वोटर आईडी (EPIC) प्राप्त करें।' },
        step2: { title: '2. सत्यापन', text: 'मतदाता सूची में अपना नाम जांचें और अपना मतदान केंद्र खोजें।' },
        step3: { title: '3. मतदान का दिन', text: 'बूथ पर जाएं, सत्यापित हों और ईवीएम पर अपना वोट डालें।' }
      },
      pollingBoothMap: {
        subtitle: 'आसपास के मतदान केंद्र',
        title: 'आपके आस-पास के मतदान केंद्र',
        desc: 'आपके वर्तमान क्षेत्र के आधार पर अनुमानित स्थान दिखा रहा है।',
        btn: 'दिशा-निर्देश प्राप्त करें'
      },
      quickSteps: {
        subtitle: 'इलेक्शनगाइड एआई प्रतिक्रिया',
        title: 'मतदान कैसे करें',
        desc: 'मतदान केंद्र पर आपकी यात्रा के लिए चरण-दर-चरण मार्गदर्शिका।',
        processHeading: 'मतदान केंद्र प्रक्रिया',
        step1: { title: 'प्रथम मतदान अधिकारी:', text: 'मतदाता सूची में आपके नाम का सत्यापन और आपके आईडी प्रमाण की जांच।' },
        step2: { title: 'दूसरा मतदान अधिकारी:', text: 'आपकी बायीं तर्जनी पर स्याही लगाना और आपके हस्ताक्षर लेना।' },
        step3: { title: 'अपना वोट दर्ज करें:', text: 'अपनी पसंद के उम्मीदवार के बगल में ईवीएम पर नीला बटन दबाएं।' }
      },
      evmGuide: {
        title: 'ईवीएम कैसे काम करते हैं',
        desc: 'इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) मतदान को त्वरित और सुरक्षित बनाती है। बस बैलेट यूनिट पर अपने उम्मीदवार का नाम और चिन्ह खोजें, और उसके बगल में नीला बटन दबाएं।',
        tip: 'VVPAT मशीन का उपयोग करके अपने वोट की पुष्टि करें। आपके चुने हुए उम्मीदवार को दिखाते हुए कांच की खिड़की के पीछे 7 सेकंड के लिए एक पर्ची दिखाई देगी।'
      },
      checkNameGuide: {
        title: 'मतदाता सूची में अपना नाम जांचें',
        desc: 'आप राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) या आधिकारिक ECI वेबसाइट पर जाकर आसानी से सत्यापित कर सकते हैं कि आपका नाम मतदाता सूची में है या नहीं।',
        items: [
          'अपने EPIC (वोटर आईडी) नंबर से खोजें।',
          'अपने व्यक्तिगत विवरण (नाम, आयु, राज्य, जिला) द्वारा खोजें।',
          'वोटर हेल्पलाइन 1950 पर कॉल करें।'
        ]
      },
      mccGuide: {
        title: 'आदर्श आचार संहिता (MCC)',
        desc1: 'आदर्श आचार संहिता चुनाव से पहले राजनीतिक दलों और उम्मीदवारों को विनियमित करने के लिए भारत निर्वाचन आयोग द्वारा जारी दिशा-निर्देशों का एक समूह है।',
        desc2: 'यह शासक दल को अपनी शक्ति का दुरुपयोग करने से रोककर स्वतंत्र और निष्पक्ष चुनाव सुनिश्चित करता है और भाषणों, मतदान के दिन, मतदान केंद्रों और विभागों के लिए नियम स्थापित करता है।'
      }
    }
  }
};
