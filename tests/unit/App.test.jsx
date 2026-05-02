import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../src/App';

// Mock matchMedia to prevent JSDOM errors
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component', () => {
  it('renders the App and Home Page by default', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main Content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });
  it('toggles language correctly', async () => {
    const { getByLabelText, getByText } = render(<App />);
    
    // Default is English
    expect(screen.getByText(/Understand Elections with/i)).toBeInTheDocument();
    
    // Switch to Hindi
    const langBtn = screen.getByLabelText(/Switch language to Hindi/i);
    fireEvent.click(langBtn);
    
    // Check for Hindi text (from translations.js HI.home.titleHighlight)
    expect(screen.getAllByText(/आत्मविश्वास के साथ समझें/i).length).toBeGreaterThan(0);
  });
});
