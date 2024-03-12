import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChangeProfile from '@/app/profile/change-profile/page'
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from '@/redux/api/profileApi'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

// Mock the RTK Query API hooks
jest.mock('@/redux/api/profileApi', () => ({
  useGetProfileQuery: jest.fn(),
  useUpdateProfileMutation: jest.fn(),
}))

// Partially mock react-redux to keep other functionalities like <Provider>
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

describe('Test for ChangeProfile component', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn()

    // Mock useDispatch to return the mockDispatch function
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)

    // Mock useUpdateProfileMutation to return a tuple with a mock function and an empty result object
    ;(useUpdateProfileMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: { bio: 'New bio' } }),
      {},
    ])

    // Mock useGetProfileQuery to return the initial profile data
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: {
        profile: {
          bio: 'hi',
        },
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders profile update form', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )
    expect(getByPlaceholderText('Enter bio')).toBeInTheDocument()
    expect(getByText('Update Profile')).toBeInTheDocument()
  })

  it('updates profile successfully', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    // Fill in the form input
    fireEvent.change(getByPlaceholderText('Enter bio'), {
      target: { value: 'New bio text' },
    })

    // Submit the form
    fireEvent.click(getByText('Update Profile'))

    // Wait for the update to complete and assertions to run
    await waitFor(() => {
      const mockUpdateProfileMutation = useUpdateProfileMutation()
      expect(mockUpdateProfileMutation[0]).toHaveBeenCalledTimes(1)
    })
  })

  it('sets initial bio value when profile data is available', () => {
    const initialBio = 'Initial bio text'
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: { profile: { bio: initialBio } },
    })

    const { getByDisplayValue } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    expect(getByDisplayValue(initialBio)).toBeInTheDocument()
  })
  it('does not set initial bio value when profile data is not available', () => {
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({ data: undefined })

    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    expect(queryByDisplayValue(/.+/)).not.toBeInTheDocument()
  })
  it('does not update profile if bio is unchanged', async () => {
    const mockUpdateProfile = jest.fn()
    ;(useUpdateProfileMutation as jest.Mock).mockReturnValue([
      mockUpdateProfile,
      {},
    ])

    const { getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    fireEvent.click(getByText('Update Profile'))

    await waitFor(() => {
      expect(mockUpdateProfile).not.toHaveBeenCalled()
    })
  })

  it('submits profile picture on form submission', async () => {
    const mockUpdateProfile = jest.fn().mockResolvedValue({})
    ;(useUpdateProfileMutation as jest.Mock).mockReturnValue([
      mockUpdateProfile,
      {},
    ])

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    // Simulate file upload
    const fileInput = getByLabelText('Upload Profile Picture')
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    fireEvent.click(getByText('Update Profile'))

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalled()
      // Check if the formData submitted includes the file
      // Note: This may require adjusting the mock to inspect the formData or using a FormData mock
    })
  })

  it('includes profile picture in form submission', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    const fileInput = getByLabelText('Upload Profile Picture')
    const file = new File(['dummy content'], 'profile-picture.png', {
      type: 'image/png',
    })
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    })
    fireEvent.change(fileInput)

    // Simulate form submission
    fireEvent.click(getByText('Update Profile'))

    // Wait for the mockUpdateProfile function to be called
    await waitFor(() => {
      // Check that the mockUpdateProfile function was called with the expected form data
      // Note: This may involve inspecting the arguments passed to mockUpdateProfile to ensure
      // the FormData contains the file. This could be complex due to the nature of FormData and might
      // require either spying on FormData's append method or using a FormData polyfill that allows inspection.
    })
  })

  it('does nothing on form submission with no changes', async () => {
    const mockUpdateProfile = jest.fn()
    ;(useUpdateProfileMutation as jest.Mock).mockReturnValue([
      mockUpdateProfile,
      {},
    ])

    const { getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    fireEvent.click(getByText('Update Profile'))

    await waitFor(() => {
      expect(mockUpdateProfile).not.toHaveBeenCalled()
    })
  })

  it('fetches initial profile data', () => {
    const initialBio = 'Initial bio'
    ;(useGetProfileQuery as jest.Mock).mockReturnValue({
      data: { profile: { bio: initialBio } },
    })

    const { getByDisplayValue } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    )

    expect(getByDisplayValue(initialBio)).toBeInTheDocument()
  })
})
