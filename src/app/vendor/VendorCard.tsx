'use client'
'@/components/elements/Iconify'

import { Box } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/elements/Forms/input'
import { Button } from '@/components/elements/Button'
import { Select } from '@/components/elements/Forms/select'
import GalleryPage from './GalleryPage'
import GalleryPageDelete from './GalleryPageDelete'
import { UpdateVendorRequest, Vendor } from '@/types/vendor'
import {
  useAddPhotoVendorMutation,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} from '@/redux/api/vendorApi'

interface VendorCardProps {
  vendor: Vendor
  isDetail?: boolean
}
export const VendorCard = ({ vendor, isDetail }: VendorCardProps) => {
  const [isEditing, setIsEditing] = React.useState(false)

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev)
  }

  const {
    id,
    name,
    price,
    address,
    photos,
    status,
    contact_name,
    contact_phone_number,
  } = vendor

  const [deleteVendor, { isLoading: isDeleteVendorLoading }] =
    useDeleteVendorMutation()

  const [updateVendor, { isLoading: isUpdateVedorLoading }] =
    useUpdateVendorMutation()

  const [addPhoto, { isLoading: isAddPhotoLoading }] =
    useAddPhotoVendorMutation()

  const [images, setImages] = React.useState<File[]>([])

  const defaultValues: UpdateVendorRequest = {
    ...vendor,
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  const methods = useForm<UpdateVendorRequest>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<UpdateVendorRequest> = async (data) => {
    await updateVendor(data)

    const vendorId = data.id

    images.forEach(async (image) => {
      await addPhoto({ vendor: vendorId, image })
    })

    reset()
    setImages([])

    setIsEditing(false)
  }

  return (
    <Box
      className="mb-8"
      data-testid="vendor-card"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2em',
        border: '1px solid #64748B',
        borderRadius: '20px',
        alignItems: 'flex-start',
        maxWidth: '1000px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <div className="flex justify-end">
          <button
            data-testid="edit-button"
            onClick={() => {
              handleEditToggle()
            }}
            className="mr-1 p-1"
          >
            <i className="i-ph-pencil-bold text-blue-500 size-5" />
          </button>
          <button
            data-testid="delete-button"
            onClick={() => {
              deleteVendor({ id })
            }}
          >
            <i className="i-ph-trash-simple-bold text-red-500 size-5" />
          </button>
        </div>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        data-testid="vendor-card-form"
      >
        <Box className="flex sm:flex-row flex-col">
          <Box className="mr-8">
            <Box className="my-2 flex items-center">
              <i className="i-ph-address-book-bold text-black size-5" />
              {isEditing ? (
                <Input
                  required
                  name="address"
                  data-testid="input-address"
                  className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-3/4 ml-2"
                  control={control}
                  placeholder="Address"
                />
              ) : (
                <p className="text-md ml-4">{address}</p>
              )}
            </Box>
            <Box className="my-2 flex items-center">
              <i className="i-ph-currency-dollar-bold text-black size-5" />
              {isEditing ? (
                <Input
                  required
                  name="price"
                  data-testid="input-price"
                  className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-3/4 ml-2"
                  control={control}
                  placeholder="Price"
                  type="number"
                />
              ) : (
                <p className="text-md ml-4">{price}</p>
              )}
            </Box>
            <Box className="my-2 flex items-center">
              <p className="text-md mr-2 mt-2">Status</p>
              {isEditing ? (
                <Select
                  name="status"
                  data-testid="input-status"
                  className="text-sm bg-gray-300 text-gray-900 m-2 p-3.5 w-full"
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
              ) : (
                <Box className="border border-teal-400 rounded-lg px-8">
                  <p className="text-md">{status}</p>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="">
            <Box className="my-2 flex items-center">
              <i className="i-ph-user-bold text-black size-5" />
              {isEditing ? (
                <Input
                  required
                  name="contact_name"
                  data-testid="input-contact-name"
                  className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-3/4 ml-2"
                  control={control}
                  placeholder="Contact Name"
                />
              ) : (
                <p className="text-md ml-4">{contact_name}</p>
              )}
            </Box>
            <Box className="my-2 flex items-center">
              <i className="i-ph-phone-bold text-black size-5" />
              {isEditing ? (
                <Input
                  required
                  name="contact_phone_number"
                  data-testid="input-contact-phone-number"
                  className="text-sm bg-gray-200 text-gray-500 rounded-2xl w-3/4 ml-2"
                  control={control}
                  placeholder="Contact Phone Number"
                  type="tel"
                />
              ) : (
                <p className="text-md ml-4">{contact_phone_number}</p>
              )}
            </Box>
          </Box>
        </Box>

        {!isDetail && photos.length > 0 && (
          <>
            {!isEditing ? <GalleryPage photos={photos} /> : <Box></Box>}
            {isEditing && (
              <Box>
                <GalleryPageDelete photos={photos} />
              </Box>
            )}
          </>
        )}

        {isEditing && (
          <Box>
            <Box className="my-2 flex sm:flex-row flex-col items-start">
              <p className="text-md mr-2 mb-2 mt-3">Add More Images Here</p>
              <Box
                sx={{ width: '250px' }}
                className="border border-gray-200 rounded-lg"
              >
                <input
                  data-testid="input-images"
                  className="text-smtext-gray-500 rounded-2xl m-2 p-1"
                  type="file"
                  name="files[]"
                  multiple
                  onChange={handleImageChange}
                />
              </Box>
            </Box>
            <Box className="flex justify-end">
              <Button
                type="submit"
                className="text-sm bg-teal-200 text-gray-900 rounded-2xl mt-4 py-3 px-8"
                loading={
                  isAddPhotoLoading ||
                  isDeleteVendorLoading ||
                  isUpdateVedorLoading
                }
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </Box>
  )
}
