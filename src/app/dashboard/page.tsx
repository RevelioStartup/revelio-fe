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
import {
  useGetProfileQuery,
  useGetEventsQuery,
  useDeleteEventMutation,
} from '@/redux/api/profileApi'
import { logout } from '@/redux/features/userSlice'
import { SubscriptionHistory } from './SubscriptionHistory'
import {
  useGetLatestSubscriptionQuery,
  useGetSubscriptionsQuery,
} from '@/redux/api/subscriptionApi'
import { CHIP_STYLE_ACTIVE, CHIP_STYLE_INACTIVE } from './constant'
import { TransactionHistory } from './TransactionHistory'
import { useSearchParams } from 'next/navigation'
import { LoadingButton } from '@mui/lab'

type ChipType = 'event' | 'history'

export default function Profile() {
  const searchParams = useSearchParams()
  const [openPopup, setOpenPopup] = useState(false)
  const [chipType, setChipType] = React.useState<ChipType>(
    (searchParams.get('tab') as ChipType) ?? 'event'
  )
  const { data, isLoading, isError } = useGetProfileQuery()
  const {
    data: events,
    isLoading: isLoadingGetEvent,
    isFetching: isRefetchingGetEvent,
  } = useGetEventsQuery()
  const dispatch = useDispatch()

  const { data: latestSubscription } = useGetLatestSubscriptionQuery()
  const { data: subscriptionHistory } = useGetSubscriptionsQuery()

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation()

  if (isLoading || isLoadingGetEvent || isRefetchingGetEvent)
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

  const renderSubscriptionHistory = () => {
    if (!subscriptionHistory) {
      return <h2>No Records Found.</h2>
    }

    return <SubscriptionHistory data={subscriptionHistory} />
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
            onClick={() => setChipType(type as ChipType)}
          />
        ))}
      </Box>
      <Box
        component="section"
        className="flex flex-wrap justify-center lg:flex-nowrap w-full"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
          alignItems={'center'}
          justifyContent={'center'}
          padding={{ xs: '2em 2em', lg: '4em 6em' }}
        >
          <h1 className="text-5xl font-bold mb-5 text-center">Your Profile</h1>
          <Avatar
            alt="Profile Picture"
            src={profile.profile_picture || '/path/to/default/image'} // Fallback to a default image if null
            sx={{ width: 181, height: 181 }}
          />
          <p className="font-bold text-3xl mt-5">{user.username}</p>
          <p className="font-bold text-xl mt-3 md:mt-6">{user.email}</p>
          <p className={'font-bold text-lg mt-3 md:mt-6'}>
            {profile.bio || 'No bio provided'}
          </p>
          {latestSubscription && (
            <p className="font-bold text-3xl mt-8 md:mt-14 text-teal-400">
              {latestSubscription?.plan.name}
            </p>
          )}
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
            <Link href="/dashboard/change-profile">
              <Button variant="primary" className="w-72">
                Change Profile
              </Button>
            </Link>
            <Link href="/dashboard/change-password">
              <Button variant="primary" className="w-72">
                Change Password
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-72 border-red-500 text-red-500"
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
            className="flex flex-wrap gap-3 w-full overflow-y-auto md:max-h-[calc(100vh-80px)] h-fit"
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
                    justifyContent: 'space-between',
                  }}
                  className="mx-auto"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
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
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row-reverse',
                      },
                      alignItems: 'center',
                      gap: '1rem',
                      justifyContent: 'space-between',
                    }}
                  >
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
                    <LoadingButton
                      loading={isDeleting}
                      loadingIndicator="Deleting..."
                      className="w-32 lg:w-56 h-10 !bg-red-500 !text-white !rounded-xl"
                      onClick={() => {
                        deleteEvent({
                          eventId: event.id,
                        })
                      }}
                      data-testid="delete-event"
                    >
                      Delete Event
                    </LoadingButton>
                  </Box>
                </Box>
              ))
            ) : (
              <p className="text-center w-full">No events found.</p>
            )}
          </Box>
        ) : (
          <div className="flex flex-col justify-start gap-2 px-4 md:px-0">
            {renderSubscriptionHistory()}
            <TransactionHistory />
          </div>
        )}
      </Box>
    </Box>
  )
}
