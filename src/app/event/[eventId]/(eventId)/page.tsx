'use client'

import { useGetEventQuery } from '@/redux/api/eventApi'
import { IEvent } from '@/types/event'
import { AppRegistration, EditCalendar, PlaylistAdd } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import React from 'react'
import { EventPlan } from './EventPlan'
import VenueList from '@/app/venue/VenueList'
import VenueCreateForm from '@/app/venue/VenueCreateForm'

const CHIP_STYLE = '!font-bold !p-5 !border-none'
const CHIP_STYLE_ACTIVE = CHIP_STYLE + ' ' + '!bg-teal-600 !text-teal-50'
const CHIP_STYLE_INACTIVE = CHIP_STYLE + ' ' + '!bg-teal-50 !text-teal-400'

export default function EventDetail({
  params,
}: {
  params: { eventId: string }
}) {
  const [chipType, setChipType] = React.useState<
    'plan' | 'timeline' | 'tracker'
  >('plan')
  const { data, isLoading } = useGetEventQuery(params.eventId)

  const handleClick = (type: 'plan' | 'timeline' | 'tracker') => {
    setChipType(type)
  }

  const renderComponent = () => {
    if (data) {
      switch (chipType) {
        case 'plan':
          return <EventPlan {...data} />
        case 'timeline':
          return <div> Timeline </div>
        case 'tracker':
          return <div> Tracker </div>
      }
    }
  }

  return isLoading || !data ? (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  ) : (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl"> {(data as IEvent)?.name} </h1>
      <span className="border-t-2 border-slate-500"> </span>
      <div className="flex gap-x-4 flex-wrap">
        <Chip
          label="My Plan"
          data-testid="myplan"
          avatar={
            <AppRegistration
              className={`${chipType === 'plan' ? '!text-teal-50' : '!text-black'}`}
            />
          }
          className={
            chipType === 'plan' ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
          }
          onClick={() => handleClick('plan')}
        />
        <Chip
          label="Timeline"
          variant="outlined"
          avatar={
            <EditCalendar
              className={`${chipType === 'timeline' ? '!text-teal-50' : '!text-black'}`}
            />
          }
          className={
            chipType === 'timeline' ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
          }
          data-testid="timeline"
          onClick={() => handleClick('timeline')}
        />
        <Chip
          label="Tracker"
          variant="outlined"
          data-testid="tracker"
          avatar={
            <PlaylistAdd
              className={`${chipType === 'tracker' ? '!text-teal-50' : '!text-black'}`}
            />
          }
          onClick={() => handleClick('tracker')}
          className={
            chipType === 'tracker' ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
          }
        />
      </div>
      {renderComponent()}
    </div>
  )
}
