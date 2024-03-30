import { IEvent } from '@/types/event'
import { baseApi } from './baseApi'

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<IEvent, Omit<IEvent, 'id'>>({
      query: (body) => ({
        url: '/events/',
        method: 'POST',
        body,
      }),
    }),
    getEvents: builder.query<IEvent[], void>({
      query: () => '/events/',
    }),
    getEvent: builder.query<IEvent, string>({
      query: (id) => ({
        url: `/events/${id}/`,
        method: 'GET',
      }),
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
    }),
    updateEvent: builder.mutation<
      IEvent,
      { id: string; changes: Partial<IEvent> }
    >({
      query: ({ id, changes }) => ({
        url: `/events/update/${id}/`,
        method: 'PATCH',
        body: changes,
      }),
    }),
  }),
})

export const {
  useGetEventQuery,
  useLazyGetEventQuery,
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventApi
