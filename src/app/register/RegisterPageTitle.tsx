'use client'
import { Box, Typography } from '@mui/material'

export default function RegisterPageTitle() {
  return (
    <Box
      data-testid="register"
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
      <Box sx={{ flex: 1, textAlign: 'left' }} data-testid="register-title">
      <Typography variant="h3" fontWeight={'bold'} textAlign={{
          md: 'left',
          xs: 'center',
        }}>          
        Register to Plan Your Event
        </Typography>
      </Box>
    </Box>
  )
}
