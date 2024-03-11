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
import { useVerifyEmailMutation } from '@/redux/api/authApi'
import Link from 'next/link'

type VerifyEmailFormType = {
  token: string
}

export default function VerifyEmailForm() {
  const defaultValues: VerifyEmailFormType = {
    token: '',
  }

  const [verify] = useVerifyEmailMutation()

  const [openPrompt, setOpenPrompt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const methods = useForm<VerifyEmailFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<VerifyEmailFormType> = async (data) => {
    await verify({ ...data }).then((res) => {
      if (res) {
        if ('data' in res) {
          setMessage('Success! Your email is now verified.')
          setOpenPrompt(true)
          setDialogTitle('Email Verification')
        } else if ('data' in res.error) {
          const errorData = res.error.data as { error: string }
          setErrorMessage(errorData.error)
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
    <Box>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        style={{ flex: 1 }}
        data-testid="verify-form"
      >
        <Typography fontWeight={'bold'} variant="h3" align="center">
          Verify Email
        </Typography>
        <Typography fontWeight={'bold'} align="center">
          Please Enter the Token Sent to Your Email
        </Typography>
        <Input
          control={control}
          name="token"
          placeholder="Enter token"
          required
          data-testid="token-input"
        />
        <button type="submit" className="bg-teal-50">
          Verify
        </button>
      </form>

      <Dialog open={openPrompt} data-testid="verify-redirect-success-msg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Link href={'/'}>Continue</Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopUP}
        data-testid="verify-dialog-error-msg"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <button data-testid="button-error" onClick={handleClosePopUP}>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
