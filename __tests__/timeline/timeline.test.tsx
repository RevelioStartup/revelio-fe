import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useGetTimelinesByEventQuery } from '@/redux/api/timelineApi'
import { EventTimeline } from '@/app/event/[eventId]/(eventId)/EventTimeline'

jest.mock('@/redux/api/timelineApi', () => ({
  useGetTimelinesByEventQuery: jest.fn(),
}))

jest.mock('@/components/elements/Timeline/Calendar', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Mocked DemoApp</div>),
  }
})

jest.mock('@/components/elements/Timeline/TimelineDetailsModal', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Mocked DemoApp</div>),
  }
})

describe('EventTimeline', () => {
  beforeEach(() => {
    ;(useGetTimelinesByEventQuery as jest.Mock).mockReturnValue({
      data: [
        {
          id: '1',
          start_datetime: '2022-05-01T09:00:00Z',
          end_datetime: '2022-05-01T10:00:00Z',
          task_step: { name: 'Setup' },
        },
        {
          id: '2',
          start_datetime: '2022-05-01T11:00:00Z',
          end_datetime: '2022-05-01T12:00:00Z',
          task_step: { name: 'Teardown' },
        },
      ],
      isLoading: false,
      isError: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches and displays timeline events', async () => {
    render(
      <Provider store={store}>
        <EventTimeline id="123" />
      </Provider>
    )
  })

  it('handles event clicks to show details in a modal', async () => {
    render(
      <Provider store={store}>
        <EventTimeline id="123" />
      </Provider>
    )

    const mockEvent = {
      event: {
        title: 'Setup',
        start: new Date('2022-05-01T09:00:00Z'),
        end: new Date('2022-05-01T10:00:00Z'),
      },
    }
  })
})
