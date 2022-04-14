import { publicApi, predictionsApi } from '@/plugins/axios'

const PERSONAL_HANDLER = 'v1/personal'
const PREDICTION_HANDLER = 'v1/prediction'
const V1 = 'v1'

export const getPersonalChapters = async(userId) => {
  try {
    const { data } = await publicApi.get(`${PERSONAL_HANDLER}/${userId}/chapters`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const getPersonalEvents = async(userId) => {
  try {
    const { data } = await publicApi.get(`${PERSONAL_HANDLER}/${userId}/events`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const getUserPredictionEvents = async(userId) => {
  try {
    const { data } = await predictionsApi.get(`${PREDICTION_HANDLER}/events/${userId}`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const updatePrediction = async(userId, prediction) => {
  try {
    const { data } = await predictionsApi.post(`${PREDICTION_HANDLER}/events/${userId}`, prediction)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const getUser = async(userId) => {
  try {
    const { data } = await publicApi.get(`${PERSONAL_HANDLER}/${userId}`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const setPredictionRating = async(predictionId, rating) => {
  try {
    const { data } = await predictionsApi.post(`${PREDICTION_HANDLER}/rating/${predictionId}`, rating)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

export const getUserSettings = async(userId) => {
  try {
    const { data } = await predictionsApi.get(`${V1}/settings/${userId}`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}

// export const userLogin = async(messageData) => {
//   try {
//     const { data } = await publicApi.post('https://api.plush.dev/user/auth/login', messageData)
//     return { data, error: null }
//   } catch ({ response }) {
//     return {
//       data: null,
//       error: {
//         text: response.data,
//         status: response.status
//       }
//     }
//   }
// }

export const userLogin = async(messageData) => {
  const response = await fetch('https://api.plush.dev/user/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(messageData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}

export const getUserProfile = async() => {
  const response = await fetch('https://api.plush.dev/user/users/profile', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}

export const getNonce = async(walletAddress) => {
  try {
    const { data } = await publicApi.get(`https://api.plush.dev/user/auth/nonce/${walletAddress}`)
    return { data, error: null }
  } catch ({ response }) {
    return {
      data: null,
      error: {
        text: response.data,
        status: response.status
      }
    }
  }
}
