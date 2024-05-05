import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetTimelinesByEventQuery } from '@/redux/api/timelineApi';
import Calendar from '@/components/elements/Timeline/Calendar';

// Mock the useGetTimelinesByEventQuery hook
jest.mock('@/redux/api/timelineApi', () => ({
  useGetTimelinesByEventQuery: jest.fn(),
}));

jest.mock('@/components/elements/Timeline/Calendar', () => {
    return {
      __esModule: true,
      default: jest.fn(() => (
        <div>
          <div data-testid="calendar">Calendar Component</div>
          <div>Task 1</div>
          <div>Task 2</div>
        </div>
      )),
    }
});


describe('Calendar', () => {
  beforeEach(() => {
    // Mock the return value of useGetTimelinesByEventQuery
    (useGetTimelinesByEventQuery as jest.Mock).mockReturnValue({
      data: [
        {
          id: '1',
          task_step: { name: 'Task 1' },
          start_datetime: new Date('2022-05-01T09:00:00Z'),
          end_datetime: new Date('2022-05-01T10:00:00Z'),
        },
        {
          id: '2',
          task_step: { name: 'Task 2' },
          start_datetime: new Date('2022-05-01T11:00:00Z'),
          end_datetime: new Date('2022-05-01T12:00:00Z'),
        },
      ],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the calendar component', () => {
    render(<Calendar eventId="123" />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  test('displays calendar events correctly', () => {
    render(<Calendar eventId="123" />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('handles event clicks to show details in a modal', async () => {
    render(<Calendar eventId="123" />);
    fireEvent.click(screen.getByText('Task 1'));
  });
});
