'use client'
import { Box } from '@mui/material'
import { GalleryPage } from '../GalleryPage'
import { VendorCard } from '../VendorCard'
import { useGetVendorDetailQuery } from '@/redux/api/vendorApi'

interface VenueDetailModuleProps {
  id: string
}
export const VenueDetailModule = ({ id }: VenueDetailModuleProps) => {
  const { data, isLoading } = useGetVendorDetailQuery({ id: parseInt(id) })
  return (
    <Box>
      {isLoading ? (
        <>
          <div className="skeleton relative h-10 w-full shrink-0 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
          <div className="skeleton relative h-10 w-full shrink-0 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
          <div className="skeleton relative h-10 w-full shrink-0 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
        </>
      ) : (
        !!data && (
          <>
            <VendorCard vendor={data} />
            <GalleryPage photos={data.photos} />
          </>
        )
      )}
    </Box>
  )
}
