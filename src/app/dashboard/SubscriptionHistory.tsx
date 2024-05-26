import { SubscriptionHistoryResponse } from '@/types/subscription'
import { getStringDate } from '@/utils/getStringDate'
import { Box } from '@mui/material'
import React from 'react'

export const SubscriptionHistory: React.FC<{
  data: SubscriptionHistoryResponse[]
}> = ({ data }) => {
  return (
    <Box
      component="section"
      className="flex flex-col justify-start gap-3 w-full overflow-y-auto pt-16 pb-6 px-4"
    >
      <h2 className="text-3xl font-bold">Subscription History</h2>
      {data.map((history) => (
        <Box
          key={history.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            maxWidth: '600px',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            mb: '1rem',
            bgcolor: history.is_active ? '#0D9488' : '#d3d3d3',
          }}
          className="mx-auto w-11/12"
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
              {history.plan.name}
            </h3>
          </Box>
          <Box sx={{ flexGrow: 0, mb: '0.5rem', color: 'white' }}>
            <p style={{ margin: 0 }}>
              {getStringDate(history.start_date)} -{' '}
              {getStringDate(history.end_date)}{' '}
            </p>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
