import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostList } from '../post.action-creator'

import emptyStateGif from '../../../assets/images/empty-state.gif'
import Loader from '../../../common/loader/loader.component'
import Post from '../../../common/post/post.component'

import './list.component.scss'

function PostList (props) {
  const [ showLoader, setLoader ] = useState(false)

  const { getPostList , postList} = props

  const fetchPostList = () => {
    getPostList({
      queryParams: {
        siteId: '107403796'
      }
    })
  }
  console.log(postList)
  const renderPostList = () => {  
    if(postList && postList.length){
      return(
        <div className='post-list'>
          {postList.map(post => <Post key={post.ID} data={post} />)}
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
        {renderPostList()}
      </div>
    )
  }

  useEffect(()=> {
    fetchPostList()
  }, [])

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

export default (connect(mapStateToProps, { getPostList })(PostList))