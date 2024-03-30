import { useGetEventQuery, useUpdateEventMutation } from '@/redux/api/eventApi'
import { useCreateTaskMutation } from '@/redux/api/taskApi'
import { CreateTaskRequest } from '@/types/task'
import { Box } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface TaskCreateFormProps {
  eventId: string
  setIsVenueVisible: (isVisible: boolean) => void
}

export const AddVenueSelection = ({
  eventId,
  setIsVenueVisible,
}: TaskCreateFormProps) => {
  const { data } = useGetEventQuery(eventId)

  const [createTask] = useCreateTaskMutation()

  const [updateEvent] = useUpdateEventMutation()

  const [isVisible, setIsVisible] = React.useState(true)

  const defaultValues: CreateTaskRequest = {
    title: 'Venue Selection',
    description:
      'The choice of venue sets the tone for the entire event. This task involves researching, evaluating, and ultimately selecting a suitable venue that aligns with the objectives of the event.',
    status: 'Not Started',
    event: eventId,
  }

  const methods = useForm<CreateTaskRequest>({ defaultValues: defaultValues })
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<CreateTaskRequest> = async (taskData) => {
    await createTask(taskData).then(async (res) => {})

    if (data?.id) {
      const updatedEvent = {
        recommend_venue: false,
      }

      await updateEvent({ id: data.id, changes: updatedEvent })
      setIsVisible(false)
      setIsVenueVisible(false)
    }
  }

  const handleUpdateVenue = async () => {
    if (data?.id) {
      const updatedEvent = {
        recommend_venue: false,
      }

      await updateEvent({ id: data.id, changes: updatedEvent })
      setIsVisible(false)
      setIsVenueVisible(false)
    }
  }

  return (
    <Box>
      {data?.recommend_venue && isVisible && (
        <div
          data-testid="add-venue-selection"
          className="bg-gray-100 p-6 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-64 overflow-auto">
              <h2
                data-testid="task-title"
                className="text-gray-500 text-lg font-bold"
              >
                Venue Selection
              </h2>
            </div>
            <div>
              <button
                data-testid="venue-yes-button"
                className="border border-teal-400 hover:bg-gray-200 pt-1 px-1 rounded-full"
                onClick={handleSubmit(onSubmit)}
              >
                <i className="i-ph-check-bold text-teal-400 size-4" />
              </button>
              <button
                data-testid="venue-no-button"
                className="border border-rose-400 hover:bg-gray-200 pt-1 px-1 rounded-full ml-2"
                onClick={handleUpdateVenue}
              >
                <i className="i-ph-x-bold text-rose-400 size-4" />
              </button>
            </div>
          </div>
          <p data-testid="task-description" className="text-gray-400 text-sm">
            The choice of venue sets the tone for the entire event. This task
            involves researching, evaluating, and ultimately selecting a
            suitable venue that aligns with the objectives of the event.
          </p>
        </div>
      )}
    </Box>
  )
}

export default AddVenueSelection
