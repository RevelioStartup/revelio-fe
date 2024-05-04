import { User } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { LoginResponse } from '@/types/authentication'
import { authApi } from '../api/authApi'

interface UserSliceState {
  token: string | null
  profile: User | null
}

const initialState: UserSliceState = {
  token: null,
  profile: null,
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
      }
    ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.token = payload.access
        }
      )
  },
})

export const { logout, updateProfile } = userSlice.actions
export default userSlice.reducer
