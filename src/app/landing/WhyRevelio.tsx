import Iconify from '@/components/elements/Iconify'
import { Box, Icon, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const WhyRevelio = () => {
  return (
    <Box
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
        <Iconify
          icon="fa6-regular:eye"
          className="rounded-full size-5 text-6xl"
        />
        <p>Why Revelio</p>
      </Box>
      <Typography variant={'h3'} textAlign={'center'}>
        We are committed to solving these problems and revolutionizing event
        planning.
      </Typography>
      <Typography variant={'h6'} sx={{ opacity: 0.5 }} textAlign={'center'}>
        Our app is designed to simplify and enhance the entire event planning
        experience, providing you with powerful tools to structure, track, and
        manage every aspect of your event seamlessly, all from one central
        platform.
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
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <Iconify
            icon="ph:pencil-simple-fill"
            className="rounded-full bg-blue-50 text-blue-500 size-10 p-2"
          />
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
