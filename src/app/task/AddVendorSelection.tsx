import { useGetEventQuery, useUpdateEventMutation } from '@/redux/api/eventApi'
import { useCreateTaskMutation } from '@/redux/api/taskApi'
import { CreateTaskRequest } from '@/types/task'
import { Box } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface TaskCreateFormProps {
  eventId: string
  setIsVendorVisible: (isVisible: boolean) => void
}

export const AddVendorSelection = ({
  eventId,
  setIsVendorVisible,
}: TaskCreateFormProps) => {
  const { data } = useGetEventQuery(eventId)

  const [createTask] = useCreateTaskMutation()

  const [updateEvent] = useUpdateEventMutation()

  const [isVisible, setIsVisible] = React.useState(true)

  const defaultValues: CreateTaskRequest = {
    title: 'Vendor Selection',
    description:
      'This task entails the meticulous process of identifying, assessing, and choosing the most suitable vendor for the event. It involves thorough research and evaluation of vendor proposals.',
    status: 'Not Started',
    event: eventId,
  }

  const methods = useForm<CreateTaskRequest>({ defaultValues: defaultValues })
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<CreateTaskRequest> = async (taskData) => {
    await createTask(taskData).then(async (res) => {})

    if (data?.id) {
      const updatedEvent = {
        recommend_vendor: false,
      }

      await updateEvent({ id: data.id, changes: updatedEvent })
      setIsVisible(false)
      setIsVendorVisible(false)
    }
  }

  const handleUpdateVendor = async () => {
    if (data?.id) {
      const updatedEvent = {
        recommend_vendor: false,
      }

      await updateEvent({ id: data.id, changes: updatedEvent })
      setIsVisible(false)
      setIsVendorVisible(false)
    }
  }

  return (
    <Box>
      {data?.recommend_vendor && isVisible && (
        <div
          data-testid="add-vendor-selection"
          className="bg-gray-100 p-6 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-64 overflow-auto">
              <h2
                data-testid="task-title"
                className="text-gray-500 text-lg font-bold"
              >
                Vendor Selection
              </h2>
            </div>
            <div>
              <button
                data-testid="vendor-yes-button"
                className="border border-teal-400 hover:bg-gray-200 pt-1 px-1 rounded-full"
                onClick={handleSubmit(onSubmit)}
              >
                <i className="i-ph-check-bold text-teal-400 size-4" />
              </button>
              <button
                data-testid="vendor-no-button"
                className="border border-rose-400 hover:bg-gray-200 pt-1 px-1 rounded-full ml-2"
                onClick={handleUpdateVendor}
              >
                <i className="i-ph-x-bold text-rose-400 size-4" />
              </button>
            </div>
          </div>
          <p data-testid="task-description" className="text-gray-400 text-sm">
            The choice of vendor sets the tone for the entire event. This task
            involves researching, evaluating, and ultimately selecting a
            suitable vendor that aligns with the objectives of the event.
          </p>
        </div>
      )}
    </Box>
  )
}

export default AddVendorSelection
