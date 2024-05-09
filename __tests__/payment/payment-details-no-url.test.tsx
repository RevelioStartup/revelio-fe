import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import PaymentPage from '@/app/payment/page'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => 'test_order_id'),
  })),
}))

jest.mock('@/redux/api/paymentApi', () => ({
  useLazyGetTransactionQuery: jest.fn(() => [
    jest.fn(),
    {
      data: {
        transaction_detail: {
          package: { name: 'Test Package' },
          payment_type: 'Test Payment Type',
          payment_merchant: 'Test Payment Merchant',
          midtrans_url: null,
        },
      },
      isLoading: false,
    },
  ]),
}))

describe('Payment Detail Page No Midtrans Url', () => {
  beforeAll(() => {
    jest.spyOn(window, 'open').mockImplementation()
  })

  it('disables button when midtrans_url is not available', async () => {
    const { queryByTestId, getByRole } = render(<PaymentPage />)

    await waitFor(() => expect(queryByTestId('loader')).not.toBeInTheDocument())
    const continueButton = getByRole('button', {
      name: 'Continue Transaction',
    })
    expect(continueButton).toBeDisabled()
  })
  it('shows loading state when query is still loading', async () => {
    ;(useLazyGetTransactionQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: true,
      },
    ])
    const { queryByTestId } = render(<PaymentPage />)

    await waitFor(() => expect(queryByTestId('loader')).toBeInTheDocument())
  })
})
