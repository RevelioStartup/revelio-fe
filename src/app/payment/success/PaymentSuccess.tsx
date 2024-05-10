'use client'

import { Button } from '@/components/elements/Button'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const PaymentSuccess = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [getTransaction, { data, isLoading }] = useLazyGetTransactionQuery()
  useEffect(() => {
    if (!!orderId) {
      getTransaction({ order_id: orderId })
    }
  }, [orderId])

  return (
    <div className="h-[90vh]">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full">
          <div data-testid="loader" className="loader" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center h-full">
          <p className="text-3xl lg:text-5xl font-bold text-emerald-600">
            Payment Success
          </p>
          <p className="text-xl">
            Enjoy the{' '}
            <span className="font-bold">
              {data?.transaction_detail.package.name}
            </span>{' '}
            Package
          </p>
          <i className="i-ph-check-circle-duotone size-20 text-emerald-400 aspect-square" />
          <Link href={'/payment/transactions/'}>
            <Button>Go to transactions</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
