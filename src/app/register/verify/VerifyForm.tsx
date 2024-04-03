'use client'
import { useState } from 'react'
import { Input } from '@/components/elements/Forms/input'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useVerifyEmailMutation } from '@/redux/api/authApi'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'
import {
  MessageDialog,
  MessageDialogActions,
  MessageDialogContent,
} from '@/components/elements/Dialog/messageDialog'

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
        <Button type="submit">Verify</Button>
      </form>

      <MessageDialog
        open={openPrompt}
        data-testid="verify-redirect-success-msg"
        title={dialogTitle}
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
        onClose={handleClosePopUP}
        data-testid="verify-dialog-error-msg"
        title={dialogTitle}
      >
        <MessageDialogContent>
          <p>{errorMessage}</p>
        </MessageDialogContent>
        <MessageDialogActions>
          <Button
            size="small"
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
