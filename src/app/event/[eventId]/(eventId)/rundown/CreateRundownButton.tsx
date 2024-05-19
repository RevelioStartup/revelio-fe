'use client'
import { useRundownContext } from '@/components/contexts/RundownContext'
import { Button } from '@/components/elements/Button'
import { useCreateRundownWithAIMutation } from '@/redux/api/rundownApi'
import Link from 'next/link'
import { redirect, useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export const CreateRundownButton = () => {
  const pathname = usePathname()
  const params = useParams()
  const { setRundowns: setContextRundowns } = useRundownContext()
  const [generateRundownsWithAI, { data, isSuccess }] =
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
      <Button data-testid="button-add-rundown-ai" onClick={handleGenerateAI}>
        Generate with AI
      </Button>
    </div>
  )
}
