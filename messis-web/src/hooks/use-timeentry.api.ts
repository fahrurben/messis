import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useMutation, useQuery } from "@tanstack/react-query"
import moment from "moment/moment"
import type { OnErrorCallback, OnSuccessCallback } from "../commons/types.ts"

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

const useCreateTimeEntry = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback
  onError: OnErrorCallback
}) => {
  return useMutation({
    mutationFn: (formData: Record<string, unknown>) => {
      const url = `${API_URL}/time-entries`
      return axios.post(url, formData)
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}

export { useGetTimeEntryByDate, useCreateTimeEntry }
