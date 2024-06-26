export type VenuePhoto = {
  id: string
  venue: number
  image: string
}
export type Venue = {
  id: number
  name: string
  address: string
  price: number
  status: string
  contact_name: string
  contact_phone_number: string
  photos: VenuePhoto[]
  event: string
}

export type VenueListResponse = Venue[]
export type VenueListRequest = string
export type CreateVenueRequest = Omit<Venue, 'id'>
export type CreateVenueResponse = Venue
export type UpdateVenueRequest = {
  id: number
  name: string
  address: string
  price: number
  status: string
  contact_name: string
  contact_phone_number: string
  event: string
}
export type VenueDetailRequest = {
  id: number
}
export type VenueDetailResponse = Venue

export type AddPhotoRequest = {
  venue: number
  image: File
}
export type DeletePhotoRequest = {
  photo: VenuePhoto
}
