import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Profile {
  id?: number
  username: string
  email: string
  bio?: string
  profile_picture?: string | null
}

const initialState: Profile = {
  username: '',
  email: '',
  bio: '',
  profile_picture: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{
        user: { id: number; username: string; email: string }
        profile: { bio: string; profile_picture: string | null }
      }>
    ) => {
      const { user, profile } = action.payload
      state.id = user.id
      state.username = user.username
      state.email = user.email
      state.bio = profile.bio
      state.profile_picture = profile.profile_picture
    },
    setProfileBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      state.profile_picture = action.payload
    },
    resetProfile: () => {
      return initialState
    },
  },
})

export const { setProfile, setProfileBio, setProfilePicture, resetProfile } =
  profileSlice.actions


export default profileSlice.reducer
