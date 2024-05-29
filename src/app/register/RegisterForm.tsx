'use client'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useRegisterMutation,
  useLazySendEmailVerficationQuery,
} from '@/redux/api/authApi'
import Link from 'next/link'
import { Input } from '@/components/elements/Forms/input'
import { Button } from '@/components/elements/Button'
import {
  MessageDialog,
  MessageDialogActions,
  MessageDialogContent,
} from '@/components/elements/Dialog/messageDialog'
import { LoadingButton } from '@mui/lab'

type RegisterFormType = {
  username: string
  password: string
  email: string
}

export default function RegisterForm() {
  const defaultValues: RegisterFormType = {
    username: '',
    password: '',
    email: '',
  }

  const [register, {
    isLoading,
  }] = useRegisterMutation()
  const [sendEmail] = useLazySendEmailVerficationQuery()

  const [openPrompt, setOpenPrompt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const methods = useForm<RegisterFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    await register({ ...data }).then((res) => {
      if (res) {
        if ('data' in res) {
          setMessage('An email has been sent to your email account.')
          setOpenPrompt(true)
          setDialogTitle('Email Verification')
          sendEmail()
        } else if ('data' in res.error) {
          const errorData = res.error.data as { msg: string }
          setErrorMessage(errorData.msg)
          setOpenPopup(true)
          setDialogTitle('Error')
        } else {
          setErrorMessage('Unknown Error!')
          setOpenPopup(true)
          setDialogTitle('Error')
        }
      }
    })
  }

  const handleClosePopUP = () => {
    setOpenPopup(false)
  }

  return (
    <Box
      data-testid="register"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: 'calc(100vh - 80px)',
        width: '100%',
      }}
      borderRadius={'0 0 80% 0'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ xs: '4em 0em', lg: '4em 4em' }}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        style={{ flex: 1 }}
        data-testid="register-form"
      >
        <Input
          control={control}
          name="username"
          placeholder="Enter username"
          required
          data-testid="username-input"
        />
        <Input
          control={control}
          name="email"
          placeholder="Enter email"
          required
          data-testid="email-input"
        />
        <Input
          type="password"
          control={control}
          name="password"
          placeholder="Enter password"
          required
          data-testid="password-input"
        />
        <Typography align="right">
          If you already have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/login">
            Log In Here
          </Link>
        </Typography>
        <LoadingButton  type="submit" loading = {isLoading} loadingIndicator = {"Logging in..."} 
        className='!bg-teal-600 !hover:bg-teal-500 !rounded-xl !px-5 !py-3' sx={{color: "white"}}>Register</LoadingButton>
      </form>

      <MessageDialog
        open={openPrompt}
        data-testid="register-verify-email-msg"
        title={dialogTitle}
      >
        <MessageDialogContent>
          <p>{message}</p>
        </MessageDialogContent>
        <MessageDialogActions>
          <Button>
            <Link href={'/register/verify'}>Continue</Link>
          </Button>
        </MessageDialogActions>
      </MessageDialog>

      <MessageDialog
        open={openPopup}
        onClose={handleClosePopUP}
        data-testid="register-dialog-error-msg"
        title={dialogTitle}
      >
        <MessageDialogContent>
          <p>{errorMessage}</p>
        </MessageDialogContent>
        <MessageDialogActions>
          <Button
            size={'small'}
            variant={'ghost'}
            data-testid="button-error"
            onClick={handleClosePopUP}
          >
            Close
          </Button>
        </MessageDialogActions>
      </MessageDialog>
    </Box>
  )
}
