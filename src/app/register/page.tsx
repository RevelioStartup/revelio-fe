'use client'
import { useState } from 'react'
import { Box, Typography} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useRegisterMutation, useLazySendEmailVerficationQuery } from '@/redux/api/authApi'
import Link from 'next/link'
import { MessageDialog } from '@/app/auth/dialog'
import { Input } from '@/components/elements/Forms/input'

type RegisterFormType = {
  username: string
  password: string
  email: string
}

export default function Register() {
  const defaultValues: RegisterFormType = {
    username: '',
    password: '',
    email: '',
  }

  const [register] = useRegisterMutation()
  const [sendEmail] = useLazySendEmailVerficationQuery()

  const router = useRouter();
  const [openPrompt, setOpenPromt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const methods = useForm<RegisterFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    await register({ ...data }).then((res) =>{
      if (res){
        if ('data' in res){
          setMessage("An email has been sent to your email account.");
          setOpenPromt(true)
          setDialogTitle("Email Verification")
          sendEmail()
        }
        else{
          setErrorMessage(res.error.data.msg)
          setOpenPopup(true)
          setDialogTitle('Error')
        }
      }
    })
  }

  const handleClosePrompt = () => {
    setOpenPromt(false);
    router.push('/register/verify')
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
      padding={{ xs: '4em 4em', lg: '4em 4em' }}
    >
      <Box sx={{ flex: 1, textAlign: 'left' }}>
        <Typography variant="h3" fontWeight={'bold'}>Register to Plan Your Event</Typography>
        <Typography fontWeight={'bold'}>
            If you already have an account, you can <Link style={{ color: 'teal' }} href="/login">Log In Here</Link>
        </Typography>
      </Box>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        <Input control={control} name="username" placeholder='Enter username' required />
        <Input control={control} name="email" placeholder='Enter email' required rules={{ pattern: /^\S+@\S+\.\S+$/ }} />
        <Input type="password" control={control} name="password" placeholder='Enter password' required />
        <button 
        type="submit" 
        className='bg-teal-50'>Register</button>
      </form>

      <MessageDialog message={message} openPopup={openPrompt} onClose={handleClosePrompt} title={dialogTitle} />

      <MessageDialog message={errorMessage} openPopup={openPopup} onClose={handleClosePopUP} title={dialogTitle} />
    </Box>
    
  )
}
