'use client'
import React, { useState } from 'react'
import { AIAside } from './AIAside'
import { Button } from '@/components/elements/Button'
import { LatestSubscriptionResponse } from '@/types/subscription'
import { useGetLatestSubscriptionQuery } from '@/redux/api/subscriptionApi'

export const AIButton = () => {
  const { data: latest_subscription = {} as LatestSubscriptionResponse } =
    useGetLatestSubscriptionQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="w-full overflow-x-hidden">
      <AIAside isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex justify-end">
        {latest_subscription.is_active ? (
          <Button
            data-testid="premium-event-ai-button"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <p className="whitespace-nowrap w-full">Ask AI</p>
          </Button>
        ) : (
          <Button
            disabled
            data-testid="free-event-ai-button"
            style={{ backgroundColor: 'gray', color: 'white' }}
          >
            <p className="whitespace-nowrap w-full flex">
              <i className="i-ph-lock-key-light text-white size-6 mr-2" />
              Ask AI
            </p>
          </Button>
        )}
      </div>
    </div>
  )
}
