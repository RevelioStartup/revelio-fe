'use client'

import { Box } from '@mui/material'
import { useGetVenueListQuery } from '@/redux/api/venueApi'
import { VenueCard } from '../VenueCard'

interface VenueListProps {
  eventId: string
}

export const VenueList = ({ eventId }: VenueListProps) => {
  const { data: venues = [] } = useGetVenueListQuery(eventId)
  return (
    <Box>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </Box>
  )
}

export default VenueList
