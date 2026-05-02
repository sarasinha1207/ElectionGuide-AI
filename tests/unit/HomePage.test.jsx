import { render, screen } from '@testing-library/react';
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
});
