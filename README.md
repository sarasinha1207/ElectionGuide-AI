# 🗳️ ElectionGuide AI - Civic Smart Assistant

![ElectionGuide AI](https://img.shields.io/badge/Status-Hackathon_Ready-success)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-cyan)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange)
![Google Maps](https://img.shields.io/badge/Google_Maps-Embedded-green)

**🔴 Live Deployment URL:** [https://electionguide-ai-772585005795.asia-south1.run.app/](https://electionguide-ai-772585005795.asia-south1.run.app/)

ElectionGuide AI is a dynamic, multilingual smart assistant built to simplify the democratic process for first-time voters and citizens. It acts as a comprehensive, AI-powered civic companion that guides users through voter registration, polling day procedures, and electoral rights.

---

## 🎯 1. Chosen Vertical
**Smart Assistant / Civic Technology**
This project targets the "First-Time Voters" and general civic education vertical. The goal is to lower the barrier to entry for democratic participation by providing a clear, interactive, and intelligent platform that answers questions and provides localized resources.

---

## 🧠 2. Approach & Logic

Our approach focuses on combining **structured educational content** with **free-form AI assistance** to cater to different user needs:
1. **Context-Aware Decision Engine:** The Help Page features a smart sidebar that provides context-specific guides based on user status (e.g., "First-Time Voter", "Looking for Polling Booth").
2. **Generative AI Fallback:** When predefined guides don't answer a user's specific edge-case (e.g., *"I am an NRI living in Dubai, can I vote?"*), the integrated **Gemini 2.5 Flash** model dynamically generates accurate, civic-minded responses.
3. **Bilingual Accessibility:** The entire application state (UI, text, and AI context) dynamically switches between English and Hindi, ensuring maximum reach and inclusivity.
4. **Action-Oriented Design:** Instead of just providing text, the app provides actionable deep-links (Google Calendar reminders) and spatial data (Google Maps).

---

## ⚙️ 3. How the Solution Works

* **The Educational Hub (Learn & Timeline):** Users can read through a highly accessible, dark-mode compatible UI that breaks down complex Model Code of Conduct (MCC) rules, EVM instructions, and election timelines into digestible steps.
* **Civic Assistant Chatbot:** A fixed-height, auto-scrolling chat interface powered by the Gemini API. 
* **Location Services:** Clicking "Find Polling Booth" injects an interactive Google Map directly into the chat interface, using the Maps Embed API.
* **Event Reminders:** The Timeline page uses deep-linking to pre-fill Google Calendar events, allowing users to set election reminders without requiring complex OAuth flows.

---

## ☁️ 4. Google Services Integration

The application makes meaningful and efficient use of the Google ecosystem:
1. **Google Gemini API (`gemini-2.5-flash`)**: Acts as the conversational engine for the chatbot. It processes natural language queries regarding election laws and procedures.
2. **Google Maps Embed API**: Integrated into the chatbot's decision tree to visually render nearby polling stations, keeping the user within the app environment.
3. **Google Calendar (Template API)**: Utilizes intelligent deep-linking to allow users to add election phases directly to their Google Calendars with pre-filled titles, descriptions, and dates.

---

## 🛡️ 5. Evaluation Focus Areas

### Code Quality
* **Component-Based Architecture:** Built using React functional components with clear separation of concerns (e.g., separate files for `LearnPage`, `HelpPage`, and isolated `translations.js`).
* **Maintainability:** Tailwind CSS utility classes are used alongside custom `@utility` directives (like `hide-scrollbar`) to keep the styling robust and CSS files minimal.

### Security
* **Environment Variables:** All API keys (`VITE_GEMINI_API_KEY`, `VITE_GOOGLE_MAPS_API_KEY`) are strictly managed via `.env` files.
* **Git Integrity:** `.env` is explicitly ignored in `.gitignore` and `.dockerignore` to prevent accidental credential leaks during deployment.
* **Safe Runtime Secret Injection:** Instead of baking secrets into the Docker image during Cloud Build (which exposes them in the artifact registry), we utilize a secure Nginx entrypoint `sed` script. This injects Google Cloud Run runtime secrets directly into the frontend `window.env` object right as the server spins up, keeping the static image completely credential-free.

### Efficiency
* **Node 22 Optimized Build:** Uses the latest Node.js 22 Alpine environment to ensure compatibility with Vite's high-speed compilation engine.
* **Dockerized Deployment:** The project includes a highly optimized, multi-stage `Dockerfile` using Nginx to serve static React build files, ensuring a minimal memory footprint (allowing Cloud Run to scale to zero efficiently).
* **Serverless Google Calendar Integration:** Reminders are handled via deep-links rather than heavy API OAuth flows, saving bandwidth and user friction.

### Accessibility
* **Bilingual Support:** Full Hindi language translation matrix built-in.
* **Theme Support:** System-aware Light and Dark modes with highly contrasted, WCAG-friendly color palettes (`text-slate-900` vs `dark:text-white`).
* **UI/UX:** Fixed-viewport chat interfaces prevent confusing layout shifts, and scrollbars are intelligently managed for clean readability.

---

## 📌 6. Assumptions Made
* The user has basic internet connectivity to access the web application.
* The chatbot's primary scope is based on the Election Commission of India (ECI) guidelines.
* Location-based polling booth mapping assumes the user allows browser location context or standard regional search parameters.

---

### Testing & Quality Assurance
* **Comprehensive Test Suite:** Integrated **Vitest** and **React Testing Library** to ensure component reliability.
* **Unit Testing:** Individual tests for `Header`, `App`, `HomePage`, `LearnPage`, and `TimelinePage` ensure core logic is protected against regressions.
* **Mocked AI Responses:** The `HelpPage` tests utilize mocked Gemini API responses to validate chat logic without incurring API costs during CI/CD.

### Accessibility (A11y)
* **Semantic HTML5:** Full implementation of `<main>`, `<header>`, `<footer>`, `<nav>`, and `<section>` tags for proper document structure.
* **ARIA Support:** Comprehensive use of `aria-label`, `aria-expanded`, and `aria-current` attributes to support screen readers.
* **Keyboard Navigation:** Ensured all interactive elements are focusable and have visible focus states.
* **Skip to Content:** Added a hidden "Skip to content" link for keyboard and screen reader users to bypass navigation.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v20+)
* A Google Cloud Project with the **Maps Embed API** enabled.
* A Google AI Studio **Gemini API Key**.

### Local Setup
\`\`\`bash
# Install dependencies
npm install

# Run tests
npm run test

# Create environment file
echo "VITE_GEMINI_API_KEY=your_key" > .env
echo "VITE_GOOGLE_MAPS_API_KEY=your_key" >> .env

# Run development server
npm run dev
\`\`\`

### Docker Build (Cloud Run Ready)
\`\`\`bash
docker build -t electionguide-ai .
docker run -p 8080:80 electionguide-ai
\`\`\`
