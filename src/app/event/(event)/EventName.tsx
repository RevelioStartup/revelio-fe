import { Button } from '@/components/elements/Button'
import { TextField } from '@mui/material'

export const EventName: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center h-full items-center ">
      <div className="w-full flex flex-col max-w-7xl items-center gap-8 justify-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
          What do you want to plan today ?
        </h1>
        <form className="flex flex-col gap-8" data-testid="name-form">
          <TextField
            data-testid="name"
            sx={{
              '& fieldset': { border: 'none' },
              borderRadius: '10px',
            }}
            placeholder="Enter Event Name"
            required
            className="bg-slate-100 placeholder:text-slate-800 placeholder:font-bold !border-none placeholder:text-center flex justify-center"
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
    </div>
  )
}
