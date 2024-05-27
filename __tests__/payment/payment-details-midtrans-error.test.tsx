import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
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
      data: null,
      isLoading: false,
      error: {
        data: {
          error:
            'Midtrans API is returning API error. HTTP status code: `401`. API response: `{"status_code":"401","status_message":"Unknown Merchant server_key/id","id":"c8f11ee1-1ed5-4efe-bcfb-65a24876371e"}`',
        },
      },
    },
  ]),
}))

describe('Payment Detail Page Returns Error', () => {
  beforeAll(() => {
    jest.spyOn(window, 'open').mockImplementation()
  })

  it('renders transaction detail with error message', async () => {
    const { queryByTestId, getByText } = render(<PaymentPage />)
    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument()
    })

    expect(getByText('Oops... something went wrong')).toBeInTheDocument()
    expect(getByText('Unknown Merchant server_key/id')).toBeInTheDocument()
  })
})
