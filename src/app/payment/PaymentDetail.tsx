'use client'
import { Button } from '@/components/elements/Button'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'
import { transactionErrorStatuses, TransactionStatus } from '@/types/payment'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { PaymentSuccess } from './PaymentSuccess'
import { PaymentError } from './PaymentError'
import Link from 'next/link'

export const PaymentDetail = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const status = searchParams.get('transaction_status')

  const [getTransaction, { data, isLoading }] = useLazyGetTransactionQuery()
  useEffect(() => {
    if (orderId) {
      getTransaction({ order_id: orderId })
    }
  }, [orderId])

  if (status == 'settlement' || status == 'capture')
    return (
      <PaymentSuccess
        status={status ?? ''}
        packageName={data?.transaction_detail.package.name ?? ''}
      />
    )
  if (transactionErrorStatuses.includes(status ?? ''))
    return <PaymentError status={status ?? ''} />
  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-[90vh]">
          <div data-testid="loader" className="loader" />
        </div>
      ) : (
        data && (
          <div className="flex flex-col items-center justify-center gap-3 h-[90vh]">
            <p className="text-3xl lg:text-5xl font-bold text-gray-600">
              Transaction in Progress
            </p>
            <p className="text-xl">Transaction detail</p>
            <div className="grid grid-cols-2 border rounded-lg border-gray-700 gap-4 text-lg p-4">
              <p className="font-bold">Package Name</p>
              <p>{data?.transaction_detail.package.name}</p>
              <p className="font-bold">Payment Type</p>
              <p>{data?.transaction_detail.payment_type?.toUpperCase()}</p>
              <p className="font-bold">Merchant</p>
              <p>{data?.transaction_detail.payment_merchant?.toUpperCase()}</p>
              <p className="font-bold">Status</p>
              <p>{data?.transaction_detail.status?.toUpperCase()}</p>
            </div>
            <Button
              onClick={() => {
                if (data?.transaction_detail.midtrans_url)
                  window.open(data.transaction_detail.midtrans_url)
              }}
              disabled={!data.transaction_detail.midtrans_url}
            >
              Continue Transaction
            </Button>
            <Link href={'/payment?tab=history'}>
              <Button>See Transaction History</Button>
            </Link>
          </div>
        )
      )}
    </div>
  )
}
