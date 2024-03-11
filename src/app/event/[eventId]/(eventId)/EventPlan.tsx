import VenueCreateForm from '@/app/venue/VenueCreateForm'
import VenueList from '@/app/venue/[id]/VenueList'
import { IEvent } from '@/types/event'
import CheckIcon from '@mui/icons-material/Check'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import React from 'react'

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
  const [showForm, setShowForm] = React.useState(false);
  const handleToggle = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="event table">
          <TableBody className="!border-teal-500 ">
            <TableRow key={'Date'} className="!border-teal-500">
              <TableCell component="th" scope="row">
                Date
              </TableCell>
              <TableCell component="th" scope="row">
                {date}
              </TableCell>
            </TableRow>
            <TableRow key={'Budget'}>
              <TableCell component="th" scope="row">
                Budget
              </TableCell>
              <TableCell component="th" scope="row">
                {budget}
              </TableCell>
            </TableRow>
            <TableRow key={'Attendees'}>
              <TableCell component="th" scope="row">
                Attendees
              </TableCell>
              <TableCell component="th" scope="row">
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
      
      <Box className="font-bold text-gray-900">
        <h2> Venue Candidates List </h2>
      </Box>
      <Box
        className={`flex justify-center items-start ${
          showForm ? 'border border-teal-200 text-teal-300 hover:border-teal-400 hover:bg-gray-50 hover:text-teal-400' : 'bg-teal-300 text-gray-500 hover:text-gray-800'
        } rounded-md p-1 w-36`}
      >
        <button onClick={handleToggle} className="mr-1 p-1 items-center">
          {showForm ? 'Hide Form' : 'Add Venue'}
        </button>
      </Box>

      {showForm && <VenueCreateForm eventId={id} />}
      <VenueList eventId={id} />
    </div>
  )
}
