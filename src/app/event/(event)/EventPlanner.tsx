'use client'
import { Button } from '@/components/elements/Button'
import { useAppDispatch } from '@/redux/store'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'
import { useEventContext } from '@/components/contexts/EventContext'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { setEventPlanner } from '@/redux/features/eventSlice'

export const EventPlanner: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setEventPage } = useEventContext()

  const methods = useForm({
    defaultValues: {
      name: '',
      budget: '' as unknown as number,
    },
  })

  const { control, handleSubmit } = methods

  const [value, setValue] = React.useState<Dayjs | null>(null)

  const error = React.useMemo(() => {
    if (!value) return 'Please select the date of your event.'
    if (value.isBefore(dayjs(), 'day')) return 'Please select a future date.'
    return ''
  }, [value])

  const onSubmit = (data: { name: string; budget: number }) => {
    if (error) return
    dispatch(
      setEventPlanner({
        name: data.name,
        budget: data.budget,
        date: value!.format('YYYY-MM-DD'),
      })
    )
    setEventPage('purpose')
  }

  return (
    <div className="w-full flex items-center gap-8 justify-center px-28">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        What do you want to plan today?
      </h1>
      <form
        className="flex flex-col gap-10 w-full"
        data-testid="name-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          control={control}
          label="What is your event name?"
          name="name"
          data-testid="name"
          placeholder="Enter event name"
          required
        />
        <div className="flex flex-col gap-y-5">
          <label className="font-medium text-lg"> When is your event? </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col gap-2">
              <DatePicker
                name="date"
                data-testid="date"
                label="MM/DD/YYYY"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{ textField: { required: true } }}
                className="!border-teal-100"
              />
              {!!error && <p className="text-red-500"> {error} </p>}
            </div>
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-y-5">
          <Input
            control={control}
            label="How much is your budget?"
            name="budget"
            type="number"
            data-testid="budget"
            placeholder="Rp."
            required
          />
        </div>
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
