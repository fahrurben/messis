import useAuthenticated from "../../hooks/use-authenticated.hook.ts"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import moment from "moment/moment"
import cn from "../../helpers/cn.ts"
import {
  useDeleteTimeEntry,
  useGetTimeEntry,
  useGetTimeEntryByDate,
} from "../../hooks/use-timeentry.api.ts"
import TimeentryForm from "./timeentry.form.tsx"
import LoadingWrapper from "../../components/common/loading.wrapper.tsx"
import { toast } from "react-toastify"
import { confirmAlert } from "react-confirm-alert"

const initialValues = {
  project_id: "",
  task_id: "",
  summary: "",
  total_time: "",
}

const Home = () => {
  useAuthenticated()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [arrWeekDays, setArrWeekDays] = useState([])
  const [formAddInitialValues, setFormAddInitialValues] = useState({
    ...initialValues,
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    let arrWeek = []
    const firstDayOfWeek = moment(currentDate).clone().startOf("week")

    for (let i = 0; i < 7; i++) {
      const day = firstDayOfWeek.clone().add(i, "d").toDate()
      arrWeek.push(day)
    }

    setArrWeekDays(arrWeek)
  }, [currentDate])

  const {
    data: timeEntries = [],
    refetch: refetchTimeEntries,
    isLoading: isLoadingGetTimeEntries,
  } = useGetTimeEntryByDate(currentDate)

  const { data: selectedData, isLoading: isLoadingGetTimeEntry } =
    useGetTimeEntry(selectedId)

  const addBtnClicked = () => {
    setFormAddInitialValues({
      ...initialValues,
    })
    document.getElementById("modal_create").showModal()
  }

  const editBtnClicked = (id) => {
    setSelectedId(id)
    document.getElementById("modal_edit").showModal()
  }

  const onCreateSuccess = () => {
    document.getElementById("modal_create").close()
    refetchTimeEntries()
  }

  const onUpdateSuccess = () => {
    document.getElementById("modal_edit").close()
    refetchTimeEntries()
  }

  const deleteMutation = useDeleteTimeEntry({
    onSuccess: () => {
      toast.success("Time entry deleted")
      onUpdateSuccess()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleDeleteBtn = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this time entry?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteMutation.mutate(id)
          },
        },
        {
          label: "No",
        },
      ],
    })
  }

  const isLoading = isLoadingGetTimeEntries || isLoadingGetTimeEntry

  return (
    <div>
      {isLoading && <LoadingWrapper />}
      <div className="flex">
        <h1 className="text-xl font-bold mr-auto">
          {moment(currentDate).format("dddd, D MMM")}
        </h1>
        <button className="btn" onClick={addBtnClicked}>
          <PlusIcon className="size-6" />
        </button>
      </div>
      <div className="overflow-x-auto mt-8">
        <div className="">
          <div className="flex border-b-2 border-gray-200 gap-4">
            {arrWeekDays?.map((weekDay) => {
              return (
                <a
                  className={cn(
                    "flex flex-auto h-18 py-2 px-4  cursor-pointer",
                    {
                      "bg-gray-200": weekDay.getDate() == currentDate.getDate(),
                    },
                  )}
                  onClick={() => setCurrentDate(weekDay)}
                >
                  <h5 className="text-md font-bold w-full">
                    {moment(weekDay).format("ddd")}
                  </h5>
                </a>
              )
            })}
          </div>
        </div>
        <div>
          {timeEntries &&
            timeEntries.map((timeEntry) => {
              return (
                <div className="flex border-b-1 border-gray-200 p-4 gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold w-full py-2">
                      {timeEntry.project.name}
                    </h3>
                    <h4 className="text-sm font-bold w-full py-1">
                      {timeEntry.task.name}
                    </h4>
                    <p className="text-sm w-full">{timeEntry.summary}</p>
                  </div>
                  <div className="flex flex-0 items-center">
                    <span className="w-full py-1 font-bold text-xl">
                      {timeEntry.total_time}
                    </span>
                  </div>
                  <div className="flex flex-0 items-center">
                    <a
                      className="btn"
                      onClick={() => editBtnClicked(timeEntry.id)}
                    >
                      <PencilIcon className="size-6" />
                    </a>

                    <a
                      className="btn ml-2"
                      onClick={() => handleDeleteBtn(timeEntry.id)}
                    >
                      <TrashIcon className="size-6" />
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <dialog id="modal_create" className="modal">
        <div className="modal-box md:w-5/12 max-w-5xl">
          <h3 className="font-bold text-lg">Time Entry</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <TimeentryForm
            instanceData={formAddInitialValues}
            date={currentDate}
            onCreateSuccess={onCreateSuccess}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="modal_edit" className="modal">
        <div className="modal-box md:w-5/12 max-w-5xl">
          <h3 className="font-bold text-lg">Time Entry</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <TimeentryForm
            id={selectedId}
            instanceData={selectedData}
            date={currentDate}
            onCreateSuccess={onCreateSuccess}
            onUpdateSuccess={onUpdateSuccess}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Home
