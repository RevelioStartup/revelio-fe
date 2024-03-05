import EventPage from '@/app/event/page'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppDispatch } from '@/redux/store'
import { EventDate } from '@/app/event/(event)/EventDate'
import { useEventContext } from '@/components/contexts/EventContext'

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
    mockUseEventContext.mockReturnValue({ page: 'name' });

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('renders input field', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name' });

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name')).toBeInTheDocument()
  })

  it('renders next button in event name page', () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name' });

    const { getByText } = render(<EventPage />)

    expect(getByText('Next')).toBeInTheDocument()
  })

  it('submits event name form successfully', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'name', setEventPage: jest.fn() });

    const { getByTestId } = render(<EventPage />)

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Event Name' },
    })

    fireEvent.submit(getByTestId('name-form'))

    await waitFor(() => expect(useAppDispatch).toHaveBeenCalledTimes(1))
  })

  it('submits event date form successfully', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'date' });


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
    mockUseEventContext.mockReturnValue({ page: 'invalid' });

    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('test error message when date is not selected', async () => {
    const mockUseEventContext = useEventContext as jest.Mock
    mockUseEventContext.mockReturnValue({ page: 'date' });

    const { getByTestId, getByText } = render(<EventDate />)

    fireEvent.submit(getByTestId('date-form'))

    await waitFor(() => expect(getByText('Please select the date of your event.')).toBeInTheDocument())
  })
  
})
