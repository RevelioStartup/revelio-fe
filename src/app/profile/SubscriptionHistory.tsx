import { SubscriptionHistoryResponse } from '@/types/subscription'
import { Box } from '@mui/material'
import React from 'react'

export const SubscriptionHistory: React.FC<{
  data: SubscriptionHistoryResponse[]
}> = ({ data }) => {
  return (
    <Box
      component="section"
      className="flex flex-wrap gap-3 w-full overflow-y-auto h-[calc(100vh-80px)]"
      padding={{ xs: '2em 2em', lg: '4em 6em' }}
    >
      <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
        Subscription History
      </h2>
    </Box>
  )
}
