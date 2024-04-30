import { SubscriptionHistoryResponse } from '@/types/subscription'
import { Box } from '@mui/material'
import React from 'react'

export const SubscriptionHistory: React.FC<{
  data: SubscriptionHistoryResponse[]
}> = ({
  data
}) => {
  return (
    <Box
        component="section"
        className="flex flex-wrap gap-3 w-full overflow-y-auto h-[calc(100vh-80px)]"
        padding={{ xs: '2em 2em', lg: '4em 6em' }}
      >
        <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
          Subscription History
        </h2>
        {data.map((history) => (
          <Box
          key={history.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            width: '100%',
            maxWidth: '600px',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            mb: '1rem',
            bgcolor: '#0D9488',
          }}
          className="mx-auto"
        >
          <Box sx={{ mb: '0.5rem' }}>
            <h3
              style={{
                margin: 0,
                fontWeight: 'bold',
                fontSize: '1.25rem',
                color: 'white',
              }}
            >
              {history.plan}
            </h3>
          </Box>
          <Box sx={{ flexGrow: 0, mb: '0.5rem', color: 'white' }}>
            <p style={{ margin: 0 }}>{new Date(history.start_date).toDateString()} - {new Date(history.end_date).toDateString()} </p>
          </Box>
        </Box>
        ))}
    </Box>
  )
}
