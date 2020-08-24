import { zipObject } from 'lodash'

const ACTION_TYPES = [
    'GET_POST_LIST',
    'GET_POST_LIST_SUCCESS',
    'GET_POST_LIST_FAILURE',

    'GET_POST_DETAILS',
    'GET_POST_DETAILS_SUCCESS',
    'GET_POST_DETAILS_FAILURE',

    'GET_RELATED_POST_LIST',
    'GET_RELATED_POST_LIST_SUCCESS',
    'GET_RELATED_POST_LIST_FAILURE'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)