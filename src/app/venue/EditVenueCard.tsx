'use client'
'@/components/elements/Iconify'

import { Input } from '@/components/elements/Forms/input'
import { Select } from '@/components/elements/Forms/select'
import {
  useAddPhotoMutation,
  useUpdateVenueMutation,
} from '@/redux/api/venueApi'
import { UpdateVenueRequest, Venue } from '@/types/venue'
import { Box } from '@mui/material'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface VenueCardProps {
  venue: Venue
}
export const VenueCard = ({ venue }: VenueCardProps) => {
  const [updateVenue] = useUpdateVenueMutation()

  const [addPhoto] = useAddPhotoMutation()

  const [images, setImages] = React.useState<File[]>([])

  const defaultValues: UpdateVenueRequest = {
    ...venue,
  }

  const methods = useForm<UpdateVenueRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<UpdateVenueRequest> = async (data) => {
    await updateVenue(data).unwrap()

    const venueId = data.id

    images.forEach(async (image) => {
      await addPhoto({ id: venueId, image })
    })

    reset()
    setImages([])
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-2 gap-8 mb-4">
          <Box>
            <h1 className="text-xl font-bold m-2">Venue Details</h1>
            <Input
              name="name"
              data-testid="input-venue-name"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              control={control}
              placeholder="Venue Name"
            />
            <Input
              name="address"
              data-testid="input-address"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              control={control}
              placeholder="Address"
            />
            <Input
              name="price"
              data-testid="input-price"
              className="text-sm bg-white text-gray-500 rounded-2xl mx-2 mt-2 mb-5 p-3 w-full"
              control={control}
              placeholder="Price"
              type="number"
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
            <Input
              name="contact_name"
              data-testid="input-contact-name"
              className="text-sm bg-white text-gray-500 rounded-2xl m-2 p-3 w-full"
              control={control}
              placeholder="Contact Name"
            />
            <Input
              name="contact_phone_number"
              data-testid="input-contact-phone-number"
              className="text-sm bg-white text-gray-500 rounded-2xl mx-2 mt-2 mb-20 p-3 w-full"
              control={control}
              placeholder="Contact Phone Number"
              type="tel"
            />
            <h1 className="text-xl font-bold m-2">Status</h1>
            <Select
              name="status"
              data-testid="input-status"
              className="text-sm bg-white text-gray-900 rounded-2xl m-2 p-3.5 w-full"
              control={control}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Pending', value: 'pending' },
                { label: 'Waitlist', value: 'waitlist' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Cancelled', value: 'cancelled' },
              ]}
              placeholder="Status"
            />
            <Box className="flex justify-end w-full">
              <button
                type="submit"
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl m-4 p-3 w-1/6"
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
