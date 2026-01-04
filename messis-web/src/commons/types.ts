export type FormError = {
  message: string
}

export type FormLogin = {
  email: string
  password: string
  subdomain: string
}

export type LoginResponse = { refresh: string; access: string }
