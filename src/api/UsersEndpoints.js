import { publicApi, predictionsApi, plushApi } from '@/plugins/axios'
import { formatUserDatesForBE, formatUserDatesForFE } from './dateHelper'

const PERSONAL_HANDLER = 'v1/personal'
const PREDICTION_HANDLER = 'v1/prediction'
const PLUSH_USER_HANDLER = 'user'
const V1 = 'v1'

export const getPersonalChapters = async() => {
  try {
    const { data } = await publicApi.get(`${PERSONAL_HANDLER}/chapters`)
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

export const getPersonalEvents = async() => {
  try {
    const { data } = await publicApi.get(`${PERSONAL_HANDLER}/events`)
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
    const { data } = await predictionsApi.get(`${PREDICTION_HANDLER}/events`)
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
    const { data } = await predictionsApi.post(`${PREDICTION_HANDLER}/events`, prediction)
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

export const getUser = async() => {
  try {
    const { data } = await publicApi.get(PERSONAL_HANDLER)
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

export const getUserSettings = async() => {
  try {
    const { data } = await predictionsApi.get(`${V1}/settings`)
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
    const { data } = await plushApi.post(`${PLUSH_USER_HANDLER}/auth/login`, messageData)
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
    const { data } = await plushApi.get(`${PLUSH_USER_HANDLER}/users/profile`)
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
    const { data } = await plushApi.get(`${PLUSH_USER_HANDLER}/auth/nonce/${walletAddress}`)
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

export const checkUserExist = async() => {
  try {
    const { data } = await publicApi.get(`${V1}/user`)
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

export const registrationNewUser = async(child) => {
  const newUser = {
    birthday: child.dateOfBirth,
    gender: child.gender === 'MALE' ? 'M' : 'F',
    id: 0,
    location: {
      address: '',
      city: '',
      continent: '',
      country: child.country,
      id: 0
    },
    name: child.name,
    race: ''
  }
  formatUserDatesForBE(newUser)
  try {
    const { data } = await publicApi.post(`${V1}/registration`, newUser)
    formatUserDatesForFE(data)
    data.gender = data.gender === 'M' ? 'MALE' : 'FEMALE'
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
