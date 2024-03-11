'use client'
import { Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import React, { useEffect, useState } from 'react'

export const Navbar: React.FC = () => {
  const [atTop, setAtTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      data-testid="navbar"
      height={'80px'}
      width={'100%'}
      bgcolor={'white'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      padding={'0em 2em'}
      className={twMerge(
        'fixed top-0 inset-x-0 z-50',
        atTop ? '' : 'backdrop-blur-md'
      )}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
        <Image
          data-testid="nav-logo"
          src="/assets/images/Logo.svg"
          alt="logo"
          width={35}
          height={35}
        />
        <Typography variant="h6" component="div" sx={{ marginLeft: '10px' }}>
          Revelio
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={'40px'}>
      <Button variant="contained" 
              sx={{ 
                bgcolor: '#2DD4BF', 
                borderRadius: 75, 
                textTransform: 'none',
                px: 2, 
                py: 0.5, 
                fontSize: '16px', 
                ':hover': { bgcolor: '#2DD4BF' } 
              }} 
              href="/login">
        Login
      </Button>
</Box>
    </Box>
  )
}