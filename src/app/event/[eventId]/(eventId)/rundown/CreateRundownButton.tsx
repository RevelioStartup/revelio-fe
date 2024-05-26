'use client'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { LatestSubscriptionResponse } from '@/types/subscription'
import { useGetLatestSubscriptionQuery } from '@/redux/api/subscriptionApi'

export const CreateRundownButton = () => {
  const pathname = usePathname()
  const { data: latest_subscription = {} as LatestSubscriptionResponse } =
    useGetLatestSubscriptionQuery()

  return (
    <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6">
      <p
        data-testid="no-rundown-text"
        className="text-lg text-md text-teal-600 font-bold"
      >
        Your event does not have a schedule yet! Create one now!
      </p>
      <Link href={`${pathname}/create-rundown`} className="w-full">
        <Button
          variant={'ghost'}
          width={'full'}
          data-testid="button-add-rundown-manual"
        >
          Add Rundown Manually
        </Button>
      </Link>
      <p className="font-bold text-teal-400 text-center">or</p>
      {latest_subscription.is_active ? (
        <Button data-testid="premium-rundown-ai-button">
          Generate with AI
        </Button>
      ) : (
        <Button
          disabled
          data-testid="free-rundown-ai-button"
          style={{ backgroundColor: 'gray', color: 'white' }}
        >
          <p className="whitespace-nowrap w-full flex">
            <i className="i-ph-lock-key-light text-white size-6 mr-2" />
            Generate with AI
          </p>
        </Button>
      )}
    </div>
  )
}
