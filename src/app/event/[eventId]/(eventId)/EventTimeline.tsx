import Calendar from '@/components/elements/Timeline/Calendar'
import { Box } from '@mui/material'

export const EventTimeline: React.FC<{
  id: string
}> = ({ id}) => {
  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ xs: '2em 2em', lg: '2em 12em' }}
    >
      <hr className="mb-8" />
      <Calendar eventId={id} />
    </Box>
  )
}
