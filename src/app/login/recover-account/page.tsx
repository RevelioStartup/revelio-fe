'use client'
import { useState } from 'react'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSendChangePasswordMutation } from '@/redux/api/authApi'
import { MessageDialog } from '@/app/auth/dialog'
import { Typography } from '@mui/material'
import { Input } from '@/components/elements/Forms/input'

type ChangePassFormType = {
  token: string
  new_password: string
  email: string
}

export default function RecoverAccount() {
  const defaultValues: ChangePassFormType = {
    token: '',
    new_password: '',
    email :'',
  }

  const [openPrompt, setOpenPromt] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')

  const router = useRouter()
  const [changePass] = useSendChangePasswordMutation()

  const methods = useForm<ChangePassFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit } = methods

  const onSubmit: SubmitHandler<ChangePassFormType> = async (data) => {
    await changePass({ ...data }).then((res) =>{
      if (res){
        if ('data' in res){
          setOpenPromt(true)
          setMessage("Success! Please Log In with your new password.")
          setDialogTitle("Account Recovery")
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
    setOpenPromt(false)
    router.push('/login')
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
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        <Typography fontWeight={'bold'} variant='h3' align='center'>Account Recovery</Typography>
        <Typography fontWeight={'bold'} align='center'>Please Enter Your Email, Token Sent to Your Email, and Your New Password</Typography>
        <Input control={control} name="email" placeholder='Enter Email' required rules={{ pattern: /^\S+@\S+\.\S+$/ }} />
        <Input control={control} name="token" placeholder='Enter token' required />
        <Input type="password" control={control} name="new_password" placeholder='Enter new password' required />
        <button 
        type="submit" 
        className='bg-teal-50'>Recover Account</button>
      </form>
      
      <MessageDialog message={message} openPopup={openPrompt} onClose={handleClosePrompt} title={dialogTitle} />

      <MessageDialog message={errorMessage} openPopup={openPopup} onClose={handleClosePopUP} title={dialogTitle} />
    </Box>
  )
}
