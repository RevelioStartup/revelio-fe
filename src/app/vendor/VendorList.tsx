'use client'

import { Box } from '@mui/material'

import { useGetVendorListQuery } from '@/redux/api/vendorApi'
import { VendorCard } from './VendorCard'

interface VendorListProps {
  eventId: string
}

export const VendorList = ({ eventId }: VendorListProps) => {
  const { data: venues = [] } = useGetVendorListQuery(eventId)
  return (
    <Box>
      {venues.map((venue) => (
        <VendorCard key={venue.id} vendor={venue} />
      ))}
    </Box>
  )
}

export default VendorList
