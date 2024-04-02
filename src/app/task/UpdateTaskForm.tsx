'use client'
'@/components/elements/Iconify'

import { useUpdateTaskMutation } from '@/redux/api/taskApi'
import { Box } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'
import { Button } from '@/components/elements/Button'
import { UpdateTaskRequest } from '@/types/task'

interface UpdateTaskFormProps {
  id: number
  title: string
  description: string
  event: string
  setIsEditing: (isVisible: boolean) => void
}

export const UpdateTaskForm = ({
  id,
  title,
  description,
  event,
  setIsEditing,
}: UpdateTaskFormProps) => {
  const [updateTask] = useUpdateTaskMutation()

  const defaultValues: UpdateTaskRequest = {
    id,
    title,
    description,
    event,
  }

  const methods = useForm<UpdateTaskRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<UpdateTaskRequest> = async (data) => {
    await updateTask(data)
    setIsEditing(false)
    reset()
  }

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        data-testid="task-update-form"
      >
        <Input
          required
          name="title"
          data-testid="input-update-title"
          className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-full my-2"
          control={control}
          placeholder="Title"
        />

        <Input
          required
          name="description"
          data-testid="input-update-description"
          className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-full my-2"
          control={control}
          placeholder="Description"
        />

        <Button type="submit" className="my-2 py-2 px-4">
          Save
        </Button>
      </form>
    </Box>
  )
}

export default UpdateTaskForm
