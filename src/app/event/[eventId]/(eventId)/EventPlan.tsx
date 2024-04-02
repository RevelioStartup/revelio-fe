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
import { Button } from '@/components/elements/Button'

export const EventPlan: React.FC<{
  id: string
  budget: number
  date: string
  objective: string
  attendees: number
  theme: string
  services: string
}> = ({ id, budget, date, objective, attendees, theme, services }) => {
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
    <div className="flex flex-col gap-y-4 text-gray-900">
      <table className="table w-full max-w-xl border-separate border-spacing-y-5">
        <tbody>
          <tr className="table-row">
            <td className="text-teal-800 font-bold text-left"> Date </td>
            <td className="font-medium text-left"> {date} </td>
          </tr>
          <tr className="table-row m-5">
            <td className="text-teal-800 font-bold text-left"> Budget </td>
            <td className="font-medium text-left"> {budget} </td>
          </tr>
          <tr className="table-row m-5">
            <td className="text-teal-800 font-bold text-left"> Attendees </td>
            <td className="font-medium text-left"> {attendees} </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col bg-gray-50 p-5 gap-5">
        <h2 className="font-bold text-teal-800"> Objective </h2>
        <p> {objective} </p>
      </div>
      <div className="flex flex-col bg-gray-50 p-5 gap-5">
        <h2 className="font-bold text-teal-800"> Theme </h2>
        <p> {theme} </p>
      </div>
      <div className="flex flex-col gap-y-5 font-bold p-5">
        <h2> Services </h2>
        <div className="flex flex-col gap-y-5">
          {servicesList.map((service, index) => (
            <div key={service + index} className="flex gap-x-3 items-center">
              <CheckIcon className="!text-white bg-teal-400 !rounded-md !p-1 !w-[22px] !h-[22px]" />
              <span className="font-medium"> {service} </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-t-2 border-teal-600" />

      <Box
        className={`flex justify-center items-start ${
          showForm
            ? 'border border-teal-200 text-teal-300 hover:border-teal-400 hover:bg-gray-50 hover:text-teal-400'
            : 'bg-teal-300 text-gray-500 hover:text-gray-800'
        } rounded-md p-1 w-36`}
      >
        <Button
          onClick={() => handleToggle('venue')}
          className="mr-1 p-1 items-center"
        >
          {showForm.venue ? 'Hide Form' : 'Add Venue'}
        </Button>
      </Box>

      <Box className="font-bold text-gray-900">
        <h2> Venue Candidates List </h2>
      </Box>
      {showForm.venue && <VenueCreateForm eventId={id} />}
      <VenueList eventId={id} />

      <Box
        className={`flex justify-center items-start ${
          showForm
            ? 'border border-teal-200 text-teal-300 hover:border-teal-400 hover:bg-gray-50 hover:text-teal-400'
            : 'bg-teal-300 text-gray-500 hover:text-gray-800'
        } rounded-md p-1 w-36`}
      >
        <Button
          onClick={() => handleToggle('vendor')}
          className="mr-1 p-1 items-center"
        >
          {showForm.vendor ? 'Hide Form' : 'Add Vendor'}
        </Button>
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
