import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { OnErrorCallback, OnSuccessCallback } from "../commons/types.ts"

export const useGetProfile = (id: number) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const url = `${API_URL}/user-profiles/${id}`
      const response = await axios.get(url)
      return response.data
    },
  })
}

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback
  onError: OnErrorCallback
}) => {
  return useMutation({
    mutationFn: (formData: unknown) => {
      // @ts-ignore
      const { id, ...values } = formData
      const url = `${API_URL}/user-profiles/${id}`
      return axios.patch(url, values)
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}
