import { combineReducers } from 'redux'

import commonReducer from '../common/common.reducer'
import postReducer from '../app/post/post.reducer'

const rootReducer = combineReducers({
  post: postReducer,
  common: commonReducer
})

export default rootReducer
