import EventPage from '@/app/event/page'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppDispatch } from '@/redux/store'
import { EventContext, useEventContext } from '@/app/event/layout'
import { EventDate } from '@/app/event/(event)/EventDate'

jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock('@/app/event/layout', () => ({
  useEventContext: jest.fn().mockReturnValue({ setEventPage: jest.fn() }),
}))

describe('Test for event page', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('renders login form', () => {
    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name-form')).toBeInTheDocument()
  })

  it('renders input field', () => {
    const { getByTestId } = render(<EventPage />)

    expect(getByTestId('name')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    const { getByText } = render(<EventPage />)

    expect(getByText('Next')).toBeInTheDocument()
  })

  it('submits event name form successfully', async () => {
    const { getByTestId } = render(<EventPage />)

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Event Name' },
    })

    fireEvent.submit(getByTestId('name-form'))

    await waitFor(() => expect(useAppDispatch).toHaveBeenCalledTimes(1))
  })

  it('submits event date form successfully', async () => {
    const { getByPlaceholderText, getByTestId } = render(<EventDate />)

    const inputElement = getByPlaceholderText('MM/DD/YYYY')

    fireEvent.change(inputElement, {
      target: { value: '2025-12-12' },
    })

    fireEvent.submit(getByTestId('date-form'))

    await waitFor(() => expect(useAppDispatch).toHaveBeenCalledTimes(2))
  })
})
