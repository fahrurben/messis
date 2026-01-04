import { useLocation, useNavigate } from "react-router"

import { store as authStore } from "../stores/auth.store"
import { useSnapshot } from "valtio/react"
import { useEffect } from "react"

const NOT_SECURED_ROUTES = ["/login", "/register"]

const useAuthenticated = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { authToken } = useSnapshot(authStore)

  useEffect(() => {
    if (authToken === null && !NOT_SECURED_ROUTES.includes(location.pathname)) {
      navigate("/login")
    }
  }, [])

  return {
    isAuthenticated: !!authToken,
  }
}

export default useAuthenticated
