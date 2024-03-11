'use client'
import React from 'react'
import { Box } from '@mui/material'
import {
  useAddPhotoMutation,
  useCreateVenueMutation,
} from '@/redux/api/venueApi'
import { CreateVenueRequest } from '@/types/venue'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'
import { Select } from '@/components/elements/Forms/select'

type VenueCreateFormProps = {}

export const VenueCreateForm: React.FC<VenueCreateFormProps> = () => {
  const [createVenue] = useCreateVenueMutation()
  const [addPhoto] = useAddPhotoMutation()

  const [images, setImages] = React.useState<File[]>([])

  const defaultValues: CreateVenueRequest = {
    status: '',
    address: '',
    name: '',
    event: 'cfa26386-c1ed-465e-a035-36478db57d4b',
    price: 0,
    photos: [],
    contact_name: '',
    contact_phone_number: '',
  }

  const methods = useForm<CreateVenueRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<CreateVenueRequest> = async (data) => {
    const response = await createVenue(data).unwrap()
    console.log('woop woop 1')
    if (response && response.id) {
      const venueId = response.id
      console.log('woop woop 2')
      for (const image of images) {
        await addPhoto({ venue: venueId, image }).unwrap()
        console.log('woop woop image')
      }

      reset()
      setImages([])
    }
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  return (
    <Box className="bg-teal-50 m-6 p-6 rounded-2xl">
      <form data-testid="venue-create-form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-2 gap-8">
          <Box>
            <h1 className="text-xl font-bold m-2">Venue Details</h1>
            <Input
              name="name"
              data-testid="input-venue-name"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Venue Name"
            />
            <Input
              name="address"
              data-testid="input-address"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Address"
            />
            <Input
              name="price"
              data-testid="input-price"
              className="text-sm bg-white text-gray-500 rounded-2xl mt-2 mb-5 p-3 w-full"
              control={control}
              placeholder="Price"
              type="number"
            />
            <h1 className="text-xl font-bold m-2">Images</h1>
            <input
              data-testid="input-images"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              type="file"
              name="files[]"
              multiple
              onChange={handleImageChange}
            />
          </Box>
          <Box className="">
            <h1 className="text-xl font-bold m-2">Contact Information</h1>
            <Input
              name="contact_name"
              data-testid="input-contact-name"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Contact Name"
            />
            <Input
              name="contact_phone_number"
              data-testid="input-contact-phone-number"
              className="text-sm bg-white text-gray-500 rounded-2xl mt-2 mb-20 p-3 w-full"
              control={control}
              placeholder="Contact Phone Number"
              type="tel"
            />
            <h1 className="text-xl font-bold m-2">Status</h1>
            <Select
              name="status"
              data-testid="input-status"
              className="text-sm bg-white text-gray-900 rounded-2xl my-2 p-3.5 w-full"
              control={control}
              options={[
                { label: 'None', value: 'NONE' },
                { label: 'Pending', value: 'PENDING' },
                { label: 'Waitlist', value: 'WAITLIST' },
                { label: 'Confirmed', value: 'CONFIRMED' },
                { label: 'Cancelled', value: 'CANCELLED' },
              ]}
              placeholder="Status"
            />
            <Box className="flex justify-end w-full">
              <button
                type="submit"
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl mt-8 p-3"
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
