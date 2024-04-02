import {
  CreateTaskAIStepResponse,
  CreateTaskStepRequest,
  CreateTaskStepResponse,
} from '@/types/taskStep'
import { baseApi } from './baseApi'

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
  }),
})

export const {
  useCreateTaskStepManuallyMutation,
  useCreateTaskStepWithAIMutation,
} = taskStepApi
