'use client'

import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Chip,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import { useGetProfileQuery, useGetEventsQuery } from '@/redux/api/profileApi'
import { logout } from '@/redux/features/userSlice'
import { SubscriptionHistory } from './SubscriptionHistory'
import { useGetSubscriptionsQuery } from '@/redux/api/subscriptionApi'
import { SubscriptionHistoryResponse } from '@/types/subscription'

type ChipType = 'event' | 'history'

export default function Profile() {
  const [openPopup, setOpenPopup] = useState(false)
  const [chipType, setChipType] = React.useState<ChipType>('event')
  const { data, isLoading, isError } = useGetProfileQuery()
  const { data: events } = useGetEventsQuery()
  const dispatch = useDispatch()

  const { data: subscriptionHistory } = useGetSubscriptionsQuery()

  const CHIP_STYLE = '!font-bold !p-5 !border-none'

  const CHIP_STYLE_ACTIVE = CHIP_STYLE + ' ' + '!bg-teal-600 !text-teal-50'

  const CHIP_STYLE_INACTIVE = CHIP_STYLE + ' ' + '!bg-teal-50 !text-teal-400'

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <div data-testid="loader" className="loader"></div>
      </div>
    )

  if (isError || !data) return <div>Error loading profile</div>

  const { user, profile } = data

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box display={'flex'} gap={'1em'}>
        {['event', 'history'].map((type) => (
          <Chip
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            data-testid={type}
            className={
              chipType === type ? CHIP_STYLE_ACTIVE : CHIP_STYLE_INACTIVE
            }
            onClick={() => setChipType(type as 'event' | 'history')}
          />
        ))}
      </Box>
      <Box component="section" className="flex flex-wrap lg:flex-nowrap w-full">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          alignItems={'center'}
          justifyContent={'center'}
          padding={{ xs: '2em 2em', lg: '4em 6em' }}
        >
          <h1 className="text-5xl font-bold mb-5">Your Profile</h1>
          <Avatar
            alt="Profile Picture"
            src={profile.profile_picture || '/path/to/default/image'} // Fallback to a default image if null
            sx={{ width: 181, height: 181 }}
          />
          <p className="font-bold text-3xl mt-5">{user.username}</p>
          <p className="font-bold text-xl mt-3 md:mt-6">{user.email}</p>
          <p className="font-bold text-xl mt-3 md:mt-6">
            {profile.bio || 'No bio provided'}
          </p>
          <p className="font-bold text-3xl mt-8 md:mt-14 text-teal-400">
            PREMIUM
          </p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
            gap={'0.5em'}
            alignItems={'center'}
            justifyContent={'center'}
            padding={{ xs: '2em 2em', lg: '4em 6em' }}
          >
            <Link href="/profile/change-profile">
              <Button variant="primary" className="w-72">
                Change Profile
              </Button>
            </Link>
            <Link href="/profile/change-password">
              <Button variant="primary" className="w-72">
                Change Password
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-32"
              data-testid="logout-button"
              onClick={handleOpenPopup}
            >
              Logout
            </Button>
            <Dialog
              open={openPopup}
              onClose={handleClosePopup}
              data-testid="logout-dialog"
            >
              <DialogTitle>Log Out</DialogTitle>
              <DialogContent>
                <p>Are you sure you want to log out?</p>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="ghost"
                  size="small"
                  data-testid="button-yes"
                  onClick={handleLogout}
                >
                  Yes
                </Button>
                <Button
                  size="small"
                  data-testid="button-close"
                  onClick={handleClosePopup}
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        {chipType === 'event' ? (
          <Box
            component="section"
            className="flex flex-wrap gap-3 w-full overflow-y-auto h-[calc(100vh-80px)]"
            padding={{ xs: '2em 2em', lg: '4em 6em' }}
          >
            <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
              Your Events
            </h2>
            {events && events.length > 0 ? (
              events.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '40%',
                    width: '100%',
                    maxWidth: '600px',
                    padding: '1rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    mb: '1rem',
                    bgcolor: '#0D9488',
                  }}
                  className="mx-auto"
                >
                  <Box sx={{ mb: '0.5rem' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        color: 'white',
                      }}
                    >
                      {event.name}
                    </h3>
                  </Box>
                  <Box sx={{ flexGrow: 0, mb: '0.5rem', color: 'white' }}>
                    <p style={{ margin: 0 }}>{event.date}</p>
                    <p style={{ margin: 0 }}>{event.budget}</p>
                    <p style={{ margin: 0 }}>{event.objective}</p>
                  </Box>
                  <Link
                    href={`/event/${event.id}`}
                    className="flex justify-end"
                  >
                    <Button
                      variant="ghost"
                      className="w-32 lg:w-56 bg-white h-10"
                    >
                      See Details
                    </Button>
                  </Link>
                </Box>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </Box>
        ) : subscriptionHistory ? (
          <SubscriptionHistory
            data={subscriptionHistory}
          />
        ) : (
          subscriptionHistory ? (
            <SubscriptionHistory
              data={subscriptionHistory}
            />
          ) : (
            <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
              No Records Found.
            </h2>
          )
        )}
      </Box>
    </Box>
  )
}
