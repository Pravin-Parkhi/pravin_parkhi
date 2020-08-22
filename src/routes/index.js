import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import PostList from '../app/post/list/list.component'
import PostDetails from '../app/post/details/details.component'
import BaseLayout from '../common/base-layout/base-layout.component'


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' render={() => (<Redirect to='/post-list' />)} /> 
          <Route exact path='/post-list' component={PostList} />
          <Route exact path='/post-list/:postId/details' component={PostDetails} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}