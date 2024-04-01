'use client'

import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import { useGetEventQuery } from '@/redux/api/eventApi'
import {
  Box,
} from '@mui/material'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'
import { AddTaskStepsButton } from '../step/AddTaskStepsButton'
import StepStepper from './StepStepper'

type StepUpdateRequest = {
  name: string
  description: string
  status: string
  step_order: number
  task: string
}

type UpdateStepFormType = {
  name: string
  description: string
}

export default function TaskDetailPage({
  params,
}: Readonly<{
  params: Readonly<{ eventId: string; taskId: string }>
}>) {

  const { data: taskData, isLoading } = useGetTaskDetailQuery(params)
  const { data: eventData } = useGetEventQuery(params.eventId)
  const steps = taskData?.task_steps

  return !isLoading && taskData?.task_steps ? (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl text-neutral-900 capitalize">
        {' '}
        {eventData?.name}{' '}
      </h1>
      <span className="border-t-2 border-teal-600"> </span>
      <h2 className="font-bold text-3xl text-teal-600 capitalize">
        {' '}
        {taskData?.title}{' '}
      </h2>
      <table className="table w-full max-w-xl border-separate border-spacing-y-5">
        <tbody>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left"> Date </td>
            <td className="font-medium text-left"> {eventData?.date} </td>
          </tr>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left">
              {' '}
              Description{' '}
            </td>
            <td className="font-medium text-left">
              {' '}
              {taskData?.description}{' '}
            </td>
          </tr>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left"> Status </td>
            <td className="font-medium text-left"> {taskData?.status} </td>
          </tr>
        </tbody>
      </table>
      <Box>
        {steps?.length === 0 ? (
          <AddTaskStepsButton />
        ) : (
          <StepStepper taskId={params.taskId} task={taskData}/>
        )}
      </Box>
      <Link href={`/event/${eventData?.id}`}>
        <Button variant="ghost">Back to Event Page</Button>
      </Link>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  )
}
