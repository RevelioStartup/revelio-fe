import { Timeline } from '@/types/timeline'
import { ModifyDetailTimelineRequest } from '@/types/timeline'
import { baseApi } from './baseApi'

export const timelineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
})

export const { useGetTimelinesByEventQuery } = timelineApi
