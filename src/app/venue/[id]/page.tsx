import { VenueDetailModule } from './VenueDetailModule'

export default function VenuePage({ params }: { params: { id: string } }) {
  return <VenueDetailModule id={params.id} />
}
