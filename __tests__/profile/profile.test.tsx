// import React from 'react'
// import { render, waitFor } from '@testing-library/react'
// import { useGetProfileQuery } from '@/redux/api/profileApi'
// import Profile from '@/app/profile/page'

// jest.mock('@/redux/api/profileApi', () => ({
//   useGetProfileQuery: jest.fn(),
// }))

// describe('Profile component', () => {
//   it('renders profile information', async () => {
//     const mockData = {
//       data: {
//         user: {
//           username: 'testuser',
//           email: 'testuser@example.com',
//         },
//         profile: {
//           bio: 'Test bio',
//           profile_picture: '/path/to/image',
//         },
//       },
//       isLoading: false,
//       isError: false,
//     }

//     ;(useGetProfileQuery as jest.Mock).mockReturnValue(mockData)

//     const { getByText } = render(<Profile />)

//     // Wait for profile data to be loaded
//     await waitFor(() => {
//       expect(getByText('testuser')).toBeInTheDocument()
//       expect(getByText('testuser@example.com')).toBeInTheDocument()
//       expect(getByText('Test bio')).toBeInTheDocument()
//     })
//   })

//   it('renders loading state while profile data is loading', async () => {
//     const mockData = {
//       isLoading: true,
//       isError: false,
//     }

//     ;(useGetProfileQuery as jest.Mock).mockReturnValue(mockData)

//     const { getByText } = render(<Profile />)

//     // Ensure loading state is displayed
//     expect(getByText('Loading...')).toBeInTheDocument()
//   })

//   it('renders error message when there is an error loading profile data', async () => {
//     const mockData = {
//       isLoading: false,
//       isError: true,
//     }

//     ;(useGetProfileQuery as jest.Mock).mockReturnValue(mockData)

//     const { getByText } = render(<Profile />)

//     // Ensure error message is displayed
//     expect(getByText('Error loading profile')).toBeInTheDocument()
//   })
// })
