"use client";
'@/components/elements/Iconify'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const VenueCard = () => {
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
            width: '60em',
            borderRadius: '20px',
            alignItems: 'flex-start',
        }}
    >
        <Box sx={{ flex: 1 }}>
            <h1 className='text-2xl font-bold mb-2'>Title</h1>
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
                    <i className="i-ph-pencil-bold text-black size-4" />
                    <p className='text-sm ml-2'>Address</p>
                </Box>
                <Box className="my-4 flex items-center">
                    <i className="i-ph-pencil-bold text-black size-4" />
                    <p className='text-sm ml-2'>Price</p>
                </Box>
                <Box className="my-4 flex items-center">
                    <p className='text-sm'>Status</p>
                    <Box className='border border-teal-400 rounded-lg px-8 m-2'>
                        <p className='text-sm'>Inquiry</p>
                    </Box>
                </Box>
                <button className="mr-1 p-1">
                    <i className="i-ph-pencil-bold text-blue-500 size-4" />
                </button>
                <button className="">
                    <i className="i-ph-trash-simple-bold text-red-500 size-4" />
                </button>
            </Box>
            <Box>
                <Box className="my-4 flex items-center">
                    <i className="i-ph-pencil-bold text-black size-4" />
                    <p className='text-sm ml-2'>Contact Name</p>
                </Box>
                <Box className="my-4 flex items-center">
                    <i className="i-ph-pencil-bold text-black size-4" />
                    <p className='text-sm ml-2'>Contact Phone Number</p>
                </Box>
            </Box>
            <Box sx={{ flex: 1, flexDirection: 'column'}}>
                <div className="flex">
                    <img src="/assets/images/Landingpage-Image.svg" alt="Photo" className="w-1/2 h-1/2 border border-gray-300" />
                    <div className="flex flex-col w-1/2 h-1/2">
                    <img src="/assets/images/Landingpage-Image.svg" alt="Photo" className="w-1/2 h-1/4 border border-gray-300" />
                    <div className="relative w-1/2 h-1/4">
                        <div className="absolute inset-0 bg-gray-800 opacity-75 flex items-center justify-center">
                        <div className="text-white text-sm font-bold">+Show All</div>
                        </div>
                        <img src="/assets/images/Landingpage-Image.svg" alt="Photo" className="w-full h-full" />
                    </div>
                    </div>
                </div>
            </Box>
        </Box>
    </Box>
  )
}
