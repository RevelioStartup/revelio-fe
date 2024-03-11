import { render, fireEvent, waitFor } from '@testing-library/react'
import RecoverAccount from '@/app/login/recover-account/page'
import { useSendChangePasswordMutation } from '@/redux/api/authApi'
import '@testing-library/jest-dom'
import AccountRecoveryForm from '@/app/login/recover-account/AccountRecoveryForm'

jest.mock('@/redux/api/authApi', () => ({
  useSendChangePasswordMutation: jest.fn(),
}))

describe('Test for recover account page', () => {
  const mockChangePassword = jest.fn().mockResolvedValue({ data: {} })
  ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
    mockChangePassword,
  ])
  it('renders recover account form', () => {
    const { getByTestId } = render(<RecoverAccount />)
    expect(getByTestId('recover-form')).toBeInTheDocument()
  })
})

describe('Test for recover account forms', () => {
  beforeEach(() => {
    const mockChangePassword = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
  })

  it('renders recover account form', () => {
    const { getByTestId } = render(<AccountRecoveryForm />)
    expect(getByTestId('recover-form')).toBeInTheDocument()
  })

  it('submits recover form successfully', async () => {
    const mockChangePassword = jest.fn().mockResolvedValue({ data: {} })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
    const { getByTestId } = render(<AccountRecoveryForm />)
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
    const { getByTestId, getByText } = render(<AccountRecoveryForm />)
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

  it('shows unkown error message when recover account fails due to unkown reason', async () => {
    const errorMessage = 'Unknown Error!'
    const mockChangePassword = jest.fn().mockResolvedValue({ error: {} })
    ;(useSendChangePasswordMutation as jest.Mock).mockReturnValue([
      mockChangePassword,
    ])
    const { getByTestId, getByText } = render(<AccountRecoveryForm />)
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
})
