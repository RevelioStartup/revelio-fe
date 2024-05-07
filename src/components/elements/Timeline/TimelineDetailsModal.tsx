import React from 'react'
import {
  useDeleteTimelineMutation,
  useModifyDetailTimelineMutation,
} from '@/redux/api/timelineApi'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'

interface TimelineDetailsModalProps {
  timelineId: string
  onClose: () => void
  showModal: boolean
  clickedEvent: {
    title: string
    start: Date
    end: Date
  }
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const TimelineDetailsModal: React.FC<TimelineDetailsModalProps> = ({
  timelineId,
  onClose,
  showModal,
  clickedEvent,
}) => {
  const [deleteTimeline, { isLoading, isSuccess }] = useDeleteTimelineMutation()

  const [isEditing, setIsEditing] = React.useState(false)
  const [newStartDate, setNewStartDate] = React.useState<Dayjs | null>(
    dayjs(clickedEvent?.start?.toLocaleString())
  )
  const [newEndDate, setNewEndDate] = React.useState<Dayjs | null>(
    dayjs(clickedEvent?.end?.toLocaleString())
  )

  const [
    editDetailTimeline,
    { isLoading: modifyDetailTimelineLoading, isError, error },
  ] = useModifyDetailTimelineMutation()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this timeline?')) {
      try {
        await deleteTimeline({ id: timelineId })
        onClose()
      } catch (error) {
        console.error('Failed to delete the timeline:', error)
        alert('There was a problem deleting the timeline.')
      }
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            Start date: {newStartDate?.format('YYYY-MM-DD HH:mm')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            End date: {newEndDate?.format('YYYY-MM-DD HH:mm')}
          </Typography>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              width: 'fit-content',
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete Timeline
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="mt-4"
              onClick={() => setIsEditing(true)}
            >
              Edit Event
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: 10 }}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </Box>
      ) : (
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Start Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mt: 2 }}>
              <DateTimePicker
                label="Start Date"
                value={newStartDate}
                onChange={(newValue) => setNewStartDate(newValue)}
                slotProps={{ textField: { required: true } }}
              />
            </Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              End Date
            </Typography>
            <Box sx={{ mt: 2 }}>
              <DateTimePicker
                label="End Date"
                value={newEndDate}
                onChange={(newValue) => setNewEndDate(newValue)}
                slotProps={{ textField: { required: true } }}
              />
            </Box>
          </LocalizationProvider>
          <Box sx={{ display: 'flex', gap: 8, mt: 2 }}>
            <LoadingButton
              disabled={modifyDetailTimelineLoading}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              onClick={async () => {
                try {
                  const cleanedStartDatetime = newStartDate?.format(
                    'YYYY-MM-DD HH:mmZ'
                  ) as string
                  const cleanedEndDatetime = newEndDate?.format(
                    'YYYY-MM-DD HH:mmZ'
                  ) as string

                  await editDetailTimeline({
                    id: timelineId,
                    start_datetime: cleanedStartDatetime,
                    end_datetime: cleanedEndDatetime,
                  })

                  setIsEditing(false)
                } catch (error) {
                  toast.error('Failed to edit the timeline')
                }
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
  )
}

export default TimelineDetailsModal
