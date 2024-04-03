import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const Footer = () => {
  return (
    <Box
      data-testid="footer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-top',
        bgcolor: '#f2fdfa',
      }}
      width={'100%'}
      alignItems={'center'}
      gap={'2em'}
      padding={'2em'}
      paddingX={'6em'}
      textAlign={'center'}
      className="justify-between"
    >
      <Box className="flex gap-2 justify-center items-center md:items-start flex-col">
        <Box className="flex gap-2 justify-center items-center flex-row">
          <Image
            data-testid="nav-logo"
            src="/assets/images/Logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <Typography variant="h5" component="div" sx={{ marginLeft: '10px' }}>
            Revelio
          </Typography>
        </Box>
        <p className="text-md text-justify md:pl-1">
          Committed to revolutionizing and solving problems in event planning
        </p>

        <p
          className="text-md text-justify md:pl-1 pt-4"
          style={{ opacity: 0.25, display: 'flex', alignItems: 'center' }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="i-ph-copyright-light"
              data-testid="i-ph-copyright-light"
            />
          </span>{' '}
          2024 Revelio. All rights reserved.
        </p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        alignItems={'center'}
        justifyContent={'around'}
        padding={'2em'}
        textAlign={'center'}
      >
        <Typography variant="h6" className="">
          Connect with us here!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          alignItems={'center'}
          justifyContent={'flex-end'}
          width="100%"
          gap={'2em'}
          paddingY={'1em'}
          textAlign={'center'}
        >
          <a
            href="https://www.instagram.com/revelio.hq/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="i-ph-instagram-logo-bold text-teal-500 size-8"
              data-testid="i-ph-instagram-logo-bold"
            />
          </a>
          <a
            href="mailto:revelio.startup@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="i-ph-envelope-simple-bold text-teal-500 size-8"
              data-testid="i-ph-envelope-simple-bold"
            />
          </a>
        </Box>
      </Box>
    </Box>
  )
}
