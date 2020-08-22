import { zipObject } from 'lodash'

const ACTION_TYPES = [
    'GET_POST_LIST',
    'GET_POST_LIST_SUCCESS',
    'GET_POST_LIST_FAILURE'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)