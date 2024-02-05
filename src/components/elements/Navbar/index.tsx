import { Box } from '@mui/material'
import Image from 'next/image'
import { MENU } from './constant'
import Link from 'next/link'
import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <Box
      height={'80px'}
      width={'100%'}
      bgcolor={'transparent'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      padding={'0em 2em'}
    >
      <Image
        src="/assets/images/Logo.svg"
        alt="logo"
        width={75}
        height={75}
        priority
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
