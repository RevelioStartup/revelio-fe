'use client'
import { Box, Typography } from '@mui/material'

export default function LoginPageTitle() {
  return (
    <Box
      data-testid="login-page-title"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
      }}
      borderRadius={'0 0 80% 0'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={{ lg: '4em 4em' }}
    >
      <Box sx={{ flex: 1, textAlign: 'left' }} data-testid="login-title">
        <Typography
          variant="h3"
          fontWeight={'bold'}
          textAlign={{
            md: 'left',
            xs: 'center',
          }}
        >
          Log In to Plan Your Event
        </Typography>
      </Box>
    </Box>
  )
}
