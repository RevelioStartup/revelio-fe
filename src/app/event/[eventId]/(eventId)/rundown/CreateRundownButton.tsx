'use client'
import { useRundownContext } from '@/components/contexts/RundownContext'
import { Button } from '@/components/elements/Button'
import { useCreateRundownWithAIMutation } from '@/redux/api/rundownApi'
import Link from 'next/link'
import { redirect, useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { LatestSubscriptionResponse } from '@/types/subscription'
import { useGetLatestSubscriptionQuery } from '@/redux/api/subscriptionApi'

export const CreateRundownButton = () => {
  const pathname = usePathname()
  const { data: latest_subscription = {} as LatestSubscriptionResponse } =
    useGetLatestSubscriptionQuery()
  const params = useParams()
  const { setRundowns: setContextRundowns } = useRundownContext()
  const [generateRundownsWithAI, { data, isLoading, isSuccess }] =
    useCreateRundownWithAIMutation()
  const handleGenerateAI = async () => {
    await generateRundownsWithAI({
      event_id: params.eventId as string,
    })
  }
  useEffect(() => {
    if (isSuccess && data) {
      setContextRundowns(data.rundown_data)
      redirect(`${params.eventId}/create-rundown`)
    }
  }, [isSuccess, data])

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[30vh]">
        <div data-testid="loader" className="loader"></div>
      </div>
    )

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
        <Button data-testid="button-add-rundown-ai" onClick={handleGenerateAI}>
          Generate with AI
        </Button>
      ) : (
        <Button
          disabled
          data-testid="free-rundown-ai-button"
          style={{ backgroundColor: 'gray', color: 'white' }}
        >
          <p className="whitespace-nowrap w-full flex items-center">
            <i className="i-ph-lock-key-light text-white size-6 mr-2" />
            <span>Generate with AI</span>
          </p>
        </Button>
      )}
    </div>
  )
}
