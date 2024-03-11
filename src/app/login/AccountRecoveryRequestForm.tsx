'use client'
import { useState, useEffect } from 'react'
import { Input } from '@/components/elements/Forms/input'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSendRecoverPasswordEmailMutation } from '@/redux/api/authApi'
import Link from 'next/link'

type RecPassFormType = {
  email: string
}

interface Props {
  readonly openForm: boolean;
  onClose: () => void;
}

export default function AccountRecoveryRequestForm({
  openForm, onClose
}: 
  Props
) {
  const defaultValuesRecPass: RecPassFormType = {
    email: '',
  }

  const [open, setOpen] = useState(false)
  const [openPrompt, setOpenPrompt] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')

  const [sendEmail] = useSendRecoverPasswordEmailMutation()

  const methodsRecPass = useForm<RecPassFormType>({
    defaultValues: defaultValuesRecPass,
  })
  const { control: controlRecPass, handleSubmit: handleSubmitRecPass } =
    methodsRecPass

  const onSubmitRecPass: SubmitHandler<RecPassFormType> = async (data) => {
    await sendEmail({ ...data }).then((res) => {
      if (res) {
        if ('data' in res) {
          setMessage('An email has been sent to your email account.')
          setOpenPrompt(true)
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

  return (
    <Box>
      <Dialog
        open={openForm}
        onClose={onClose}
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
              onClick={onClose}
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
        open={openPopup}
        onClose={handleClosePopup}
        data-testid="recover-dialog-error-msg"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <button
            data-testid="button-error-account-recovery"
            onClick={handleClosePopup}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
