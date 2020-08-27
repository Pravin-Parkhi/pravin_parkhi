import ActionType from './post.action-type'

const defaultState = {
  isLoading: true,
  postList: []
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    // Get site posts
    case ActionType.GET_POST_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.GET_POST_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        totalPosts: action.response.found,
        postList: action.response.posts
      }
    }
    case ActionType.GET_POST_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        getPostListFailure: action.response
      }
    }

    // Get site posts
    case ActionType.lOAD_MORE_POST_LIST: {
      return {
        ...state,
      }
    }
    case ActionType.lOAD_MORE_POST_LIST_SUCCESS: {
      return {
        ...state,
        totalPosts: action.response.found,
        postList: [...state.postList, ...action.response.posts]
      }
    }
    case ActionType.lOAD_MORE_POST_LIST_FAILURE: {
      return {
        ...state,
        loadMorePostListFailure: action.response
      }
    }

    // Get site post details
    case ActionType.GET_POST_DETAILS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.GET_POST_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        postDetails: action.response
      }
    }
    case ActionType.GET_POST_DETAILS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        getPostDetailsFailure: action.response
      }
    }

    // Get related post list
    case ActionType.GET_RELATED_POST_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.GET_RELATED_POST_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        relatedPostList: action.response
      }
    }
    case ActionType.GET_RELATED_POST_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        getRelatedPostListFailure: action.response
      }
    }

    default:
      return state
  }
};

export default appReducer;