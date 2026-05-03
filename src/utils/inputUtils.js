/**
 * inputUtils.js
 * Utility functions for input validation and sanitization.
 * Used across components to ensure secure and consistent user input handling.
 */

/** Maximum allowed input length to prevent API abuse. */
const MAX_INPUT_LENGTH = 500;

/**
 * Sanitizes a user input string by stripping HTML tags and trimming whitespace.
 * Limits output to MAX_INPUT_LENGTH characters.
 * @param {string} str - The raw input string from the user.
 * @returns {string} A safe, trimmed string ready for API use.
 */
export const sanitizeInput = (str) => {
  if (!str) return '';
  return str.replace(/[<>]/g, '').trim().substring(0, MAX_INPUT_LENGTH);
};

/**
 * Determines the chat message type based on a selected option ID.
 * Maps predefined option IDs to their corresponding message card types.
 * @param {string} optionId - The ID of the selected chat option.
 * @returns {string} The message type string used for conditional rendering.
 */
export const getMessageTypeFromOption = (optionId) => {
  const typeMap = {
    first_time: 'beginner_guide',
    polling_booth: 'polling_booth_map',
    evm_work: 'evm_guide',
    code_conduct: 'code_conduct_guide',
    check_name: 'check_name_guide',
  };
  return typeMap[optionId] || 'quick_steps';
};

/**
 * Constructs a Google Maps embed URL centered on the given coordinates.
 * Falls back to a general polling booth search if no location is available.
 * @param {{ lat: number, lng: number }|null} location - The user's geolocation.
 * @returns {string} A Google Maps embed iframe URL.
 */
export const buildMapSrc = (location) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || window.env?.VITE_GOOGLE_MAPS_API_KEY || '';
  const query = location
    ? `polling+booth+near+${location.lat},${location.lng}`
    : 'polling+booth+near+me+India';
  return `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${query}&zoom=14`;
};

/**
 * Constructs a Google Maps directions URL based on the user's location.
 * @param {{ lat: number, lng: number }|null} location - The user's geolocation.
 * @returns {string} A Google Maps directions URL.
 */
export const buildDirectionsUrl = (location) => {
  const destination = location
    ? `${location.lat},${location.lng}`
    : 'polling+booth+near+me+India';
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};
