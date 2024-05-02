import { Box } from '@mui/material'
import React from 'react'
import RundownTable from './RundownTable'

interface EventRundownProps {
  eventId: string
}

export const Rundown = ({ eventId }: EventRundownProps) => {
  return (
    <Box>
      <RundownTable eventId={eventId} />
    </Box>
  )
}
