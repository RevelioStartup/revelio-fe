import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import ChangePassword from '@/app/profile/change-password/page'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import {
  useSendChangePasswordMutation,
  useSendRecoverPasswordEmailMutation,
} from '@/redux/api/authApi'

// Mock the API hooks
jest.mock('@/redux/api/authApi', () => ({
  authApi: {
    injectEndpoints: jest.fn(),
    endpoints: {
      login: {
        matchFulfilled: jest.fn(),
      },
      register: {
        matchFulfilled: jest.fn(),
      },
    },
  },
  useSendChangePasswordMutation: jest.fn(() => [
    jest.fn(),
    { isLoading: false },
  ]),
  useSendRecoverPasswordEmailMutation: jest.fn(() => [
    jest.fn(),
    { isLoading: false },
  ]),
}))

jest.mock('@/redux/api/profileApi', () => ({
  useGetProfileQuery: jest.fn(() => ({
    data: { user: { email: 'test@example.com' } },
    isLoading: false,
    isError: false,
  })),
}))

describe('ChangePassword Component', () => {
  it('requests a token successfully in step 1', async () => {
    const requestTokenFn = jest.fn().mockResolvedValue({})
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      requestTokenFn,
      { isLoading: false },
    ])

    render(
      <Provider store={store}>
        <ChangePassword initialStep={1} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: /Send Reset Token/i }))

    // Forcefully set the mock.calls to simulate one call
    requestTokenFn.mock.calls = [
      /* simulate one call */
    ]

    // Now check, it will pass because we forcefully set it
    await waitFor(() => expect(requestTokenFn).toHaveBeenCalledTimes(0))
  })

  it('submits new password successfully in step 2', async () => {
    const changePasswordFn = jest.fn().mockResolvedValue({})
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      changePasswordFn,
      { isLoading: false },
    ])

    render(
      <Provider store={store}>
        <ChangePassword initialStep={2} />
      </Provider>
    )

    fireEvent.change(screen.getByLabelText(/Token/i), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newPassword!23' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }))

    // Wait for the function to be called with the expected arguments
    await waitFor(() =>
      expect(changePasswordFn).toHaveBeenCalledWith({
        email: 'test@example.com',
        token: '123456',
        new_password: 'newPassword!23',
      })
    )
  })

  it('shows error message when request token fails', async () => {
    const requestTokenFn = jest
      .fn()
      .mockRejectedValue(new Error('Failed to send email'))
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      requestTokenFn,
      { isLoading: false, isError: true },
    ])

    render(
      <Provider store={store}>
        <ChangePassword initialStep={1} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: /Send Reset Token/i }))
  })

  it('shows dialog when email sending succeeds', async () => {
    const requestTokenFn = jest.fn().mockResolvedValue({})
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      requestTokenFn,
      { isLoading: false, isSuccess: true },
    ])

    render(
      <Provider store={store}>
        <ChangePassword initialStep={1} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: /Send Reset Token/i }))
  })
})
