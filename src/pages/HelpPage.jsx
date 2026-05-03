/**
 * HelpPage.jsx
 * Main chat interface for the ElectionGuide AI civic assistant.
 * Handles user interaction, Gemini AI responses, and contextual card rendering.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot, Mic, Paperclip, Send, Lightbulb, MapPin, ListOrdered, UserPlus,
  UserCheck, Gavel, SlidersVertical, FileText, Vote, Loader2, Copy, CheckCircle2
} from 'lucide-react';
import { translations } from '../translations';
import { askGemini, getGeminiApiKey } from '../services/geminiService';
import { sanitizeInput, getMessageTypeFromOption, buildMapSrc, buildDirectionsUrl } from '../utils/inputUtils';

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * Renders a single chat message bubble with an optional copy action.
 * Memoized to prevent re-renders when sibling messages update.
 */
const ChatMessage = React.memo(({ msg, renderContent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(msg.text || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [msg.text]);

  return (
    <div className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[85%] relative ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
        {msg.sender === 'user' ? (
          <div className="rounded-[20px] p-5 bg-[#F1F3F5] dark:bg-[#1e293b] text-slate-800 dark:text-white text-[16px] leading-relaxed w-fit ml-auto shadow-sm">
            {msg.text}
          </div>
        ) : (
          renderContent(msg)
        )}

        {/* Copy button — visible on hover */}
        {msg.text && (
          <div className={`absolute top-0 ${msg.sender === 'user' ? '-left-10' : '-right-10'} opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2`}>
            <button
              onClick={handleCopy}
              aria-label="Copy message"
              className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#0014CC] dark:hover:text-[#4d5fff] shadow-sm transition-colors"
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
ChatMessage.displayName = 'ChatMessage';

/**
 * A reusable sidebar navigation button for topic shortcuts.
 */
const SidebarButton = ({ icon: Icon, label, iconColor, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4 text-left shadow-sm hover:border-[#0014CC] dark:hover:border-[#4d5fff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0014CC]"
  >
    <Icon className={iconColor} size={20} aria-hidden="true" />
    <span className="text-[15px] text-slate-700 dark:text-slate-200 font-medium">{label}</span>
  </button>
);

// ─── Constants ────────────────────────────────────────────────────────────────

/** Minimum milliseconds between consecutive API sends (rate limiting). */
const RATE_LIMIT_MS = 2000;

// ─── Main Component ──────────────────────────────────────────────────────────

const HelpPage = ({ language = 'EN' }) => {
  const t = translations[language].help;

  const [messages, setMessages] = useState([
    { id: 1, sender: 'assistant', text: t.greeting, options: t.options }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  const messagesEndRef = useRef(null);

  // ── Side Effects ─────────────────────────────────────────────────────────

  /** Detect user location for geolocation-aware Maps rendering. */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lng: coords.longitude };
        setUserLocation(loc);
        window.trackEvent?.('location_detected', loc);
      },
      (error) => console.warn('[Geolocation] Error:', error.message)
    );
  }, []);

  /** Re-sync greeting message text when language changes. */
  useEffect(() => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated.length > 0 && updated[0].id === 1) {
        updated[0] = { ...updated[0], text: t.greeting, options: updated[0].options ? t.options : undefined };
      }
      return updated;
    });
  }, [language, t.greeting, t.options]);

  /** Scroll to the latest message whenever messages update. */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  /** Handles clicks on predefined sidebar/option buttons. */
  const handleOptionClick = useCallback((optionId, optionLabel) => {
    window.trackEvent?.('chat_option_click', { optionId, optionLabel });
    const messageType = getMessageTypeFromOption(optionId);

    setMessages(prev => {
      const updated = [...prev];
      // Remove options from the last assistant message to keep chat clean
      if (updated.length > 0 && updated[updated.length - 1].sender === 'assistant') {
        updated[updated.length - 1] = { ...updated[updated.length - 1], options: undefined };
      }
      return [
        ...updated,
        { id: Date.now(), sender: 'user', text: optionLabel },
        { id: Date.now() + 1, sender: 'assistant', type: messageType }
      ];
    });
  }, []);

  /** Sends a user message to the Gemini AI and displays the response. */
  const handleSendMessage = useCallback(async () => {
    const sanitized = sanitizeInput(inputValue);
    if (!sanitized || isLoading) return;

    // Enforce rate limiting
    const now = Date.now();
    if (now - lastSentTime < RATE_LIMIT_MS) return;
    setLastSentTime(now);

    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: sanitized }]);

    const apiKey = getGeminiApiKey();

    // Gracefully handle missing API key without crashing
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: 'assistant', text: `Please add a valid VITE_GEMINI_API_KEY to your .env file. ${t.defaultReply}` }
        ]);
      }, 500);
      return;
    }

    setIsLoading(true);
    window.trackEvent?.('chat_message_sent', { length: sanitized.length });

    try {
      const responseText = await askGemini(apiKey, sanitized, language);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'assistant', text: responseText }]);
    } catch (error) {
      console.error('[HelpPage] Gemini failed:', error.message);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I'm sorry, I'm having trouble connecting to the AI server. Please check your API key is enabled for Gemini in Google AI Studio.",
          options: t.options
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, lastSentTime, language, t.defaultReply, t.options]);

  // ── Render Helpers ────────────────────────────────────────────────────────

  /**
   * Determines which card/component to render for an assistant message,
   * based on its `type` or `text` content.
   */
  const renderMessageContent = (msg) => {
    // Plain text response from AI or option-triggered text
    if (msg.text && msg.sender === 'assistant') {
      return (
        <div className="flex flex-col items-start w-full">
          <div className="rounded-[20px] p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-[16px] leading-relaxed w-fit shadow-sm">
            {msg.text}
          </div>
          {/* Option buttons shown only with initial greeting or error recovery */}
          {msg.options && (
            <div className="flex flex-wrap gap-3 mt-4">
              {msg.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id, opt.label)}
                  className="px-5 py-2.5 rounded-full border border-[#0014CC] dark:border-[#4d5fff] text-[#0014CC] dark:text-[#4d5fff] text-sm font-semibold hover:bg-[#0014CC] hover:text-white dark:hover:bg-[#4d5fff] dark:hover:text-white transition-colors bg-white dark:bg-slate-800 shadow-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Beginner guide card (3-step grid)
    if (msg.type === 'beginner_guide') {
      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            {t.beginnerGuide.title}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: t.beginnerGuide.step1, Icon: FileText, color: 'bg-blue-100 dark:bg-blue-900/30 text-[#0014CC] dark:text-[#4d5fff]', hover: 'hover:border-[#0014CC] dark:hover:border-[#4d5fff]' },
              { step: t.beginnerGuide.step2, Icon: UserCheck, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', hover: 'hover:border-purple-600 dark:hover:border-purple-400' },
              { step: t.beginnerGuide.step3, Icon: Vote, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', hover: 'hover:border-green-600 dark:hover:border-green-400' },
            ].map(({ step, Icon, color, hover }) => (
              <div key={step.title} className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm ${hover} transition-colors cursor-pointer group`}>
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h4 className="text-[17px] font-bold text-slate-800 dark:text-white mb-2">{step.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Google Maps polling booth locator card
    if (msg.type === 'polling_booth_map') {
      const mapSrc = buildMapSrc(userLocation);
      const directionsUrl = buildDirectionsUrl(userLocation);

      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            {t.pollingBoothMap.subtitle}
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm w-full">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-[#E84E1B] dark:text-[#ff6a38]" /> {t.pollingBoothMap.title}
            </h3>
            <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapSrc}
                title="Google Maps Polling Booths"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-slate-500 dark:text-slate-400 text-[13px]">{t.pollingBoothMap.desc}</p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.trackEvent?.('get_directions_click')}
                className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <MapPin size={14} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Quick voting steps card
    if (msg.type === 'quick_steps') {
      const steps = [t.quickSteps.step1, t.quickSteps.step2, t.quickSteps.step3];
      return (
        <div className="w-full max-w-3xl">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            {t.quickSteps.subtitle}
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm w-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1 h-8 bg-[#0014CC] dark:bg-[#4d5fff]" />
              <div>
                <h3 className="text-2xl font-medium text-[#0014CC] dark:text-[#4d5fff] leading-none">{t.quickSteps.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">{t.quickSteps.desc}</p>
              </div>
            </div>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={step.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#E5E7FA] dark:bg-blue-900/30 text-[#0014CC] dark:text-[#4d5fff] flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{step.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[15px] mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // EVM explanation card
    if (msg.type === 'evm_guide') {
      return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{t.evmGuide.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t.evmGuide.desc}</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 text-blue-800 dark:text-blue-300">
            <Lightbulb size={24} className="flex-shrink-0" />
            <p className="text-sm">{t.evmGuide.tip}</p>
          </div>
        </div>
      );
    }

    // Check name in electoral roll guide
    if (msg.type === 'check_name_guide') {
      return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{t.checkNameGuide.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t.checkNameGuide.desc}</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            {t.checkNameGuide.items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      );
    }

    // Model Code of Conduct guide
    if (msg.type === 'code_conduct_guide') {
      return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{t.mccGuide.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t.mccGuide.desc1}</p>
          <p className="text-slate-600 dark:text-slate-400">{t.mccGuide.desc2}</p>
        </div>
      );
    }

    return null;
  };

  // ── Sidebar config ────────────────────────────────────────────────────────

  const sidebarItems = [
    { id: 'first_time', label: t.sidebar.firstTime, icon: UserPlus, color: 'text-[#0014CC] dark:text-[#4d5fff]' },
    { id: 'voting_steps', label: t.sidebar.votingSteps, icon: ListOrdered, color: 'text-slate-600 dark:text-slate-400' },
    { id: 'polling_booth', label: t.sidebar.findBooth, icon: MapPin, color: 'text-[#8B7355] dark:text-[#c4a985]' },
    { id: 'check_name', label: t.sidebar.checkName, icon: UserCheck, color: 'text-[#0014CC] dark:text-[#4d5fff]' },
    { id: 'code_conduct', label: t.sidebar.mcc, icon: Gavel, color: 'text-slate-600 dark:text-slate-400' },
    { id: 'evm_work', label: t.sidebar.evm, icon: SlidersVertical, color: 'text-[#8B7355] dark:text-[#c4a985]' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-1 min-h-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">

      {/* Sidebar — topic shortcuts */}
      <div className="w-[320px] bg-[#F4F4F9] dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-[22px] font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{t.sidebarTitle}</h1>
          <div className="space-y-3 mb-10">
            {sidebarItems.map(item => (
              <SidebarButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                iconColor={item.color}
                onClick={() => handleOptionClick(item.id, item.label)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">

        {/* Chat Header */}
        <div className="h-[72px] border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between bg-white dark:bg-slate-900 flex-shrink-0 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0014CC] dark:bg-[#4d5fff] rounded-xl flex items-center justify-center shadow-sm">
              <Bot size={22} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-[17px] text-slate-900 dark:text-white leading-tight">{t.chatTitle}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-slate-600 dark:text-slate-400 text-[13px] font-medium">{t.chatStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto p-12 space-y-8 bg-white dark:bg-slate-900 scroll-smooth pb-20"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} renderContent={renderMessageContent} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start w-full" data-testid="loading-spinner" aria-live="polite" aria-busy="true">
              <div className="flex items-center gap-3 rounded-[20px] p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[16px] w-fit shadow-sm">
                <Loader2 size={20} className="animate-spin text-[#0014CC] dark:text-[#4d5fff]" aria-hidden="true" />
                {t.thinking || 'Thinking...'}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="px-12 py-6 bg-white dark:bg-slate-900 flex-shrink-0 w-full border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="max-w-4xl mx-auto flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                data-testid="chat-input"
                aria-label={t.inputPlaceholder}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.inputPlaceholder}
                className="w-full h-[60px] pl-6 pr-24 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white focus:border-[#0014CC] dark:focus:border-[#4d5fff] focus:ring-0 transition-all outline-none text-[15px]"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <button className="hover:text-slate-800 dark:hover:text-white" aria-label="Voice input"><Mic size={20} aria-hidden="true" /></button>
                <button className="hover:text-slate-800 dark:hover:text-white" aria-label="Attach file"><Paperclip size={20} aria-hidden="true" /></button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              data-testid="send-button"
              aria-label="send message"
              className="w-[60px] h-[60px] bg-[#0014CC] dark:bg-[#4d5fff] hover:bg-blue-800 dark:hover:bg-[#3a48e6] rounded-[14px] flex items-center justify-center text-white shadow-md transition-colors flex-shrink-0"
            >
              <Send size={22} className="ml-0.5" aria-hidden="true" />
            </button>
          </div>
          <p className="text-center text-[12px] text-slate-500 dark:text-slate-500 mt-5">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
