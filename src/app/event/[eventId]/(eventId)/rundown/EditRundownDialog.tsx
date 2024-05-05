'use client'

import { useUpdateRundownMutation } from '@/redux/api/rundownApi'
import { Input } from '@/components/elements/Forms/input'
import { Box } from '@mui/material'
import { Button } from '@/components/elements/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormDialog, FormDialogActions } from '@/components/elements/Dialog'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

type UpdateRundownFormType = {
  description: string
  start_time: string
  end_time: string
}

interface Props {
  readonly openForm: boolean
  readonly onClose: () => void
  readonly prevDesc: string
  readonly rundownId: string
  readonly prevStartTime: string
  readonly prevEndTime: string
}

export default function EditRundownDialog({
  openForm,
  onClose,
  prevDesc,
  rundownId,
  prevStartTime,
  prevEndTime,
}: Props) {
  const defaultValues: UpdateRundownFormType = {
    description: prevDesc,
    start_time: prevStartTime,
    end_time: prevEndTime,
  }

  const [updateRundown] = useUpdateRundownMutation()

  const methods = useForm<UpdateRundownFormType>({
    defaultValues: defaultValues,
  })
  const { control, handleSubmit, reset, setValue } = methods

  useEffect(() => {
    setValue('description', prevDesc)
    setValue('start_time', prevStartTime)
    setValue('end_time', prevEndTime)
  }, [setValue, prevStartTime, prevDesc, prevEndTime])

  const editTaskStep = async (id: string, changes: UpdateRundownFormType) => {
    await updateRundown({ id, changes }).then((res) => {
      if (res) {
        if ('data' in res) {
          onClose()
          reset()
        } else if ('data' in res.error) {
          const errorData = res.error.data as { message: string }
          toast.error(errorData.message)
        } else {
          toast.error('Unknown error!')
        }
      }
    })
  }

  const onSubmit: SubmitHandler<UpdateRundownFormType> = async (data) => {
    const description = data.description
    const start_time = data.start_time
    const end_time = data.end_time
    editTaskStep(rundownId, {
      description,
      start_time,
      end_time,
    })
  }

  return (
    <Box>
      <FormDialog
        open={openForm}
        onClose={onClose}
        data-testid="edit-rundown-dialog"
        title="Edit Rundown"
      >
        <FormDialogActions>
          <div className="flex flex-col gap-3" style={{ flex: 1 }}>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
              data-testid="edit-rundown-form"
            >
              <Input
                control={control}
                name="description"
                required
                placeholder="Enter Activity's Description"
                data-testid="description-input"
              />
              <Input
                control={control}
                name="start_time"
                required
                type="time"
                placeholder="Enter Activity's Start Time"
                data-testid="start-time-input"
              />
              <Input
                control={control}
                name="end_time"
                required
                type="time"
                placeholder="Enter Activity's End Time"
                data-testid="end-time-input"
              />
              <Button type="submit" data-testid="button-submit">
                Edit Rundown
              </Button>
            </form>
            <Button
              variant={'secondary'}
              data-testid="close-form"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </FormDialogActions>
      </FormDialog>
    </Box>
  )
}
