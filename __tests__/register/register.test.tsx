import { render, fireEvent, waitFor } from '@testing-library/react'
import Register from '@/app/register/page'
import {
  useRegisterMutation,
  useLazySendEmailVerficationQuery,
} from '@/redux/api/authApi'
import '@testing-library/jest-dom'
import RegisterForm from '@/app/register/RegisterForm'
import RegisterPageTitle from '@/app/register/RegisterPageTitle'

jest.mock('@/redux/api/authApi', () => ({
  useRegisterMutation: jest.fn(),
  useLazySendEmailVerficationQuery: jest.fn(),
}))

describe('Test for register page', () => {
  beforeEach(() => {
    const mockRegister = jest.fn().mockResolvedValue({ data: {} })
    ;(useRegisterMutation as jest.Mock).mockReturnValue([mockRegister])
    const mockSendEmailVerification = jest.fn().mockResolvedValue({ data: {} })
    ;(useLazySendEmailVerficationQuery as jest.Mock).mockReturnValue([
      mockSendEmailVerification,
    ])
  })

  it('renders register page', () => {
    const { getByTestId } = render(<Register />)
    expect(getByTestId('register-form')).toBeInTheDocument()
    expect(getByTestId('register-title')).toBeInTheDocument()
  })
})

describe('Test for register page title', () => {
  it('renders register page title', () => {
    const { getByTestId } = render(<RegisterPageTitle />)
    expect(getByTestId('register-title')).toBeInTheDocument()
  })
})

describe('Test for register form', () => {
  beforeEach(() => {
    const mockRegister = jest.fn().mockResolvedValue({ data: {} })
    ;(useRegisterMutation as jest.Mock).mockReturnValue([mockRegister])
    const mockSendEmailVerification = jest.fn().mockResolvedValue({ data: {} })
    ;(useLazySendEmailVerficationQuery as jest.Mock).mockReturnValue([
      mockSendEmailVerification,
    ])
  })

  it('renders register form', () => {
    const { getByTestId } = render(<RegisterForm />)
    expect(getByTestId('register-form')).toBeInTheDocument()
  })

  it('submits register form successfully and calls send email verification API', async () => {
    const mockRegister = jest.fn().mockResolvedValue({ data: {} })
    ;(useRegisterMutation as jest.Mock).mockReturnValue([mockRegister])
    const mockSendEmailVerification = jest.fn().mockResolvedValue({ data: {} })
    ;(useLazySendEmailVerficationQuery as jest.Mock).mockReturnValue([
      mockSendEmailVerification,
    ])
    const { getByTestId } = render(<RegisterForm />)
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'email@email.com' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'username' },
    })
    fireEvent.submit(getByTestId('register-form'))
    await waitFor(() => expect(mockRegister).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(mockSendEmailVerification).toHaveBeenCalledTimes(1)
    )
  })

  it('shows error message when register account fails due to taken username and/or email', async () => {
    const errorMessage = 'Username and/or email is already taken!'
    const mockRegister = jest
      .fn()
      .mockResolvedValue({ error: { data: { msg: errorMessage } } })
    ;(useRegisterMutation as jest.Mock).mockReturnValue([mockRegister])
    const { getByTestId, getByText } = render(<RegisterForm />)
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'email@email.com' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'username' },
    })
    fireEvent.submit(getByTestId('register-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })

  it('shows unknown error message when register account fails', async () => {
    const errorMessage = 'Unknown Error!'
    const mockRegister = jest.fn().mockResolvedValue({ error: {} })
    ;(useRegisterMutation as jest.Mock).mockReturnValue([mockRegister])
    const { getByTestId, getByText } = render(<RegisterForm />)
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'email@email.com' },
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'password' },
    })
    fireEvent.change(getByTestId('username-input'), {
      target: { value: 'username' },
    })
    fireEvent.submit(getByTestId('register-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })
})
