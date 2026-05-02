import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../src/components/Header';

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
    
    const langBtn = screen.getByLabelText(/Switch language to Hindi/i);
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
    
    const themeBtn = screen.getByLabelText(/Toggle to dark mode/i);
    fireEvent.click(themeBtn);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('navigates through all tabs', () => {
    const mockSetActiveTab = vi.fn();
    render(
      <Header 
        activeTab="home" 
        setActiveTab={mockSetActiveTab} 
        language="EN" 
        setLanguage={vi.fn()} 
        theme="light" 
        setTheme={vi.fn()} 
      />
    );
    
    fireEvent.click(screen.getByText('Learn'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('learn');
    
    fireEvent.click(screen.getByText('Timeline'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('timeline');
    
    fireEvent.click(screen.getByText('Help'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('help');
    
    fireEvent.click(screen.getByText('Home'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('home');
  });
});
