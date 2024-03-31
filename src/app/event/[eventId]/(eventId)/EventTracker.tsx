'use client'

import React from 'react'
import { AddVenueSelection } from '@/app/task/AddVenueSelection'
import { AddVendorSelection } from '@/app/task/AddVendorSelection'
import CreateTaskForm from '@/app/task/CreateTaskForm'
import { Button } from '@/components/elements/Button'
import { Task } from '@/types/task'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface EventTrackerProps {
  id: string
  name: string
  budget: number
  date: string
  objective: string
  attendees: number
  theme: string
  services: string
  recommend_venue: boolean
  recommend_vendor: boolean
  tasks: Task[]
}
export const EventTracker: React.FC<EventTrackerProps> = ({
  id,
  recommend_venue,
  recommend_vendor,
  tasks,
}) => {
  const [isVenueVisible, setIsVenueVisible] = React.useState(true)
  const handleVenueVisibility = (isVisible: boolean) => {
    setIsVenueVisible(isVisible)
  }

  const [isVendorVisible, setIsVendorVisible] = React.useState(true)
  const handleVendorVisibility = (isVisible: boolean) => {
    setIsVendorVisible(isVisible)
  }

  const [showForm, setShowForm] = React.useState(false)
  const handleToggle = () => {
    setShowForm(!showForm)
  }

  return (
    <div className="flex flex-col gap-y-16">
      {(recommend_venue || recommend_vendor) &&
        (isVenueVisible || isVendorVisible) && (
          <p
            data-testid="label-1"
            className="text-lg text-md text-teal-600 font-bold"
          >
            Struggling to get started? Try this template!
          </p>
        )}
      {(recommend_venue || recommend_vendor) && (
        <div className="flex flex-row gap-x-4">
          {recommend_venue && (
            <AddVenueSelection
              eventId={id}
              setIsVenueVisible={handleVenueVisibility}
            />
          )}
          {recommend_vendor && (
            <AddVendorSelection
              eventId={id}
              setIsVendorVisible={handleVendorVisibility}
            />
          )}
        </div>
      )}
      {(recommend_venue || recommend_vendor) &&
        (isVenueVisible || isVendorVisible) && (
          <p
            data-testid="label-2"
            className="text-lg text-md text-teal-600 font-bold mt-2"
          >
            Or create your own task manually!
          </p>
        )}
      <div className="flex flex-col gap-y-5">
        <h1> Your Tasks </h1>
        <div className = "flex gap-y-3">
            <AccessTimeIcon />
            <p> 13 days to go. </p>
        </div>
        <div className = "flex gap-y-3">
            <AssignmentIcon />
            <p> 1 out of 4 tasks completed </p>
        </div>
      </div>
      <Button
        data-testid="show-or-hide-button"
        onClick={() => handleToggle()}
        className="w-44 flex justify-center bg-white hover:bg-gray-100 text-teal-600 border border-teal-600 font-bold text-sm"
      >
        {showForm ? 'Hide Form' : 'Create New Task'}
      </Button>
      {showForm && !recommend_venue && !recommend_vendor && (
        <p
          data-testid="label-3"
          className="text-lg text-md text-teal-600 font-bold"
        >
          Fill out this form to create a new task!
        </p>
      )}
      {showForm && (
        <CreateTaskForm data-testid="create-task-form" eventId={id} />
      )}
    </div>
  )
}
