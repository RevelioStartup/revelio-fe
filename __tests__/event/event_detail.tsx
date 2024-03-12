import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventDetail from '@/app/event/[eventId]/(eventId)/page'
import { useGetEventQuery } from '@/redux/api/eventApi'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn(),
}))

describe('Event Detail', () => {
  it('renders the myplan', () => {
    const myInitialState = 'plan'

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const eventId = '1'

    const mockEventData = {
      id: '1',
      name: 'asd',
      budget: 'asd',
      date: '2023-20-05',
      objective: 'adfsf',
      attendees: 'number',
      theme: 'string',
      services: 'string',
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: false,
    })

    const { getByTestId, getByText } = render(
      <ReduxProvider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </ReduxProvider>
    )

    const myPlan = getByText('My Plan')

    expect(myPlan).toBeInTheDocument()
  })

  it('renders loading', () => {
    const myInitialState = 'plan'

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const eventId = '1'

    const mockEventData = {
      id: '1',
      name: 'asd',
      budget: 'asd',
      date: '2023-20-05',
      objective: 'adfsf',
      attendees: 'number',
      theme: 'string',
      services: 'string',
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: true,
    })

    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </ReduxProvider>
    )

    const loader = getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('clicks the myplan', () => {
    const myInitialState = 'plan'

    const setChipType = jest.fn()

    React.useState = jest.fn().mockReturnValue([myInitialState, setChipType])

    const eventId = '1'

    const mockEventData = {
      id: '1',
      name: 'asd',
      budget: 'asd',
      date: '2023-20-05',
      objective: 'adfsf',
      attendees: 'number',
      theme: 'string',
      services: 'string',
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: false,
    })

    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </ReduxProvider>
    )

    const myPlan = getByTestId('myplan')

    myPlan.click()

    expect(setChipType).toHaveBeenCalledWith('plan')
  })

  it('clicks the timeline', () => {
    const myInitialState = 'timeline'

    const setChipType = jest.fn()

    React.useState = jest.fn().mockReturnValue([myInitialState, setChipType])

    const eventId = '1'

    const mockEventData = {
      id: '1',
      name: 'asd',
      budget: 'asd',
      date: '2023-20-05',
      objective: 'adfsf',
      attendees: 'number',
      theme: 'string',
      services: 'string',
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: false,
    })

    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </ReduxProvider>
    )

    const timeline = getByTestId('timeline')

    timeline.click()

    expect(setChipType).toHaveBeenCalledWith('timeline')
  })

  it('clicks the tracker', () => {
    const myInitialState = 'tracker'

    const setChipType = jest.fn()

    React.useState = jest.fn().mockReturnValue([myInitialState, setChipType])

    const eventId = '1'

    const mockEventData = {
      id: '1',
      name: 'asd',
      budget: 'asd',
      date: '2023-20-05',
      objective: 'adfsf',
      attendees: 'number',
      theme: 'string',
      services: 'string',
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: false,
    })

    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </ReduxProvider>
    )

    const tracker = getByTestId('tracker')

    tracker.click()

    expect(setChipType).toHaveBeenCalledWith('tracker')
  })
})
