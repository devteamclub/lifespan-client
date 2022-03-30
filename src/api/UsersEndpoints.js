import { publicApi, predictionsApi } from '@/plugins/axios'

const PERSONAL_HANDLER = 'v1/personal'
const PREDICTION_HANDLER = 'v1/prediction'
const ADMIN_PREDICTION_HANDLER = 'v1/admin/prediction'

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

export const updatePrediction = async(prediction) => {
  try {
    const { data } = await predictionsApi.put(`${ADMIN_PREDICTION_HANDLER}/events/${prediction.id}`, prediction)
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
