import { useEventContext } from '@/components/contexts/EventContext'
import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Forms/input'
import { setEventBudget } from '@/redux/features/eventSlice'
import { useAppDispatch } from '@/redux/store'
import React from 'react'
import { useForm } from 'react-hook-form'

export const EventBudget: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setEventPage } = useEventContext()
  const [ error, setError ] = React.useState('')

  const methods = useForm({
    defaultValues: {
      budget: '' as unknown as number,
    },
  })

  const { control, handleSubmit } = methods

  const onSubmit = (data: { budget: number }) => {
    if(data.budget < 0) { setError('Please enter a valid budget.'); return }

    dispatch(setEventBudget(data.budget))
    setEventPage('purpose')
  }

  return (
    <div className="w-full flex flex-col max-w-7xl items-center gap-8 justify-center">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        How much is your budget?
      </h1>
      <form
        className="flex flex-col gap-8"
        data-testid="budget-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          control={control}
          name="budget"
          type="number"
          data-testid="budget"
          placeholder="Enter Event Budget"
          required
          className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center rounded-[10px]"
        />
        {!!error && <p className="text-red-500"> {error} </p>}
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
