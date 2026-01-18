import useAuthenticated from "../../hooks/use-authenticated.hook.ts"
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import moment from "moment/moment"
import cn from "../../helpers/cn.ts"
import { useGetTimeEntryByDate } from "../../hooks/use-timeentry.api.ts"

const Home = () => {
  useAuthenticated()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [arrWeekDays, setArrWeekDays] = useState([])

  useEffect(() => {
    let arrWeek = []
    const firstDayOfWeek = moment(currentDate).clone().startOf("week")

    for (let i = 0; i < 7; i++) {
      const day = firstDayOfWeek.clone().add(i, "d").toDate()
      arrWeek.push(day)
    }

    setArrWeekDays(arrWeek)
  }, [currentDate])

  const { data: timeEntries = [] } = useGetTimeEntryByDate(currentDate)

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold mr-auto">
          {moment(currentDate).format("dddd, D MMM")}
        </h1>
        <button className="btn" onClick={() => navigate("/projects/create")}>
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
                      {timeEntry.total_time_in_string}
                    </span>
                  </div>
                  <div className="flex flex-0 items-center">
                    <a className="btn">
                      <PencilIcon className="size-6" />
                      Edit
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home
