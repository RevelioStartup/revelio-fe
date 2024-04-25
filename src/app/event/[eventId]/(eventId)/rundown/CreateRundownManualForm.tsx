'use client'
import { useRundownContext } from '@/components/contexts/RundownContext'
import { Button } from '@/components/elements/Button'
import { AddableInputRundownField } from '@/components/elements/Forms/addableInputRundown'

import { useCreateRundownManuallyMutation } from '@/redux/api/rundownApi'
import { CreateRundownsRequest } from '@/types/rundown'
import Link from 'next/link'
import { redirect, useParams, usePathname } from 'next/navigation'

import React, { useEffect } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
export const CreateRundownManualForm = () => {
  const params = useParams()
  const pathname = usePathname()
  const eventDetailPath = pathname.split('/create-rundown')[0]

  const { rundown_data: contextRundowns } = useRundownContext()
  const defaultValues: CreateRundownsRequest = {
    event_id: params.eventId as string,
    rundown_data: contextRundowns,
  }

  const methods = useForm<CreateRundownsRequest>({
    defaultValues: defaultValues,
  })
  const [createRundown, { isLoading, isSuccess, error }] =
    useCreateRundownManuallyMutation()

  const onSubmit: SubmitHandler<CreateRundownsRequest> = async (data) => {
    data.event_id = params.eventId as string
    if (data.rundown_data.length == 0) {
      toast.error('There must be at least one rundown.')
    } else {
      await createRundown(data)
    }
  }

  useEffect(() => {
    if (!!error && 'data' in error) {
      toast.error((error?.data as any).error as string)
    }
    if (isSuccess) {
      redirect(`${eventDetailPath}`)
    }
  }, [error, isSuccess])

  return (
    <div className="lg:px-10 px-4">
      <p className="font-bold text-2xl text-teal-800 py-4">
        Generate Rundowns Manually
      </p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <AddableInputRundownField
            name="rundown_data"
            addButtonText="Add your rundown here"
          />

          <div className="flex flex-col md:flex-row items-center justify-center lg:gap-8 gap-3 lg:w-1/2 mx-auto w-full">
            <Link
              data-testid="back-create-rundown"
              href={eventDetailPath}
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
