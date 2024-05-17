import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import PackageList from '@/app/package/page'
import { formatDate } from '@/utils/formatDate'
import { useCreateTransactionMutation } from '@/redux/api/paymentApi'

jest.mock('@/redux/api/packageApi', () => ({
  useGetPackageDetailQuery: jest.fn((id) => ({
    data: {
      name: 'Default Package',
      price: 5000,
      event_planner: true,
      event_tracker: true,
      event_timeline: true,
      event_rundown: true,
      ai_assistant: false,
    },
  })),
}))

jest.mock('@/redux/api/paymentApi', () => ({
  useCreateTransactionMutation: jest.fn(),
}))

const latestSubs = {
  id: 1,
  plan: 'PREMIUM',
  start_date: '2024-05-05T13:30:00.000Z',
  end_date: '2025-05-05T13:30:00.000Z',
  user: 1,
  is_active: true,
}

jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetLatestSubscriptionQuery: jest.fn((id) => ({
    data: latestSubs,
  })),
}))

describe('PackageList component', () => {
  beforeAll(() => {
    jest.spyOn(window, 'open').mockImplementation()
  })

  it('renders correctly', () => {
    ;(useCreateTransactionMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: { token: 'string', redirect_url: 'https://example.com/midtrans' },
        isLoading: false,
      },
    ])
    const { getByTestId, queryByTestId } = render(<PackageList />)
    const packageDetail = getByTestId('package-detail')
    expect(packageDetail).toBeInTheDocument()
    expect(queryByTestId('choose-plan-button')).not.toBeInTheDocument()
    expect(getByTestId('subscribed-plan')).toBeInTheDocument()
    expect(window.open).toHaveBeenCalledWith('https://example.com/midtrans')
  })
})
