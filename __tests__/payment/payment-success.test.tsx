import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PaymentSuccessPage from '@/app/payment/success/page'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'

jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: any) => <a href={href}>{children}</a>

  MockedLink.displayName = 'MockedNextLink'

  return MockedLink
})

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => 'test_order_id'),
  })),
}))

jest.mock('@/redux/api/paymentApi', () => ({
  useLazyGetTransactionQuery: jest.fn(),
}))
describe('PaymentSuccess Component', () => {
  it('renders the success message when data is loaded', async () => {
    ;(useLazyGetTransactionQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: {
          transaction_detail: {
            id: 'transaction_id',
            package: {
              id: 2,
              name: 'Premium',
            },
            midtrans_url: null,
            midtrans_transaction_id: 'midtrans_id',
            order_id: 'order_id',
            price: 10000,
            checkout_time: '2024-05-06T14:49:19Z',
            expiry_time: '2024-05-06T15:04:19Z',
            payment_type: 'qris',
            payment_merchant: 'gopay',
            status: 'settlement',
          },
        },
        isLoading: false,
      },
    ])

    const { getByText, getByRole } = render(<PaymentSuccessPage />)

    await waitFor(() => {
      expect(getByText('Payment Success')).toBeInTheDocument()
      expect(getByText('Premium')).toBeInTheDocument()
      const button = getByRole('button', { name: 'Go to transactions' })
      expect(button.closest('a')).toHaveAttribute(
        'href',
        '/payment/transactions/'
      )
    })
  })

  it('shows loader when data is still loading', () => {
    ;(useLazyGetTransactionQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: true,
      },
    ])

    const { getByTestId } = render(<PaymentSuccessPage />)

    expect(getByTestId('loader')).toBeInTheDocument()
  })
})
