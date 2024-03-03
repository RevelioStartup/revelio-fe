import EventPage from '@/app/event/page'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Test for event page', () => {
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

    expect(getByText('Submit')).toBeInTheDocument()
  })
})
