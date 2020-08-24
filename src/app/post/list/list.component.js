import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getPostList } from '../post.action-creator'
import { SITE_ID } from '../../../constants/variables'

import Post from '../../../common/post/post.component'
import Loader from '../../../common/loader/loader.component'
import Filters from '../../../common/filters/filters.component'
import emptyStateGif from '../../../assets/images/empty-state.gif'

import './list.component.scss'

function PostList (props) {
  const [ showLoader, setLoader ] = useState(false)

  const { postList } = props

  const renderPostList = () => {  
    if(postList && postList.length){
      return(
        <div className='post-list'>
          {postList.map(post => <Post key={post.ID} data={post} showFullPost={false} />)}
        </div>
      )
    }

    return renderEmptyState() 
  }

  const renderEmptyState = () => {
    return(
      <div className='empty-state-wrapper'>
        <img src={emptyStateGif} alt='No Post'></img>
      </div>
    )
  }

  const renderMainContent = () => {
    return(
      <div className='main-content'>
        <Filters />
        {renderPostList()}
      </div>
    )
  }

  return (
    <div className='post-list-container'>
      {showLoader ? <Loader /> : renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    postList: state.post.postList
  }
}

export default (connect(mapStateToProps, null)(PostList))