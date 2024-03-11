"use client"

import { Box } from '@mui/material'
import { VenueDetailModule } from './VenueDetailModule'
import {
  useGetVenueListQuery,
} from '@/redux/api/venueApi'
import { VenueCard } from '../VenueCard'

export default function VenuePage({ params }: { params: { id: string } }) {
  
  const { data: venues = [] } = useGetVenueListQuery(params.id)
  return (
    <Box>
      {venues.map((venue) => (
        <VenueCard venue={venue} />
      ))}
      
    </Box>
  )
}
