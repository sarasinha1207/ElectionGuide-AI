/**
 * TimelinePage.jsx
 * Displays the Indian election process as an interactive, step-by-step timeline.
 * Integrates with Google Calendar via calendarService for phase-specific reminders.
 */

import React from 'react';
import { Megaphone, FileText, Users, CalendarDays, BarChart3, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';
import { openCalendarEvent } from '../services/calendarService';

/** Icons mapped to each election phase by index. */
const PHASE_ICONS = [Megaphone, FileText, Users, CalendarDays, BarChart3];

/** Color themes for each election phase card and icon. */
const PHASE_COLORS = [
  { icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  { icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
  { icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  { icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
  { icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' },
];

/**
 * Renders a single timeline step card.
 * @param {{ step, index, phasePrefix, reminderBtn, t }} props
 */
const TimelineStep = ({ step, index, phasePrefix, reminderBtn, t }) => {
  const Icon = PHASE_ICONS[index];
  const { icon: iconColor, border } = PHASE_COLORS[index];
  const isCompleted = index < 2; // First two phases shown as completed

  return (
    <li className="relative flex items-start gap-6 group">
      {/* Phase icon */}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white dark:border-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110 ${iconColor}`}>
        <Icon size={24} aria-hidden="true" />
      </div>

      {/* Phase content card */}
      <div className={`flex-1 bg-white dark:bg-slate-800 border ${border} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500" aria-hidden="true">
            {phasePrefix} {index + 1}
          </span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{step.title}</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{step.desc}</p>

        {/* Google Calendar reminder button */}
        <button
          onClick={() => openCalendarEvent(index, step, t)}
          aria-label={`${reminderBtn} for ${step.title}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0014CC]"
        >
          <CalendarDays size={16} className="text-[#0014CC] dark:text-[#4d5fff]" aria-hidden="true" />
          {reminderBtn}
        </button>
      </div>

      {/* Completed checkmark overlay for early phases */}
      {isCompleted && (
        <div
          className="absolute left-[38px] top-10 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm z-20"
          aria-hidden="true"
        >
          <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />
        </div>
      )}
    </li>
  );
};

const TimelinePage = ({ language = 'EN' }) => {
  const t = translations[language].timeline;

  return (
    <div className="max-w-3xl mx-auto p-12 flex-1 h-full overflow-y-auto hide-scrollbar">
      {/* Page heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">{t.subtitle}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 dark:bg-slate-800 rounded-full" aria-hidden="true" />

        <ol aria-label="Election Timeline" className="space-y-10 pb-12">
          {t.steps.map((step, index) => (
            <TimelineStep
              key={step.title}
              step={step}
              index={index}
              phasePrefix={t.phasePrefix}
              reminderBtn={t.reminderBtn}
              t={t}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TimelinePage;
