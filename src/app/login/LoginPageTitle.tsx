'use client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function LoginPageTitle() {
  return (
    <Box
      data-testid="login-page-title"
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
        <Typography variant="h3" fontWeight={'bold'}>
          Log In to Plan Your Event
        </Typography>
        <Typography fontWeight={'bold'}>
          If you do not have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/register">
            Register Here
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
