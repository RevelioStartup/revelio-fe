'use client'
import { Button } from '@/components/elements/Button'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export const PaymentDetail = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [getTransaction, { data, isLoading }] = useLazyGetTransactionQuery()
  useEffect(() => {
    if (orderId) {
      getTransaction({ order_id: orderId })
    }
  }, [orderId])
  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-[90vh]">
          <div data-testid="loader" className="loader" />
        </div>
      ) : (
        data && (
          <div className="flex flex-col items-center justify-center gap-3">
            <p>Transaction Detail</p>
            <p>{data.transaction_detail.package.name}</p>
            <p>{data.transaction_detail.payment_type}</p>
            <p>{data.transaction_detail.payment_merchant}</p>
            <Button
              onClick={() => {
                if (data?.transaction_detail.midtrans_url)
                  window.open(data.transaction_detail.midtrans_url)
              }}
              disabled={!data.transaction_detail.midtrans_url}
            >
              Continue Transaction
            </Button>
          </div>
        )
      )}
    </div>
  )
}
