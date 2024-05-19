'use client'
import React from 'react'
import { Box } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'
import { Select } from '@/components/elements/Forms/select'
import {
  useAddPhotoVendorMutation,
  useCreateVendorMutation,
} from '@/redux/api/vendorApi'
import { CreateVendorRequest } from '@/types/vendor'
import { Button } from '@/components/elements/Button'

interface VendorCreateFormProps {
  eventId: string
}

export const VendorCreateForm = ({ eventId }: VendorCreateFormProps) => {
  const [createVendor] = useCreateVendorMutation()
  const [addPhoto] = useAddPhotoVendorMutation()

  const [images, setImages] = React.useState<File[]>([])

  const defaultValues: CreateVendorRequest = {
    status: '',
    address: '',
    name: '',
    event: eventId,
    price: 0,
    photos: [],
    contact_name: '',
    contact_phone_number: '',
  }

  const methods = useForm<CreateVendorRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<CreateVendorRequest> = async (data) => {
    await createVendor(data).then(async (response) => {
      if ('data' in response) {
        if (response.data && response.data.id) {
          const vendorId = response.data.id
          for (const image of images) {
            await addPhoto({ vendor: vendorId, image })
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
      <form data-testid="vendor-create-form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-2 gap-8">
          <Box>
            <h1 className="text-xl font-bold m-2">Vendor Details</h1>
            <Input
              required
              name="name"
              data-testid="input-vendor-name"
              className="text-sm bg-white text-gray-500 rounded-2xl my-2 p-3 w-full"
              control={control}
              placeholder="Vendor Name"
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
              <Button type="submit">Add Vendor</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default VendorCreateForm
