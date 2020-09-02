import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { SITE_ID } from '../../../constants/variables'
import { getPostDetails, getRelatedPostList } from '../post.action-creator'

import moment from 'moment'
import Post from '../../../common/post/post.component'
import Loader from '../../../common/loader/loader.component'

import './details.component.scss'

function PostDetails (props) {
  const { getPostDetails, getRelatedPostList, history } = props
  const { postDetails, match, isLoading, relatedPostList} = props

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

  const renderRelatedPost = (post) => {
    const { title, post_thumbnail, date } = post
    
    return(
      <div key={post.ID} className='related-post-wrapper'>
        <img
          src={post_thumbnail.URL}
          alt='Post Thumbnail'
          className='post-thumbnail'
        />
        <Link to={`/post-list/${post.ID}/details`}>{title}</Link>
        {/* <h3 className='title' onClick={()=> handleClick(post)}>{title}</h3> */}
        <p className='date'>{moment(date).format('LL')}</p>
      </div>
    )
  }
  
  const renderMainContent = () => {
    return (<div className='main-content-wrapper'>
      {postDetails && <Post data={postDetails} showFullPost={true} />}
      <div className='related-post-list'>
        <p className='section-heading'>You might also like</p>
        <div className='list'>
          {relatedPostList.length ? relatedPostList.map(post => renderRelatedPost(post)) : null}
        </div>
      </div>
    </div>)
  }

  useEffect(()=> {
    fetchPostDetails()
    fetchRelatedPostList()
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location])

  return (
    <div className='post-details-container'>
      {isLoading ? <Loader /> : renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isLoading: state.post.isLoading,
    postDetails: state.post.postDetails,
    relatedPostList: state.post.relatedPostList
  }
}

export default (connect(mapStateToProps, { getPostDetails, getRelatedPostList })(PostDetails))