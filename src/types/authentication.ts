export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  refresh: string
  access: string
  is_verified_user: boolean
}

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type RegisterResponse = LoginResponse

export type SendEmailVerificationRequest = {
  token: string
}

export type SendRecoverPasswordRequest = {
  email: string
}

export type SendChangePasswordRequest = {
  email: string
  token: string
  new_password: string
}

export type ResponseMessage = {
  msg: string
}

export type EmailVerificationResponseMessage = {
  message: string
  is_verified_user: boolean
}
