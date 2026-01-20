import { useForm, useWatch } from "react-hook-form"
import type {
  ProjectFormValue,
  ProjectType,
  SelectOptionType,
  TimeEntryValue,
} from "../../commons/types.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { timeEntrySchema } from "../../commons/types.ts"
import InputTextField from "../../components/form/inputtext.field.tsx"
import InputText from "../../components/form/inputtext.element.tsx"
import { useGetAllProjects } from "../../hooks/use-project.api.ts"
import Select from "../../components/form/select.element.tsx"
import TextArea from "../../components/form/textarea.element.tsx"
import InputMask from "../../components/form/inputtime.element.tsx"
import InputTime from "../../components/form/inputtime.element.tsx"

interface ProjectFormProps {
  id?: number
  instanceData?: unknown
}

const TimeEntryForm = ({ id, instanceData }: ProjectFormProps) => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    control,
    handleSubmit,
  } = useForm<TimeEntryValue>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      project_id: null,
      team_id: null,
      summary: "",
      total_time: "",
    },
  })

  const { data: { results: projects } = {} } = useGetAllProjects("")
  const projectOptions: SelectOptionType[] = projects?.map(
    (project: ProjectType) => ({
      value: project.id.toString(),
      label: project.name,
    }),
  )

  const selectedProjectId = useWatch({ control, name: "project_id" })

  let taskOptions: SelectOptionType[] = []

  if (selectedProjectId) {
    const selectedProject: ProjectType = projects?.find(
      (project: ProjectType) => project.id == selectedProjectId,
    )

    taskOptions = selectedProject?.tasks?.map((task) => ({
      value: task.id.toString(),
      label: task.name,
    }))
  }

  const onSubmit = (values: TimeEntryValue) => {
    console.log(values)
  }

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">
          <div className="flex flex-col gap-4">
            <InputTextField
              label={"Project"}
              name={"project_id"}
              error={errors?.project_id}
              required={true}
            >
              <div className="w-full">
                <Select
                  placeholder="-- Project --"
                  control={register("project_id")}
                  options={projectOptions}
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Task"}
              name={"task_id"}
              error={errors?.task_id}
              required={true}
            >
              <div className="w-full">
                <Select
                  placeholder="-- Task --"
                  control={register("task_id")}
                  options={taskOptions}
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Summary"}
              name={"summary"}
              error={errors?.summary}
              required={true}
            >
              <div className="w-full">
                <TextArea
                  placeholder={"Description"}
                  type="date"
                  control={register("summary")}
                  error={errors?.summary}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Total Time"}
              name={"total_time"}
              error={errors?.total_time}
              required={true}
            >
              <div className="w-full">
                <InputTime
                  placeholder={"End Date"}
                  type="text"
                  control={register("total_time")}
                  error={errors?.total_time}
                  required
                />
              </div>
            </InputTextField>
          </div>
        </fieldset>
        <div className="w-full flex justify-end mt-4">
          <button type="submit" className="btn btn-primary ml-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default TimeEntryForm
