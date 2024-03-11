import { Box, Icon, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const WhyRevelio = () => {
  return (
    <Box
      data-testid="why-revelio"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2em'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
      <Box className="flex flex-row items-center bg-teal-50 gap-3 text-teal-600 px-3 py-1 rounded-2xl ">
        <i className="i-fa6-regular-eye rounded-full size-5 text-6xl" />
        <p>Why Revelio</p>
      </Box>
      <Typography variant={'h3'} textAlign={'center'}>
        We are committed to revolutionizing and solving problems in event planning
      </Typography>
      <Typography variant={'h6'} sx={{ opacity: 0.5 }} textAlign={'center'}>
        Revelio is meant to make your event planning <u>seamless</u> and <u>enjoyable</u>
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
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <div className="rounded-full bg-blue-50 text-blue-500 p-2 size-10">
            <i className="i-ph-pencil-simple-fill size-6" />
          </div>
          <p className="font-bold">Event creation</p>
          <p>
            Create your events with details such as name, date, time, and
            location. Have option to add event description, agenda, and notes.
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <Image
            src={'/assets/icons/add-task.svg'}
            alt="add task"
            width={40}
            height={40}
            className="rounded-full p-2 bg-red-50 shrink-0"
          />
          <p className="font-bold">Task Management</p>
          <p>
            Use our to-do lists and task management features to help you keep
            track of tasks related to the event.
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <div className="bg-green-50 p-2 rounded-full">
            <Image
              src={'/assets/icons/calendar.svg'}
              alt="calendar"
              width={20}
              height={20}
              className="shrink-0"
            />
          </div>
          <p className="font-bold">
            Progress Tracking with Calendar Integration
          </p>
          <p>
            Integrate your calendars with event dates and progress deadlines.
            Also gives you remainders and notification about it.
          </p>
        </Box>
      </Box>
    </Box>
  )
}
