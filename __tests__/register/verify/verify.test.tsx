import { render, fireEvent, waitFor } from '@testing-library/react'
import VerifyEmail from '@/app/register/verify/page'
import { useVerifyEmailMutation } from '@/redux/api/authApi'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/authApi', () => ({
  useVerifyEmailMutation: jest.fn(),
}))

describe('Test for verify email page', () => {
  beforeEach(() => {
    const mockVerifyEmail = jest.fn().mockResolvedValue({ data: {} })
    ;(useVerifyEmailMutation as jest.Mock).mockReturnValue([
      mockVerifyEmail,
    ])
  })

  it('renders verify email form', () => {
    const { getByTestId } = render(<VerifyEmail />)
    expect(getByTestId('verify-form')).toBeInTheDocument()
  })

  it('submits recover form successfully', async () => {
    const mockVerifyEmail = jest.fn().mockResolvedValue({ data: {} })
    ;(useVerifyEmailMutation as jest.Mock).mockReturnValue([
      mockVerifyEmail,
    ])
    const { getByTestId } = render(<VerifyEmail />)
    fireEvent.change(getByTestId('token-input'), {
      target: { value: 'token' },
    })
    fireEvent.submit(getByTestId('verify-form'))
    await waitFor(() => expect(mockVerifyEmail).toHaveBeenCalledTimes(1))
  })

  it('shows error message when verify email fails due to invalid token', async () => {
    const errorMessage = 'Invalid token!'
    const mockVerifyEmail = jest
      .fn()
      .mockResolvedValue({ error: { data: { msg: errorMessage } } })
    ;(useVerifyEmailMutation as jest.Mock).mockReturnValue([
      mockVerifyEmail,
    ])
    const { getByTestId, getByText } = render(<VerifyEmail />)
    fireEvent.change(getByTestId('token-input'), {
      target: { value: 'token' },
    })
    fireEvent.submit(getByTestId('verify-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })

  it('shows unkown error message when verify email fails due to unkown reason', async () => {
    const errorMessage = 'Unknown Error!'
    const mockVerifyEmail = jest.fn().mockResolvedValue({ error: {} })
    ;(useVerifyEmailMutation as jest.Mock).mockReturnValue([
      mockVerifyEmail,
    ])
    const { getByTestId, getByText } = render(<VerifyEmail />)
    fireEvent.change(getByTestId('token-input'), {
      target: { value: 'token' },
    })
    fireEvent.submit(getByTestId('verify-form'))
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument())
    fireEvent.click(getByTestId('button-error'))
  })
})
