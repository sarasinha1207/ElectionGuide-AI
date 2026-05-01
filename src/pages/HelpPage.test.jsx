import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HelpPage from './HelpPage';

// Mock the Gemini API
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: { text: () => 'This is a mock AI response.' }
      })
    })
  }))
}));

describe('HelpPage Component', () => {
  it('renders chat interface and initial greeting', () => {
    render(<HelpPage language="EN" />);
    
    expect(screen.getByText('Civic Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask a question about voting...')).toBeInTheDocument();
  });

  it('adds user message to chat when option is clicked', () => {
    render(<HelpPage language="EN" />);
    
    // Find the "I am a first-time voter" option
    const optionBtn = screen.getAllByRole('button', { name: /I am a first-time voter/i })[0];
    expect(optionBtn).toBeInTheDocument();
    
    // Click it
    fireEvent.click(optionBtn);
    
    // Option should disappear and user message should appear
    expect(screen.queryByRole('button', { name: /I am a first-time voter/i })).not.toBeInTheDocument();
  });
});
