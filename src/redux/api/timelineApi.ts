import {
  CreateTimelineRequest,
  Timeline,
  ModifyDetailTimelineRequest,
} from '@/types/timeline'
import { baseApi } from './baseApi'

export const timelineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTimeline: builder.mutation<Timeline, CreateTimelineRequest>({
      query: (body) => ({
        url: '/timelines/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Task', id: result?.task_step.task },
      ],
    }),

    modifyDetailTimeline: builder.mutation<void, ModifyDetailTimelineRequest>({
      query: ({ id, start_datetime, end_datetime }) => ({
        url: `/timelines/${id}/`,
        method: 'PATCH',
        body: {
          start_datetime,
          end_datetime,
        },
      }),
      invalidatesTags: (_, __, arg) => [
        { type: 'Timeline', id: arg.id },
        'Timeline',
      ],
    }),
    getTimelinesByEvent: builder.query<Timeline[], { event_id: string }>({
      query: ({ event_id }) => ({
        url: `/timelines/${event_id}/view`,
        method: 'GET',
      }),
      providesTags: ['Timeline'],
    }),
    deleteTimeline: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/timelines/${id}/delete/`,  
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Timeline', id: arg.id }],
    }),    
  }),
})

export const {
  useGetTimelinesByEventQuery,
  useCreateTimelineMutation,
  useModifyDetailTimelineMutation,
  useDeleteTimelineMutation,
} = timelineApi
