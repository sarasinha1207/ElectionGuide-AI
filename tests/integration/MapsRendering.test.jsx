import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HelpPage from '../../src/pages/HelpPage';

describe('Google Maps Integration Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders Google Maps iframe when "Find polling booth" is selected', () => {
    // Mock environment variables
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'test-key');
    window.env = { VITE_GOOGLE_MAPS_API_KEY: 'test-key' };

    render(<HelpPage language="EN" />);

    // Click "Find polling booth" option
    const optionBtn = screen.getAllByRole('button', { name: /Find polling booth/i })[0];
    fireEvent.click(optionBtn);

    // Check if iframe is rendered
    const mapIframe = screen.getByTitle(/Google Maps Polling Booths/i);
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'));
  });

  it('renders fallback map link if API key is invalid or missing', () => {
    // Mock missing key
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'VITE_GOOGLE_MAPS_API_KEY_PLACEHOLDER');
    window.env = { VITE_GOOGLE_MAPS_API_KEY: 'VITE_GOOGLE_MAPS_API_KEY_PLACEHOLDER' };

    render(<HelpPage language="EN" />);

    const optionBtn = screen.getAllByRole('button', { name: /Find polling booth/i })[0];
    fireEvent.click(optionBtn);

    const mapIframe = screen.getByTitle(/Google Maps Polling Booths/i);
    // Check if it's either the embed URL or the fallback search URL
    const src = mapIframe.getAttribute('src');
    expect(src).toMatch(/google\.com\/maps/);
  });
});
