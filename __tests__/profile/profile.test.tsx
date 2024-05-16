import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
  fireEvent,
  getAllByAltText,
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useGetProfileQuery, useGetEventsQuery } from '@/redux/api/profileApi'
import Profile from '@/app/profile/page'
import { useGetSubscriptionsQuery } from '@/redux/api/subscriptionApi'
import { useGetTransactionListQuery } from '@/redux/api/paymentApi'
import dayjs from 'dayjs'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => undefined),
  })),
}))

const mockEventsData = [
  {
    id: '1',
    name: 'Summer Music Festival',
    budget: 10000,
    date: '2022-07-20',
    objective: 'To enjoy summer with music and friends',
    attendees: 500,
    theme: 'Summer Vibes',
    services: 'Live Music, Food Stalls, Security',
  },
]
const mockTransactionData = [
  {
    id: 'mock-id-1',
    package: {
      name: 'Premium',
    },
    midtrans_url: null,
    midtrans_transaction_id: 'mid-1',
    order_id: 'ord-1',
    price: 10000,
    checkout_time: '2024-05-06T14:49:19Z',
    expiry_time: '2024-05-06T15:04:19Z',
    payment_type: 'qris',
    payment_merchant: 'gopay',
    status: 'settlement',
  },
  {
    id: 'mock-id-2',
    package: {
      name: 'Premium',
    },
    midtrans_url: null,
    midtrans_transaction_id: 'mid-2',
    order_id: 'ord-2',
    price: 10000,
    checkout_time: '2024-05-06T14:49:19Z',
    expiry_time: '2024-05-06T15:04:19Z',
    payment_type: 'qris',
    payment_merchant: 'gopay',
    status: 'failed',
  },
  {
    id: 'mock-id-3',
    package: {
      name: 'Premium',
    },
    midtrans_url: null,
    midtrans_transaction_id: 'mid-3',
    order_id: 'ord-3',
    price: 10000,
    checkout_time: '2024-05-06T14:49:19Z',
    expiry_time: '2024-05-06T15:04:19Z',
    payment_type: 'qris',
    payment_merchant: 'gopay',
    status: 'pending',
  },
]

jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetSubscriptionsQuery: jest.fn().mockReturnValue({
    data: [],
  }),
  useGetLatestSubscriptionQuery: jest.fn().mockReturnValue({
    data: {
      id: '63be0832-ece7-4e98-8f4f-65e1143c0d48',
      plan: {
        id: 2,
        name: 'Premium Package',
        duration: 30,
        event_planner: true,
        event_tracker: true,
        event_timeline: true,
        event_rundown: true,
        ai_assistant: true,
      },
      midtrans_url: null,
      midtrans_transaction_id: 'midtrans_id',
      order_id: 'order_id',
      price: 10000,
      checkout_time: '2024-05-06T14:49:19Z',
      expiry_time: '2024-05-06T15:04:19Z',
      status: 'settlement',
    },
  }),
}))

jest.mock('@/redux/api/profileApi', () => ({
  useGetProfileQuery: jest.fn(),
  useGetEventsQuery: jest.fn(),
}))

jest.mock('@/redux/api/paymentApi', () => ({
  useGetTransactionListQuery: jest.fn(),
}))

Object.defineProperty(window, 'location', {
  value: { pathname: '/mock-path' },
})

describe('Profile Component', () => {
  beforeEach(() => {
    // Mock profile data
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: {
        user: { username: 'JohnDoe', email: 'johndoe@example.com' },
        profile: { bio: 'Developer', profile_picture: '/path/to/image' },
      },
      isLoading: false,
      isError: false,
    })

    // Mock events data
    ;(useGetEventsQuery as jest.Mock).mockReturnValue({
      data: mockEventsData,
      isLoading: false,
      isError: false,
    })
    ;(useGetTransactionListQuery as jest.Mock).mockReturnValue({
      data: mockTransactionData,
      isLoading: false,
    })
  })

  it('displays error state correctly', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({ isError: true })
    ;(useGetEventsQuery as jest.Mock).mockReturnValue({ isError: true })

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText('Error loading profile')).toBeInTheDocument()
  })

  it('displays profile information correctly', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText('JohnDoe')).toBeInTheDocument()
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByAltText('Profile Picture')).toHaveAttribute(
      'src',
      '/path/to/image'
    )
  })

  it('displays event information correctly', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    mockEventsData.forEach((event) => {
      expect(screen.getByText(event.name)).toBeInTheDocument()
      expect(screen.getByText(event.date)).toBeInTheDocument()
      expect(screen.getByText(event.objective)).toBeInTheDocument()
    })
  })

  it('has correct buttons and links', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    const changeProfileButton = screen
      .getByRole('button', { name: 'Change Profile' })
      .closest('a')
    expect(changeProfileButton).toHaveAttribute(
      'href',
      '/profile/change-profile'
    )

    const changePasswordButton = screen
      .getByRole('button', { name: 'Change Password' })
      .closest('a')
    expect(changePasswordButton).toHaveAttribute(
      'href',
      '/profile/change-password'
    )

    expect(getByTestId('logout-button')).toBeInTheDocument()
  })
  it('has correct logout functionality', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
    fireEvent.click(getByTestId('logout-button'))
    expect(getByTestId('logout-dialog')).toBeInTheDocument()
    fireEvent.click(getByTestId('button-close'))
    fireEvent.click(getByTestId('logout-button'))
    fireEvent.click(getByTestId('button-yes'))
  })

  it('Showing Subscription History', () => {
    const myInitialState = 'history'

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    const history = getByText('Subscription History')

    expect(history).toBeInTheDocument()
  })

  it('Show subscription not found', () => {
    const myInitialState = 'history'

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])
    const mockGetEventQuery = useGetSubscriptionsQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
      data: null,
      isLoading: true,
    })

    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
  })

  it('displays transaction information when there is at least one transaction', () => {
    const myInitialState = 'history'
    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(getByText('Checkout Time')).toBeInTheDocument()
    expect(getByText('Package Plan')).toBeInTheDocument()
    expect(getByText('Price')).toBeInTheDocument()
    expect(getByText('Expiry Time')).toBeInTheDocument()
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText(mockTransactionData[0].status)).toBeInTheDocument()
    expect(getByText(mockTransactionData[0].price)).toBeInTheDocument()
    expect(
      getByText(
        dayjs(mockTransactionData[0].checkout_time).format(
          'ddd, D MMM YY HH:mm'
        )
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        dayjs(mockTransactionData[0].expiry_time).format('ddd, D MMM YY HH:mm')
      )
    ).toBeInTheDocument()
  })

  it('displays no transaction information', () => {
    const myInitialState = 'history'
    React.useState = jest.fn().mockReturnValue([myInitialState, {}])
    ;(useGetTransactionListQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    })
    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(getByText('Checkout Time')).toBeInTheDocument()
    expect(getByText('Package Plan')).toBeInTheDocument()
    expect(getByText('Price')).toBeInTheDocument()
    expect(getByText('Expiry Time')).toBeInTheDocument()
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('No transactions recorded')).toBeInTheDocument()
  })
})
