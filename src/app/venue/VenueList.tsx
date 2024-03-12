'use client'

import { Box } from '@mui/material'
import { useGetVenueListQuery } from '@/redux/api/venueApi'
import { VenueCard } from './VenueCard'

interface VenueListProps {
  eventId: string
}

export const VenueList = ({ eventId }: VenueListProps) => {
  const { data: venues = [] } = useGetVenueListQuery(eventId)
  return (
    <Box>
      {venues.map((venue, index) => (
        <VenueCard key={venue.id} venue={venue} data-testid="venue-card" />
      ))}
    </Box>
  )
}

export default VenueList
