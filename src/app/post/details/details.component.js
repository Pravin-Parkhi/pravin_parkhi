import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SITE_ID } from '../../../constants/variables'
import { getPostDetails, getRelatedPostList } from '../post.action-creator'

import Post from '../../../common/post/post.component'
import Loader from '../../../common/loader/loader.component'

import './details.component.scss'

function PostDetails (props) {
  const { getPostDetails, getRelatedPostList, postDetails, match, isLoading} = props

  const fetchPostDetails = () => {
    const { postId } = match.params
    getPostDetails({
      queryParams: {
        postId,
        siteId: SITE_ID
      }
    })
  }

  const fetchRelatedPostList = () => {
    const { postId } = match.params
    getRelatedPostList({
      queryParams: {
        postId,
        siteId: SITE_ID
      }
    })
  }
  
  const renderMainContent = () => {
    return (<div className='main-content-wrapper'>
      {postDetails && <Post data={postDetails} showFullPost={true} />}
      <div className='related-post-list'>
        <p className='section-heading'>You might also like</p>
        <div className='list'></div>
      </div>
    </div>)
  }

  useEffect(()=> {
    fetchPostDetails()
    fetchRelatedPostList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='post-details-container'>
      {isLoading ? <Loader /> : renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isLoading: state.post.isLoading,
    postDetails: state.post.postDetails
  }
}

export default (connect(mapStateToProps, { getPostDetails, getRelatedPostList })(PostDetails))