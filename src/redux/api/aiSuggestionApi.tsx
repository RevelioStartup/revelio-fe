import {
  AISugesstionHistory,
  AISuggestionFormType,
  AISuggestionResponse,
} from '@/types/aiSuggestion'
import { baseApi } from './baseApi'

export const aiSuggestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    askSuggestion: builder.mutation<AISuggestionResponse, AISuggestionFormType>(
      {
        query: (body) => ({
          url: '/ai/assistant/',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['AI'],
      }
    ),
    aiSuggestionHistoryList: builder.query<
      AISugesstionHistory[],
      { event_id: string }
    >({
      query: ({ event_id }) => ({
        url: `/ai/history/all/${event_id}/`,
        method: 'GET',
      }),
      providesTags: ['AI'],
    }),
    aiSuggestionHistoryDetail: builder.query<
      AISugesstionHistory,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/ai/history/${id}/`,
        method: 'GET',
      }),
      providesTags: ['AI'],
    }),
    deleteAiSuggestionHistoryDetail: builder.mutation<
      AISugesstionHistory,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/ai/history/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AI'],
    }),
  }),
})

export const { useAskSuggestionMutation, useAiSuggestionHistoryListQuery } =
  aiSuggestionApi
