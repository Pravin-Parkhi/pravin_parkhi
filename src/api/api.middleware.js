import axios from 'axios'
import ActionTypes from '../constants/action-type'
import { apiStart, apiEnd } from '../api/api.action-creator'
import { apis } from '../api/api.constants'
import { camelToSnake } from '../utils/string.utils'
import { transformObjectKeys, deepCopy } from '../utils/object.utils'
import { regex } from '../utils/validation.utils'

export const baseURL = `${apis.baseUrl}/`

function replaceEmbeddedUrlParam (requestUrl, requestData) {
  const regExp = regex.stringBetweenCurlyBraces
  while (requestUrl.match(regExp)) {
    const matchData = requestUrl.match(regExp)
    requestUrl = requestUrl.replace(matchData[0], requestData[matchData[1]])
    delete requestData[matchData[1]]
  }
  const returnUrl = requestUrl

  return returnUrl
}

function jsonToQueryString (queryParams) {
  if (Object.keys(queryParams).length) {
    return '?' +
    Object.keys(queryParams).map((key) => {
      if (Array.isArray(queryParams[key])) {
        var str = ''
        queryParams[key].forEach(function (item) {
          str += `${encodeURIComponent(key)}=${encodeURIComponent(item)}&`
        })
        return str
      } else {
        const queryParamsValue = queryParams[key]
        if (queryParamsValue !== undefined) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        }
      }
    }).join('&')
  }
  return ''
}

function getRequestURL (url, queryParams, method) {
  if(method === 'GET'){
    let requestUrl = `${baseURL}${apis[url]}`
    if (queryParams && Object.keys(queryParams).length) {
      requestUrl = replaceEmbeddedUrlParam(requestUrl, queryParams)
      const snakeCaseParams = transformObjectKeys(queryParams, camelToSnake)
      requestUrl += jsonToQueryString(snakeCaseParams)
    }
  
    return requestUrl
  } else {
    return `http://localhost:3000/${apis[url]}`
  }
}

const apiMiddleware = ({ dispatch }) => next => action => {
  if (!action.type) return
  next(action)

  if (action.type !== ActionTypes.API) return
  let {
    url,
    method,
    body,
    queryParams,
    onSuccess,
    onFailure,
    label,
    headers = {},
  } = action.payload
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data'

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  if (label) {
    dispatch(apiStart(label, body))
  }

  const queryParamsCopy = deepCopy(queryParams)
  const requestURL = getRequestURL(url, queryParamsCopy, method)

  // Change object keys casing
  body = transformObjectKeys(body, camelToSnake)
  queryParams = transformObjectKeys(queryParams, camelToSnake)

  axios
    .request({
      url: requestURL,
      method,
      headers,
      [dataOrParams]: body
    })
    .then((response) => {
      const successResponse = response.data
      dispatch(onSuccess(successResponse))
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data.error
        dispatch(onFailure(errorResponse))
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label))
      }
    })
}

export default apiMiddleware
