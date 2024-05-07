import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useGetTimelinesByEventQuery } from '@/redux/api/timelineApi'
import { EventApi } from '@fullcalendar/core/index.js'
import FullCalendar from '@fullcalendar/react'
import TimelineDetailsModal from './TimelineDetailsModal'

interface DemoAppProps {
  eventId: string
}

const DemoApp: React.FC<DemoAppProps> = ({ eventId }) => {
  const { data: timelines, isLoading } = useGetTimelinesByEventQuery({
    event_id: eventId,
  })
  const [showModal, setShowModal] = React.useState(false)
  const [clickedEvent, setClickedEvent] = React.useState<EventApi | null>(null)

  const handleEventClick = (clickInfo: any) => {
    setShowModal(true)
    setClickedEvent(clickInfo.event)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setClickedEvent(null)
  }

  const events = timelines?.map((timeline) => ({
    id: timeline.id,
    title: timeline.task_step.name,
    start: timeline.start_datetime,
    end: timeline.end_datetime,
    extendedProps: {
      task_step: timeline.task_step,
    },
  }))

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <div data-testid="loader" className="loader"></div>
      </div>
    )
  }

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventColor="#14b8a6"
          displayEventTime={false}
        />
        {clickedEvent && (
          <TimelineDetailsModal
            timelineId={clickedEvent.id}
            onClose={handleCloseModal}
            showModal={showModal}
            clickedEvent={{
              title: clickedEvent.title,
              start: new Date(clickedEvent.startStr),
              end: new Date(clickedEvent.endStr)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DemoApp
