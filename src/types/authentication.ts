export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  refresh_token: string
  access_token: string
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
