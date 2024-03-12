export type VendorPhoto = {
  id: string
  vendor: number
  image: string
}

export type Vendor = {
  id: number
  name: string
  address: string
  price: number
  status: string
  contact_name: string
  contact_phone_number: string
  photos: VendorPhoto[]
  event: string
}

export type VendorListResponse = Vendor[]
export type VendorListRequest = string
export type CreateVendorRequest = Omit<Vendor, 'id'>
export type CreateVendorResponse = Vendor
export type UpdateVendorRequest = Vendor
export type VendorDetailRequest = {
  id: number
}
export type VendorDetailResponse = Vendor

export type AddPhotoRequest = {
  vendor: number
  image: File
}

export type DeletePhotoRequest = {
  photo: VendorPhoto
}
