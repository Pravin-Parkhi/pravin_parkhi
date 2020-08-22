import ActionTypes from '../constants/action-type'

export const apiStart = (label, request) => ({
  type: ActionTypes[label],
  request: request
})

export const apiEnd = label => ({
  type: ActionTypes.API_END,
  payload: label
})

export const accessDenied = url => ({
  type: ActionTypes.ACCESS_DENIED,
  payload: {
    url
  }
})

export const apiError = error => ({
  type: ActionTypes.API_ERROR,
  error
})

export const clearServerError = () => ({
  type: ActionTypes.CLEAR_SERVER_ERROR
})

export function apiAction ({
  url = '',
  method = 'GET',
  body = null,
  queryParams = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = ''
}) {
  return {
    type: ActionTypes.API,
    payload: {
      url,
      method,
      body,
      queryParams,
      onSuccess,
      onFailure,
      label
    }
  }
}
