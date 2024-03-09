'use client '
import { Box } from '@mui/material'
import { VenueCard } from '../VenueCard'
import { VenueCreateForm } from '../VenueCreateForm'
import { GalleryPage } from '../GalleryPage'
import { useGetVenueDetailQuery } from '@/redux/api/venueApi'

interface VenueDetailModuleProps {
  id: string
}
export const VenueDetailModule = ({ id }: VenueDetailModuleProps) => {
  const { data, isLoading } = useGetVenueDetailQuery({ id: parseInt(id) })
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
            <VenueCard venue={data} />
            <VenueCreateForm />
            <GalleryPage />
          </>
        )
      )}
    </Box>
  )
}
