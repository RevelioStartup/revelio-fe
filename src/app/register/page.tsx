'use client'
import { Box } from '@mui/material'
import RegisterForm from './RegisterForm'
import RegisterPageTitle from './RegisterPageTitle'

export default function Register() {
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
      <RegisterPageTitle />
      <RegisterForm />
    </Box>
  )
}
