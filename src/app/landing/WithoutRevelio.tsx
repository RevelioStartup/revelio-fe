'@/components/elements/Iconify'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const WithoutRevelio = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background:
          'linear-gradient(180deg, #FFF 0%, #FFF 42.41%, #CEFBF7 100%)',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2em'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
      <Box className="flex flex-row items-center bg-teal-50 gap-3 text-teal-600 px-3 py-1 rounded-2xl ">
        <i className="i-fa6-regular-eye rounded-full size-5 text-6xl" />
        <p>Without Revelio</p>
      </Box>
      <Typography variant={'h3'} textAlign={'center'}>
        Event Planning Can Be
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
        }}
        alignItems={{ xs: 'center', md: 'stretch' }}
        justifyContent={'center'}
        gap={'2em'}
        padding={'2em'}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'white',
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
          className="rounded-3xl"
        >
          <i className="i-ph-alarm-bold text-black size-20" />

          <p className="font-bold">Time Consuming</p>
          <p>
            Event planning can take up so much time. It involves extensive
            research to select themes, venues, and vendors, along with detailed
            planning of every event aspect.
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'white',
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
          className="rounded-3xl"
        >
          <i className="i-bi-tools text-black size-20" />
          <p className="font-bold">Inefficient Decision-Making</p>
          <p>
            Without an organized structure or intelligent (AI) suggestions,
            making informed decisions about various aspects of event planning
            can be slow and inefficient.
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: 'white',
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
          className="rounded-3xl"
        >
          <Image
            src={'/assets/icons/network.svg'}
            alt="calendar"
            width={100}
            height={100}
            className="shrink-0"
          />

          <p className="font-bold">Lack of Centralization</p>
          <p>
            Traditional methods oftens lack a centralized system to track the
            event, leading to disorganized planning. These challenges can lead
            to events that don&apos;t meet the organizer&apos;s vision or
            guests&apos; expectations.
          </p>
        </Box>
      </Box>
    </Box>
  )
}
