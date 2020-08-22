import ActionType from './post.action-type'

const defaultState = {
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

    default:
      return state
  }
};

export default appReducer;