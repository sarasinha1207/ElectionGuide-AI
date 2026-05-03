import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../src/App';

describe('App Component', () => {
  it('renders the App and Home Page by default', async () => {
    render(<App />);
    
    // Check if hero title is present
    expect(await screen.findByText(/Understand Elections with/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Confidence/i).length).toBeGreaterThan(0);
  });

  it('toggles language between English and Hindi', async () => {
    render(<App />);
    
    // Find language toggle button
    const langBtn = screen.getByLabelText(/Switch language to Hindi/i);
    fireEvent.click(langBtn);
    
    // Check for Hindi text (from translations.js HI.home.titleHighlight)
    expect(await screen.findByText(/आत्मविश्वास के साथ समझें/i)).toBeInTheDocument();
  });

  it('switches between all tabs correctly', async () => {
    render(<App />);
    
    // Switch to Learn
    fireEvent.click(screen.getAllByRole('button', { name: /Learn/i })[0]);
    expect(await screen.findByText(/Learn About Elections/i)).toBeInTheDocument();

    // Switch to Timeline
    fireEvent.click(screen.getAllByRole('button', { name: /Timeline/i })[0]);
    expect(await screen.findByText(/Election Process Timeline/i)).toBeInTheDocument();

    // Switch to Help
    fireEvent.click(screen.getAllByRole('button', { name: /Help/i })[0]);
    expect(await screen.findByTestId('chat-input', {}, { timeout: 5000 })).toBeInTheDocument();

    // Switch back to Home
    fireEvent.click(screen.getAllByRole('button', { name: /Home/i })[0]);
    expect(await screen.findByText(/Understand Elections with/i)).toBeInTheDocument();
  }, 15000);

  it('toggles dark mode', async () => {
    render(<App />);
    const themeBtn = screen.getByLabelText(/Toggle to dark mode/i);
    fireEvent.click(themeBtn);
    
    // After click, label should change to toggle to light mode
    expect(screen.getByLabelText(/Toggle to light mode/i)).toBeInTheDocument();
  });
});
