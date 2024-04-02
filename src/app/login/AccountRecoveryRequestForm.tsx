'use client'
import { useState } from 'react'
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
import { Button } from '@/components/elements/Button'

type RecPassFormType = {
  email: string
}

interface Props {
  readonly openForm: boolean
  readonly onClose: () => void
}

export default function AccountRecoveryRequestForm({
  openForm,
  onClose,
}: Props) {
  const defaultValuesRecPass: RecPassFormType = {
    email: '',
  }

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
        fullWidth={true}
        maxWidth='md'
        style={{  padding: '20px', borderRadius: '20px 20px 0 0' }}
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', marginTop:'20px' }}>Account Recovery</DialogTitle>
        <DialogActions style={{ padding: '20px', margin: '20px'}}>
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
              <Button type="submit" data-testid="button-submit-email">
                Send Recovery Email
              </Button>
            </form>
            <Button
              variant={'secondary'}
              data-testid="close-acc-rec-form"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openPrompt} 
        data-testid="login-dialog-email-send-msg"
        fullWidth={true}
        maxWidth='sm'
        style={{  padding: '100px', borderRadius: '20px 20px 0 0' }}>
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', marginTop: '10px'  }}>{title}</DialogTitle>
        <DialogContent style={{ padding: '20px', margin: '10px', fontSize: '20px'}}>
          <p>{message}</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', margin: '10px' }}>
          <Button>
            <Link style={{ textAlign: 'center' }} href={'/login/recover-account'}>Continue</Link>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        data-testid="recover-dialog-error-msg"
        fullWidth={true}
        maxWidth='sm'
        style={{  padding: '100px', borderRadius: '20px 20px 0 0' }}
      >
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', marginTop: '10px' }}>{title}</DialogTitle>
        <DialogContent style={{ padding: '20px', margin: '10px', fontSize: '20px'}}>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', margin: '10px' }}>
          <Button
            variant={'ghost'}
            size={'small'}
            data-testid="button-error-account-recovery"
            onClick={handleClosePopup}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
