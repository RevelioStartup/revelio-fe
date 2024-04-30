import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store' // Update the import path according to your file structure
import { useGetProfileQuery, useGetEventsQuery } from '@/redux/api/profileApi'
import Profile from '@/app/profile/page'
import { useGetSubscriptionsQuery } from '@/redux/api/subscriptionApi'

// Mock data based on the IEvent type
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
  // ... add more mock events as needed
]

jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetSubscriptionsQuery: jest.fn().mockReturnValue({
    data: [] }),
}))

// Mocking the RTK Query hook used in the component
jest.mock('@/redux/api/profileApi', () => ({
  useGetProfileQuery: jest.fn(),
  useGetEventsQuery: jest.fn(),
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

  it("Showing Subscription History", () => {
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

  it("Show subscription not found", () => {
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
})
