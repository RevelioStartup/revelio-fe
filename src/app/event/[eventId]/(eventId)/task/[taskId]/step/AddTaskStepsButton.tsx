'use client'
import { useTaskContext } from '@/components/contexts/TaskContext'
import { Button } from '@/components/elements/Button'
import { useGetLatestSubscriptionQuery } from '@/redux/api/subscriptionApi'
import { useCreateTaskStepWithAIMutation } from '@/redux/api/taskStepApi'
import { LatestSubscriptionResponse } from '@/types/subscription'
import Link from 'next/link'
import { redirect, useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export const AddTaskStepsButton = () => {
  const pathname = usePathname()
  const params = useParams()
  const { setSteps: setContextSteps } = useTaskContext()
  const [generateStepsWithAI, { data, isSuccess }] =
    useCreateTaskStepWithAIMutation()
  const handleGenerateAI = async () => {
    await generateStepsWithAI({
      task_id: parseInt(params.taskId as string),
    })
  }
  const { data: latest_subscription = {} as LatestSubscriptionResponse } =
    useGetLatestSubscriptionQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setContextSteps(data.steps)
      redirect(`${params.taskId}/create-step`)
    }
  }, [isSuccess, data])

  return (
    <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6 border border-teal-600 rounded-xl">
      <div className="flex flex-row gap-3">
        <i className="i-ph-list-checks-light size-6 text-gray-950" />
        <p>No steps created yet</p>
      </div>
      <Link href={`${pathname}/create-step`} className="w-full">
        <Button variant={'ghost'} width={'full'}>
          Add Step Manually
        </Button>
      </Link>
      <p className="font-bold text-teal-400 text-center">or</p>
      {latest_subscription.is_active ? (
        <Button onClick={handleGenerateAI} data-testid="premium-task-ai-button">
          Generate with AI
        </Button>
      ) : (
        <Button
          disabled
          data-testid="free-task-ai-button"
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
