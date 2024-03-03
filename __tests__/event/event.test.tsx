import EventPage from '@/app/event/page'
import { render, screen } from '@testing-library/react'

describe('Test for event page', () => {
  render(<EventPage />)
  it('renders event page', () => {
    const { getByText } = render(<EventPage />)
    expect(getByText('What do you want to plan today ?')).toBeInTheDocument()

    const nameInput = screen.getByTestId('name')
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveAttribute('placeholder', 'Enter Event Name')
  })
})
