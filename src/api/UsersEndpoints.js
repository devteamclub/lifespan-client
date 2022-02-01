import { publicApi } from '@/plugins/axios'

const PERSONAL_HANDLER = 'v1/personal'
const PREDICTION_HANDLER = 'v1/prediction'

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

export const getUserPredictionEvents = async() => {
  try {
    const { data } = await publicApi.get(`${PREDICTION_HANDLER}/events`)
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
