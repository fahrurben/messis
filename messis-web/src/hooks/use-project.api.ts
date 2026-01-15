import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useMutation, useQuery } from "@tanstack/react-query"

const useGetAllProjects = (search = "") => {
  return useQuery({
    queryKey: ["projects", search],
    queryFn: async () => {
      let url = `${API_URL}/projects`

      let params = {}

      if (search) {
        params["search"] = search
      }

      const paramString = new URLSearchParams(params);
      let response = await axios.get(url + '?' + paramString)
      return response.data
    }
  })
}

export { useGetAllProjects }