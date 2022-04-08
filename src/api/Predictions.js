import { predictionsApi } from '@/plugins/axios'

const PREDICTION_HANDLER = 'v1/prediction'

export const getPredictionsCategories = async() => {
  try {
    const { data } = await predictionsApi.get(`${PREDICTION_HANDLER}/categories`)
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

export const getPredictionsByCategories = async(userId, categoriesIds) => {
  const categories = categoriesIds?.length ? `?cats=${categoriesIds}` : ''
  try {
    const { data } = await predictionsApi.get(`${PREDICTION_HANDLER}/events/${userId}${categories}`)
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
