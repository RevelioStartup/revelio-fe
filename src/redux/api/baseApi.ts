import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { apiConfig } from './config'

export const baseApi = createApi({
  tagTypes: [
    'Profile',
    'AI',
    'Venue',
    'Vendor',
    'Task',
    'Step',
    'Rundown',
    'SubscriptionHistory',
    'LatestSubscription',
    'Timeline',
    'Package',
    'Transaction',
    'Event',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({}),
})
