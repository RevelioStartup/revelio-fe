'use client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function RegisterPageTitle() {
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
      <Box sx={{ flex: 1, textAlign: 'left' }} data-testid="register-title">
        <Typography variant="h3" fontWeight={'bold'}>
          Register to Plan Your Event
        </Typography>
        <Typography fontWeight={'bold'}>
          If you already have an account, you can{' '}
          <Link style={{ color: 'teal' }} href="/login">
            Log In Here
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
