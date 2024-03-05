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
          url: '/ai/assistant',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['AI'],
      }
    ),
    aiSuggestionHistoryList: builder.query<AISugesstionHistory[], void>({
      query: () => ({
        url: '/ai/history',
        method: 'GET',
      }),
      providesTags: ['AI'],
    }),
  }),
})

export const { useAskSuggestionMutation, useAiSuggestionHistoryListQuery } =
  aiSuggestionApi
