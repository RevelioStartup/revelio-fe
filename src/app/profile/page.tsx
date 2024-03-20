'use client'

import { Avatar, Box } from '@mui/material'

import React from 'react'
import { useGetProfileQuery } from '@/redux/api/profileApi'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'

export default function Profile() {
  const { data, isLoading, isError } = useGetProfileQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error loading profile</div>
  const { user, profile } = data

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
        <Link href="#logout">
          <Button variant="danger">Logout</Button>
        </Link>
      </Box>
      <hr className="border border-slate-500 w-full mb-6" />
      <h2 className="text-3xl md:text-5xl text-left w-full font-bold">
        Your Events
      </h2>
    </Box>
  )
}
