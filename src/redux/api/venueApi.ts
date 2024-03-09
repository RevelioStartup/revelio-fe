import {
  AddPhotoRequest,
  CreateVenueRequest,
  UpdateVenueRequest,
  Venue,
  VenueDetailRequest,
  VenueDetailResponse,
  VenueListResponse,
  VenuePhoto,
} from '@/types/venue'
import { baseApi } from './baseApi'

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVenue: builder.mutation<Venue, CreateVenueRequest>({
      query: (body) => ({
        url: '/venue/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Venue'],
    }),
    updateVenue: builder.mutation<Venue, UpdateVenueRequest>({
      query: (body) => ({
        url: '/venue/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Venue'],
    }),
    getVenueList: builder.query<VenueListResponse, void>({
      query: () => ({
        url: '/venue/',
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
        url: `/venue/${id}/`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Venue', id: result?.id }],
    }),
    deleteVenue: builder.mutation<{ pk: number }, VenueDetailRequest>({
      query: ({ id }) => ({
        url: `/venue/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Venue', id: result?.pk }],
    }),
    addPhoto: builder.mutation<VenuePhoto, AddPhotoRequest>({
      query: ({ id, image }) => {
        const formData = new FormData()
        formData.append('id', String(id))
        formData.append('image', image)
        return { url: `/venue/photos/`, method: 'POST', body: formData }
      },
      invalidatesTags: (result) => [{ type: 'Venue', id: result?.venue }],
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
} = venueApi
