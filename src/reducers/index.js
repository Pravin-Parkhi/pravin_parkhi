import { combineReducers } from 'redux'

import postReducer from '../app/post/post.reducer'

const rootReducer = combineReducers({
  post: postReducer
})

export default rootReducer
