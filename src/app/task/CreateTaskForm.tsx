import React from 'react'
import { Box, Button } from '@mui/material'
import { CreateTaskRequest } from '@/types/task'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateTaskMutation } from '@/redux/api/taskApi'
import { Input } from '@/components/elements/Forms/input'

interface CreateTaskFormProps {
  eventId: string
}

export const CreateTaskForm = ({ eventId }: CreateTaskFormProps) => {
  const [createTask] = useCreateTaskMutation()

  const defaultValues: CreateTaskRequest = {
    title: '',
    description: '',
    status: 'Not Started',
    event: eventId,
  }

  const { control, handleSubmit, reset, watch } = useForm<CreateTaskRequest>({
    defaultValues,
  })

  const title = watch('title')
  const description = watch('description')

  const onSubmit: SubmitHandler<CreateTaskRequest> = async (data) => {
    await createTask(data).then(async (response) => {
      if ('data' in response) {
        reset()
      }
    })
  }

  return (
    <Box>
      <Box className="bg-gray-100 p-6 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <div
              className={`relative my-3 transition-all duration-200 ${title && 'pt-3'}`}
            >
              <Input
                data-testid="title-input"
                name="title"
                type="text"
                className={`bg-white block w-full text-sm text-gray-500 rounded-2xl p-3 ${title && 'mt-3'} ${description && 'mb-6'}`}
                control={control}
              />
              <p
                data-testid="title-label"
                className={`absolute top-3 left-3 text-lg transition-all duration-200 text-sm text-gray-300 ${title && 'top-[-0.5rem] left-[-0.05rem] text-gray-800'}`}
              >
                Title
              </p>
            </div>
            <div
              className={`relative mb-4 transition-all duration-200 ${description && 'py-3'}`}
            >
              <Input
                data-testid="description-input"
                name="description"
                type="text"
                className={`bg-white block w-full text-sm text-gray-500 rounded-2xl p-3 ${description && 'my-3'}`}
                control={control}
              />
              <p
                data-testid="description-label"
                className={`absolute top-3 left-3 text-lg transition-all duration-200 text-sm text-gray-300 ${description && 'top-[-0.5rem] left-[-0.05rem] text-gray-800'}`}
              >
                Description
              </p>
            </div>
            <Box className="flex justify-end w-full">
              <Button
                data-testid="save-button"
                type="submit"
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl px-3"
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default CreateTaskForm
