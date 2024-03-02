import { baseApi } from './baseApi'
import {
  LoginResponse,
  LoginRequest,
  RegisterResponse,
  RegisterRequest,
  ResponseMessage,
  SendEmailVerificationRequest,
  SendRecoverPasswordRequest,
  SendChangePasswordRequest,
} from '@/types/authentication'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/login/',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),
    sendEmailVerfication: builder.query<ResponseMessage, void>({
      query: () => ({
        url: '/verify/',
        method: 'GET',
      }),
    }),
    verifyEmail: builder.mutation<
      ResponseMessage,
      SendEmailVerificationRequest
    >({
      query: (body) => ({
        url: '/verify/',
        method: 'POST',
        body,
      }),
    }),
    sendRecoverPasswordEmail: builder.mutation<
      ResponseMessage,
      SendRecoverPasswordRequest
    >({
      query: (body) => ({
        url: '/recover/',
        method: 'POST',
        body,
      }),
    }),
    sendChangePassword: builder.mutation<
      ResponseMessage,
      SendChangePasswordRequest
    >({
      query: (body) => ({
        url: '/recover/',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendEmailVerficationQuery,
  useLazySendEmailVerficationQuery,
  useVerifyEmailMutation,
  useSendRecoverPasswordEmailMutation,
  useSendChangePasswordMutation,
} = authApi
