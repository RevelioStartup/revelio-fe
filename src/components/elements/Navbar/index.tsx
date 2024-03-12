'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import { MENU } from './constant'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from "@/redux/store";

export const Navbar: React.FC = () => {
  const [atTop, setAtTop] = useState<boolean>(true)

  const { token } = useAppSelector((state: RootState) => state.user);

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
        {!token ? (
          <Link
            href={"/login"}
            style={{
              cursor: 'pointer',
              color: '#000',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        ) : (
          <Link
            href = {"/event"}
            style={{
              cursor: 'pointer',
              color: '#000',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }} 
          >
            Create New Event
          </Link>
        )}
      </Box>
    </Box>
  )
}
