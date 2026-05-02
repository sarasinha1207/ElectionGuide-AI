import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimelinePage from '../../src/pages/TimelinePage';

describe('TimelinePage Component', () => {
  it('renders the timeline list with calendar links', () => {
    render(<TimelinePage language="EN" />);
    
    // Check main title
    expect(screen.getByText('Election Process Timeline')).toBeInTheDocument();
    
    // Check list role
    const timelineList = screen.getByRole('list', { name: /Election Timeline/i });
    expect(timelineList).toBeInTheDocument();

    // Check calendar links
    const calendarLinks = screen.getAllByRole('link', { name: /Set Reminder/i });
    expect(calendarLinks.length).toBeGreaterThan(0);
    expect(calendarLinks[0]).toHaveAttribute('href', expect.stringContaining('calendar.google.com/calendar/render'));
  });
});
