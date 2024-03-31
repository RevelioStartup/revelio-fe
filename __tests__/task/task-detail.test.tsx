import { EventTracker } from '@/app/event/[eventId]/(eventId)/EventTracker'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  queryByTestId,
} from '@testing-library/react'
import '@testing-library/jest-dom'

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
}))

describe('EventTracker', () => {
  const props = {
    id: '1',
    name: 'Test Event',
    budget: 1000,
    date: '2024-03-29',
    objective: 'Test Objective',
    attendees: 100,
    theme: 'Test Theme',
    services: 'Test Services',
    recommend_venue: true,
    recommend_vendor: true,
    tasks: [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        event: '1',
        status: 'Not Started',
      },
      {
        id: 2,
        title: 'Test Task 2',
        description: 'Test Description 2',
        event: '1',
        status: 'On Progress',
      },
      {
        id: 3,
        title: 'Test Task 3',
        description: 'Test Description 3',
        event: '1',
        status: 'Done',
      },
    ],
  }

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EventTracker {...props} tasks={props.tasks} />
      </Provider>
    )
    expect(getByTestId('label-1')).toBeInTheDocument()
  })

  it('toggles form visibility when button is clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <EventTracker {...props} tasks={[]} />
      </Provider>
    )
    const button = getByTestId('show-or-hide-button')
    fireEvent.click(button)
    expect(getByTestId('title-input')).toBeInTheDocument()
    expect(getByTestId('description-input')).toBeInTheDocument()
    fireEvent.click(button)
    expect(queryByTestId('title-input')).not.toBeInTheDocument()
    expect(queryByTestId('description-input')).not.toBeInTheDocument()
  })

  it('does not render venue and vendor selection when not recommended', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <EventTracker
          {...{ ...props, recommend_venue: false, recommend_vendor: false }}
          tasks={[]}
        />
      </Provider>
    )
    expect(queryByTestId('add-venue-selection')).not.toBeInTheDocument()
    expect(queryByTestId('add-vendor-selection')).not.toBeInTheDocument()
    fireEvent.click(getByTestId('show-or-hide-button'))
    expect(getByTestId('label-3')).toBeInTheDocument()
    expect(getByTestId('title-input')).toBeInTheDocument()
    expect(getByTestId('description-input')).toBeInTheDocument()
  })

  it('renders labels correctly based on props', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EventTracker {...props} tasks={[]} />
      </Provider>
    )
    expect(getByTestId('label-1')).toBeInTheDocument()
    expect(getByTestId('label-2')).toBeInTheDocument()
  })

  it('hides venue selection when no-button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <EventTracker
          {...{ ...props, recommend_venue: true, recommend_vendor: true }}
          tasks={[]}
        />
      </Provider>
    )
    fireEvent.click(getByTestId('venue-no-button'))
    await waitFor(() => {
      expect(queryByTestId('add-venue-selection')).not.toBeInTheDocument()
    })

    fireEvent.click(getByTestId('vendor-no-button'))
    await waitFor(() => {
      expect(queryByTestId('add-vendor-selection')).not.toBeInTheDocument()
    })
  })
})
