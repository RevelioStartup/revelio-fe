import { render, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import LoginPageTitle from '@/app/login/LoginPageTitle'
import LoginForm from '@/app/login/LoginForm'
import AccountRecoveryRequestForm from '@/app/login/AccountRecoveryRequestForm'
import {
  useLoginMutation,
  useSendRecoverPasswordEmailMutation,
} from '@/redux/api/authApi'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/authApi', () => ({
  useLoginMutation: jest.fn(),
  useSendRecoverPasswordEmailMutation: jest.fn(),
}))

describe('Test for LoginPage', () => {
  it('renders login page title form', () => {
    const mockLogin = jest.fn().mockResolvedValue({ data: {} })
    ;(useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      {
        isLoading: false,
      },
    ])

    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
    ])
    const { getByTestId } = render(<LoginPage />)
    expect(getByTestId('login-title')).toBeInTheDocument()
    expect(getByTestId('login-form')).toBeInTheDocument()
  })
})

describe('Test for LoginTextBox', () => {
  it('renders login page title form', () => {
    const { getByTestId } = render(<LoginPageTitle />)
    expect(getByTestId('login-title')).toBeInTheDocument()
  })
})

describe('Test for login form', () => {
  beforeEach(() => {
    const mockLogin = jest.fn().mockResolvedValue({ data: {} })
    ;(useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      {
        isLoading: false,
      },
    ])

    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
    ])
  })

  it('renders login form', () => {
    const { getByTestId } = render(<LoginForm />)
    expect(getByTestId('login-form')).toBeInTheDocument()
  })

  it('submits login form successfully', async () => {
    const mockLogin = jest.fn().mockResolvedValue({ data: {} })
    ;(useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      {
        isLoading: false,
      },
    ])
    const { getByTestId } = render(<LoginForm />)
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'username' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.submit(getByTestId('login-form'))
    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1))
  })

  it('shows error message when login fails due to invalid username and/or password', async () => {
    const errorMessage = 'Wrong username/password!'
    const mockLogin = jest
      .fn()
      .mockResolvedValue({ error: { data: { msg: errorMessage } } })
    ;(useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      {
        isLoading: false,
      },
    ])
    const { getByTestId, getByText } = render(<LoginForm />)
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'invalid_username' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'invalid_password' },
    })
    fireEvent.submit(getByTestId('login-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })

  it('shows unkown error message when login fails due to unkown reason', async () => {
    const errorMessage = 'Unknown Error!'
    const mockLogin = jest.fn().mockResolvedValue({ error: {} })
    ;(useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      {
        isLoading: false,
      },
    ])
    const { getByTestId, getByText } = render(<LoginForm />)
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'invalid_username' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'invalid_password' },
    })
    fireEvent.submit(getByTestId('login-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })

  it('opens recovery dialog when "Recover Account" is clicked', () => {
    const { getByText, getByTestId } = render(<LoginPage />)
    fireEvent.click(getByText('Recover Account'))
    expect(getByTestId('login-dialog-recover')).toBeInTheDocument()
  })

  it('submits recovery form successfully', async () => {
    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
    ])
    const { getByTestId } = render(<LoginPage />)
    fireEvent.click(getByTestId('recover-account-link'))
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.submit(getByTestId('recover-account-form'))
    await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(1))
  })

  it('shows error message when recovery email fails', async () => {
    const errorMessage = 'User with that email doesnt exist!'
    const mockSendEmail = jest
      .fn()
      .mockResolvedValue({ error: { data: { msg: errorMessage } } })
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
    ])
    const { getByTestId, getByText } = render(<LoginPage />)
    fireEvent.click(getByTestId('recover-account-link'))
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'invalid@email.com' },
    })
    fireEvent.submit(getByTestId('recover-account-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error-account-recovery'))
    fireEvent.click(getByTestId('close-acc-rec-form'))
  })

  it('shows unknown error message when recovery email fails due to unknown reason', async () => {
    const errorMessage = 'Unknown Error!'
    const mockSendEmail = jest.fn().mockResolvedValue({ error: {} })
    ;(useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([
      mockSendEmail,
    ])
    const { getByTestId, getByText } = render(<LoginPage />)
    fireEvent.click(getByTestId('recover-account-link'))
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'invalid@email.com' },
    })
    fireEvent.submit(getByTestId('recover-account-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
  })
})
