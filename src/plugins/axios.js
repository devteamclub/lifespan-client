import ax from 'axios'

// Public  API
const publicApi = ax.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
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

export { publicApi, predictionsApi }
