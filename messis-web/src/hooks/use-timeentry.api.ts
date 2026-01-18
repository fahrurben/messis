import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useQuery } from "@tanstack/react-query"

const useGetTimeEntryByDate = (date = null) => {
  return useQuery({
    queryKey: ["time_entries", date],
    queryFn: async () => {
      const url = `${API_URL}/time-entries`

      const params = {}

      if (date) {
        params["date"] = search
      }

      const paramString = new URLSearchParams(params)
      const response = await axios.get(url + "?" + paramString)
      return response.data
    },
  })
}

export { useGetTimeEntryByDate }
