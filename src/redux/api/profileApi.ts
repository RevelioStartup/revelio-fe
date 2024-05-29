// profileApi.ts
import { IEvent } from '@/types/event'
import { baseApi } from './baseApi'
import { Profile, UpdateProfileRequest, ProfileResponse } from '@/types/profile'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => '/profile/',
    }),
    updateProfile: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: '/profile/',
        method: 'PUT',
        body: formData,
      }),
    }),
    getEvents: builder.query<IEvent[], void>({
      query: () => ({ url: '/events/', method: 'GET' }),
      providesTags: (result) => result ? [
        ...result.map(({ id }) => ({
          type: "Event" as const,
          id: id
        })), "Event",
      ] : ['Event']
    }),
    deleteEvent: builder.mutation<void, {
      eventId: string
    }>({
      query: ({ eventId }) => ({
        url: `/events/${eventId}/`,
        method: "DELETE"
      }),
      invalidatesTags: (_, __, arg) => [
        {
          type: "Event",
          id: arg.eventId
        }
      ]
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetEventsQuery,
  useDeleteEventMutation
} = profileApi
