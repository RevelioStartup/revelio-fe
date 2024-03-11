import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const Footer = () => {
  return (
    <Box
      data-testid="footer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
      width={'100%'}
      alignItems={'center'}
      gap={'2em'}
      padding={'2em'}
      textAlign={'center'}
      className="justify-between bg-teal-50"
    >
      <Box className="w-full md:w-40 flex gap-2 justify-center items-center md:items-start flex-col">
        <Image
          src="/assets/images/Logo.svg"
          alt="logo"
          width={100}
          height={100}
          priority
        />
        <p className="text-sm text-justify md:pl-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quos
          amat.
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
        <Typography variant="h5" className="font-bold">
          Find us here!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'2em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <i
            className="i-ph-instagram-logo-bold text-teal-500 size-8"
            data-testid="i-ph-instagram-logo-bold"
          />
        </Box>
      </Box>
    </Box>
  )
}
