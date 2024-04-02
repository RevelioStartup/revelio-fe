'use client'
import { useState } from 'react'
import { Input } from '@/components/elements/Forms/input'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginMutation } from '@/redux/api/authApi'
import Link from 'next/link'
import AccountRecoveryRequestForm from './AccountRecoveryRequestForm'
import { Button } from '@/components/elements/Button'

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

  const [login] = useLoginMutation()

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
    console.log(openForm)
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
      padding={{ xs: '4em 4em', lg: '4em 4em' }}
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
        <Typography align="right" >
          If you do not have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/register">
            Register Here
          </Link>
        </Typography>
        <Button type="submit">Log In</Button>
      </form>

      <AccountRecoveryRequestForm
        openForm={openForm}
        onClose={handleCloseForm}
      />

      <Dialog
        open={openPromptLogin}
        data-testid="login-dialog-success-login-msg"
        fullWidth={true}
        maxWidth='sm'
        style={{  padding: '20px', borderRadius: '20px 20px 0 0' }}
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', marginTop:'10px' }}>{title}</DialogTitle>
        <DialogContent style={{ padding: '20px', margin: '10px', fontSize: '20px'}}>
          <p>{message}</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', margin: '10px' }}>
          <Button>
          <Link href={'/'}>Continue</Link>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        data-testid="recover-dialog-error-msg"
        fullWidth={true}
        maxWidth='sm'
        style={{  padding: '20px', borderRadius: '20px 20px 0 0' }}
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', marginTop:'10px' }}>{title}</DialogTitle>
        <DialogContent style={{ padding: '20px', margin: '10px', fontSize: '20px'}}>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', margin: '10px' }}>
          <Button
            variant="ghost"
            size="small"
            data-testid="button-error"
            onClick={handleClosePopup}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
