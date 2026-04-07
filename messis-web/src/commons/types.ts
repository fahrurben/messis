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

export type UserProfile = {
  firstname: string
  lastname: string
  fullname: string
  title: string
  capacity: number
  bill_rate: number
  cost_rate: number
  profile_photo: string
}

export type Team = {
  id: number
  email: string
  firstname: string
  lastname: string
  fullname: string
  userprofile: UserProfile
}

export type SelectOptionType = {
  value: string
  label: string
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
  projectteam_set: Array<{
    id: number
    team_id: number
    is_admin: boolean
  }>
  tasks: Array<{
    id: number
    name: string
    is_billable: boolean
  }>
}

export type TaskType = {
  id: number
  name: string
  is_billable: boolean
}

export const timeEntrySchema = z.object({
  project_id: z.coerce
    .number<number>()
    .min(1, { message: "This field is required" }),
  task_id: z.coerce
    .number<number>()
    .min(1, { message: "This field is required" }),
  summary: z.string(),
  total_time: z.string(),
})

export type TimeEntryValue = z.infer<typeof timeEntrySchema>

export type TimeEntryDataType = {
  id: number,
  project_id: number,
  summary: string,
  entry_at: Date,
  total_seconds: number,
  total_time: string,
  total_seconds_to_time: string,
  project: ProjectType,
  task: TaskType
}

export type TimeEntrySummaryDataType = {
  id: number
  entry_at: Date
  task_id: number
  task__name: string
  total_seconds: number
  total_seconds_to_time: string
  total_time: string
}

export type ReportSummaryType = {
  user_details: UserProfile
  entries: TimeEntrySummaryDataType[]
  total_time_summary: string
}

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
  company_name: z.string().min(3),
})

export type RegisterFormValue = z.infer<typeof registerSchema>

export type TokenPayloadType = {
  sub: string
  role: string
  iat: number
  exp: number
  company_id: number
  user_id: number
}