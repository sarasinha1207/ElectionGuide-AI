import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Define mocks outside
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn(() => ({
  generateContent: mockGenerateContent,
}));

// Mock Gemini API as a class to support 'new'
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    constructor() {}
    getGenerativeModel = mockGetGenerativeModel;
  }
}));

import HelpPage from '../../src/pages/HelpPage';

describe('ChatBot Integration Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    vi.stubEnv('VITE_GEMINI_API_KEY', 'AIzaSy_VALID_KEY');
  });

  it('successfully completes a full chat flow with Gemini API', async () => {
    const user = userEvent.setup();
    const mockResponse = "To register as a voter in India, you need to fill Form 6 on the NVSP portal.";
    mockGenerateContent.mockResolvedValue({
      response: { text: () => mockResponse }
    });

    render(<HelpPage language="EN" />);

    const input = screen.getByTestId('chat-input');
    const sendBtn = screen.getByTestId('send-button');

    await user.type(input, 'How to register?');
    await user.click(sendBtn);

    const responseMsg = await screen.findByText(mockResponse, {}, { timeout: 8000 });
    expect(responseMsg).toBeInTheDocument();
  }, 15000);

  it('handles API errors gracefully with a fallback message', async () => {
    const user = userEvent.setup();
    mockGenerateContent.mockRejectedValue(new Error('API Failure'));

    render(<HelpPage language="EN" />);

    const input = screen.getByTestId('chat-input');
    const sendBtn = screen.getByTestId('send-button');

    await user.type(input, 'Error test');
    await user.click(sendBtn);

    const errorMsg = await screen.findByText(/I'm sorry, I'm having trouble connecting to the AI server/i, {}, { timeout: 8000 });
    expect(errorMsg).toBeInTheDocument();
  }, 15000);

  it('prevents sending empty messages', async () => {
    const user = userEvent.setup();
    render(<HelpPage language="EN" />);
    const sendBtn = screen.getByTestId('send-button');

    await user.click(sendBtn);
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });
});
