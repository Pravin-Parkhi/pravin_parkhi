import apiActionTypes from '../api/api.action-type'

import postActionTypes from '../app/post/post.action-type'

const ACTION_TYPES = {
  ...apiActionTypes,
  ...postActionTypes,
}

export default ACTION_TYPES
