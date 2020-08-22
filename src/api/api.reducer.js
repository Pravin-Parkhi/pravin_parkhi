import ActionType from '../constants/action-type'

export const initialState = {
  isServerError: false
}

const app = (state = initialState, action) => {
  if (!action.type) {
    console.log('Payload missing a type!', action)
  }

  switch (action.type) {
    case ActionType.API_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.API_END: {
      return {
        ...state,
        isLoading: false
      }
    }
    case ActionType.API_ERROR: {
      return {
        ...state,
        isLoading: false,
        isServerError: true
      }
    }
    case ActionType.CLEAR_SERVER_ERROR: {
      return {
        ...state,
        isServerError: false
      }
    }

    default: {
      return state
    }
  }
}

export default app
