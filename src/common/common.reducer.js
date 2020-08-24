import ActionType from './common.action-type'

const defaultState = {
  blogTagList: [],
  blogCategoryList: []
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    // Get blog category list
    case ActionType.GET_BLOG_CATEGORY_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.GET_BLOG_CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blogCategoryList: action.response.categories
      }
    }
    case ActionType.GET_BLOG_CATEGORY_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        getBlogCategoryListFailure: action.response
      }
    }

    // Get related post list
    case ActionType.GET_BLOG_TAG_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.GET_BLOG_TAG_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blogTagList: action.response.tags
      }
    }
    case ActionType.GET_BLOG_TAG_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        getBlogTagListFailure: action.response
      }
    }

    default:
      return state
  }
};

export default appReducer;