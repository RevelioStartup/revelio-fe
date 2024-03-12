import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export const Pricing = () => {
  return (
    <Box
      data-testid="pricing"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(242, 253, 250, 0.9) 1%, rgba(242, 253, 250, 0.9) 99%, rgba(255, 255, 255, 0.9) 100%)',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2em'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
      <Typography variant={'h4'} textAlign="center" mt={1}>
        Choose What Works for <i>You</i>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
        }}
        alignItems={{ xs: 'center', md: 'stretch' }}
        justifyContent={'center'}
        gap={'4em'}
        padding={'2em'}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            background: 'white',
            borderRadius: 2,
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'1em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <Typography variant={'h5'} fontWeight={'bold'} mb={1}>
            Free
          </Typography>
          <Typography variant={'h3'} fontWeight={'bold'} mb={1}>
            Rp0
          </Typography>
          <Box>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-x-circle-fill text-red-500 size-6"
                  data-testid="i-ph-x-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-x-circle-fill text-red-500 size-6"
                  data-testid="i-ph-x-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-x-circle-fill text-red-500 size-6"
                  data-testid="i-ph-x-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: '#357876',
              borderRadius: 2,
              textTransform: 'none',
              my: 1,
              fontSize: '20px',
              ':hover': { bgcolor: 'white' },
            }}
            href="/register"
          >
            Choose Plan
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            background: 'rgb(45, 212, 191, 0.4)',
            borderRadius: 2,
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          alignItems={'center'}
          justifyContent={'between'}
          gap={'1em'}
          padding={'2em'}
          textAlign={'center'}
        >
          <Typography variant={'h5'} fontWeight={'bold'} mb={1}>
            ✨Premium✨
          </Typography>
          <Typography variant={'h3'} fontWeight={'bold'} mb={1}>
            Rp10k
          </Typography>
          <Box>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
            <div
              className="pt-2"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className="i-ph-check-circle-fill text-green-500 size-6"
                  data-testid="i-ph-check-circle-fill"
                />
              </span>
              <p style={{ fontSize: '20px' }}>Fitur 1</p>
            </div>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#357876',
              borderRadius: 2,
              textTransform: 'none',
              // alignItems: 'center',
              my: 1,
              fontSize: '20px',
              ':hover': { bgcolor: 'rgb(53, 120, 118, 0.75)' },
            }}
            href="/register"
          >
            Choose Plan
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
