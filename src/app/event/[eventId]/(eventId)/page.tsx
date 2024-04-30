'use client'

import { Chip } from '@mui/material'
import { AppRegistration, EditCalendar, PlaylistAdd } from '@mui/icons-material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import React from 'react'
import { EventPlan } from './EventPlan'
import { EventTracker } from './EventTracker'
import { useGetAllTasksQuery } from '@/redux/api/taskApi'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { Task as TaskDetails } from '@/types/taskDetails'
import { Task } from '@/types/task'
import { Rundown } from './rundown/EventRundown'
import { IEvent } from '@/types/event'

const CHIP_STYLE = '!font-bold !p-5 !border-none'
const CHIP_STYLE_ACTIVE = CHIP_STYLE + ' ' + '!bg-teal-600 !text-teal-50'
const CHIP_STYLE_INACTIVE = CHIP_STYLE + ' ' + '!bg-teal-50 !text-teal-400'
type ChipType = 'plan' | 'timeline' | 'tracker' | 'rundown'

function getAvatarComponent(type: string, chipType: ChipType): JSX.Element {
  let avatarComponent;

  switch (type) {
    case 'plan':
      avatarComponent = <AppRegistration />;
      break;
    case 'timeline':
      avatarComponent = <EditCalendar />;
      break;
    case 'tracker':
      avatarComponent = <PlaylistAdd />;
      break;
    default:
      avatarComponent = <AssignmentIcon />;
      break;
  }

  const className = chipType === type ? '!text-teal-50' : '!text-black';

  return React.cloneElement(avatarComponent, { className });
}

function renderContent(
  chipType: string,
  data: IEvent,
  trackerData: TaskDetails[]
) {
  switch (chipType) {
    case 'plan':
      return <EventPlan {...data} />
    case 'timeline':
      return <div> Timeline </div>
    case 'tracker':
      return <EventTracker {...data} tasks={trackerData as unknown as Task[]} />
    case 'rundown':
      return <Rundown eventId={data.id} />
  }
}

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  )
}

export default function EventDetail({
  params,
}: {
  params: { eventId: string }
}) {
  const [chipType, setChipType] = React.useState<ChipType>('plan')
  const { data, isLoading } = useGetEventQuery(params.eventId)
  const { data: trackerData, isLoading: trackerLoading } = useGetAllTasksQuery(
    params.eventId
  )

  const handleClick = (type: 'plan' | 'timeline' | 'tracker' | 'rundown') => {
    setChipType(type)
  }

  return isLoading || trackerLoading || !trackerData || !data ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-3xl text-neutral-900 capitalize">
        {data?.name}
      </h1>
      <span className="border-t-2 border-teal-600"> </span>
      <div className="flex gap-x-4 flex-wrap">
        {['plan', 'timeline', 'tracker', 'rundown'].map((type) => (
          <Chip
            key={type}
            label={
              type === 'timeline'
                ? 'Timeline'
                : type.charAt(0).toUpperCase() + type.slice(1)
            }
            data-testid={type}
            avatar={getAvatarComponent(type, chipType)}
            className={
              chipType === type ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
            }
            onClick={() =>
              handleClick(type as 'plan' | 'timeline' | 'tracker' | 'rundown')
            }
          />
        ))}
      </div>
      {renderContent(chipType, data, trackerData)}
    </div>
  )
}
