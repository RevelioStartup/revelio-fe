'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, Box, Button, styled } from '@mui/material'
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from '@/redux/api/profileApi'
import { useDispatch } from 'react-redux'
import { setProfile } from '@/redux/features/profileSlice'
import { Button as ButtonVariants } from '@/components/elements/Button'
import { Input } from '@/components/elements/Forms/input'
import { useRouter } from 'next/navigation'

const ChangeProfile = () => {
  const dispatch = useDispatch()
  const { data: profileData } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      bio: '',
    },
  })

  const router = useRouter()
  const profilePictureRef = useRef<HTMLInputElement>(null)
  const [profilePicPreview, setProfilePicPreview] = useState('')

  useEffect(() => {
    // Set bio value if profile data is available
    if (profileData && profileData.profile.bio) {
      setValue('bio', profileData.profile.bio)
    }
  }, [profileData, setValue])

  const onProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setProfilePicPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data: { bio: string | Blob }) => {
    const formData = new FormData()

    if (
      profilePictureRef.current &&
      profilePictureRef.current.files &&
      profilePictureRef.current.files[0]
    ) {
      formData.append('profile_picture', profilePictureRef.current.files[0])
    } else {
      console.log('File is missing')
    }

    formData.append('bio', data.bio)

    try {
      const updatedProfileResponse = await updateProfile(formData).unwrap()

      // Update profile data in Redux state
      if (profileData) {
        dispatch(
          setProfile({
            user: {
              id: profileData.user.id,
              username: profileData.user.username,
              email: profileData.user.email,
            },
            profile: {
              bio: updatedProfileResponse.bio,
              profile_picture: updatedProfileResponse.profile_picture,
            },
          })
        )
        reset()
        router.push('/profile')
        console.error('Profile data is not available for updating the state')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ xs: '6em 2em', lg: '6em 12em' }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-5 text-center">
        Change Profile
      </h1>
      {/* <Avatar src={profilePicPreview} sx={{ width: 181, height: 181 }} /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
      >
        <Box className="mb-8 flex flex-col justify-center">
          <Button sx={{ borderRadius: '50%' }} component="label">
            Upload Profile Picture
            <VisuallyHiddenInput
              ref={profilePictureRef}
              type="file"
              name="profile_picture"
            />
          </Button>
        </Box>
        <Input
          control={control}
          name="bio"
          placeholder="Enter bio"
          className="w-72 h-14 md:w-[400px] text-base md:text-xl mx-auto"
        />
        <ButtonVariants
          variant="primary"
          type="submit"
          className="w-72 h-14 md:w-[400px] text-xl font-bold mx-auto mt-12"
        >
          Update Profile
        </ButtonVariants>
      </form>
    </Box>
  )
}

export default ChangeProfile
