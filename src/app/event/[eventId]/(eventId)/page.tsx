'use client'

import { useGetEventQuery } from '@/redux/api/eventApi'
import { AppRegistration, EditCalendar, PlaylistAdd } from '@mui/icons-material'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Chip } from '@mui/material'
import React from 'react'
import { EventPlan } from './EventPlan'
import { EventTracker } from './EventTracker'
import { useGetAllTasksQuery } from '@/redux/api/taskApi'
import { Task } from '@/types/task'
import { Rundown } from './rundown/EventRundown'

const CHIP_STYLE = '!font-bold !p-5 !border-none'
const CHIP_STYLE_ACTIVE = CHIP_STYLE + ' ' + '!bg-teal-600 !text-teal-50'
const CHIP_STYLE_INACTIVE = CHIP_STYLE + ' ' + '!bg-teal-50 !text-teal-400'

export default function EventDetail({
  params,
}: {
  params: { eventId: string }
}) {
  const [chipType, setChipType] = React.useState<
    'plan' | 'timeline' | 'tracker' | 'rundown'
  >('plan')
  const { data, isLoading } = useGetEventQuery(params.eventId)

  const { data: trackerData, isLoading: trackerLoading } = useGetAllTasksQuery(
    params.eventId
  )

  console.log(trackerData)

  const handleClick = (type: 'plan' | 'timeline' | 'tracker' | 'rundown') => {
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
          return (
            <EventTracker {...data} tasks={trackerData as unknown as Task[]} />
          )
        case 'rundown':
          return <Rundown />
      }
    }
  }

  return isLoading || trackerLoading || !trackerData || !data ? (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  ) : (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl text-neutral-900 capitalize">
        {' '}
        {data?.name}{' '}
      </h1>
      <span className="border-t-2 border-teal-600"> </span>
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
        <Chip
          label="Rundown"
          variant="outlined"
          data-testid="rundown"
          avatar={
            <AssignmentIcon
              className={`${chipType === 'rundown' ? '!text-teal-50' : '!text-black'}`}
            />
          }
          onClick={() => handleClick('rundown')}
          className={
            chipType === 'rundown' ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
          }
        />
      </div>
      {renderComponent()}
    </div>
  )
}
