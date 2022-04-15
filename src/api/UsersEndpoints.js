import { publicApi, predictionsApi, plushApi } from '@/plugins/axios'

const PERSONAL_HANDLER = 'v1/personal'
const PREDICTION_HANDLER = 'v1/prediction'
const PLUSH_USER = 'user'
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

export const userLogin = async(messageData) => {
  try {
    const { data } = await plushApi.post(`${PLUSH_USER}/auth/login`, messageData)
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

export const getUserProfile = async() => {
  try {
    const { data } = await plushApi.get(`${PLUSH_USER}/users/profile`)
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

export const getNonce = async(walletAddress) => {
  try {
    const { data } = await plushApi.get(`${PLUSH_USER}/auth/nonce/${walletAddress}`)
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
