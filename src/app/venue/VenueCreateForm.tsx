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
import { Button } from '@/components/elements/Button'

interface VenueCreateFormProps {
  eventId: string
}

export const VenueCreateForm = ({ eventId }: VenueCreateFormProps) => {
  const [createVenue, { isLoading: isCreateVenueLoading }] =
    useCreateVenueMutation()
  const [addPhoto, { isLoading: isAddPhotoLoading }] = useAddPhotoMutation()

  const [images, setImages] = React.useState<File[]>([])

  const defaultValues: CreateVenueRequest = {
    status: '',
    address: '',
    name: '',
    event: eventId,
    price: 0,
    photos: [],
    contact_name: '',
    contact_phone_number: '',
  }

  const methods = useForm<CreateVenueRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<CreateVenueRequest> = async (data) => {
    await createVenue(data).then(async (response) => {
      if ('data' in response) {
        if (response.data?.id) {
          const venueId = response.data.id
          for (const image of images) {
            await addPhoto({ venue: venueId, image })
            console.log('woop woop image')
          }

          reset()
          setImages([])
        }
      }
    })
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  return (
    <Box className="bg-teal-50 my-4 p-6 rounded-2xl">
      <form data-testid="venue-create-form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-2 gap-8">
          <Box>
            <h1 className="text-xl font-bold m-2">Venue Details</h1>
            <Input
              required
              name="name"
              data-testid="input-venue-name"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Venue Name"
            />
            <Input
              required
              name="address"
              data-testid="input-address"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Address"
            />
            <Input
              required
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
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Box>
          <Box className="">
            <h1 className="text-xl font-bold m-2">Contact Information</h1>
            <Input
              required
              name="contact_name"
              data-testid="input-contact-name"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Contact Name"
            />
            <Input
              required
              name="contact_phone_number"
              data-testid="input-contact-phone-number"
              className="text-sm bg-white text-gray-500 rounded-2xl mt-2 p-3 w-full"
              control={control}
              placeholder="Contact Phone Number"
              type="tel"
            />
            <h1 className="text-xl font-bold m-2 mt-20">Status</h1>
            <Select
              required
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
              <Button
                type="submit"
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl mt-8 p-3"
                loading={isAddPhotoLoading || isCreateVenueLoading}
              >
                Add Venue
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default VenueCreateForm
