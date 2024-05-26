import EventPage from '@/app/event/(event)/page'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useEventContext } from '@/components/contexts/EventContext'
import React from 'react'
import { useCreateEventMutation } from '@/redux/api/eventApi'
import { useGetAllTasksQuery } from '@/redux/api/taskApi'
import dayjs from 'dayjs'

jest.mock('@/redux/api/eventApi', () => ({
  useCreateEventMutation: jest.fn(),
}))

jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))

jest.mock('@/components/contexts/EventContext', () => ({
  useEventContext: jest.fn().mockReturnValue({ setEventPage: jest.fn() }),
}))

jest.mock('@/redux/api/taskApi', () => ({
  useGetAllTasksQuery: jest.fn(),
}))

describe('Test for event page', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    const mockCreateEvent = jest.fn().mockResolvedValue({ data: {} })
    ;(useCreateEventMutation as jest.Mock).mockReturnValue([mockCreateEvent])

    const mockGetAllTasksQuery = useGetAllTasksQuery as jest.Mock
    mockGetAllTasksQuery.mockReturnValue({
      data: [],
      isLoading: false,
    })

    const mockUseAppSelector = useAppSelector as jest.Mock
    mockUseAppSelector.mockReturnValue({
      name: 'Event Name',
      date: '2025-12-12',
      budget: 123000,
      token: 'token',
    })
  })

  let assignMock = jest.fn()

  window.location = { assign: assignMock as any } as Location

  afterEach(() => {
    assignMock.mockClear()
  })

  it('renders name form', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'planner' })

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('renders input field', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'planner' })

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name')).toBeInTheDocument()
  })

  it('renders next button in event name page', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'planner' })

    const { getByText } = render(<EventPage />)

    expect(getByText('Next')).toBeInTheDocument()
  })

  it('submits event name form successfully', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'planner',
      setEventPage: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Event Name' },
    })

    fireEvent.submit(getByTestId('name-form'))

    await waitFor(() => expect(useAppDispatch).toHaveBeenCalledTimes(1))
  })

  it('test error message when purpose is not selected', async () => {
    const mockUseCreateEventMutation = useCreateEventMutation as jest.Mock

    const mockCreateEvent = jest.fn()
    const mockData = {}
    const mockIsLoading = false

    mockUseCreateEventMutation.mockReturnValue([
      mockCreateEvent,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const mockUseAppSelector = useAppSelector as jest.Mock
    mockUseAppSelector.mockReturnValue({
      name: 'Event Name',
      date: '2025-12-12',
      budget: 123000,
    })

    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      open: false,
      setOpen: jest.fn(),
      handleClose: jest.fn(),
      setEventPage: jest.fn(),
    })

    const { getByTestId, getByText } = render(<EventPage />)

    fireEvent.submit(getByTestId('purpose-form'))

    await waitFor(() =>
      expect(
        getByText('Please select at least one service.')
      ).toBeInTheDocument()
    )
  })

  it('no error if purpose is correct', async () => {
    const mockUseCreateEventMutation = useCreateEventMutation as jest.Mock

    const mockCreateEvent = jest.fn()
    const mockData = {}
    const mockIsLoading = false

    mockUseCreateEventMutation.mockReturnValue([
      mockCreateEvent,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const myInitialState = ['Catering']

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      setEventPage: jest.fn(),
      open: false,
      setOpen: jest.fn(),
      handleClose: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    const inputElement = getByTestId('objective')

    fireEvent.change(inputElement, {
      target: { value: 'To Onboard Team' },
    })

    const attendees = getByTestId('attendees')

    fireEvent.change(attendees, {
      target: { value: 10 },
    })

    const theme = getByTestId('theme')

    fireEvent.change(theme, {
      target: { value: 'Modern' },
    })

    const services = getByTestId('services')

    const button = within(services).getByRole('combobox')

    fireEvent.mouseDown(button)

    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    )

    const options = within(listbox).getAllByRole('option')

    fireEvent.click(options[1])

    fireEvent.submit(getByTestId('purpose-form'))
  })

  it('stop if no services submitted', async () => {
    const mockUseCreateEventMutation = useCreateEventMutation as jest.Mock

    const mockCreateEvent = jest.fn()
    const mockData = {}
    const mockIsLoading = false

    mockUseCreateEventMutation.mockReturnValue([
      mockCreateEvent,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      setEventPage: jest.fn(),
      open: false,
      setOpen: jest.fn(),
      handleClose: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    const inputElement = getByTestId('objective')

    fireEvent.change(inputElement, {
      target: { value: 'To Onboard Team' },
    })

    const attendees = getByTestId('attendees')

    fireEvent.change(attendees, {
      target: { value: 10 },
    })

    const theme = getByTestId('theme')

    fireEvent.change(theme, {
      target: { value: 'Modern' },
    })

    const services = getByTestId('services')

    const button = within(services).getByRole('combobox')

    fireEvent.mouseDown(button)

    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    )

    const options = within(listbox).getAllByRole('option')

    fireEvent.click(options[1])
    fireEvent.click(options[2])

    fireEvent.submit(getByTestId('purpose-form'))
  })

  it('test if createEvetData is undefined', async () => {
    const mockUseCreateEventMutation = useCreateEventMutation as jest.Mock

    const mockCreateEvent = jest.fn()
    const mockData = null
    const mockIsLoading = false

    const unwrapMock = jest.fn()
    const resolvedValue = { result: 'success', unwrap: unwrapMock }
    mockCreateEvent.mockResolvedValue(resolvedValue)

    mockUseCreateEventMutation.mockReturnValue([
      mockCreateEvent,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const mockUseAppSelector = useAppSelector as jest.Mock
    mockUseAppSelector.mockReturnValue({
      name: 'Event Name',
      date: '2025-12-12',
      budget: 123000,
    })

    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      open: false,
      setOpen: jest.fn(),
      handleClose: jest.fn(),
      setEventPage: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.submit(getByTestId('purpose-form'))
  })

  it('test loading', async () => {
    const mockUseCreateEventMutation = useCreateEventMutation as jest.Mock

    const mockCreateEvent = jest.fn()
    const mockData = null
    const mockIsLoading = true

    const unwrapMock = jest.fn()
    const resolvedValue = { result: 'success', unwrap: unwrapMock }
    mockCreateEvent.mockResolvedValue(resolvedValue)

    mockUseCreateEventMutation.mockReturnValue([
      mockCreateEvent,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const mockUseAppSelector = useAppSelector as jest.Mock
    mockUseAppSelector.mockReturnValue({
      name: 'Event Name',
      date: '2025-12-12',
      budget: 123000,
    })

    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      open: false,
      setOpen: jest.fn(),
      handleClose: jest.fn(),
      setEventPage: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.submit(getByTestId('purpose-form'))
  })
  
  it('test if createEvetData is null', async () => {
    const myInitialState = dayjs('2022-12-12')

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    jest.mock('dayjs', () => {
      const originalDayjs = jest.requireActual('dayjs')
      return {
        ...originalDayjs,
        isBefore: jest.fn().mockReturnValue(true),
      }
    })

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'planner',
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.submit(getByTestId('name-form'))
  })

  it('test if createEvetData is null', async () => {
    const myInitialState = dayjs('2024-12-12')

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    jest.mock('dayjs', () => {
      const originalDayjs = jest.requireActual('dayjs')
      return {
        ...originalDayjs,
        isBefore: jest.fn().mockReturnValue(true),
      }
    })

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'planner',
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.submit(getByTestId('name-form'))
  })
})
