'use client'
import { useTaskContext } from '@/components/contexts/TaskContext'
import { Button } from '@/components/elements/Button'
import { useCreateTaskStepWithAIMutation } from '@/redux/api/taskStepApi'
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
  useEffect(() => {
    if (isSuccess && !!data) {
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
      <Button onClick={handleGenerateAI}>Generate with AI</Button>
    </div>
  )
}
