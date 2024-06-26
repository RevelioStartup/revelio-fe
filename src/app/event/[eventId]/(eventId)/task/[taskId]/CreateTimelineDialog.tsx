'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useCreateTimelineMutation } from '@/redux/api/timelineApi'
import { CreateTimelineRequest } from '@/types/timeline'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import toast from 'react-hot-toast'
import { Button } from '@/components/elements/Button'

interface CreateTimelineDialogProps {
  open: boolean
  taskStepId: string
  onClose: () => void
}

export const CreateTimelineDialog: React.FC<CreateTimelineDialogProps> = ({
  open,
  taskStepId,
  onClose,
}) => {
  const [createTimeline, { isLoading, isSuccess }] = useCreateTimelineMutation()
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const defaultValues: CreateTimelineRequest = {
    task_step: '',
    start_datetime: '',
    end_datetime: '',
  }
  const methods = useForm<CreateTimelineRequest>({
    defaultValues: defaultValues,
  })
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = methods

  const onSubmit: SubmitHandler<CreateTimelineRequest> = async (data) => {
    if (!startDate) {
      setError('start_datetime', {
        type: 'required',
        message: 'Start date is required.',
      })
      return
    }
    if (!endDate) {
      setError('end_datetime', {
        type: 'required',
        message: 'End date is required.',
      })
      return
    }
    if (endDate.isBefore(startDate)) {
      setError('end_datetime', {
        type: 'invalid',
        message: 'End date must be after start date.',
      })
      return
    }
    data.task_step = taskStepId
    data.start_datetime = startDate.format('YYYY-MM-DD HH:mmZ')
    data.end_datetime = endDate.format('YYYY-MM-DD HH:mmZ')
    createTimeline(data)
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success('Task step added to timeline ')
      onClose()
    }
    if (startDate)
      setValue('start_datetime', startDate.format('YYYY-MM-DD HH:mmZ'))

    if (endDate) setValue('end_datetime', endDate.format('YYYY-MM-DD HH:mmZ'))
  }, [isSuccess, startDate, endDate])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add your task step to the event timeline.
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col gap-3">
            <p>Start date</p>
            <DateTimePicker
              name="start-date"
              data-testid="start-date"
              label="MM/DD/YYYY"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { required: true } }}
              className="!border-teal-100"
            />
            {errors['start_datetime'] && (
              <p className="text-red-500 text-sm -mt-2">
                Start date is required.
              </p>
            )}

            <p>End date</p>
            <DateTimePicker
              name="end-date"
              data-testid="end-date"
              label="MM/DD/YYYY"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { required: true } }}
              className="!border-teal-100"
            />
            {errors['end_datetime'] && (
              <p className="text-red-500 text-sm -mt-2">
                {errors['end_datetime'].message}
              </p>
            )}
          </div>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant={'danger'} onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} loading={isLoading} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
