'use client'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { Button } from '@/components/elements/Button'
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

  const user_token = useAppSelector((state: RootState) => state.user).token
  const is_verified = useAppSelector((state: RootState) => state.user).verified
  if (user_token && is_verified) {
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
        gap={'2em'}
        padding={'2em'}
        paddingX={'6em'}
        className={twMerge(
          'fixed top-0 inset-x-0 z-50',
          atTop ? '' : 'backdrop-blur-md'
        )}
      >
        <a href="/">
          <Box className="flex gap-2 justify-center items-center flex-row">
            <Image
              data-testid="nav-logo"
              src="/assets/images/Logo.svg"
              alt="logo"
              width={45}
              height={45}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: 'Metropolis, Arial, sans-serif',
                fontWeight: 'bold',
                marginLeft: '10px',
              }}
            >
              Revelio
            </Typography>
          </Box>
        </a>

        <Box
          className="items-center"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          gap={'40px'}
        >
          {MENU_LOGGED_IN.map(({ href, label }) =>
            label === 'Start Planning' ? (
              <Link
                key={label}
                href={href}
                style={{
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <Button variant="ghost" size="small">
                  {label}
                </Button>
              </Link>
            ) : (
              <Link
                key={label}
                href={href}
                style={{
                  cursor: 'pointer',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <span>{label}</span>
              </Link>
            )
          )}
        </Box>
      </Box>
    )
  } else {
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
        gap={'2em'}
        padding={'2em'}
        paddingX={'6em'}
        className={twMerge(
          'fixed top-0 inset-x-0 z-50',
          atTop ? '' : 'backdrop-blur-md'
        )}
      >
        <a href="/">
          <Box className="flex gap-2 justify-center items-center flex-row">
            <Image
              data-testid="nav-logo"
              src="/assets/images/Logo.svg"
              alt="logo"
              width={45}
              height={45}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: 'Metropolis, Arial, sans-serif',
                fontWeight: 'bold',
                marginLeft: '10px',
              }}
            >
              Revelio
            </Typography>
          </Box>
        </a>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={'40px'}>
          {MENU.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              style={{
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <span>{label}</span>
            </Link>
          ))}
        </Box>
      </Box>
    )
  }
}
