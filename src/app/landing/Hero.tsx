import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <Box
      data-testid="hero-landing"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      alignItems= 'center'
      justifyContent= 'center'
      minHeight= 'calc(100vh - 80px)'
  
      // borderRadius={'0 0 80% 0'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
      <Box 
        sx={{
          transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
        }}
      >
        <Typography variant={'h4'} fontWeight={'bold'} textAlign="center" mb={3}>
        Ease.<Box component="span" color={'#2DD4BF'}>{' '}Enhance.{' '}</Box>Commemorate.
      </Typography>
      </Box>
      

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: '4em', md: '2em' },
          width: '100%',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'24px'}
          width={'50%'}
        >
        <Typography variant={'h6'} sx={{ opacity: 0.7, textAlign: "left" }}>
          {' '}
          <Box component="span" color={'#1ec2ae'}  fontWeight="800">Revelio </Box>
          is designed to simplify and enhance the entire 
          <Box component="span" fontWeight="600"> event planning </Box>
          experience, providing you with powerful tools to structure, track, and manage every aspect of 
          your event seamlessly, 
          <Box component="span" fontWeight="600"> all from one central platform. </Box>
         
        </Typography>
        </Box>
        <Image
            src="/assets/images/Landingpage-Image.svg"
            alt="landing"
            width={320}
            height={320}
            priority
          />
      </Box>
    </Box>
  );
};