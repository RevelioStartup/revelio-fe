'use client'
import { Box } from '@mui/material'
import LoginForm from './LoginForm'
import LoginPageTitle from './LoginPageTitle'

export default function LoginPage() {
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
      <LoginPageTitle data-testid="login-title" />
      <LoginForm data-testid="login-form" />
    </Box>
  )
}
