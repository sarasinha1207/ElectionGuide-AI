/**
 * calendarService.js
 * Handles Google Calendar event generation and URL construction.
 * Provides a clean interface for opening calendar events from any component.
 */

/** Default event date used for non-specific election phases. */
const DEFAULT_EVENT_DATE = '20260515T090000Z/20260515T100000Z';

/**
 * Builds the Google Calendar URL for a given election phase.
 * @param {number} phaseIndex - Zero-based index of the election phase.
 * @param {string} stepTitle - Display title of the phase.
 * @param {string} stepDesc - Description of the phase.
 * @param {string} reminderTitle - Localized label prefix (e.g., "Reminder").
 * @param {string} reminderDesc - Localized description prefix.
 * @returns {string} A fully encoded Google Calendar event URL.
 */
export const buildCalendarUrl = (phaseIndex, stepTitle, stepDesc, reminderTitle, reminderDesc) => {
  let eventTitle = `${reminderTitle}: ${stepTitle}`;
  let eventDate = DEFAULT_EVENT_DATE;
  let eventDetails = `${reminderDesc}${stepDesc}\n\nReminder: Make sure to carry your Voter ID!`;

  // Phase-specific overrides for accurate event scheduling
  if (phaseIndex === 1) {
    // Voter Registration Deadline
    eventTitle = 'Voter Registration Deadline';
    eventDate = '20260420T170000Z/20260420T180000Z';
  } else if (phaseIndex === 3) {
    // Election Day
    eventTitle = 'ELECTION DAY - VOTE!';
    eventDate = '20260520T070000Z/20260520T180000Z';
    eventDetails += '\nPolling Hours: 7 AM to 6 PM';
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=${eventDate}`;
};

/**
 * Opens a Google Calendar event for the given election phase in a new tab.
 * @param {number} phaseIndex - Zero-based index of the election phase.
 * @param {object} step - The step object containing title and desc.
 * @param {object} t - Localized translation strings.
 */
export const openCalendarEvent = (phaseIndex, step, t) => {
  const url = buildCalendarUrl(phaseIndex, step.title, step.desc, t.reminderTitle, t.reminderDesc);
  window.trackEvent?.('calendar_click', { phase: phaseIndex + 1, title: step.title });
  window.open(url, '_blank');
};
