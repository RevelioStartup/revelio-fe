import { IEvent } from '@/types/event'
import CheckIcon from '@mui/icons-material/Check'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

export const EventPlan: React.FC<{
  id: string
  name: string
  budget: number
  date: string
  objective: string
  attendees: number
  theme: string
  services: string
}> = ({ id, name, budget, date, objective, attendees, theme, services }) => {
  const servicesList = services.split(',')
  return (
    <div className="flex flex-col gap-y-4">
      <TableContainer component={Paper} className='!shadow-none !border-2 !border-teal-400 lg:!w-fit w-full overflow-auto'>
        <Table sx={{ minWidth: 500 }} aria-label="event table">
          <TableBody className="!border-teal-500 ">
            <TableRow key={'Date'} className="!border-teal-500">
              <TableCell component="th" scope="row" className = "!border-b-2 !border-b-teal-400">
                Date
              </TableCell>
              <TableCell component="th" scope="row"   className = "!border-b-2 !border-b-teal-400 !border-l-2 !border-l-teal-400">
                {date}
              </TableCell>
            </TableRow>
            <TableRow key={'Budget'}>
              <TableCell component="th" scope="row"  className = "!border-b-2 !border-b-teal-400">
                Budget
              </TableCell>
              <TableCell component="th" scope="row"  className = "!border-b-2 !border-b-teal-400 !border-l-2 !border-l-teal-400">
                {budget}
              </TableCell>
            </TableRow>
            <TableRow key={'Attendees'}>
              <TableCell component="th" scope="row">
                Attendees
              </TableCell>
              <TableCell component="th" scope="row" className = "!border-l-2 !border-l-teal-400">
                {attendees}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col gap-y-4 font-bold">
        <h2> Objective </h2>
        <p> {objective} </p>
      </div>
      <div className="flex flex-col gap-y-4 font-bold">
        <h2> Theme </h2>
        <p> {theme} </p>
      </div>
      <div className="flex flex-col gap-y-4 font-bold">
        <h2> Services </h2>
        <div className="flex flex-col gap-y-2">
          {servicesList.map((service, index) => (
            <div key={index} className="flex gap-x-2 items-center">
              <CheckIcon className="!text-white bg-teal-400 !rounded-md !p-1" />
              <span> {service} </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
