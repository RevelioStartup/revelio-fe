'use client'

import {
  useDeleteTaskMutation,
  useGetTaskDetailQuery,
} from '@/redux/api/taskApi'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { Box } from '@mui/material'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'

import StepStepper from './StepStepper'
import { AddTaskStepsButton } from './step/AddTaskStepsButton'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'

export default function TaskDetailPage({
  params,
}: Readonly<{
  params: Readonly<{ eventId: string; taskId: string }>
}>) {
  const { data: taskData, isLoading } = useGetTaskDetailQuery(params)
  const { data: eventData } = useGetEventQuery(params.eventId)
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation()

  const steps = taskData?.task_steps

  const deleteTaskMethod = async (eventId: string, taskId: string) => {
    try {
      await deleteTask({ eventId, taskId })
      toast.success('Task deleted successfully')
      window.location.assign(`/event/${eventId}`)
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  return !isLoading && taskData?.task_steps ? (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl text-neutral-900 capitalize">
        {' '}
        {eventData?.name}{' '}
      </h1>
      <span className="border-t-2 border-teal-600"> </span>
      <div className="font-bold text-3xl text-teal-600 capitalize w-full flex justify-between">
        {' '}
        <h2 className="font-bold text-3xl text-teal-600 capitalize">
          {' '}
          {taskData?.title}{' '}
        </h2>
        <LoadingButton
          className="!text-center !font-bold rounded-lg flex justify-center m-auto !bg-red-500 !text-white !px-4 !py-2"
          loading={deleteLoading}
          loadingIndicator={'Creating...'}
          onClick={() => deleteTaskMethod(params.eventId, params.taskId)}
          data-testid="delete-task"
        >
          Delete{' '}
        </LoadingButton>
      </div>
      <table className="table w-full max-w-xl border-separate border-spacing-y-5">
        <tbody>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left"> Date </td>
            <td className="font-medium text-left"> {eventData?.date} </td>
          </tr>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left"> Description </td>
            <td className="font-medium text-left"> {taskData?.description} </td>
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
          <StepStepper taskId={params.taskId} task={taskData} />
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
