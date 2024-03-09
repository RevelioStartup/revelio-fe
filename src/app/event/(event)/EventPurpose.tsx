import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Forms/input'
import { useCreateEventMutation } from '@/redux/api/eventApi'
import { useAppSelector } from '@/redux/store'
import { Alert, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'

const listOfServices = [
  'Catering',
  'Photography',
  'Videography',
  'Music',
  'Decoration',
  'Transportation',
  'Security',
]

export const EventPurpose: React.FC = () => {
  const [services, setServices] = React.useState<string[]>([])

  const [open, setOpen] = React.useState(false);

  const error = React.useMemo(() => {
    if (services.length == 0) return 'Please select at least one service.'
    return ''
  }, [services])

  const [ createEvent, { data: createEventData, error: createEventError, isLoading } ] = useCreateEventMutation()

  const methods = useForm({
    defaultValues: {
      objective: '',
      attendees: '' as unknown as number,
      theme: '',
    },
  })

  const { control, handleSubmit } = methods

  const handleChange = (event: SelectChangeEvent<typeof services>) => {
    const {
      target: { value },
    } = event
    setServices(value as string[])
  }

  const { name, date, budget } = useAppSelector((state) => state.event)

  const onSubmit = async (data: {
    objective: string
    attendees: number
    theme: string
  }) => {
    if (services.length === 0) {
      return
    }
    const cleanedDate = new Date(date).toISOString().split('T')[0]

    try {
      const res = await createEvent({
        objective: data.objective,
        attendees: data.attendees,
        theme: data.theme,
        services: services.toString(),
        name: name,
        date: cleanedDate,
        budget: budget, 
      }).unwrap()

    } catch (error) {
      console.log(error)
    } finally {
      setOpen(true)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <form
      className="flex gap-12 w-full p-16 font-quicksand"
      data-testid="purpose-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-8 w-1/2">
        <h1 className="font-bold lg:text-2xl md:text-xl text-base">
          {' '}
          Let us know your event purpose{' '}
        </h1>
        <div className="flex flex-col gap-y-4">
          <Input
            control={control}
            label="What is your event objectives?"
            name="objective"
            data-testid="objective"
            placeholder="Write your event objectives"
            required
            className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center rounded-[10px]"
          />
          <Input
            control={control}
            label="Estimated number of attendes"
            name="attendees"
            type="number"
            data-testid="attendees"
            placeholder="How many people are you inviting"
            required
            className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center rounded-[10px]"
          />
          <Input
            control={control}
            label="Do you have any specific theme?"
            name="theme"
            data-testid="theme"
            placeholder="The theme of the event"
            required
            className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center rounded-[10px]"
          />
          <div className="flex flex-col gap-3">
            <InputLabel id="services">
              What service(s) do you need in your event?
            </InputLabel>
            <Select
              labelId="services"
              data-testid="services"
              id="services"
              multiple
              value={services}
              onChange={handleChange}
              className="bg-slate-100 border-slate-100 outline-none rounded-[10px]"
            >
              {listOfServices.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
            {!!error && <p className="text-red-500"> {error} </p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-12 w-1/2">
        <Image
          src="/assets/images/Illustration.svg"
          alt="illustration"
          height={50}
          width={50}
          className="w-full"
        />
        <Button
          type="submit"
          className="!text-center font-bold rounded-lg flex justify-center w-fit m-auto"
          
        >
          Plan{' '}
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}>
        <Alert
          onClose={handleClose}
          severity={createEventData ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {createEventData ? 'Event created successfully' : 'Error creating event'}
        </Alert>
      </Snackbar>
    </form>
  )
}
