import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PackageList from '@/app/package/page'
import { useCreateTransactionMutation } from '@/redux/api/paymentApi'

// Mock data
const premium_package = {
  name: 'Premium Package',
  price: 5000,
  event_planner: true,
  event_tracker: true,
  event_timeline: true,
  event_rundown: true,
  ai_assistant: true,
}

// Mock hooks
jest.mock('@/redux/api/packageApi', () => ({
  useGetPackageDetailQuery: jest.fn((id) => {
    if (id === 1) {
      return {
        data: {
          name: 'Free Package',
          price: 0,
          event_planner: true,
          event_tracker: false,
          event_timeline: false,
          event_rundown: false,
          ai_assistant: false,
        },
        isLoading: false,
      }
    } else if (id === 2) {
      return {
        data: premium_package,
        isLoading: false,
      }
    }
    return { data: null, isLoading: true }
  }),
}))

jest.mock('@/redux/api/paymentApi', () => ({
  useCreateTransactionMutation: jest.fn(),
}))

jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetLatestSubscriptionQuery: jest.fn(() => ({
    data: {
      id: 1,
      plan: { id: 1, name: 'FREE' },
      start_date: '2024-05-05T13:30:00.000Z',
      end_date: '2025-05-05T13:30:00.000Z',
      user: 1,
      is_active: false,
    },
    isLoading: false,
  })),
}))

describe('PackageList component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly for free user', () => {
    const createTransactionMock = jest.fn()
    ;(useCreateTransactionMutation as jest.Mock).mockReturnValue([
      createTransactionMock,
      {
        data: { token: 'token', redirect_url: 'https://example.midtrans.com' },
        isLoading: false,
      },
    ])

    const { getByTestId, queryByTestId } = render(<PackageList />)
    const packageDetail = getByTestId('package-detail')
    expect(packageDetail).toBeInTheDocument()
    const subscribeButton = getByTestId('choose-plan-button')
    expect(subscribeButton).toBeInTheDocument()
    expect(queryByTestId('subscribed-plan')).not.toBeInTheDocument()
    fireEvent.click(subscribeButton)
    expect(createTransactionMock).toHaveBeenCalled()
  })

  it('displays Loader when data is loading', () => {
    const useGetPackageDetailQuery =
      require('@/redux/api/packageApi').useGetPackageDetailQuery
    const useGetLatestSubscriptionQuery =
      require('@/redux/api/subscriptionApi').useGetLatestSubscriptionQuery

    useGetPackageDetailQuery.mockReturnValue({ data: null, isLoading: true })
    useGetLatestSubscriptionQuery.mockReturnValue({
      data: null,
      isLoading: true,
    })
    ;(useCreateTransactionMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: null, isLoading: false },
    ])

    render(<PackageList />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('does not display Loader when data is loaded', () => {
    const useGetPackageDetailQuery =
      require('@/redux/api/packageApi').useGetPackageDetailQuery
    const useGetLatestSubscriptionQuery =
      require('@/redux/api/subscriptionApi').useGetLatestSubscriptionQuery

    useGetPackageDetailQuery.mockReturnValue({
      data: { id: 'free', event_planner: true } as any,
      isLoading: false,
    })
    useGetLatestSubscriptionQuery.mockReturnValue({
      data: { is_active: false, end_date: '2023-12-31' } as any,
      isLoading: false,
    })
    ;(useCreateTransactionMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: null, isLoading: false },
    ])

    render(<PackageList />)
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })
})
