import {
  EditTaskStepRequest,
  CreateTaskAIStepResponse,
  CreateTaskStepRequest,
  CreateTaskStepResponse,
} from '@/types/taskStep'
import { baseApi } from './baseApi'
import { Task } from '@/types/taskDetails'

export const taskStepApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTaskStepManually: builder.mutation<
      CreateTaskStepResponse,
      CreateTaskStepRequest
    >({
      query: (body) => ({
        url: '/task-steps/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Task', id: (result && result[0] && result[0].task) || '' },
      ],
    }),
    createTaskStepWithAI: builder.mutation<
      CreateTaskAIStepResponse,
      { task_id: number }
    >({
      query: ({ task_id }) => ({
        url: `/ai/task-steps/${task_id}/`,
        method: 'GET',
      }),
      invalidatesTags: (result) => [
        { type: 'Task', id: result?.task_id ?? '' },
      ],
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
      invalidatesTags: (result) => [{ type: 'Task', id: result?.id }],
    }),

    deleteTaskStep: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/task-steps/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    deleteAllTaskSteps: builder.mutation<void, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `/task-steps/tasks/${taskId}/delete-all-steps/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const {
  useCreateTaskStepManuallyMutation,
  useCreateTaskStepWithAIMutation,
  useUpdateTaskStepMutation,
  useDeleteTaskStepMutation,
  useDeleteAllTaskStepsMutation,
} = taskStepApi
