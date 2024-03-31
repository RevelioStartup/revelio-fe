'use client'

import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
} from '@mui/material'
import { useGetProfileQuery } from '@/redux/api/profileApi'
import {
  useSendChangePasswordMutation,
  useSendRecoverPasswordEmailMutation,
} from '@/redux/api/authApi'
import { Button } from '@/components/elements/Button'

interface FormData {
  newPassword: string
  token?: string
}

interface ChangePasswordProps {
  initialStep?: number
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ initialStep = 1 }) => {
  const { control, handleSubmit } = useForm<FormData>()
  const [step, setStep] = useState(initialStep) 
  const { data: profileData, isLoading, isError } = useGetProfileQuery()
  const [sendRecoverPasswordEmail] = useSendRecoverPasswordEmailMutation()
  const [sendChangePassword, { isSuccess }] = useSendChangePasswordMutation()
  const [openDialog, setOpenDialog] = useState(false)

  const requestToken = async (email: string) => {
    try {
      await sendRecoverPasswordEmail({ email }).unwrap()
      setStep(2)
      setOpenDialog(true)
    } catch (error) {
      console.error('Failed to send email')
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isLoading || isError) {
      console.error(
        'Profile data is either loading or has encountered an error.'
      )
      return
    }

    if (profileData && step === 1) {
      await requestToken(profileData.user.email)
    } else if (profileData && step === 2 && data.token) {
      await sendChangePassword({
        email: profileData.user.email,
        token: data.token,
        new_password: data.newPassword,
      })
      if (isSuccess) {
        window.location.assign('/login') 
      }
    }
  }

  if (isLoading) {
    return <div>Loading your profile information...</div>
  }

  if (isError) {
    return (
      <div>
        Error fetching your profile information. Please try again later.
      </div>
    )
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ xs: '6em 2em', lg: '6em 12em' }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
      >
        {step === 2 && (
          <Controller
            name="token"
            control={control}
            defaultValue=""
            rules={{ required: 'Token is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Token"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{ required: 'New password is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="password"
              label="New Password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              className="w-[250px] md:w-[400px] h-[50px]"
            />
          )}
        />
        <Button type="submit" className="w-full mt-3">
          {step === 1 ? 'Send Reset Token' : 'Change Password'}
        </Button>
      </form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Email Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An email has been sent to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog}>Close</MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ChangePassword
