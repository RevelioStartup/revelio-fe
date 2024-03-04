'use client'
import { Button } from '@/components/elements/Button'
import { setEventName } from '@/redux/features/eventSlice'
import { useAppDispatch } from '@/redux/store'
import { useEventContext } from '../layout'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'

export const EventName: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setEventPage } = useEventContext()

  const methods = useForm({
    defaultValues: {
      name: '',
    },
  })

  const { control, handleSubmit } = methods

  const onSubmit = (data: { name: string }) => {
    console.log("msk")
    dispatch(setEventName(data.name))
    setEventPage('date')
  }

  return (
    <div className="w-full flex flex-col max-w-7xl items-center gap-8 justify-center">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        What do you want to plan today ?
      </h1>
      <form
        className="flex flex-col gap-8"
        data-testid="name-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          control={control}
          name="name"
          data-testid="name"
          placeholder="Enter Event Name"
          required
          className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center rounded-[10px]"
        />
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
