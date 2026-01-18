import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useQuery } from "@tanstack/react-query"
import type { Team } from "../commons/types.ts"

const useGetAllTeams = (search = "") => {
  return useQuery<Team[], Error>({
    queryKey: ["teams", search],
    queryFn: async () => {
      const url = `${API_URL}/teams`

      const params: Record<string, string> = {}

      if (search) {
        params["search"] = search
      }

      const paramString = new URLSearchParams({ ...params })
      const response = await axios.get(url + "?" + paramString)
      return response.data?.results
    },
  })
}

export { useGetAllTeams }
