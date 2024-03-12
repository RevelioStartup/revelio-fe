// Define the main Profile structure
export interface Profile {
  user: {
    id: number
    username: string
    email: string
  }
  profile: {
    bio: string
    profile_picture: string | null
  } // Assuming the profile picture is stored as a URL string
}

// Define the structure for the request to update a profile
// This may include any subset of Profile fields that can be updated
export interface UpdateProfileRequest {
  bio?: string
  profile_picture?: File | null // Assuming the profile picture is sent as a file in FormData
}

export interface ProfileResponse extends Profile {
  profile_picture: string | null
  bio: string
}
