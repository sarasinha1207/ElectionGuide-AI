import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimelinePage from '../../src/pages/TimelinePage';

describe('TimelinePage Component', () => {
  it('renders the timeline list with calendar reminder buttons', () => {
    // Mock window.open since the calendar buttons use it
    window.open = vi.fn();

    render(<TimelinePage language="EN" />);

    // Check main title is rendered
    expect(screen.getByText('Election Process Timeline')).toBeInTheDocument();

    // Check the ordered list is present with the correct aria label
    const timelineList = screen.getByRole('list', { name: /Election Timeline/i });
    expect(timelineList).toBeInTheDocument();

    // Check reminder buttons are rendered (one per phase)
    const reminderButtons = screen.getAllByRole('button', { name: /Set Reminder/i });
    expect(reminderButtons.length).toBeGreaterThan(0);
  });
});
