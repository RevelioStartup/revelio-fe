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

    updateTaskStep: builder.mutation<Task,{id:string, changes: EditTaskStepRequest}>({
      query: ({ id, changes }) => ({
        url: `/task-steps/${id}/edit/`,
        method: 'PUT',
        body: changes,
      }),
      invalidatesTags: ['Step'],
    })
  }),
})

export const { useCreateTaskStepManuallyMutation, useUpdateTaskStepMutation } = taskStepApi
