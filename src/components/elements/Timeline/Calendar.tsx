import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  useGetTimelinesByEventQuery,
  useModifyDetailTimelineMutation,
} from '@/redux/api/timelineApi'
import { EventApi } from '@fullcalendar/core/index.js'
import FullCalendar from '@fullcalendar/react'
import { Button } from '../Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'

interface DemoAppProps {
  eventId: string
}

const DemoApp: React.FC<DemoAppProps> = ({ eventId }) => {
  const { data: timelines, isLoading } = useGetTimelinesByEventQuery({
    event_id: eventId,
  })
  const [showModal, setShowModal] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [newStartDate, setNewStartDate] = React.useState<Dayjs | null>(null)
  const [newEndDate, setNewEndDate] = React.useState<Dayjs | null>(null)

  const [clickedEvent, setClickedEvent] = React.useState<EventApi | null>(null)

  const [editDetailTimeline, { isLoading: modifyDetailTimelineLoading }] =
    useModifyDetailTimelineMutation()

  const handleEventClick = (clickInfo: any) => {
    setShowModal(true)
    const clickInfoEvent = clickInfo.event
    setClickedEvent(clickInfoEvent)

    const start = dayjs(clickInfoEvent?.start?.toLocaleString())
    const end = dayjs(clickInfoEvent?.end?.toLocaleString())

    setNewStartDate(start)
    setNewEndDate(end)
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
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="event-modal-title"
          aria-describedby="event-modal-description"
        >
          {!isEditing ? (
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Task Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Task title: {clickedEvent?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Start date: {clickedEvent?.start?.toLocaleDateString()}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                End date: {clickedEvent?.end?.toLocaleDateString()}
              </Typography>
              <Button className="mt-4" onClick={() => setIsEditing(true)}>
                Edit Event
              </Button>
            </Box>
          ) : (
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Start Date
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="id"
                >
                  <DatePicker
                    label="Start Date"
                    value={newStartDate}
                    onChange={(newValue) => setNewStartDate(newValue)}
                    slotProps={{ textField: { required: true } }}
                  />
                </LocalizationProvider>
              </Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                End Date
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="id"
                >
                  <DatePicker
                    label="End Date"
                    value={newEndDate}
                    onChange={(newValue) => setNewEndDate(newValue)}
                    slotProps={{ textField: { required: true } }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: 'flex', gap: 8, mt: 2 }}>
                <LoadingButton
                  disabled={modifyDetailTimelineLoading}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  onClick={async () => {
                    const cleanedStartDatetime = newStartDate
                      ?.toISOString()
                      .split('T')[0] as string
                    const cleanedEndDatetime = newEndDate
                      ?.toISOString()
                      .split('T')[0] as string

                    await editDetailTimeline({
                      id: clickedEvent?.id as string,
                      start_datetime: cleanedStartDatetime,
                      end_datetime: cleanedEndDatetime,
                    })

                    setShowModal(false)
                    setIsEditing(false)
                  }}
                  loading={modifyDetailTimelineLoading}
                  loadingIndicator={'Editing...'}
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default DemoApp
