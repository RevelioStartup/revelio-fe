import EventPage from '@/app/event/page'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppDispatch } from '@/redux/store'
import { EventDate } from '@/app/event/(event)/EventDate'
import { useEventContext } from '@/components/contexts/EventContext'
import React from 'react'
import dayjs from 'dayjs'

jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock('@/components/contexts/EventContext', () => ({
  useEventContext: jest.fn().mockReturnValue({ setEventPage: jest.fn() }),
}))

describe('Test for event page', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('renders name form', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name' })

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('renders input field', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name' })

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name')).toBeInTheDocument()
  })

  it('renders next button in event name page', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name' })

    const { getByText } = render(<EventPage />)

    expect(getByText('Next')).toBeInTheDocument()
  })

  it('submits event name form successfully', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'name',
      setEventPage: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Event Name' },
    })

    fireEvent.submit(getByTestId('name-form'))

    await waitFor(() => expect(useAppDispatch).toHaveBeenCalledTimes(1))
  })

  it('renders default event default ', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'date' })

    const { getByPlaceholderText, getByTestId } = render(<EventPage />)

    const inputElement = getByPlaceholderText('MM/DD/YYYY')

    fireEvent.change(inputElement, {
      target: { value: '2025-12-12' },
    })

    fireEvent.submit(getByTestId('date-form'))
  })

  it('page rendering if page is not name, date, budget, or purpose', () => {
    jest.mock('@/components/contexts/EventContext', () => ({
      useEventContext: jest.fn().mockReturnValue({ setEventPage: jest.fn() }),
    }))
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'invalid' })

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('test error message when date is not selected', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'date' })

    const { getByTestId, getByText } = render(<EventDate />)

    fireEvent.submit(getByTestId('date-form'))

    await waitFor(() =>
      expect(
        getByText('Please select the date of your event.')
      ).toBeInTheDocument()
    )
  })

  it('test error message when date is in the past', async () => {
    const myInitialState = dayjs('2022-12-12')

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'date' })

    jest.mock('dayjs', () => {
      const originalDayjs = jest.requireActual('dayjs')
      return {
        ...originalDayjs,
        isBefore: jest.fn().mockReturnValue(true),
      }
    })

    render(<EventPage />)

    const { getByText } = within(screen.getByTestId('date-form'))
    expect(getByText('Please select a future date.')).toBeInTheDocument()
  })

  it('no error if date is correct', async () => {
    let tomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)

    const myInitialState = dayjs(tomorrow.toString())

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'date',
      setEventPage: jest.fn(),
    })

    jest.mock('dayjs', () => {
      const originalDayjs = jest.requireActual('dayjs')
      return {
        ...originalDayjs,
        isBefore: jest.fn().mockReturnValue(true),
      }
    })

    const { getByTestId, getByPlaceholderText } = render(<EventPage />)

    const inputElement = getByPlaceholderText('MM/DD/YYYY')

    fireEvent.change(inputElement, {
      target: { value: '2025-12-12' },
    })

    fireEvent.submit(getByTestId('date-form'))
  })

  it("test error message when budget is less than 0", async () => {
    const myInitialState = "Please enter a valid budget."

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'budget' })

    const { getByTestId, getByText } = render(<EventPage />)

    const inputElement = getByTestId('budget')

    fireEvent.change(inputElement, {
      target: { value: '-123' },
    })

    fireEvent.submit(getByTestId('budget-form'))

    await waitFor(() =>
      expect(
        getByText('Please enter a valid budget.')
      ).toBeInTheDocument()
    )
  })

  it('no error if budget is correct', async () => {
    const myInitialState = ''

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'budget',
      setEventPage: jest.fn(),
    })

    const { getByTestId } = render(<EventPage />)

    const inputElement = getByTestId('budget')

    fireEvent.change(inputElement, {
      target: { value: '123000' },
    })

    fireEvent.submit(getByTestId('budget-form'))
  })

  it('test error message when purpose is not selected', async () => {

    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'purpose' })

    const { getByTestId, getByText } = render(<EventPage />)

    fireEvent.submit(getByTestId('purpose-form'))

    await waitFor(() =>
      expect(
        getByText('Please select at least one service.')
      ).toBeInTheDocument()
    )
  })

  it('no error if purpose is correct', async () => {
    const myInitialState = ['Catering']

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      setEventPage: jest.fn(),
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

    const button = within(services).getByRole('combobox');

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );

    const options = within(listbox).getAllByRole('option');

    fireEvent.click(options[1]);

    fireEvent.submit(getByTestId('purpose-form'))
  })

  it('stop if no services submitted', async () => {
    const myInitialState: string[] = []

    React.useState = jest.fn().mockReturnValue([myInitialState, jest.fn()])

    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({
      page: 'purpose',
      setEventPage: jest.fn(),
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

    const button = within(services).getByRole('combobox');

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox'
    );

    const options = within(listbox).getAllByRole('option');

    fireEvent.click(options[1]);
    fireEvent.click(options[2]);
    
    fireEvent.submit(getByTestId('purpose-form'))
  })

})
