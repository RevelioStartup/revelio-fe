import { render, fireEvent, waitFor } from '@testing-library/react'
import RecoverAccount from '@/app/login/recover-account/page'
import { useSendChangePasswordMutation } from '@/redux/api/authApi'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/authApi', () => ({
  useSendChangePasswordMutation: jest.fn(),
}))

describe('Test for login page', () => {
  beforeEach(() => {
    const mockChangePassword = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
  })

  it('renders login form', () => {
    const { getByTestId } = render(<RecoverAccount />)
    expect(getByTestId('recover-form')).toBeInTheDocument()
  })

  it('submits recover form successfully', async () => {
    const mockChangePassword = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
    const { getByTestId } = render(<RecoverAccount />)
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'email@email.com' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.change(getByTestId('token-input'), {
      target: { value: 'token' },
    })
    fireEvent.submit(getByTestId('recover-form'))
    await waitFor(() => expect(mockChangePassword).toHaveBeenCalledTimes(1))
  })

  it('shows error message when recover account fails due to invalid token and/or email', async () => {
    const errorMessage = 'Invalid token and/or email!'
    const mockChangePassword = jest
      .fn()
      .mockResolvedValue({ error: { data: { msg: errorMessage } } })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
    const { getByTestId, getByText } = render(<RecoverAccount />)
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'email@email.com' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.change(getByTestId('token-input'), {
      target: { value: 'token' },
    })
    fireEvent.submit(getByTestId('recover-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })

  //   it('opens recovery dialog when "Recover Account" is clicked', () => {
  //     const { getByText, getByTestId } = render(<RecoverAccount />)
  //     fireEvent.click(getByText('Recover Account'))
  //     expect(getByTestId('login-dialog-recover')).toBeInTheDocument()
  //     fireEvent.click(getByTestId('close-acc-rec-form'))
  //   })

  //   it('submits recovery form successfully', async () => {
  //     const mockSendEmail = jest.fn().mockResolvedValue({ data: {} })
  //     ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
  //       mockSendEmail,
  //     ])
  //     const { getByTestId } = render(<RecoverAccount />)
  //     fireEvent.click(getByTestId('recover-account-link'))
  //     fireEvent.change(getByTestId('email-input'), {
  //       target: { value: 'test@example.com' },
  //     })
  //     fireEvent.submit(getByTestId('recover-account-form'))
  //     await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(1))
  //   })

  //   it('shows error message when recovery email fails', async () => {
  //     const errorMessage = 'User with that email doesnt exist!'
  //     const mockSendEmail = jest
  //       .fn()
  //       .mockResolvedValue({ error: { data: { msg: errorMessage } } })
  //     ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
  //       mockSendEmail,
  //     ])
  //     const { getByTestId, getByText } = render(<RecoverAccount />)
  //     fireEvent.click(getByTestId('recover-account-link'))
  //     fireEvent.change(getByTestId('email-input'), {
  //       target: { value: 'invalid@email.com' },
  //     })
  //     fireEvent.submit(getByTestId('recover-account-form'))
  //     await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
  //   })

  //   it('dont submits recovery form when email format is wrong', async () => {
  //     const mockSendEmail = jest.fn().mockResolvedValue({ data: {} })
  //     ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
  //       mockSendEmail,
  //     ])
  //     const { getByTestId } = render(<RecoverAccount />)
  //     fireEvent.click(getByTestId('recover-account-link'))
  //     fireEvent.change(getByTestId('email-input'), {
  //       target: { value: 'test_wrong_email_format' },
  //     })
  //     fireEvent.submit(getByTestId('recover-account-form'))
  //     await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(0))
  //   })
})
