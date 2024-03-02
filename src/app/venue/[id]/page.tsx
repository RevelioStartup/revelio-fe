import { Box } from '@mui/material'
import { VenueCard } from '../VenueCard'
import { VenueCreateForm } from '../VenueCreateForm'
import { GalleryPage } from '../GalleryPage'

export default function Home() {
  return (
    <Box>
      <VenueCard />
      <VenueCreateForm />
      <GalleryPage />
    </Box>
  )
}
