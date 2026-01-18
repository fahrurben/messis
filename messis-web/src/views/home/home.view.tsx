import useAuthenticated from "../../hooks/use-authenticated.hook.ts"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import moment from "moment/moment"
import cn from "../../helpers/cn.ts"

const Home = () => {
  useAuthenticated()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [arrWeekDays, setArrWeekDays] = useState([])
  const [timeEntries, setTimeEntries] = useState([])

  useEffect(() => {
    let arrWeek = []

    for (let i = 1; i <= 7; i++) {
      const day = moment(currentDate).clone().weekday(i).toDate()
      arrWeek.push(day)
    }

    setArrWeekDays(arrWeek)

    const getCurrentTimeEntries = async () => {}
  }, [currentDate])

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold mr-auto">
          {moment(currentDate).format("dddd, D MMM")}
        </h1>
        <button className="btn" onClick={() => navigate("/projects/create")}>
          <PlusIcon class="size-6" />
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
      </div>
    </div>
  )
}

export default Home
