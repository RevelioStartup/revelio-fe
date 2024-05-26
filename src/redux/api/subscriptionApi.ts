import { baseApi } from './baseApi'
import {
  LatestSubscriptionResponse,
  SubscriptionHistoryResponse,
} from '@/types/subscription'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<SubscriptionHistoryResponse[], void>({
      query: () => ({
        url: '/subscriptions/history/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'SubscriptionHistory' as const,
                id: id.toString(),
              })),
              'SubscriptionHistory',
            ]
          : ['SubscriptionHistory'],
    }),
    getLatestSubscription: builder.query<LatestSubscriptionResponse, void>({
      query: () => ({
        url: '/subscriptions/latest/',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'LatestSubscription', id: result.id },
              'LatestSubscription',
            ]
          : ['LatestSubscription'],
    }),
  }),
})

export const { useGetSubscriptionsQuery, useGetLatestSubscriptionQuery } =
  subscriptionApi
