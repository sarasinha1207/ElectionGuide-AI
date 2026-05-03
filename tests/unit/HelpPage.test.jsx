import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HelpPage from '../../src/pages/HelpPage';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the Gemini API
vi.mock('@google/generative-ai', () => {
  const generateContent = vi.fn();
  const getGenerativeModel = vi.fn(() => ({ generateContent }));
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function() {
      return { getGenerativeModel };
    })
  };
});

describe('HelpPage Component', () => {
  let mockGenerateContent;

  beforeEach(() => {
    vi.clearAllMocks();
    const client = new GoogleGenerativeAI('dummy');
    const model = client.getGenerativeModel({ model: 'dummy' });
    mockGenerateContent = model.generateContent;
    
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'This is a mock AI response.' }
    });
  });

  it('renders chat interface and initial greeting', () => {
    render(<HelpPage language="EN" />);
    expect(screen.getByText('Civic Assistant')).toBeInTheDocument();
  });

  it('adds user message to chat when option is clicked', () => {
    render(<HelpPage language="EN" />);
    const options = [
      "I am a first-time voter",
      "Show voting steps",
      "Find polling booth",
      "Check name in roll",
      "Model Code of Conduct",
      "How does EVM work?"
    ];

    options.forEach(option => {
      const btns = screen.getAllByLabelText(option);
      fireEvent.click(btns[0]); // Click sidebar version
      expect(screen.getAllByText(option).length).toBeGreaterThan(0);
    });
  });

  it('handles clicking options inside the chat messages', async () => {
    render(<HelpPage language="EN" />);
    // Initial options in the chat (there are two: one in sidebar, one in chat greeting)
    // Greeting is after sidebar in DOM order
    const chatOptions = screen.getAllByRole('button', { name: "I am a first-time voter" });
    fireEvent.click(chatOptions[1]); 
    expect(screen.getAllByText("I am a first-time voter").length).toBeGreaterThan(0);

    // Test clicking another option from the sidebar (since chat options disappear after first click)
    const boothBtns = screen.getAllByRole('button', { name: "Find polling booth" });
    fireEvent.click(boothBtns[0]);
    expect(await screen.findByText(/Polling Booths Near You/i)).toBeInTheDocument();
  });

  it('prevents sending messages while loading', async () => {
    mockGenerateContent.mockReturnValue(new Promise(() => {})); // Stall
    
    render(<HelpPage language="EN" />);
    const input = screen.getByPlaceholderText('Ask a question about voting...');
    const sendBtn = screen.getByLabelText(/send message/i);

    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendBtn);
    
    fireEvent.change(input, { target: { value: 'Second message' } });
    fireEvent.click(sendBtn);

    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.queryByText('Second message')).not.toBeInTheDocument();
  });

  it('handles empty or blank input gracefully', () => {
    render(<HelpPage language="EN" />);
    const input = screen.getByPlaceholderText('Ask a question about voting...');
    const sendBtn = screen.getByLabelText(/send message/i);

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(sendBtn);
    expect(screen.queryByText('   ')).not.toBeInTheDocument();
  });

  it('sanitizes user input before sending', async () => {
    render(<HelpPage language="EN" />);
    const input = screen.getByPlaceholderText('Ask a question about voting...');
    const sendBtn = screen.getByLabelText(/send message/i);

    fireEvent.change(input, { target: { value: '<script>alert("xss")</script>Hello' } });
    fireEvent.click(sendBtn);

    expect(await screen.findByText('scriptalert("xss")/scriptHello')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API Failure'));

    render(<HelpPage language="EN" />);
    const input = screen.getByPlaceholderText('Ask a question about voting...');
    const sendBtn = screen.getByLabelText(/send message/i);

    fireEvent.change(input, { target: { value: 'Error trigger' } });
    fireEvent.click(sendBtn);

    expect(await screen.findByText(/I'm sorry, I'm having trouble connecting/i)).toBeInTheDocument();
  });
});
