'use client'
import { useState } from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSendChangePasswordMutation } from '@/redux/api/authApi'
import { Input } from '@/components/elements/Forms/input'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'

type ChangePassFormType = {
  token: string
  new_password: string
  email: string
}

export default function AccountRecoveryForm() {
  const defaultValues: ChangePassFormType = {
    token: '',
    new_password: '',
    email: '',
  }

  const [openPrompt, setOpenPrompt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const [changePass] = useSendChangePasswordMutation()

  const methods = useForm<ChangePassFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<ChangePassFormType> = async (data) => {
    await changePass({ ...data }).then((res) => {
      if (res) {
        if ('data' in res) {
          setOpenPrompt(true)
          setMessage('Success! Please Log In with your new password.')
          setDialogTitle('Account Recovery')
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
      data-testid="recover"
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
        data-testid="recover-form"
      >
        <Typography fontWeight={'bold'} variant="h3" align="center">
          Account Recovery
        </Typography>
        <Typography fontWeight={'bold'} align="center">
          Please Enter Your Email, Token Sent to Your Email, and Your New
          Password
        </Typography>
        <Input
          control={control}
          name="email"
          placeholder="Enter Email"
          required
          data-testid="email-input"
        />
        <Input
          control={control}
          name="token"
          placeholder="Enter token"
          required
          data-testid="token-input"
        />
        <Input
          type="password"
          control={control}
          name="new_password"
          placeholder="Enter new password"
          required
          data-testid="password-input"
        />
        <Button type="submit">Recover Account</Button>
      </form>

      <Dialog open={openPrompt} data-testid="recover-login-redirect-msg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Link href={'/login'}>Continue</Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopUP}
        data-testid="recover-dialog-error-msg"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'ghost'}
            size={'small'}
            data-testid="button-error"
            onClick={handleClosePopUP}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
