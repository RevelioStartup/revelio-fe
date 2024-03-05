interface UserProfile {
  bio?: string;
  profile_picture?: string | null;
}

interface ProfileState {
  user?: {
    id: number;
    username: string;
    email: string;
  };
  profile?: UserProfile;
}

interface RootState {
  profile: {
    profile: ProfileState;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  // Include other state slices if present
}

export const selectProfileData = (state: RootState) => state.profile.profile;
export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectProfileError = (state: RootState) => state.profile.error;

export const selectProfileBio = (state: RootState): string | undefined => {
  let current: UserProfile | ProfileState | undefined = state.profile.profile; // Start with the nested profile object

  while (current && typeof current === 'object') {
    if ('bio' in current) {
      return current.bio; // TypeScript now understands that current.bio is a string or undefined
    } else if ('profile' in current) {
      current = current.profile;
    } else {
      break; // Exit if no more nested profile object
    }
  }
};
