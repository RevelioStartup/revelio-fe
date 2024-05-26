import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AIButton } from '@/app/plans/AISuggestion/AIButton'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'
import { useParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}))
jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetLatestSubscriptionQuery: jest.fn((id) => ({
    data: {
      is_active: true,
    },
  })),
}))

describe('AIButton Component', () => {
  beforeEach(() => {
    ;(useParams as jest.Mock).mockReturnValue({
      eventId: '123-abc',
    })
  })
  it('opens the AIAside when the button is clicked', () => {
    render(
      <ReduxProvider store={store}>
        <AIButton />
      </ReduxProvider>
    )

    let asideElement = screen.queryByTestId('ai-aside')

    fireEvent.click(screen.getByTestId('premium-event-ai-button'))

    expect(asideElement).toBeInTheDocument()

    expect(asideElement).not.toHaveClass('translate-x-full')
  })
})
