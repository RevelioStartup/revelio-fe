'use client'

import { Box } from '@mui/material'

import { useGetVendorListQuery } from '@/redux/api/vendorApi'
import { VendorCard } from './VendorCard'

interface VendorListProps {
  eventId: string
}

export const VendorList = ({ eventId }: VendorListProps) => {
  const { data: vendors } = useGetVendorListQuery(eventId)
  return (
    <Box>
      {vendors?.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
    </Box>
  )
}

export default VendorList
