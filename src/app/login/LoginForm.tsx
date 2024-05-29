'use client'
import { useState } from 'react'
import { Input } from '@/components/elements/Forms/input'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginMutation } from '@/redux/api/authApi'
import Link from 'next/link'
import AccountRecoveryRequestForm from './AccountRecoveryRequestForm'
import { Button } from '@/components/elements/Button'
import {
  MessageDialog,
  MessageDialogActions,
  MessageDialogContent,
} from '@/components/elements/Dialog/messageDialog'
import { LoadingButton } from '@mui/lab'

type LoginFormType = {
  username: string
  password: string
}

export default function LoginForm() {
  const defaultValues: LoginFormType = {
    username: '',
    password: '',
  }

  const [openPromptLogin, setOpenPromptLogin] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [openForm, setOpenForm] = useState(false)

  const [login, { isLoading }] = useLoginMutation()

  const methods = useForm<LoginFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    await login({ ...data }).then((res) => {
      if (res) {
        if ('data' in res) {
          setMessage('Login success!')
          setOpenPromptLogin(true)
          setTitle('Login')
        } else if ('data' in res.error) {
          const errorData = res.error.data as { msg: string }
          setErrorMessage(errorData.msg)
          setOpenPopup(true)
          setTitle('Error')
        } else {
          setErrorMessage('Unknown Error!')
          setOpenPopup(true)
          setTitle('Error')
        }
      }
    })
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  const handleCloseForm = () => {
    setOpenForm(false)
  }

  const handleRecoverPasswordClick = () => {
    setOpenForm(true)
  }

  return (
    <Box
      data-testid="login-form-box"
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
        data-testid="login-form"
      >
        <Input
          control={control}
          name="username"
          placeholder="Enter username"
          required
          data-testid="username-input"
        />
        <Input
          type="password"
          control={control}
          name="password"
          placeholder="Enter password"
          required
          data-testid="password-input"
        />
        <Typography
          variant="body2"
          align="right"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleRecoverPasswordClick}
          data-testid="recover-account-link"
        >
          Recover Account
        </Typography>
        <Typography align="right">
          If you do not have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/register">
            Register Here
          </Link>
        </Typography>
        <LoadingButton  type="submit" loading = {isLoading} loadingIndicator = {"Logging in..."} 
        className='!bg-teal-600 !hover:bg-teal-500 !rounded-xl !px-5 !py-3' sx={{color: "white"}}>Log In</LoadingButton>
      </form>

      <AccountRecoveryRequestForm
        openForm={openForm}
        onClose={handleCloseForm}
      />

      <MessageDialog
        open={openPromptLogin}
        data-testid="login-dialog-success-login-msg"
        title={title}
      >
        <MessageDialogContent>
          <p>{message}</p>
        </MessageDialogContent>
        <MessageDialogActions>
          <Button>
            <Link href={'/'}>Continue</Link>
          </Button>
        </MessageDialogActions>
      </MessageDialog>

      <MessageDialog
        open={openPopup}
        onClose={handleClosePopup}
        data-testid="recover-dialog-error-msg"
        title={title}
      >
        <MessageDialogContent>
          <p>{errorMessage}</p>
        </MessageDialogContent>
        <MessageDialogActions>
          <Button
            variant="ghost"
            size="small"
            data-testid="button-error"
            onClick={handleClosePopup}
          >
            Close
          </Button>
        </MessageDialogActions>
      </MessageDialog>
    </Box>
  )
}
