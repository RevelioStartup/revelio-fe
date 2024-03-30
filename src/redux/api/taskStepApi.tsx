import { CreateTaskStepRequest } from '@/types/taskStep'
import { baseApi } from './baseApi'

export const taskStepApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTaskStepManually: builder.mutation<void, CreateTaskStepRequest>({
      query: (body) => ({
        url: '/task-steps/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateTaskStepManuallyMutation } = taskStepApi
