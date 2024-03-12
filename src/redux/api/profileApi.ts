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
        query: () => ({ url: '/event/', method: 'GET' }),
      }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation, useGetEventsQuery} = profileApi
