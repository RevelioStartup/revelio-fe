import { Button } from '@/components/elements/Button'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export const Pricing = () => {
  return (
    <Box
      data-testid="pricing"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: 'white',
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
          '& > div:first-of-type': {
            width: '40%',
          },
          '& > div:last-of-type': {
            width: '60%',
          },
        }}
        alignItems={{ xs: 'center', md: 'stretch' }}
        justifyContent={'center'}
        gap={'2em'}
        padding={'2em'}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            background: 'white',
            borderRadius: 8,
            border: '1px solid #439288',
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
              <p style={{ fontSize: '20px' }}>Event Planner</p>
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
              <p style={{ fontSize: '20px' }}>Event Tracking</p>
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
              <p style={{ fontSize: '20px' }}>AI Assistant</p>
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
              <p style={{ fontSize: '20px' }}>Limited Event Creation</p>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            background: '#439288',
            borderRadius: 8,
            transition: 'all 0.4s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            color: 'white',
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
              <p style={{ fontSize: '20px' }}>Event Planning</p>
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
              <p style={{ fontSize: '20px' }}>Event Tracking</p>
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
              <p style={{ fontSize: '20px' }}>AI Assistant</p>
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
              <p style={{ fontSize: '20px' }}>Unlimited Event Creation</p>
            </div>
          </Box>
          <Link href="/package">
            <Button
              variant={'ghost'}
              style={{ background: 'white', fontWeight: 'bold' }}
            >
              Choose Plan
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
