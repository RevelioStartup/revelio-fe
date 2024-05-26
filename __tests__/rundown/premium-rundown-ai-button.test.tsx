import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'
import { redirect, useParams, usePathname } from 'next/navigation'
import { CreateRundownButton } from '@/app/event/[eventId]/(eventId)/rundown/CreateRundownButton'

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
    useParams: jest.fn(),
    usePathname: jest.fn(),
}))
jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetLatestSubscriptionQuery: jest.fn((id) => ({
    data: {
      is_active: true,
    },
  })),
}))

describe('Create Rundown Button Component', () => {
  beforeEach(() => {
    ;(useParams as jest.Mock).mockReturnValue({
      eventId: '123-abc',
    })
  })
  it('loads the generate rundown with ai button', () => {
    render(
      <ReduxProvider store={store}>
        <CreateRundownButton />
      </ReduxProvider>
    )

    expect(screen.getByTestId('premium-rundown-ai-button')).toBeInTheDocument()

  })
})
