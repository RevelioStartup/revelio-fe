'use client'
import { useState } from 'react'
import { Input } from '@/components/elements/Forms/input'
import { Box, Typography, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useLoginMutation, useSendRecoverPasswordEmailMutation } from '@/redux/api/authApi'
import Link from 'next/link'
import { MessageDialog } from '@/app/auth/dialog'

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

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openPrompt, setOpenPromt] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')

  const [login] = useLoginMutation()
  const [sendEmail] = useSendRecoverPasswordEmailMutation()

  const methods = useForm<LoginFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const methodsRecPass = useForm<RecPassFormType>({ defaultValues: defaultValuesRecPass })
  const { control: controlRecPass, handleSubmit: handleSubmitRecPass } = methodsRecPass

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    console.log(data)
    await login({ ...data }).then((res) =>{
      console.log(res)
      if (res){
        if ('data' in res){
          router.push('/')
        }
        else{
          setErrorMessage(res.error.data.msg)
          setOpenPopup(true)
          setTitle("Error")
        }
      }
    });
  }

  const onSubmitRecPass: SubmitHandler<RecPassFormType> = async (data) => {
    await sendEmail({ ...data }).then((res) =>{
      if (res){
        if ('data' in res){
          setMessage("An email has been sent to your email account.")
          setOpenPromt(true)
          setTitle('Account Recovery')
        }
        else{
          setErrorMessage(res.error.data.msg)
          setOpenPopup(true)
          setTitle('Error')
        }
      }
    });
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleClosePrompt = () => {
    setOpenPromt(false)
    setOpen(false)
    router.push('/login/recover-account')
  };

  const handleRecoverPasswordClick = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };


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
        <Typography variant="h3" fontWeight={'bold'}>Log In to Plan Your Event</Typography>
        <Typography fontWeight={'bold'}>
            If you don't have an account, you can <Link style={{ color: 'teal' }} href="/register">Register Here</Link>
        </Typography>
      </Box>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }} data-testid="login-form">
          <Input control={control} name="username" placeholder='Enter username' required />
          <Input type="password" control={control} name="password" placeholder='Enter password' required />
          <Typography 
          variant="body2"
          align="right"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleRecoverPasswordClick}>
            Recover Account
          </Typography>
          <button 
          type="submit" 
          className='bg-teal-50'>Log In</button>
      </form>

      <Dialog open={open} onClose={handleClose} data-testid="login-dialog-recover">
        <DialogTitle>Account Recovery</DialogTitle>
        <DialogActions>
          <form className="flex flex-col gap-3" onSubmit={handleSubmitRecPass(onSubmitRecPass)} style={{ flex: 1 }}>
            <Input 
            control={controlRecPass} 
            name="email" 
            rules={{ pattern: /^\S+@\S+\.\S+$/ }}
            required
            placeholder='Enter email' />
            <button type="submit" data-testid='button-submit-email'>Send Recovery Email</button>
          </form>
        </DialogActions>
      </Dialog>

      <MessageDialog message={message} openPopup={openPrompt} onClose={handleClosePrompt} title={title} />

      <MessageDialog message={errorMessage} openPopup={openPopup} onClose={handleClosePopup} title={title} />
    </Box>
  )
}
