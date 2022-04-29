import ax from 'axios'
import store from '../store'

// Public  API
const publicApi = ax.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

publicApi.interceptors.request.use(
  async config => {
    config.headers['X-Auth-Token'] = store.getters.getUserMetamaskAddress
    return config
  },

  error => {
    return Promise.reject(error)
  }
)

publicApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)

// Predictions  API
const predictionsApi = ax.create({
  baseURL: `${process.env.VUE_APP_P_API_URL}/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

predictionsApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)

const plushApi = ax.create({
  baseURL: `${process.env.VUE_APP_PLUSH_API_URL}/`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

plushApi.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && error.response.status !== 404) {
      console.error(error.response.data)
    }

    return Promise.reject(error)
  }
)

export { publicApi, predictionsApi, plushApi }
