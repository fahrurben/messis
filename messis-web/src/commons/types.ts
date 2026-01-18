import { z } from "zod"

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

export type ErrorResponse = {
  message: string
}

export type OnSuccessCallback = (data: unknown) => void
export type OnErrorCallback = (data: ErrorResponse) => void

export type Team = {
  id: number
  email: string
  firstname: string
  lastname: string
  fullname: string
  userprofile: {
    firstname: string
    lastname: string
    fullname: string
    title: string
    capacity: number
    bill_rate: number
    cost_rate: number
    profile_photo: string
  }
}

const teamSchema = z.object({
  id: z.coerce.number<number>().nullable(),
  team_id: z.coerce.number<number>().nullable(),
  is_admin: z.boolean(),
})

const taskSchema = z.object({
  id: z.coerce.number<number>().nullable(),
  name: z.string(),
  is_billable: z.boolean(),
})

export const projectSchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3),
  description: z.string(),
  start_date: z.coerce.date<Date>(),
  end_date: z.coerce.date<Date>(),
  is_billable: z.boolean(),
  is_active: z.boolean(),
  projectteam_set: z.array(teamSchema),
  tasks: z.array(taskSchema),
})

export type ProjectFormValue = z.infer<typeof projectSchema>

export type ProjectType = {
  id: number
  name: string
  code: string
  description: string
  start_date: string
  end_date: string
  is_billable: boolean
  is_active: boolean
  projectteam_set: {
    id: number
    team_id: number
    is_admin: boolean
  }
  tasks: {
    id: number
    name: string
    is_billable: boolean
  }
}
