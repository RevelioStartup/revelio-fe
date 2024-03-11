import { useAppDispatch } from '@/redux/store'
import { setEventDate } from '@/redux/features/eventSlice'
import { Button } from '@/components/elements/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useEventContext } from '@/components/contexts/EventContext'

export const EventDate = () => {
  const dispatch = useAppDispatch()

  const { setEventPage } = useEventContext()
  const [value, setValue] = React.useState<Dayjs | null>(null)

  const error = React.useMemo(() => {
    if (!value) return 'Please select the date of your event.'
    if (value.isBefore(dayjs(), 'day')) return 'Please select a future date.'
    return ''
  }, [value])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(error)
    if (error) return
    dispatch(setEventDate(dayjs(value).toDate().toString()))
    setEventPage('budget')
  }

  return (
    <div className="w-full flex flex-col max-w-7xl items-center gap-8 justify-center">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        When is your event?
      </h1>
      <form
        className="flex flex-col gap-8"
        data-testid="date-form"
        onSubmit={handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col gap-4">
            <DatePicker
              name="date"
              data-testid="date"
              label="Event Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              slotProps={{ textField: { required: true } }}
            />
            {!!error && <p className="text-red-500"> {error} </p>}
          </div>
        </LocalizationProvider>
        <Button
          type="submit"
          className="!text-center font-bold rounded-lg flex justify-center"
        >
          {' '}
          Next{' '}
        </Button>
      </form>
    </div>
  )
}
