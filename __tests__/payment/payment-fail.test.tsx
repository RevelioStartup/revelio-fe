import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'
import PaymentPage from '@/app/payment/page'

jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: any) => <a href={href}>{children}</a>

  MockedLink.displayName = 'MockedNextLink'

  return MockedLink
})

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      switch (param) {
        case 'order_id':
          return 'test_order_id'
        case 'transaction_status':
          return 'deny'
        default:
          return null
      }
    }),
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
            midtrans_url: 'http:example.com',
            midtrans_transaction_id: 'midtrans_id',
            order_id: 'order_id',
            price: 10000,
            checkout_time: '2024-05-06T14:49:19Z',
            expiry_time: '2024-05-06T15:04:19Z',
            payment_type: 'qris',
            payment_merchant: 'gopay',
            status: 'deny',
          },
        },
        isLoading: false,
      },
    ])

    const { getByText, getByRole } = render(<PaymentPage />)

    await waitFor(() => {
      expect(getByText('Payment Failed')).toBeInTheDocument()
      const button = getByRole('button', { name: 'See Transaction History' })
      expect(button.closest('a')).toHaveAttribute(
        'href',
        '/profile?tab=history'
      )
    })
  })
})