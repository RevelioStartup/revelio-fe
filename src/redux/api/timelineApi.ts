import { CreateTimelineRequest, Timeline } from '@/types/timeline'
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
  }),
})

export const { useCreateTimelineMutation } = timelineApi
