import { Box } from '@mui/material'
import { CreateRundownButton } from './CreateRundownButton'
import React from 'react'
import RundownTable from './RundownTable'

interface EventRundownProps {
  eventId: string
}

export const Rundown = ({ eventId }: EventRundownProps) => {
  return (
    <Box>
      <RundownTable eventId={eventId} />
      <CreateRundownButton data-testid="create-rundown-button" />
    </Box>
  )
}
