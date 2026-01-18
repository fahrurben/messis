import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useQuery } from "@tanstack/react-query"
import moment from "moment/moment"

const useGetTimeEntryByDate = (date = null) => {
  return useQuery({
    queryKey: ["time_entries", date],
    queryFn: async () => {
      const url = `${API_URL}/time-entries/get_entry_by_date`

      const params: Record<string, string> = {}

      if (date) {
        params["date"] = moment(date).format("YYYY-MM-DD")
      }

      const paramString = new URLSearchParams(params)
      const response = await axios.get(url + "?" + paramString)
      return response.data?.results
    },
    enabled: !!date,
  })
}

export { useGetTimeEntryByDate }
