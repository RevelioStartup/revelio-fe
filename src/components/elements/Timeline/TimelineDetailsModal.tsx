import React from 'react'
import { useDeleteTimelineMutation } from '@/redux/api/timelineApi'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Task Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Task title: {clickedEvent?.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Start date: {clickedEvent?.start.toLocaleTimeString()}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          End date: {clickedEvent?.end.toLocaleTimeString()}
        </Typography>
        <div style={{ marginTop: 20 }}>
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
            style={{ marginLeft: 10 }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default TimelineDetailsModal
