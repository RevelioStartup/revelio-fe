import {
  CreateRundownsRequest,
  CreateRundownsResponse,
  RundownsDetail,
  EditRundownRequest
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
  }),
})

export const { 
  useCreateRundownManuallyMutation, 
  useGetEventRundownQuery,
  useUpdateRundownMutation } = rundownApi
