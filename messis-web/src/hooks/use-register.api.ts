import axios, { type AxiosResponse } from "axios"
import { API_URL } from "../helpers/constant"
import { useMutation, type UseMutationResult } from "@tanstack/react-query"
import type { FormLogin, LoginResponse } from "../commons/types.ts"

type UserRegisterProps = {
  onError?: (error: Error) => void
  onSuccess?: (data: LoginResponse) => void
}

const useRegister = ({ onError, onSuccess }: UserRegisterProps) => {
  const {
    mutate,
    isPending,
    isError,
    error,
  }: UseMutationResult<
    AxiosResponse<LoginResponse>,
    Error,
    FormLogin
  > = useMutation({
    mutationFn: (formData) => {
      return axios.post(`${API_URL}/register`, formData)
    },
    onSuccess: (data: AxiosResponse<LoginResponse>) => {
      onSuccess?.(data.data)
    },
    onError: (err) => {
      onError?.(err)
    },
  })

  const execute = (data: FormLogin) => {
    mutate(data)
  }

  return {
    execute,
    isPending,
    isError,
    error,
  }
}

export { useRegister }