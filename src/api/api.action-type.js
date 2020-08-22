import { zipObject } from 'lodash'

const ACTION_TYPES = [
  'API',
  'API_START',
  'API_END',
  'ACCESS_DENIED',
  'API_ERROR',
  'CLEAR_SERVER_ERROR'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)
