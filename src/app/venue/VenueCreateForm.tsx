'use client'
import React from 'react'
import { Box } from '@mui/material'

type VenueCreateFormProps = {
  onSubmit?: (data: any) => void
}

export const VenueCreateForm: React.FC<VenueCreateFormProps> = ({
  onSubmit,
}) => {
  const [venueName, setVenueName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [contactName, setContactName] = React.useState('')
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState('')
  const [images, setImages] = React.useState<File[]>([])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  return (
    <Box
      data-testid="venue-create-form"
      className="bg-teal-50 m-6 p-6 rounded-2xl"
    >
      <form onSubmit={handleSubmit}>
        <Box className="grid grid-cols-2 gap-8 mb-4">
          <Box>
            <h1 className="text-xl font-bold m-2">Venue Details</h1>
            <input
              data-testid="input-venue-name"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              type="text"
              placeholder="Venue Name"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
            <input
              data-testid="input-address"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              data-testid="input-price"
              className="text-sm bg-white text-gray-500 rounded-2xl mx-2 mt-2 mb-5 p-3 w-full"
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <h1 className="text-xl font-bold m-2">Images</h1>
            <input
              data-testid="input-images"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              type="file"
              name="files[]"
              multiple
              onChange={handleImageChange}
            />
          </Box>
          <Box>
            <h1 className="text-xl font-bold m-2">Contact Information</h1>
            <input
              data-testid="input-contact-name"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              type="text"
              placeholder="Contact Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            <input
              data-testid="input-contact-phone-number"
              className="text-sm bg-white text-gray-500 rounded-2xl mx-2 mt-2 mb-20 p-3 w-full"
              type="text"
              placeholder="Contact Phone Number"
              value={contactPhoneNumber}
              onChange={(e) => setContactPhoneNumber(e.target.value)}
            />
            <h1 className="text-xl font-bold m-2">Status</h1>
            <input
              data-testid="input-status"
              className="text-sm bg-white text-gray-900 rounded-2xl m-2 p-3.5 w-full"
              type="text"
              placeholder="Status"
              value="Pending"
              readOnly
            />
            <Box className="flex justify-end w-full">
              <button
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl m-4 p-3 w-1/6"
                type="submit"
              >
                Add Venue
              </button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default VenueCreateForm
