import ax from 'axios'
import store from '../store'

// External
const externalApi = ax.create()

externalApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)

// Private API
const privateApi = ax.create({
  baseURL: `${process.env.VUE_APP_API_URL}/private`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
privateApi.interceptors.request.use(
  async config => {
    const user = store.getters.getUser
    const token = await user.getIdToken()
    config.headers['X-Auth-Token'] = token

    return config
  },

  error => {
    return Promise.reject(error)
  }
)

privateApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)

// Public  API
const publicApi = ax.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

publicApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)
export { externalApi, privateApi, publicApi }
