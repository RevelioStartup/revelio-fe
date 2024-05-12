'use client'
import { useTaskContext } from '@/components/contexts/TaskContext'
import { Button } from '@/components/elements/Button'
import { AddableInputField } from '@/components/elements/Forms/addableInput'

import { useCreateTaskStepManuallyMutation } from '@/redux/api/taskStepApi'
import { CreateTaskStepRequest } from '@/types/taskStep'
import Link from 'next/link'
import { redirect, useParams, usePathname } from 'next/navigation'

import React, { useEffect } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
export const CreateStepManualForm = () => {
  const params = useParams()
  const pathname = usePathname()
  const taskDetailPath = pathname.split('/create-step')[0]

  const { steps: contextSteps } = useTaskContext()
  const defaultValues: CreateTaskStepRequest = {
    task_id: parseInt(params.taskId as string) ?? 0,
    steps: contextSteps,
  }

  const methods = useForm<CreateTaskStepRequest>({
    defaultValues: defaultValues,
  })
  const [createTaskStep, { isLoading, isSuccess, error }] =
    useCreateTaskStepManuallyMutation()

  const onSubmit: SubmitHandler<CreateTaskStepRequest> = async (data) => {
    if (data.steps.length == 0) {
      toast.error('There must be at least one step.')
    } else {
      await createTaskStep(data)
    }
  }

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error((error?.data as any).error as string)
    }
    if (isSuccess) {
      redirect(`${taskDetailPath}`)
    }
  }, [error, isSuccess])

  return (
    <div className="lg:px-10 px-4">
      <p className="font-bold text-2xl text-teal-800 py-4">
        Generate Steps Manually
      </p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <AddableInputField
            name="steps"
            placeholder="Enter step name"
            addButtonText="Add your step here"
            errorMsg="Duplicate value detected"
          />

          <div className="flex flex-col md:flex-row items-center justify-center lg:gap-8 gap-3 lg:w-1/2 mx-auto w-full">
            <Link
              data-testid="back-create-step-link"
              href={taskDetailPath}
              className="w-full"
            >
              <Button
                variant={'ghost'}
                width={'full'}
                loading={isLoading}
                type="button"
              >
                Back
              </Button>
            </Link>

            <Button
              variant={'primary'}
              width={'full'}
              loading={isLoading}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
