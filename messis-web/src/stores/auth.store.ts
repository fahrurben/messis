import { proxy, subscribe } from "valtio"
import { TOKEN_EXPIRATION_HOUR } from "../helpers/constant.js"
import axios from "axios"
import { jwtDecode } from "jwt-decode"


const getInitialState = () => {

  const initialState = JSON.parse(localStorage.getItem("auth")) || {
    user: {},
    authToken: null,
    companyId: null,
    userId: null,
    authExpiredAt: null,
  }

  axios.defaults.headers.common["Authorization"] = "Bearer " + initialState.authToken

  return initialState
}

const store = proxy(getInitialState())

subscribe(store, () => {
  localStorage.setItem("auth", JSON.stringify(store))
})

const actions = {
  setToken: (token: string) => {
    const decoded = jwtDecode(token)
    store.authToken = token
    store.companyId = decoded.company_id
    store.userId = decoded.user_id
    store.authExpiredAt = new Date().getTime() + TOKEN_EXPIRATION_HOUR * 3600
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
  },
  removeToken: () => {
    store.authToken = null
    store.authExpiredAt = null
    axios.defaults.headers.common["Authorization"] = null
  },
}

export { actions, store }
