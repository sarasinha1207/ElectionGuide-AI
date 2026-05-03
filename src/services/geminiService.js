/**
 * geminiService.js
 * Handles all Gemini AI API interactions.
 * Abstracts model selection and error handling away from UI components.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/** Ordered list of models to attempt, based on API key capabilities. */
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.5-flash-latest',
];

/**
 * Retrieves the Gemini API key from environment variables.
 * Returns a test stub in test environments.
 * @returns {string|null} The API key, or null if not configured.
 */
export const getGeminiApiKey = () => {
  if (process.env.NODE_ENV === 'test' || window.__VITEST__) {
    return 'AIzaSy_TEST_KEY';
  }
  const key = import.meta.env.VITE_GEMINI_API_KEY || window.env?.VITE_GEMINI_API_KEY;
  if (!key || key.includes('PLACEHOLDER') || key.includes('your_actual')) return null;
  return key;
};

/**
 * Builds the system prompt for the Election Assistant.
 * @param {string} userQuestion - The user's question.
 * @param {string} language - 'EN' or 'HI'.
 * @returns {string} The formatted prompt string.
 */
const buildElectionPrompt = (userQuestion, language) => `
You are a helpful, knowledgeable, and concise Election Assistant for the Indian Election Commission.

User Question: "${userQuestion}"

Guidelines:
- Use structured responses with bullet points if applicable.
- Use bold text for key terms.
- Keep it under 3 short paragraphs.
- Language: ${language === 'HI' ? 'Hindi' : 'English'}.
`.trim();

/**
 * Sends a question to the Gemini AI and returns the response text.
 * Tries multiple model variants to handle regional availability differences.
 * @param {string} apiKey - The Gemini API key.
 * @param {string} userQuestion - The user's sanitized question.
 * @param {string} language - 'EN' or 'HI'.
 * @returns {Promise<string>} The AI response text.
 * @throws {Error} If all model attempts fail.
 */
export const askGemini = async (apiKey, userQuestion, language) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildElectionPrompt(userQuestion, language);

  for (const modelName of GEMINI_MODELS) {
    try {
      console.log(`[Gemini] Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log(`[Gemini] ✅ Success with: ${modelName}`);
      return responseText;
    } catch (error) {
      console.warn(`[Gemini] ❌ ${modelName} failed:`, error.message);
    }
  }

  throw new Error('All Gemini models failed. Please check your API key and region settings.');
};
