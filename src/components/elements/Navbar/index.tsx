'use client'
import { Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { MENU, MENU_LOGGED_IN } from './constant'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@/redux/store'

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

  const user = useAppSelector((state: RootState) => state.user)
  if (user) {
    return (
      <Box
        data-testid="navbar"
        height={'80px'}
        width={'100%'}
        bgcolor={'transparent'}
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
        <Image
          data-testid="nav-logo"
          src="/assets/images/Logo.svg"
          alt="logo"
          width={75}
          height={75}
        />
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={'40px'}>
          {MENU_LOGGED_IN.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              style={{
                cursor: 'pointer',
                color: '#000',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>
    )
  } else {
    return (
      <Box
        data-testid="navbar"
        height={'80px'}
        width={'100%'}
        bgcolor={'transparent'}
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
        <Image
          data-testid="nav-logo"
          src="/assets/images/Logo.svg"
          alt="logo"
          width={75}
          height={75}
        />
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={'40px'}>
          {MENU.map(({ href, label }, index) => (
            <Link
              key={index}
              href={href}
              style={{
                cursor: 'pointer',
                color: '#000',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>
    )
  }
}
