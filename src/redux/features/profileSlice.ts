// features/profile/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface ProfileState {
  profile: any | null; // Consider defining a more specific type for your profile object
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using the `ProfileState` type
const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/profile/`; // Adjust the path as needed

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState }) => {
  const state = getState() as RootState; // Typecasting to RootState to access the entire Redux state
  const token = state.user.token; // Assuming the token is stored in state.user.token

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Use the token from the Redux state
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  const data = await response.json();
  console.log('API Response:', data);

  return data;
});

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (formData: FormData, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Typecasting to RootState to access the entire Redux state
    const token = state.user.token; // Assuming the token is stored in state.user.token

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Authorization header
          // Don't set 'Content-Type': 'application/json' for FormData
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Define reducers here. For example:
    clearProfileState: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
    // Add other reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => { // Use a specific type instead of any if possible
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
      
  },
});

export const { clearProfileState } = profileSlice.actions;

export default profileSlice.reducer;
