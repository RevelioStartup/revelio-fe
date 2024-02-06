import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background:
          'linear-gradient(90deg, #CEFBF7 0%, #FFF 42.41%, #FFF 100%)',
        minHeight: 'calc(100vh - 80px)',
        width: '100%',
      }}
      borderRadius={'0 0 80% 0'}
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
        <Typography variant={'h3'} fontWeight={'bold'}>
          Ease.{' '}
          <Box component="span" color={'#2DD4BF'}>
            {' '}
            Enhance.{' '}
          </Box>{' '}
          Commemorate.
        </Typography>
        <Typography variant={'h6'} sx={{ opacity: 0.5 }}>
          {' '}
          Simplify and enhance the entire event planning experience
        </Typography>
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
  )
}
