'use client'
import { Box } from '@mui/material'
import VerifyEmailForm from './VerifyForm'

export default function VerifyEmail() {
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
      <VerifyEmailForm />
    </Box>
  )
}
