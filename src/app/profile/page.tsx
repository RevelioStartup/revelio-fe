'use client'

import { Avatar, Box, Dialog,
  DialogTitle,
  DialogActions,
  DialogContent, } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import { useGetProfileQuery, useGetEventsQuery } from '@/redux/api/profileApi'
import { logout } from '@/redux/features/userSlice'

export default function Profile() {
  const [openPopup, setOpenPopup] = useState(false)
  const { data, isLoading, isError } = useGetProfileQuery()
  const { data: events } = useGetEventsQuery()
  const dispatch = useDispatch()

  if (isLoading) return <div>Loading...</div>
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
        width: '100%',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
      <h1 className="text-5xl font-bold mb-5">Your Profile</h1>
      <Avatar
        alt="Profile Picture"
        src={profile.profile_picture || '/path/to/default/image'} // Fallback to a default image if null
        sx={{ width: 181, height: 181 }}
      />
      <p className="font-bold text-3xl mt-5">{user.username}</p>
      <p className="font-bold text-xl mt-8 md:mt-14">{user.email}</p>
      <p className="font-bold text-xl mt-8 md:mt-14">
        {profile.bio || 'No bio provided'}
      </p>
      <p className="font-bold text-3xl mt-8 md:mt-14 text-teal-400">PREMIUM</p>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        gap={'0.5em'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={{ xs: '4em 2em', lg: '4em 12em' }}
      >
        <Link href="/profile/change-profile">
          <Button>Change Profile</Button>
        </Link>
        <Link href="/profile/change-password">
          <Button variant="secondary">Change Password</Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleOpenPopup}
          data-testid="logout-button"
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
      <hr className="border border-slate-500 w-full mb-6" />
      {/* <h2 className="text-3xl md:text-5xl text-left w-full font-bold">
        Your Events
      </h2> */}
      <Box component="section" className="flex flex-wrap gap-3 w-full">
        <h2 className="text-3xl md:text-5xl text-left w-full font-bold">
          Your Events
        </h2>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Box
              key={event.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '400px', // Adjust the width as needed
                padding: '1rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                mb: '1rem', // Add margin bottom for spacing between events
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ mb: '0.5rem' }}>
                <h3
                  style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem' }}
                >
                  {event.name}
                </h3>
              </Box>
              <Box sx={{ flexGrow: 1, mb: '0.5rem' }}>
                <p style={{ margin: 0 }}>{event.date}</p>
                <p style={{ margin: 0 }}>{event.budget}</p>
                <p style={{ margin: 0 }}>{event.objective}</p>
              </Box>
              <Link href={`/event/${event.id}`}>
                <Button className="w-full">See Details</Button>
              </Link>
            </Box>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </Box>
    </Box>
  )
}
