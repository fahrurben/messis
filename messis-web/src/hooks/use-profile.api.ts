import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetProfile = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      let url = `${API_URL}/user-profiles/${id}`
      console.log(axios.defaults.headers.common["Authorization"])
      let response = await axios.get(url)
      return response.data
    },
  })
}
