export type FormError = {
  message: string
}

export type FormLogin = {
  email: string
  password: string
  subdomain: string
}

export type LoginResponse = { refresh: string; access: string }

export type FormProfile = {
  firstname: string
  lastname: string
  title: string
  capacity: number
  bill_rate: number
  cost_rate: number
  profile_photo: string
}
