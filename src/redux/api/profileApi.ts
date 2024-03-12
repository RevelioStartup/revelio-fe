// profileApi.ts
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
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
