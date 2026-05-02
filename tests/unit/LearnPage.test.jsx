import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LearnPage from '../../src/pages/LearnPage';

describe('LearnPage Component', () => {
  it('renders learning topics and expands them on click', () => {
    render(<LearnPage language="EN" />);
    
    // Check main title
    expect(screen.getByText('Learn About Elections')).toBeInTheDocument();
    
    // Find the first topic button
    const firstTopicBtn = screen.getByRole('button', { name: /Voter Registration/i });
    expect(firstTopicBtn).toBeInTheDocument();
    expect(firstTopicBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(firstTopicBtn);
    
    // Ensure aria-expanded is updated
    expect(firstTopicBtn).toHaveAttribute('aria-expanded', 'true');
    
    // Ensure detailed content appears
    expect(screen.getByText('How to Register to Vote')).toBeInTheDocument();
    expect(screen.getByText('Visit the National Voters Service Portal (NVSP).')).toBeInTheDocument();
  });
});
