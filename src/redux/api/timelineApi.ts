import { baseApi } from './baseApi'

export const timelineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTimeline: builder.mutation<
      { task_step: string; start_datetime: string; end_datetime: string },
      void
    >({
      query: (body) => ({
        url: '/task-steps/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateTimelineMutation } = timelineApi
