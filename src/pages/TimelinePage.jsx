import React from 'react';
import { Megaphone, FileText, Users, CalendarDays, BarChart3, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';

const TimelinePage = ({ language = 'EN' }) => {
  const t = translations[language].timeline;
  const icons = [Megaphone, FileText, Users, CalendarDays, BarChart3];
  const colors = [
    { color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    { color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    { color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
    { color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    { color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' }
  ];

  return (
    <div className="max-w-3xl mx-auto p-12 flex-1 h-full overflow-y-auto hide-scrollbar">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">{t.subtitle}</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>

        <div className="space-y-10 pb-12">
          {t.steps.map((step, index) => {
            const Icon = icons[index];
            const { color, border } = colors[index];
            return (
              <div key={index} className="relative flex items-start gap-6 group">
                {/* Stepper Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white dark:border-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110 ${color}`}>
                  <Icon size={24} />
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white dark:bg-slate-800 border ${border} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{t.phasePrefix} {index + 1}</span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{step.desc}</p>
                  
                  {/* Google Calendar Reminder Button */}
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(t.reminderTitle + ': ' + step.title)}&details=${encodeURIComponent(t.reminderDesc + step.desc)}&dates=20260515T090000Z/20260515T100000Z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                  >
                    <CalendarDays size={16} className="text-[#0014CC] dark:text-[#4d5fff]" />
                    {t.reminderBtn}
                  </a>
                </div>

                {/* Success Checkmark overlay (simulating progress) */}
                {index < 2 && (
                  <div className="absolute left-[38px] top-10 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm z-20">
                    <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />
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

export default TimelinePage;
