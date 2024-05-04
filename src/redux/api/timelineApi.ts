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
  }),
})

export const { useCreateTimelineMutation, useModifyDetailTimelineMutation } =
  timelineApi
