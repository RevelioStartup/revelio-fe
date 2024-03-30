"use client"

import {
  Box,
} from '@mui/material'
import React from 'react'
import { AddVenueSelection } from '@/app/task/AddVenueSelection'
import { AddVendorSelection } from '@/app/task/AddVendorSelection'
import CreateTaskForm from '@/app/task/CreateTaskForm'
import { Button } from '@/components/elements/Button'

export const EventTracker: React.FC<{
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
}> = ({ id, name, budget, date, objective, attendees, theme, services, recommend_venue, recommend_vendor }) => {
    
    const [isVenueVisible, setIsVenueVisible] = React.useState(true);
    const handleVenueVisibility = (isVisible: boolean) => {
    setIsVenueVisible(isVisible);
    };

    const [isVendorVisible, setIsVendorVisible] = React.useState(true);
    const handleVendorVisibility = (isVisible: boolean) => {
    setIsVendorVisible(isVisible);
    };

  const [showForm, setShowForm] = React.useState(false)
  const handleToggle = () => {setShowForm(!showForm)}

  return (
    <div className="flex flex-col gap-y-4">
    {(recommend_venue || recommend_vendor) && (isVenueVisible || isVendorVisible) && <label data-testid="label-1" className='text-lg text-md text-teal-600 font-bold'>Struggling to get started? Try this template!</label>}
    <div className="flex flex-row gap-x-4">
        {recommend_venue == true && <AddVenueSelection eventId={id} setIsVenueVisible={handleVenueVisibility} />}
        {recommend_vendor == true && <AddVendorSelection eventId={id} setIsVendorVisible={handleVendorVisibility} />}
    </div>
    {(recommend_venue == true || recommend_vendor == true) && (isVenueVisible || isVendorVisible) && <label data-testid="label-2" className='text-lg text-md text-teal-600 font-bold mt-2'>Or create your own task manually!</label>}
    <Button
        data-testid="show-or-hide-button"
        onClick={() => handleToggle()}
        className="w-44 flex justify-center bg-white hover:bg-gray-100 text-teal-600 border border-teal-600 font-bold text-sm"
    >
        {showForm ? 'Hide Form' : 'Create New Task'}
    </Button>
    {showForm && ((recommend_venue == false && recommend_vendor == false)) && <label data-testid="label-3" className='text-lg text-md text-teal-600 font-bold'>Fill out this form to create a new task!</label>}
    {showForm && <CreateTaskForm data-testid="create-task-form" eventId={id} />}
    </div>
  )
}
