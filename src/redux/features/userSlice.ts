import { User } from '@/types/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

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
  extraReducers: (builder) => {},
})

export const { logout, updateProfile } = userSlice.actions
export default userSlice.reducer
