import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import PaymentPage from '@/app/payment/page'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => 'test_order_id'),
  })),
}))

const mockTransaction = {
  package: { name: 'Test Package' },
  payment_type: 'Test Payment Type',
  payment_merchant: 'Test Payment Merchant',
  midtrans_url: 'https://example.com/midtrans',
}

jest.mock('@/redux/api/paymentApi', () => ({
  useLazyGetTransactionQuery: jest.fn(() => [
    jest.fn(),
    {
      data: {
        transaction_detail: mockTransaction,
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

    expect(getByText('Transaction detail')).toBeInTheDocument()
    expect(getByText('Test Package')).toBeInTheDocument()
    expect(getByText('Payment Type')).toBeInTheDocument()
    expect(getByText('Merchant')).toBeInTheDocument()
    expect(
      getByText(mockTransaction.payment_type.toUpperCase())
    ).toBeInTheDocument()
    expect(
      getByText(mockTransaction.payment_merchant.toUpperCase())
    ).toBeInTheDocument()

    fireEvent.click(getByText('Continue Transaction'))

    expect(window.open).toHaveBeenCalledWith('https://example.com/midtrans')
  })
})
