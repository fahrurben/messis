import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "moment/moment"
import InputTextField from "../../components/form/inputtext.field.tsx"
import InputText from "../../components/form/inputtext.element.tsx"
import TextArea from "../../components/form/textarea.element.tsx"
import CheckBox from "../../components/form/checkbox.element.tsx"
import { PlusIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/solid"
import cn from "../../helpers/cn.ts"
import {
  useCreateProject,
  useUpdateProject,
} from "../../hooks/use-project.api.ts"
import { toast } from "react-toastify"
import { useGetAllTeams } from "../../hooks/use-team.api.ts"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import {
  type ProjectFormValue,
  projectSchema,
  type Team,
} from "../../commons/types.ts"

interface ProjectFormProps {
  id?: number
  instanceData?: unknown
}

const ProjectForm = ({ id, instanceData }: ProjectFormProps) => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<ProjectFormValue>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      is_billable: false,
      is_active: false,
      projectteam_set: [],
      tasks: [],
    },
  })

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({
    control: control,
    name: "projectteam_set",
  })

  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control: control,
    name: "tasks",
  })

  const { data: teams = [] } = useGetAllTeams("")

  useEffect(() => {
    if (instanceData) {
      reset({ ...instanceData }, { keepDirty: true })
    }
  }, [instanceData])

  const createMutation = useCreateProject({
    onSuccess: () => {
      toast("Project created")
      navigate("/projects")
    },
    onError: (err) => {
      toast(err.message)
    },
  })

  const updateMutation = useUpdateProject({
    onSuccess: () => {
      toast("Project updated")
      navigate("/projects")
    },
    onError: (err) => {
      toast(err.message)
    },
  })

  const onSubmit = (values: ProjectFormValue) => {
    const formData: Record<string, unknown> = { ...values }
    formData.start_date = values.start_date
      ? moment(values.start_date).format("YYYY-MM-DD")
      : null
    formData.end_date = values.end_date
      ? moment(values.end_date).format("YYYY-MM-DD")
      : null
    formData.tasks = values.tasks?.map((data) => {
      const { id, ...restOfObject } = data
      return id === 0 ? restOfObject : data
    })
    formData.projectteam_set = values.projectteam_set?.map((data) => {
      const { id, ...restOfObject } = data
      return id === 0 ? restOfObject : data
    })
    console.log(formData)

    if (id) {
      updateMutation.mutate({ id: id, ...formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  return (
    <div className="flex py-8 w-full">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputTextField
              label={"Name"}
              name={"name"}
              error={errors?.name}
              required={true}
            >
              <div className="w-full">
                <InputText
                  placeholder={"Name"}
                  control={register("name")}
                  error={errors?.name}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Code"}
              name={"code"}
              error={errors?.code}
              required={true}
            >
              <div className="w-full">
                <InputText
                  placeholder={"Code"}
                  control={register("code")}
                  error={errors?.code}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Start Date"}
              name={"start_date"}
              error={errors?.start_date}
              required={true}
            >
              <div className="w-full">
                <InputText
                  placeholder={"Start Date"}
                  type="date"
                  control={register("start_date")}
                  error={errors?.start_date}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"End Date"}
              name={"end_date"}
              error={errors?.end_date}
              required={true}
            >
              <div className="w-full">
                <InputText
                  placeholder={"End Date"}
                  type="date"
                  control={register("end_date")}
                  error={errors?.end_date}
                  required
                />
              </div>
            </InputTextField>
            <div className="col-span-full">
              <InputTextField
                label={"Description"}
                name={"description"}
                error={errors?.description}
                required={true}
              >
                <div className="w-full">
                  <TextArea
                    placeholder={"Description"}
                    type="date"
                    control={register("description")}
                    error={errors?.description}
                    required
                  />
                </div>
              </InputTextField>
            </div>

            <div className="col-span-full">
              <CheckBox
                label={"Is Billable"}
                control={register("end_date")}
                error={errors?.is_billable}
              />
            </div>

            <div className="col-span-full">
              <CheckBox
                label={"Is Active"}
                control={register("end_date")}
                error={errors?.is_active}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-6">
          <legend className="fieldset-legend">Tasks</legend>
          {taskFields?.map((field, index) => (
            <div>
              {index > 0 && <div className="divider"></div>}
              <div className="flex items-center">
                <input type="hidden" {...register(`tasks.${index}.id`)} />
                <div className="w-full">
                  <input
                    type={"text"}
                    id={field.name}
                    className={cn(
                      "input",
                      { "input-error": errors.tasks?.[index] },
                      "w-full",
                    )}
                    placeholder={"Name"}
                    required={true}
                    {...register(`tasks.${index}.name`)}
                  />
                </div>
                <div className="flex px-4">
                  <label
                    className={cn(
                      "label",
                      { "input-error": errors.tasks?.[index] },
                      "w-full",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      {...register(`tasks.${index}.is_billable`)}
                    />
                    Is Billable
                  </label>
                </div>
                <a
                  className="btn"
                  onClick={() => {
                    removeTask(index)
                  }}
                >
                  <TrashIcon className="size-6" />
                </a>
              </div>
            </div>
          ))}

          <a
            className="btn mt-4"
            onClick={() => {
              appendTask({
                id: null,
                name: "",
                is_billable: false,
              })
            }}
          >
            <PlusIcon className="size-6" />
            Add
          </a>
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-6">
          <legend className="fieldset-legend">Teams</legend>
          {teamFields?.map((field, index) => (
            <div>
              {index > 0 && <div className="divider"></div>}
              <div className="flex items-center">
                <input
                  type="hidden"
                  {...register(`projectteam_set.${index}.id`)}
                />
                <div className="w-full">
                  <select
                    id={field.id}
                    className="select"
                    required={true}
                    {...register(`projectteam_set.${index}.team_id`)}
                  >
                    <option>- Team -</option>
                    {teams?.map((team: Team) => (
                      <option key={team.id} value={team.id}>
                        {team.userprofile.fullname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex px-4">
                  <label
                    className={cn(
                      "label",
                      { "input-error": errors.projectteam_set?.[index] },
                      "w-full",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      {...register(`projectteam_set.${index}.is_admin`)}
                    />
                    Is Admin
                  </label>
                </div>
                <a
                  className="btn"
                  onClick={() => {
                    removeTeam(index)
                  }}
                >
                  <TrashIcon className="size-6" />
                </a>
              </div>
            </div>
          ))}

          <a
            className="btn mt-4"
            onClick={() => {
              appendTeam({
                id: null,
                team_id: null,
                is_admin: false,
              })
            }}
          >
            <PlusIcon className="size-6" />
            Add
          </a>
        </fieldset>

        <div className="w-full flex justify-end mt-4">
          <button
            type="button"
            className="btn btn-neutral"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary ml-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
