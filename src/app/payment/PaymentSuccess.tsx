'use client'

import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import { PaymentDetailI } from './PaymentError'

interface PaymentSuccessI extends PaymentDetailI {
  packageName: string
}
export const PaymentSuccess = ({ packageName }: PaymentSuccessI) => {
  return (
    <div className="h-[90vh]">
      <div className="flex flex-col gap-3 items-center justify-center h-full">
        <p className="text-3xl lg:text-5xl font-bold text-emerald-600">
          Payment Success
        </p>
        <p className="text-xl">
          Enjoy the <span className="font-bold">{packageName}</span> Package
        </p>
        <i className="i-ph-check-circle-duotone size-20 text-emerald-400 aspect-square" />
        <Link href={'/dashboard?tab=history'}>
          <Button>See Transaction History</Button>
        </Link>
      </div>
    </div>
  )
}
