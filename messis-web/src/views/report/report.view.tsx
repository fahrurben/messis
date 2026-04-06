import {useNavigate} from "react-router"
import useAuthenticated from "../../hooks/use-authenticated.hook.ts"
import {useEffect, useState} from "react"
import {useGetReportSummary} from "../../hooks/user-report.api.ts"
import LoadingWrapper from "../../components/common/loading.wrapper.tsx"
import {useGetAllProjects} from "../../hooks/use-project.api.ts"
import {useForm} from "react-hook-form"
import type {ProjectType, SelectOptionType} from "../../commons/types.ts"
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import InputTextField from "../../components/form/inputtext.field.tsx";
import Select from "../../components/form/select.element.tsx";
import InputText from "../../components/form/inputtext.element.tsx";

const reportSummaryFilterSchema = z.object({
  project_id: z.coerce.number(),
  from_date: z.coerce.date<Date>(),
  to_date: z.coerce.date<Date>(),
})

const ReportView = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuthenticated()

  if (!isAuthenticated) {
    navigate("/login")
  }

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(reportSummaryFilterSchema),
    defaultValues: {
      projectId: null,
      from_date: new Date(),
      to_date: new Date(),
    },
  })

  const [projectId, setProjectId] = useState<number | null>(null)
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)

  const { data: { results: projects } = {} } = useGetAllProjects("")

  const projectOptions: SelectOptionType[] = projects?.map(
    (project: ProjectType) => ({
      value: project.id.toString(),
      label: project.name,
    }),
  )

  const {
    data: reportEntries = [],
    refetch,
    isLoading,
  } = useGetReportSummary(projectId, fromDate, toDate)

  const onSubmit = (data: any) => {
    setProjectId(data.project_id)
    setFromDate(data.from_date)
    setToDate(data.to_date)
  }

  useEffect(
    () => {
      if (projectId && fromDate && toDate) {
        refetch()
      }
    }, [projectId, fromDate, toDate])

  return (
    <div>
      {isLoading && <LoadingWrapper />}
      <div className="flex">
        <h1 className="text-xl font-bold">
          Report
        </h1>
      </div>
      <div className="flex mt-2 card bg-base-100 w-full shadow-sm">
        <div className="card-body">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset w-full">
              <div className="flex gap-4">
                <InputTextField
                  label={"Project"}
                  name={"project_id"}
                  error={errors?.project_id}
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
                  label={"From"}
                  name={"start_date"}
                  error={errors?.from_date}
                >
                  <div className="w-full">
                    <InputText
                      placeholder={"From Date"}
                      type="date"
                      control={register("from_date")}
                      error={errors?.from_date}
                      required
                    />
                  </div>
                </InputTextField>

                <InputTextField
                  label={"To"}
                  name={"end_date"}
                  error={errors?.to_date}
                >
                  <div className="w-full">
                    <InputText
                      placeholder={"To Date"}
                      type="date"
                      control={register("to_date")}
                      error={errors?.to_date}
                      required
                    />
                  </div>
                </InputTextField>

                <button type="submit" className="btn btn-primary mt-6 ml-2">
                  Search
                </button>

              </div>
            </fieldset>
          </form>
        </div>
      </div>

      {
        reportEntries && reportEntries?.map((data) => {
          return (
            <div className="card bg-base-100 w-full mt-8 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{data.user_details.firstname} {data.user_details.lastname}</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Task</th>
                        <th align="center">Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      data.entries.map((entry) => {
                        return (
                          <tr key={entry.id}>
                            <td>{entry.entry_at}</td>
                            <td>{entry.task__name}</td>
                            <td align="center">{entry.total_time}</td>
                          </tr>
                        )
                      })
                    }
                    <tr>
                      <td colSpan={2}><strong>Total Time</strong></td>
                      <td align="center"><strong>{data.total_time_summary}</strong></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default ReportView