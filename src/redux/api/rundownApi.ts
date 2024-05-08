import {
  CreateRundownsRequest,
  CreateRundownsResponse,
  RundownsDetail,
  EditRundownRequest,
} from '@/types/rundown'
import { baseApi } from './baseApi'

export const rundownApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRundownManually: builder.mutation<
      CreateRundownsResponse,
      CreateRundownsRequest
    >({
      query: (body) => ({
        url: '/rundowns/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Rundown', id: (result && result[0] && result[0].event) || '' },
      ],
    }),
    getEventRundown: builder.query<RundownsDetail[], string>({
      query: (id) => ({
        url: `/rundowns/events/${id}/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Rundown', id: id }))
          : [{ type: 'Rundown' }],
    }),
    updateRundown: builder.mutation<
      RundownsDetail,
      { id: string; changes: EditRundownRequest }
    >({
      query: ({ id, changes }) => ({
        url: `/rundowns/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (result) => [{ type: 'Rundown', id: result?.id }],
    }),
    deleteRundown: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/rundowns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Rundown', id: arg.id }],
    }),
    deleteAllRundown: builder.mutation<void, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `/rundowns/events/${eventId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Rundown', event: arg.eventId }],
    }),
    createRundownWithAI: builder.mutation<
      CreateRundownsRequest,
      { event_id: string }
    >({
      query: ({ event_id }) => ({
        url: `/ai/rundown/${event_id}/`,
        method: 'GET',
      }),
      invalidatesTags: (result) => [
        { type: 'Rundown', id: result?.event_id ?? '' },
      ],
    }),
  }),
})

export const {
  useCreateRundownManuallyMutation,
  useGetEventRundownQuery,
  useUpdateRundownMutation,
  useDeleteRundownMutation,
  useDeleteAllRundownMutation,
  useCreateRundownWithAIMutation,
} = rundownApi
