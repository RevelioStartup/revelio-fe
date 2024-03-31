'use client'

import React from 'react'
import { AddVenueSelection } from '@/app/task/AddVenueSelection'
import { AddVendorSelection } from '@/app/task/AddVendorSelection'
import CreateTaskForm from '@/app/task/CreateTaskForm'
import { Button } from '@/components/elements/Button'
import { Task } from '@/types/task'
import AssignmentIcon from '@mui/icons-material/Assignment'
// import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Chip } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import Link from 'next/link'

interface EventTrackerProps {
  id: string
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

  const getTasksDone = () => {
    return tasks.filter((task) => task.status === 'Done').length
  }

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-4">
        {(recommend_venue || recommend_vendor) &&
          (isVenueVisible || isVendorVisible) && (
            <p
              data-testid="label-1"
              className="text-lg text-md text-teal-600 font-bold"
            >
              Struggling to get started? Try this template!
            </p>
          )}
        <div className="flex flex-row">
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
        {(recommend_venue || recommend_vendor) &&
          (isVenueVisible || isVendorVisible) && (
            <p
              data-testid="label-2"
              className="text-lg text-md text-teal-600 font-bold mt-2"
            >
              Or create your own task manually!
            </p>
          )}

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

      <div className="flex flex-col gap-y-5">
        <h1 className="font-bold text-teal-800 text-2xl"> Your Tasks </h1>
        {/* <div className="flex gap-3 items-center">
          <AccessTimeIcon />
          <p className="text-gray-900"> 13 days to go. </p>
        </div> */}
        <div className="flex gap-3 items-center">
          <AssignmentIcon />
          <p className="text-gray-900">
            {' '}
            {getTasksDone()} out of {tasks.length} tasks completed{' '}
          </p>
        </div>
      </div>

      {tasks.map((task) => (
        <div
          className="flex flex-col bg-gray-50 p-5 gap-5 rounded-[20px]"
          key={task.id}
        >
          <h2 className="text-teal-800 font-semibold"> {task.title} </h2>
          <p className="text-gray-900"> {task.description} </p>
          <div className="flex items-center gap-x-4">
            <p> Status </p>
            <Chip
              label={task.status}
              data-testid="progress"
              avatar={
                <CircleIcon
                  color={
                    task.status === 'Done'
                      ? 'success'
                      : task.status === 'On Progress'
                        ? 'warning'
                        : 'disabled'
                  }
                />
              }
            />
          </div>
          <Link
            href={`/event/${id}/task/${task.id}`}
            className="text-right w-full flex flex-col items-end"
          >
            <Button className="bg-teal-600 text-teal-50 font-semibold">
              {' '}
              See More{' '}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
