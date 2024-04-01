import { CreateTaskStepRequest, EditTaskStepRequest } from '@/types/taskStep'
import { baseApi } from './baseApi'
import { Task } from '@/types/taskDetails'

export const taskStepApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTaskStepManually: builder.mutation<void, CreateTaskStepRequest>({
      query: (body) => ({
        url: '/task-steps/',
        method: 'POST',
        body,
      }),
    }),

    updateTaskStep: builder.mutation<
      Task,
      { id: string; changes: EditTaskStepRequest }
    >({
      query: ({ id, changes }) => ({
        url: `/task-steps/${id}/edit/`,
        method: 'PUT',
        body: changes,
      }),
      invalidatesTags: ['Step'],
    }),

    deleteTaskStep: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/task-steps/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Step'],
    }),

    deleteAllTaskSteps: builder.mutation<void, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `/task-steps/tasks/${taskId}/delete-all-steps/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Step'],
    }),
  }),
})

export const {
  useCreateTaskStepManuallyMutation,
  useUpdateTaskStepMutation,
  useDeleteTaskStepMutation,
  useDeleteAllTaskStepsMutation,
} = taskStepApi
