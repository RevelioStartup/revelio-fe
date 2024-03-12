"use client"

import { Avatar, Box } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { teal,red } from '@mui/material/colors';
import React from 'react'
import { useGetProfileQuery } from '@/redux/api/profileApi';

export default function Profile() {
  const { data, isLoading, isError } = useGetProfileQuery();

  
    const TealButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(teal[400]),
        backgroundColor: "#2DD4BF",
        '&:hover': {
            backgroundColor: teal[400],
        },
    }))
    const RedButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(red[800]),
        backgroundColor: "#DC2626",
        '&:hover': {
            backgroundColor: red[800],
        },
    }));

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error loading profile</div>;
    const { user, profile } = data;

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
        <h1 className='text-5xl font-bold mb-5'>Your Profile</h1>
        <Avatar
          alt="Profile Picture"
          src={profile.profile_picture || '/path/to/default/image'} // Fallback to a default image if null
          sx={{ width: 181, height: 181 }}
        />
        <p className='font-bold text-3xl mt-5'>{user.username}</p>
        <p className='font-bold text-xl mt-8 md:mt-14'>{user.email}</p>
        <p className='font-bold text-xl mt-8 md:mt-14'>{profile.bio || "No bio provided"}</p>
        <p className='font-bold text-3xl mt-8 md:mt-14 text-teal-400'>PREMIUM</p>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            }}
            gap= {'0.5em'}
            alignItems={'center'}
            justifyContent={'center'}
            padding={{ xs: '4em 2em', lg: '4em 12em' }}
            >
            <TealButton variant="contained" href="/profile/change-profile" sx={{borderRadius: '10px'}} className='w-56 h-12 md:w-[400px] md:h-14 mb-3'>
                Change Profile
            </TealButton>
            <TealButton variant="contained" href="/profile/change-password" sx={{borderRadius: '10px'}} className='w-56 h-12 md:w-[400px] md:h-14 mb-3'>
                Change Password
            </TealButton>
            <RedButton variant="contained" href="#logout" sx={{borderRadius: '10px'}} className='w-56 h-12 md:w-[400px] md:h-14 mb-3'>
                Logout
            </RedButton>
        </Box>
        <hr className='border border-slate-500 w-full mb-6' />
        <h2 className='text-3xl md:text-5xl text-left w-full font-bold'>Your Events</h2>
    </Box>
    )
}
