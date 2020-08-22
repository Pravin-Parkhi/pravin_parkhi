import ActionTypes from './post.action-type'
import { apiAction } from '../../api/api.action-creator'

// GET POT LIST
export const getPostList = (params) => {
    return apiAction({
      method: 'GET',
      url: 'getPostList',
      onSuccess: getPostListSuccess,
      onFailure: getPostListFailure,
      label: ActionTypes.GET_POST_LIST,
      queryParams: params.queryParams
    })
}
export const getPostListSuccess = (response) => {
    return {
        type: ActionTypes.GET_POST_LIST_SUCCESS,
        response
    }
}
export const getPostListFailure = (response) => {
    return {
      type: ActionTypes.GET_POST_LIST_FAILURE,
      response
    }
}