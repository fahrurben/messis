import { proxy, subscribe } from "valtio"
import { TOKEN_EXPIRATION_HOUR } from "../helpers/constant.js"
import axios from "axios"

const store = proxy(
  JSON.parse(localStorage.getItem("auth")) || {
    user: {},
    authToken: null,
    authExpiredAt: null,
  },
)

subscribe(store, () => {
  localStorage.setItem("auth", JSON.stringify(store))
})

const actions = {
  setToken: (token: string) => {
    store.authToken = token
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
