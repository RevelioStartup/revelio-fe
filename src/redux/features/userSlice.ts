import { User } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  LoginResponse,
  EmailVerificationResponseMessage,
} from '@/types/authentication'
import { authApi } from '../api/authApi'

interface UserSliceState {
  token: string | null
  profile: User | null
  verified: boolean
}

const initialState: UserSliceState = {
  token: null,
  profile: null,
  verified: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      storage.removeItem('persist:root')
      window.localStorage.removeItem('token')
      state.profile = null
      state.token = null
      state.verified = false
      window.location.pathname = '/login'
    },
    updateProfile: (state, { payload }: PayloadAction<User>) => {
      state.profile = payload
      if (window.location.pathname === '/onboarding') {
        window.location.pathname = '/dashboard'
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        const token = payload.access
        state.token = token
        state.verified = payload.is_verified_user
      }
    ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.token = payload.access
          state.verified = payload.is_verified_user
        }
      ),
      builder.addMatcher(
        authApi.endpoints.verifyEmail.matchFulfilled,
        (
          state,
          { payload }: PayloadAction<EmailVerificationResponseMessage>
        ) => {
          state.verified = payload.is_verified_user
        }
      )
  },
})

export const { logout, updateProfile } = userSlice.actions
export default userSlice.reducer
