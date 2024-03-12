import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store' // Update the import path according to your file structure
import { useGetProfileQuery } from '@/redux/api/profileApi'
import Profile from '@/app/profile/page'

// Mocking the RTK Query hook used in the component
jest.mock('@/redux/api/profileApi', () => ({
  useGetProfileQuery: jest.fn(),
}))

describe('Profile Component', () => {
  it('displays loading state correctly', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({ isLoading: true })

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error state correctly', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({ isError: true })

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText('Error loading profile')).toBeInTheDocument()
  })

  it('displays profile information correctly', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: {
        user: { username: 'JohnDoe', email: 'johndoe@example.com' },
        profile: { bio: 'Developer', profile_picture: '/path/to/image' },
      },
      isLoading: false,
      isError: false,
    })

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

  it('has correct buttons and links', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: {
        user: { username: 'JohnDoe', email: 'johndoe@example.com' },
        profile: { bio: 'Developer', profile_picture: '/path/to/image' },
      },
      isLoading: false,
      isError: false,
    })

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText('Change Profile')).toHaveAttribute(
      'href',
      '/profile/change-profile'
    )
    expect(screen.getByText('Change Password')).toHaveAttribute(
      'href',
      '/profile/change-password'
    )
    expect(screen.getByText('Logout')).toHaveAttribute('href', '#logout')
  })
})
