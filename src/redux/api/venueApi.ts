import {
  AddPhotoRequest,
  DeletePhotoRequest,
  CreateVenueRequest,
  UpdateVenueRequest,
  Venue,
  VenueDetailRequest,
  VenueDetailResponse,
  VenueListResponse,
  VenueListRequest,
  VenuePhoto,
} from '@/types/venue'
import { baseApi } from './baseApi'

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVenue: builder.mutation<Venue, CreateVenueRequest>({
      query: (body) => ({
        url: '/venues/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Venue'],
    }),
    updateVenue: builder.mutation<Venue, UpdateVenueRequest>({
      query: (body) => ({
        url: `/venues/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Venue'],
    }),
    getVenueList: builder.query<VenueListResponse, VenueListRequest>({
      query: (event) => ({
        url: `/venues/event/${event}/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? result.map((venue) => ({
              type: 'Venue',
              id: venue.id.toString(),
            }))
          : ['Venue'],
    }),
    getVenueDetail: builder.query<VenueDetailResponse, VenueDetailRequest>({
      query: ({ id }) => ({
        url: `/venues/${id}/`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Venue', id: result?.id }],
    }),
    deleteVenue: builder.mutation<{ pk: number }, VenueDetailRequest>({
      query: ({ id }) => ({
        url: `/venues/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Venue', id: result?.pk }],
    }),
    addPhoto: builder.mutation<VenuePhoto, AddPhotoRequest>({
      query: ({ venue, image }) => {
        const formData = new FormData()
        formData.append('venue', String(venue))
        formData.append('image', image)
        return { url: `/venues/photos/`, method: 'POST', body: formData }
      },
      invalidatesTags: (result) => [{ type: 'Venue', venue: result?.venue }],
    }),
    deletePhoto: builder.mutation<{ pk: number }, DeletePhotoRequest>({
      query: ({ photo }) => ({
        url: `/venues/photos/${photo.id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Venue', id: result?.pk }],
    }),
  }),
})

export const {
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useGetVenueDetailQuery,
  useGetVenueListQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = venueApi
