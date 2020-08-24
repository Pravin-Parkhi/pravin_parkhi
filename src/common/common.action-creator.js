import ActionTypes from './common.action-type'
import { apiAction } from '../api/api.action-creator'

// GET BLOG CATEGORY LIST
export const getBlogCategoryList = (params) => {
    return apiAction({
      method: 'GET',
      url: 'getBlogCategoryList',
      onSuccess: getBlogCategoryListSuccess,
      onFailure: getBlogCategoryListFailure,
      label: ActionTypes.GET_BLOG_CATEGORY_LIST,
      queryParams: params.queryParams
    })
  }
  export const getBlogCategoryListSuccess = (response) => {
    return {
        type: ActionTypes.GET_BLOG_CATEGORY_LIST_SUCCESS,
        response
    }
  }
  export const getBlogCategoryListFailure = (response) => {
    return {
      type: ActionTypes.GET_BLOG_CATEGORY_LIST_FAILURE,
      response
    }
  }
  
  // GET BLOG TAG LIST
  export const getBlogTagList = (params) => {
    return apiAction({
      method: 'GET',
      url: 'getBlogTagList',
      onSuccess: getBlogTagListSuccess,
      onFailure: getBlogTagListFailure,
      label: ActionTypes.GET_BLOG_TAG_LIST,
      queryParams: params.queryParams
    })
  }
  export const getBlogTagListSuccess = (response) => {
    return {
        type: ActionTypes.GET_BLOG_TAG_LIST_SUCCESS,
        response
    }
  }
  export const getBlogTagListFailure = (response) => {
    return {
      type: ActionTypes.GET_BLOG_TAG_LIST_FAILURE,
      response
    }
  }