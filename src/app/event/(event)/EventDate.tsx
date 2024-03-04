import { useAppDispatch } from '@/redux/store'
import { useEventContext } from '../layout'
import { setEventDate } from '@/redux/features/eventSlice'
import { Button } from '@/components/elements/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

export const EventDate = () => {
  const dispatch = useAppDispatch()

  const { setEventPage } = useEventContext()
  const [value, setValue] = useState<Dayjs | null>(dayjs(null))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) return
    dispatch(setEventDate(value as unknown as Date))
    setEventPage('budget')
  }

  return (
    <div className="w-full flex flex-col max-w-7xl items-center gap-8 justify-center">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        What do you want to plan today ?
      </h1>
      <form
        className="flex flex-col gap-8"
        data-testid="date-form"
        onSubmit={handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Event Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
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
