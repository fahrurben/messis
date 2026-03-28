import { useLocation, useNavigate } from "react-router"

import { store as authStore } from "../stores/auth.store"
import { useSnapshot } from "valtio/react"
import { useEffect } from "react"
import axios from "axios"

const NOT_SECURED_ROUTES = ["/login", "/register"]

const useAuthenticated = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { authToken, authExpiredAt } = useSnapshot(authStore)

  let now = new Date().getTime()

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken

    if (
      (authToken === null || now > authExpiredAt) &&
      !NOT_SECURED_ROUTES.includes(location.pathname)
    ) {
      navigate("/login")
    }
  }, [])

  return {
    isAuthenticated: !!authToken && now < authExpiredAt,
  }
}

export default useAuthenticated
