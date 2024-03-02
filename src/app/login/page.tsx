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
import {
  useLoginMutation,
  useSendRecoverPasswordEmailMutation,
} from '@/redux/api/authApi'
import Link from 'next/link'

type LoginFormType = {
  username: string
  password: string
}

type RecPassFormType = {
  email: string
}

export default function LoginPage() {
  const defaultValues: LoginFormType = {
    username: '',
    password: '',
  }

  const defaultValuesRecPass: RecPassFormType = {
    email: '',
  }

  const [open, setOpen] = useState(false)
  const [openPrompt, setOpenPromt] = useState(false)
  const [openPromptLogin, setOpenPromptLogin] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')

  const [login] = useLoginMutation()
  const [sendEmail] = useSendRecoverPasswordEmailMutation()

  const methods = useForm<LoginFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const methodsRecPass = useForm<RecPassFormType>({
    defaultValues: defaultValuesRecPass,
  })
  const { control: controlRecPass, handleSubmit: handleSubmitRecPass } =
    methodsRecPass

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

  const onSubmitRecPass: SubmitHandler<RecPassFormType> = async (data) => {
    await sendEmail({ ...data }).then((res) => {
      console.log(res)
      if (res) {
        if ('data' in res) {
          setMessage('An email has been sent to your email account.')
          setOpenPromt(true)
          setTitle('Account Recovery')
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

  const handleRecoverPasswordClick = () => {
    setOpen(true)
  }

  const handleCloseAccRecovery = () => {
    setOpen(false)
  }

  return (
    <Box
      data-testid="login"
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
      <Box sx={{ flex: 1, textAlign: 'left' }} data-testid="login-title">
        <Typography variant="h3" fontWeight={'bold'}>
          Log In to Plan Your Event
        </Typography>
        <Typography fontWeight={'bold'}>
          If you do not have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/register">
            Register Here
          </Link>
        </Typography>
      </Box>

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
        <button type="submit" className="bg-teal-50">
          Log In
        </button>
      </form>

      <Dialog
        open={open}
        onClose={handleCloseAccRecovery}
        data-testid="login-dialog-recover"
      >
        <DialogTitle>Account Recovery</DialogTitle>
        <DialogActions>
          <div className="flex flex-col gap-3" style={{ flex: 1 }}>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmitRecPass(onSubmitRecPass)}
              data-testid="recover-account-form"
            >
              <Input
                control={controlRecPass}
                name="email"
                rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  }}
                required
                placeholder="Enter email"
                data-testid="email-input"
              />
              <button type="submit" data-testid="button-submit-email">
                Send Recovery Email
              </button>
            </form>
            <button
              data-testid="close-acc-rec-form"
              onClick={handleCloseAccRecovery}
            >
              Close
            </button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openPrompt} data-testid="login-dialog-email-send-msg">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Link href={'/login/recover-account'}>Continue</Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPromptLogin}
        data-testid="login-dialog-success-login-msg"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Link href={'/'}>Continue</Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        data-testid="recover-dialog-error-msg"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <button data-testid="button-error" onClick={handleClosePopup}>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
