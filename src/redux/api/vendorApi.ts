import {
  AddPhotoRequest,
  CreateVendorRequest,
  DeletePhotoRequest,
  UpdateVendorRequest,
  Vendor,
  VendorDetailRequest,
  VendorDetailResponse,
  VendorListRequest,
  VendorListResponse,
  VendorPhoto,
} from '@/types/vendor'
import { baseApi } from './baseApi'

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation<Vendor, CreateVendorRequest>({
      query: (body) => ({
        url: '/vendors/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vendor'],
    }),
    updateVendor: builder.mutation<Vendor, UpdateVendorRequest>({
      query: (body) => ({
        url: `/vendors/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Vendor', id: result?.id },
        'Vendor',
      ],
    }),
    getVendorList: builder.query<VendorListResponse, VendorListRequest>({
      query: (event) => ({
        url: `/vendors/event/${event}/`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? result.map((vendor) => ({
              type: 'Vendor',
              id: vendor.id.toString(),
            }))
          : ['Vendor'],
    }),
    getVendorDetail: builder.query<VendorDetailResponse, VendorDetailRequest>({
      query: ({ id }) => ({
        url: `/vendors/${id}/`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Vendor', id: result?.id }, 'Vendor'],
    }),
    deleteVendor: builder.mutation<{ pk: number }, VendorDetailRequest>({
      query: ({ id }) => ({
        url: `/vendors/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Vendor', id: result?.pk }],
    }),
    addPhotoVendor: builder.mutation<VendorPhoto, AddPhotoRequest>({
      query: ({ vendor, image }) => {
        const formData = new FormData()
        formData.append('vendor', String(vendor))
        formData.append('image', image)
        return { url: `/vendors/photos/`, method: 'POST', body: formData }
      },
      invalidatesTags: (result) => [{ type: 'Vendor', vendor: result?.vendor }],
    }),
    deletePhotoVendor: builder.mutation<{ pk: number }, DeletePhotoRequest>({
      query: ({ photo }) => ({
        url: `/vendors/photos/${photo.id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Vendor', id: result?.pk }],
    }),
  }),
})

export const {
  useAddPhotoVendorMutation,
  useCreateVendorMutation,
  useDeletePhotoVendorMutation,
  useDeleteVendorMutation,
  useGetVendorDetailQuery,
  useGetVendorListQuery,
  useUpdateVendorMutation,
} = vendorApi
