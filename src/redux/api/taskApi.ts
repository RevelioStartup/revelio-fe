import { baseApi } from './baseApi'
import { Task } from '@/types/taskDetails'

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskDetail: builder.query<Task, { eventId: string; taskId: string }>({
      query: ({ eventId, taskId }) => ({
        url: `/tasks/${eventId}/${taskId}/`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetTaskDetailQuery } = taskApi
