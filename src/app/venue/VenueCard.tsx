'use client'
'@/components/elements/Iconify'

import { useDeleteVenueMutation } from '@/redux/api/venueApi'
import { Venue } from '@/types/venue'
import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface VenueCardProps {
  venue: Venue
  isDetail?: boolean
}
export const VenueCard = ({ venue, isDetail }: VenueCardProps) => {
  const {
    id,
    name,
    price,
    address,
    photos,
    status,
    contact_name,
    contact_phone_number,
  } = venue

  const [deleteVenue] = useDeleteVenueMutation()
  return (
    <Box
      data-testid="venue-card"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2em',
        margin: '4em',
        border: '1px solid #64748B',
        borderRadius: '20px',
        alignItems: 'flex-start',
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
          <button className="mr-1 p-1">
            <i className="i-ph-pencil-bold text-blue-500 size-5" />
          </button>
          <button
            onClick={() => {
              deleteVenue({ id })
            }}
          >
            <i className="i-ph-trash-simple-bold text-red-500 size-5" />
          </button>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'top',
          gap: '4em',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box className="my-4 flex items-center">
            <i className="i-ph-address-book-bold text-black size-5" />
            <p className="text-md ml-2">{address}</p>
          </Box>
          <Box className="my-4 flex items-center">
            <i className="i-ph-currency-dollar-bold text-black size-5" />
            <p className="text-md ml-2">{price}</p>
          </Box>
          <Box className="my-4 flex items-center">
            <p className="text-md">Status</p>
            <Box className="border border-teal-400 rounded-lg px-8 m-2">
              <p className="text-md">{status}</p>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="my-4 flex items-center">
            <i className="i-ph-user-bold text-black size-5" />
            <p className="text-md ml-2">{contact_name}</p>
          </Box>
          <Box className="my-4 flex items-center">
            <i className="i-ph-phone-bold text-black size-5" />
            <p className="text-md ml-2">{contact_phone_number}</p>
          </Box>
        </Box>

        {!isDetail && photos.length > 0 && (
          <Box sx={{ flex: 1, flexDirection: 'column' }}>
            <Image
              src={photos[0].image}
              alt="Photo"
              className="w-1/2 h-1/2 border border-gray-300"
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
