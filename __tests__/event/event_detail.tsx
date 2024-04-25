import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventDetail from '@/app/event/[eventId]/(eventId)/page'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

jest.mock('@/app/plans/AISuggestion/AIButton', () => ({
  AIButton: jest.fn().mockReturnValue(<div>Mock AIButton</div>),
}))
jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn().mockReturnValue({
    data: { id: '1', recommend_venue: true, recommend_vendor: true },
  }),
  useUpdateEventMutation: jest
    .fn()
    .mockReturnValue([jest.fn().mockResolvedValue({ data: {} })]),
}))
jest.mock('@/redux/api/taskApi', () => ({
  useCreateTaskMutation: jest
    .fn()
    .mockReturnValue([jest.fn().mockResolvedValue({ data: { id: 1 } })]),
  useGetAllTasksQuery: jest.fn().mockReturnValue({
    data: [],
    isLoading: false,
  }),
  useUpdateTaskMutation: jest
    .fn()
    .mockReturnValue([jest.fn().mockResolvedValue({ data: { id: 1 } })]),
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
      <Provider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </Provider>
    )

    const myPlan = getByText('Plan')

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
      <EventDetail
        params={{
          eventId: eventId,
        }}
      />
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
      <Provider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </Provider>
    )

    const myPlan = getByTestId('plan')

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
      <EventDetail
        params={{
          eventId: eventId,
        }}
      />
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
      <Provider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </Provider>
    )

    const tracker = getByTestId('tracker')

    tracker.click()

    expect(setChipType).toHaveBeenCalledWith('tracker')
  })
  it('clicks the rundown', () => {
    const myInitialState = 'rundown'

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
      <Provider store={store}>
        <EventDetail
          params={{
            eventId: eventId,
          }}
        />
      </Provider>
    )

    const tracker = getByTestId('tracker')

    tracker.click()

    expect(setChipType).toHaveBeenCalledWith('tracker')
  })
})
