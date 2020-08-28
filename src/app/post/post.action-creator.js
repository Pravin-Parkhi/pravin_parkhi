import ActionTypes from './post.action-type'
import { apiAction } from '../../api/api.action-creator'

// GET POST LIST
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

// LOAD MORE POST
export const loadMorePosts = (params) => {
  return apiAction({
    method: 'GET',
    url: 'getPostList',
    onSuccess: loadMorePostListSuccess,
    onFailure: loadMorePostListFailure,
    label: ActionTypes.lOAD_MORE_POST_LIST,
    queryParams: params.queryParams
  })
}
export const loadMorePostListSuccess = (response) => {
  return {
      type: ActionTypes.lOAD_MORE_POST_LIST_SUCCESS,
      response
  }
}
export const loadMorePostListFailure = (response) => {
  return {
    type: ActionTypes.lOAD_MORE_POST_LIST_FAILURE,
    response
  }
}

// GET POST DETAILS
export const getPostDetails = (params) => {
  return apiAction({
    method: 'GET',
    url: 'getPostDetails',
    onSuccess: getPostDetailsSuccess,
    onFailure: getPostDetailsFailure,
    label: ActionTypes.GET_POST_DETAILS,
    queryParams: params.queryParams
  })
}
export const getPostDetailsSuccess = (response) => {
  return {
      type: ActionTypes.GET_POST_DETAILS_SUCCESS,
      response
  }
}
export const getPostDetailsFailure = (response) => {
  return {
    type: ActionTypes.GET_POST_DETAILS_FAILURE,
    response
  }
}

// GET RELATED POST LIST
export const getRelatedPostList = (params) => {
  return apiAction({
    method: 'POST',
    url: 'getRelatedPostList',
    onSuccess: getRelatedPostListSuccess,
    onFailure: getRelatedPostListFailure,
    label: ActionTypes.GET_RELATED_POST_LIST,
    queryParams: params.queryParams
  })
}
export const getRelatedPostListSuccess = (response) => {
  return {
      type: ActionTypes.GET_RELATED_POST_LIST_SUCCESS,
      response
  }
}
export const getRelatedPostListFailure = (response) => {
  return {
    type: ActionTypes.GET_RELATED_POST_LIST_FAILURE,
    response
  }
}
