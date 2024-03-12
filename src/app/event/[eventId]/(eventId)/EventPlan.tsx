import { AIButton } from '@/app/plans/AISuggestion/AIButton'
import VenueCreateForm from '@/app/venue/VenueCreateForm'
import VenueList from '@/app/venue/VenueList'
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
import VendorList from '../../../vendor/VendorList'
import VendorCreateForm from '../../../vendor/VendorCreateForm'

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
  const [showForm, setShowForm] = React.useState<{
    venue: boolean
    vendor: boolean
  }>({ venue: false, vendor: false })
  const handleToggle = (type: 'vendor' | 'venue') => {
    setShowForm((showForm) => ({
      vendor: type == 'vendor' && !showForm.vendor,
      venue: type == 'venue' && !showForm.venue,
    }))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <TableContainer
        component={Paper}
        className="!shadow-none !border-2 !border-teal-400 lg:!w-fit w-full overflow-auto"
      >
        <Table sx={{ minWidth: 500 }} aria-label="event table">
          <TableBody className="!border-teal-500 ">
            <TableRow key={'Date'} className="!border-teal-500">
              <TableCell
                component="th"
                scope="row"
                className="!border-b-2 !border-b-teal-400"
              >
                Date
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                className="!border-b-2 !border-b-teal-400 !border-l-2 !border-l-teal-400"
              >
                {date}
              </TableCell>
            </TableRow>
            <TableRow key={'Budget'}>
              <TableCell
                component="th"
                scope="row"
                className="!border-b-2 !border-b-teal-400"
              >
                Budget
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                className="!border-b-2 !border-b-teal-400 !border-l-2 !border-l-teal-400"
              >
                {budget}
              </TableCell>
            </TableRow>
            <TableRow key={'Attendees'}>
              <TableCell component="th" scope="row">
                Attendees
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                className="!border-l-2 !border-l-teal-400"
              >
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

      <Box
        className={`flex justify-center items-start ${
          showForm
            ? 'border border-teal-200 text-teal-300 hover:border-teal-400 hover:bg-gray-50 hover:text-teal-400'
            : 'bg-teal-300 text-gray-500 hover:text-gray-800'
        } rounded-md p-1 w-36`}
      >
        <button
          onClick={() => handleToggle('venue')}
          className="mr-1 p-1 items-center"
        >
          {showForm.venue ? 'Hide Form' : 'Add Venue'}
        </button>
      </Box>

      <Box className="font-bold text-gray-900">
        <h2> Venue Candidates List </h2>
      </Box>
      {showForm.venue && <VenueCreateForm eventId={id} />}
      <VenueList eventId={id} />

      <div className="w-full h-0.5 bg-gray-200" />
      <Box
        className={`flex justify-center items-start ${
          showForm
            ? 'border border-teal-200 text-teal-300 hover:border-teal-400 hover:bg-gray-50 hover:text-teal-400'
            : 'bg-teal-300 text-gray-500 hover:text-gray-800'
        } rounded-md p-1 w-36`}
      >
        <button
          onClick={() => handleToggle('vendor')}
          className="mr-1 p-1 items-center"
        >
          {showForm.vendor ? 'Hide Form' : 'Add Vendor'}
        </button>
      </Box>
      <Box className="font-bold text-gray-900">
        <h2> Vendor Candidates List </h2>
      </Box>

      {showForm.vendor && <VendorCreateForm eventId={id} />}
      <VendorList eventId={id} />
      <div className="sticky bottom-10 right-10 w-full">
        <AIButton />
      </div>
    </div>
  )
}
