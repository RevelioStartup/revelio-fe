import { Task as TaskObject, CreateTaskRequest } from '@/types/task';
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
    createTask: builder.mutation<TaskObject, CreateTaskRequest>({
      query: (body) => ({
        url: '/tasks/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { 
  useGetTaskDetailQuery,
  useCreateTaskMutation,
} = taskApi