import {
  Task as TaskObject,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '@/types/task'
import { baseApi } from './baseApi'
import { Task } from '@/types/taskDetails'

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], string>({
      query: (id) => ({
        url: `/tasks/${id}/`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
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
    deleteTask: builder.mutation<void, { eventId: string; taskId: string }>({
      query: ({ eventId, taskId }) => ({
        url: `/tasks/${eventId}/${taskId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, UpdateTaskRequest>({
      query: (body) => ({
        url: `/tasks/${body.event}/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Task', id: result?.id }, 'Task'],
    }),
  }),
})

export const {
  useGetTaskDetailQuery,
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
