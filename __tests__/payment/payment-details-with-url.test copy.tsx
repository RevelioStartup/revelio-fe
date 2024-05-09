import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import PaymentPage from '@/app/payment/page'

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
        package: { name: 'Test Package' },
        payment_type: 'Test Payment Type',
        payment_merchant: 'Test Payment Merchant',
        midtrans_url: 'https://example.com/midtrans',
      },
      isLoading: false,
    },
  ]),
}))

describe('Payment Detail Page With Midtrans Url', () => {
  beforeAll(() => {
    jest.spyOn(window, 'open').mockImplementation()
  })

  it('renders transaction detail', async () => {
    const { queryByTestId, getByText } = render(<PaymentPage />)
    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument()
    })

    expect(getByText('Transaction Detail')).toBeInTheDocument()
    expect(getByText('Test Package')).toBeInTheDocument()
    expect(getByText('Test Payment Type')).toBeInTheDocument()
    expect(getByText('Test Payment Merchant')).toBeInTheDocument()

    fireEvent.click(getByText('Continue Transaction'))

    expect(window.open).toHaveBeenCalledWith('https://example.com/midtrans')
  })
})
