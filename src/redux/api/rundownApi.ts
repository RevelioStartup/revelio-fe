import {
    CreateRundownsRequest,
    CreateRundownsResponse
} from '@/types/rundown'
import { baseApi } from './baseApi'

export const rundownApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createRundownManually: builder.mutation<
        CreateRundownsResponse,
        CreateRundownsRequest
      >({
        query: (body) => ({
          url: '/rundowns/',
          method: 'POST',
          body
        }),
        invalidatesTags: (result) => [
          { type: 'Rundown', id: (result && result[0] && result[0].event) || '' },
        ],
      }),
    }),
  })
  
export const {
    useCreateRundownManuallyMutation,
} = rundownApi
  