'use client'
import { useState } from 'react'
import { Input } from '@/components/elements/Forms/input'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useVerifyEmailMutation } from '@/redux/api/authApi'
import { MessageDialog } from '@/app/auth/dialog'

type VerifyEmailFormType = {
  token: string
}

export default function VerifyEmail() {
  const defaultValues: VerifyEmailFormType = {
    token: '',
  }

  const [verify] = useVerifyEmailMutation()

  const router = useRouter()
  const [openPrompt, setOpenPromt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const methods = useForm<VerifyEmailFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<VerifyEmailFormType> = async (data) => {
    await verify({ ...data }).then((res) =>{
      if (res){
        if ('data' in res){
          setMessage("Success! Your email is now verified.")
          setOpenPromt(true)
          setDialogTitle("Email Verification")
        }
        else{
          setErrorMessage(res.error.data.msg)
          setOpenPopup(true)
          setDialogTitle("Error")
        }
      }
    })
  }

  const handleClosePrompt = () => {
    setOpenPromt(false);
    router.push('/')
  }

  const handleClosePopUP = () => {
    setOpenPopup(false)
  }

  return (
    <Box
      data-testid="verify"
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

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        <Typography fontWeight={'bold'} variant='h3' align='center'>Verify Email</Typography>
        <Typography fontWeight={'bold'} align='center'>Please Enter the Token Sent to Your Email</Typography>
        <Input control={control} name="token" placeholder='Enter token' required />
        <button 
        type="submit" 
        className='bg-teal-50'>Verify</button>
      </form>
      
      <MessageDialog message={message} openPopup={openPrompt} onClose={handleClosePrompt} title={dialogTitle} />

      <MessageDialog message={errorMessage} openPopup={openPopup} onClose={handleClosePopUP} title={dialogTitle} />
    </Box>
  )
}
