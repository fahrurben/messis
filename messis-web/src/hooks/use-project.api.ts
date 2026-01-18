import axios from "axios"
import { API_URL } from "../helpers/constant.js"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { OnErrorCallback, OnSuccessCallback } from "../commons/types.ts"

const useGetAllProjects = (search = "") => {
  return useQuery({
    queryKey: ["projects", search],
    queryFn: async () => {
      const url = `${API_URL}/projects`

      const params: Record<string, string> = {}

      if (search) {
        params["search"] = search
      }

      const paramString = new URLSearchParams(params)
      const response = await axios.get(url + "?" + paramString)
      return response.data
    },
  })
}

const useGetProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const url = `${API_URL}/projects/${id}`
      const response = await axios.get(url)
      return response.data
    },
    enabled: !!id,
  })
}

const useCreateProject = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback
  onError: OnErrorCallback
}) => {
  return useMutation({
    mutationFn: (formData: Record<string, unknown>) => {
      const url = `${API_URL}/projects`
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

const useUpdateProject = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback
  onError: OnErrorCallback
}) => {
  return useMutation({
    mutationFn: ({ id, ...formData }: Record<string, unknown>) => {
      const url = `${API_URL}/projects/${id}`
      return axios.patch(url, formData)
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (err) => {
      onError?.(err)
    },
  })
}

const useDeleteProject = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccessCallback
  onError: OnErrorCallback
}) => {
  return useMutation({
    mutationFn: (id) => {
      const url = `${API_URL}/projects/${id}`
      return axios.delete(url)
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (err) => {
      onError?.(err)
    },
  })
}

export {
  useGetAllProjects,
  useCreateProject,
  useGetProject,
  useUpdateProject,
  useDeleteProject,
}
