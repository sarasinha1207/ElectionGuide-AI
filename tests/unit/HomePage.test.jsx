import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../../src/pages/HomePage';

describe('HomePage Component', () => {
  it('renders the hero section with title and buttons', () => {
    render(<HomePage onNavigate={vi.fn()} language="EN" />);
    
    // Check for the main heading text
    expect(screen.getAllByText(/Confidence/i).length).toBeGreaterThan(0);
    
    // Check for buttons
    const getStartedBtn = screen.getByRole('button', { name: /Get Started/i });
    const askAIBtn = screen.getByRole('button', { name: /Ask AI Assistant/i });
    
    expect(getStartedBtn).toBeInTheDocument();
    expect(askAIBtn).toBeInTheDocument();
  });

  it('renders the voting steps section', () => {
    render(<HomePage onNavigate={vi.fn()} language="EN" />);
    expect(screen.getByText('How to Vote in 4 Simple Steps')).toBeInTheDocument();
  });

  it('calls onNavigate when buttons are clicked', () => {
    const onNavigate = vi.fn();
    render(<HomePage onNavigate={onNavigate} language="EN" />);
    
    // Click Get Started
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    expect(onNavigate).toHaveBeenCalledWith('learn');

    // Click Ask AI
    fireEvent.click(screen.getByRole('button', { name: /Ask AI Assistant/i }));
    expect(onNavigate).toHaveBeenCalledWith('help');

    // Click Quick Access buttons
    const learnMoreBtn = screen.getByLabelText(/Learn More/i);
    const findBoothBtn = screen.getByLabelText(/Find Polling Booth/i);
    const specialCasesBtn = screen.getByLabelText(/Special Cases/i);

    fireEvent.click(learnMoreBtn);
    expect(onNavigate).toHaveBeenCalledWith('learn');
    
    fireEvent.click(findBoothBtn);
    expect(onNavigate).toHaveBeenCalledWith('help');

    fireEvent.click(specialCasesBtn);
    expect(onNavigate).toHaveBeenCalledWith('learn');
  });
});
