import { Box, Typography } from '@mui/material'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <Box>
      <Box
        data-testid="hero-landing"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          background: 'linear-gradient(#FFF 0%, #FFF 50%, #CEFBF7 100%)',
          minHeight: 'calc(100vh - 80px)',
          width: '100%',
        }}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'2em'}
        padding={{ xs: '4em 2em', lg: '4em 12em' }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'24px'}
          justifyContent={'center'}
          margin={'auto'}
          width={'100%'}
        >
          <Box
            sx={{
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography variant={'h3'} fontWeight={'bold'}>
              Ease.{' '}
              <Box component="span" color={'#2DD4BF'}>
                {' '}
                Enhance.{' '}
              </Box>{' '}
              Commemorate.
            </Typography>
          </Box>
          <Typography variant={'h6'} sx={{ opacity: 0.5 }}>
            {' '}
            Simplify and enhance the entire event planning experience
          </Typography>
          <Box display={'flex'} justifyContent={'left'} gap={'24px'}>
            <Link
              key={'Start Planning'}
              href={'/event'}
              style={{
                cursor: 'pointer',
              }}
            >
              <Button variant="primary" size="large">
                Start Planning
              </Button>
            </Link>

            <Link
              key={'Learn More'}
              href={'#why'}
              style={{
                cursor: 'pointer',
              }}
            >
              <Button variant="ghost" size="large">
                Learn More
              </Button>
            </Link>
          </Box>
        </Box>
        <Image
          src="/assets/images/Landingpage-Image.svg"
          alt="landing"
          width={400}
          height={400}
          style={{ width: 'auto' }}
          priority
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '200px',
          background:
            'linear-gradient(to bottom right, #CEFBF7 0%, #CEFBF7 50%, #FFF 50%, #FFF 100%)',
        }}
      ></Box>
    </Box>
  )
}
