'use client'
import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

export const WithoutRevelio = () => {
  const messages = ["👎Stressful", "👎Time consuming", "👎Inefficient","👎Lacking of centralization"];
  const [currentMessage, setCurrentMessage] = useState(0); 

  useEffect(() => { 
      const timer = setInterval(() => {
        setCurrentMessage((currentMessage + 1) % messages.length)
      }, 2000);
      return () => clearInterval(timer);
  }, [currentMessage]);

  return (
    <Box
      data-testid="without-revelio"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        background:
          'linear-gradient(180deg, #FFF 0%, #f2fdfa 2.5%, #f2fdfa 97.5%, #fff 100%)',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2em'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
      className = 'bg-teal-50'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        alignItems={'flex-end'}
        justifyContent={'center'}
        
        padding={'2em'}
      >
        <Typography variant="h3" fontWeight={'bold'}  sx={{ color: '#ef4444' }}>
            Without Revelio,
        </Typography>
        <Typography variant="h4">
            event planning can be..
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        alignItems={'flex-start'}
        justifyContent={'center'}
        gap={'2em'}
        // padding={'2em'}
      >
         <Typography variant="h4" fontWeight={'bold'}>
            {messages[currentMessage]}
        </Typography>
      </Box>
    </Box>
  )
}