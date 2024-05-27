'use client'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
export interface PaymentDetailI {
  status: string | null
}
export const PaymentError = ({ status }: PaymentDetailI) => {
  return (
    <div className="h-[90vh]">
      <div className="flex flex-col gap-3 items-center justify-center h-full">
        <p className="text-3xl lg:text-5xl font-bold text-rose-600">
          Payment Failed
        </p>
        {!!status && (
          <p>
            Transaction status:{' '}
            <span className="font-bold text-rose-700">
              {status?.toUpperCase()}
            </span>
          </p>
        )}
        <i className="i-ph-x-circle-duotone size-20 text-rose-400 aspect-square" />
        <Link href={'/dashboard?tab=history'}>
          <Button variant={'ghost'}>See Transaction History</Button>
        </Link>
      </div>
    </div>
  )
}
