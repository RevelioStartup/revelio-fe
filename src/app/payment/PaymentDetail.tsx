'use client'
import { Button } from '@/components/elements/Button'
import { useLazyGetTransactionQuery } from '@/redux/api/paymentApi'
import {
  MidtransErrorResponse,
  transactionErrorStatuses,
} from '@/types/payment'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PaymentSuccess } from './PaymentSuccess'
import { PaymentError } from './PaymentError'
import Link from 'next/link'

export const PaymentDetail = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const status = searchParams.get('transaction_status')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [getTransaction, { data, isLoading, error }] =
    useLazyGetTransactionQuery()
  useEffect(() => {
    if (orderId) {
      getTransaction({ order_id: orderId })
    }
  }, [orderId])
  const test_stat = null

  useEffect(() => {
    if (!!error && 'data' in error) {
      // Adjusted regex to correctly extract JSON surrounded by backticks
      const regex = /API response: `({.*})`/
      const match = (error.data as MidtransErrorResponse).error.match(regex)
      if (match && match[1]) {
        const jsonPart = match[1]
        try {
          const apiResponse = JSON.parse(jsonPart)
          const statusMessage = apiResponse.status_message
          setErrorMessage(statusMessage)
        } catch (parseError) {
          console.error('Error parsing JSON from error message:', parseError)
        }
      } else {
        console.log('No match found or JSON part missing in the error message.')
      }
    }
  }, [error])

  if ((Boolean(data) && status == 'settlement') || status == 'capture')
    return (
      <PaymentSuccess
        status={status ?? ''}
        packageName={data?.transaction_detail.package.name ?? ''}
      />
    )
  if (Boolean(data) && transactionErrorStatuses.includes(status ?? ''))
    return <PaymentError status={status} />
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[90vh]">
      {isLoading ? (
        <div data-testid="loader" className="loader" />
      ) : Boolean(error) ? (
        <>
          <p className="text-3xl lg:text-5xl font-bold text-rose-600">
            Oops... something went wrong
          </p>
          <p className="">{errorMessage}</p>
        </>
      ) : (
        data && (
          <>
            <p className="text-3xl lg:text-5xl font-bold text-gray-600">
              Transaction in Progress
            </p>
            <p className="text-xl">Transaction detail</p>
            <div className="grid grid-cols-2 border rounded-lg border-gray-700 gap-4 text-lg p-4">
              <p className="font-bold">Package Name</p>
              <p>{data?.transaction_detail.package.name}</p>
              <p className="font-bold">Payment Type</p>
              <p>
                {(data?.transaction_detail.payment_type ?? '').toUpperCase()}
              </p>
              <p className="font-bold">Merchant</p>
              <p>
                {(
                  data?.transaction_detail.payment_merchant ?? ''
                ).toUpperCase()}
              </p>
              <p className="font-bold">Status</p>
              <p>{(data?.transaction_detail.status ?? '')?.toUpperCase()}</p>
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
          </>
        )
      )}
      <Link href={'/dashboard?tab=history'}>
        <Button>See Transaction History</Button>
      </Link>
    </div>
  )
}
