import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  it('renders correctly and displays the title', () => {
    render(
      <Header 
        activeTab="home" 
        setActiveTab={vi.fn()} 
        language="EN" 
        setLanguage={vi.fn()} 
        theme="light" 
        setTheme={vi.fn()} 
      />
    );
    expect(screen.getByText('ElectionGuide AI')).toBeInTheDocument();
  });

  it('calls setLanguage when language button is clicked', () => {
    const mockSetLanguage = vi.fn();
    render(
      <Header 
        activeTab="home" 
        setActiveTab={vi.fn()} 
        language="EN" 
        setLanguage={mockSetLanguage} 
        theme="light" 
        setTheme={vi.fn()} 
      />
    );
    
    const langBtn = screen.getByLabelText(/switch language/i);
    fireEvent.click(langBtn);
    expect(mockSetLanguage).toHaveBeenCalledWith('HI');
  });

  it('calls setTheme when theme button is clicked', () => {
    const mockSetTheme = vi.fn();
    render(
      <Header 
        activeTab="home" 
        setActiveTab={vi.fn()} 
        language="EN" 
        setLanguage={vi.fn()} 
        theme="light" 
        setTheme={mockSetTheme} 
      />
    );
    
    const themeBtn = screen.getByLabelText(/toggle to dark mode/i);
    fireEvent.click(themeBtn);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
