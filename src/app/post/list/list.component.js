import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getPostList } from '../post.action-creator'
import { SITE_ID } from '../../../constants/variables'
import { deepCopy } from '../../../utils/object.utils'
import { getBlogCategoryList, getBlogTagList } from '../../../common/common.action-creator'

import Post from '../../../common/post/post.component'
import Loader from '../../../common/loader/loader.component'
import Filters from '../../../common/filters/filters.component'
import emptyStateGif from '../../../assets/images/empty-state.gif'

import './list.component.scss'

function PostList (props) {
  let [ categoryFilters, setCategoryFilter ] = useState([])
  let [ tagFilters, setTagFilter ] = useState([])
  let [ currentPage, setCurrentPage ] = useState(1)
  let [ showLoader, setLoader ] = useState(false)

  const { postList, tagList, categoryList } = props
  const { getPostList, getBlogTagList, getBlogCategoryList } = props

  const fetchPostList = (initialPage) => {
    getPostList({
      queryParams: {
        siteId: SITE_ID,
        number: 25,
        page: initialPage || currentPage,
        tag: getSelectedTags().length ? getSelectedTags() : undefined,
        category: getSelectedCategories().length ? getSelectedCategories() : undefined
      }
    })
  }

  const fetchCategoryList = () => {
    getBlogCategoryList({
      queryParams: {
        siteId: SITE_ID
      }
    })
  }

  const fetchTagList = () => {
    getBlogTagList({
      queryParams: {
        siteId: SITE_ID
      }
    })
  }

  const handleLoadMoreClick = () => {
    setCurrentPage(currentPage++)
  }

  const handleCategoryChange = (category) => {
    let categoryFiltersCopy = deepCopy(categoryFilters)
    for(let catIdx=0; catIdx<categoryFiltersCopy.length; catIdx++){
      let currentCategory = categoryFiltersCopy[catIdx]
      if(currentCategory.id === category.id){
        currentCategory.isSelected = !currentCategory.isSelected
        break
      }
    }
    setCategoryFilter(categoryFiltersCopy)
  }

  const handleTagChange = (tag) => {
    let tagFiltersCopy = deepCopy(tagFilters)
    for(let tagIdx=0; tagIdx<tagFiltersCopy.length; tagIdx++){
      let currentTag = tagFiltersCopy[tagIdx]
      if(currentTag.id === tag.id){
        currentTag.isSelected = !currentTag.isSelected
        break
      }
    }
    setTagFilter(tagFiltersCopy)
  }

  const constructCategoryFilters = () => {
    let filters = []
    categoryList.forEach(category => {
      filters.push({id: category.ID, label: category.name, slug: category.slug, isSelected: false})
    })
    setCategoryFilter(filters)
  }

  const constructTagFilters = () => {
    let filters = []
    tagList.forEach(tag => {
      filters.push({id: tag.ID, label: tag.name, slug: tag.slug, isSelected: false})
    })
    setTagFilter(filters)
  }

  const getSelectedTags = () => {
    let activeTags = []
    tagFilters.forEach(tag => {
      if (tag.isSelected) {
        activeTags.push(tag.slug)
      }
    })
    return activeTags
  }

  const getSelectedCategories = () => {
    let activeCategories = []
    categoryFilters.forEach(category => {
      if (category.isSelected) {
        activeCategories.push(category.slug)
      }
    })
    return activeCategories
  }

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
        <>
          <Filters
            {...props}
            tagFilters={tagFilters}
            categoryFilters={categoryFilters}
            onCategoryChangeCallback={(filter)=> handleCategoryChange(filter)}
            onTagChangeCallback={(filter)=> handleTagChange(filter)}
          />
          {renderPostList()}
        </>
        <div className='button-wrapper'>
          <div className='load-more-button' onClick={handleLoadMoreClick}>Load More</div>
        </div>
      </div>
    )
  }

  useEffect(()=> {
    fetchCategoryList()
    fetchTagList()
  }, [])

  useEffect(()=> {
    constructCategoryFilters()
  }, [categoryList])

  useEffect(()=> {
    constructTagFilters()
  }, [tagList])

  useEffect(()=> {
    if(categoryFilters.length && tagFilters.length){
      fetchPostList(1)
    }
  }, [categoryFilters, tagFilters])

  useEffect(()=> {
    if(categoryFilters.length && tagFilters.length){
      fetchPostList()
    }
  }, [currentPage])

  return (
    <div className='post-list-container'>
      {showLoader ? <Loader /> : renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    postList: state.post.postList,
    tagList: state.common.blogTagList,
    totalPosts: state.post.totalPosts,
    showFilters: state.common.showFilters,
    categoryList: state.common.blogCategoryList
  }
}

export default (connect(mapStateToProps, { getPostList, getBlogTagList, getBlogCategoryList })(PostList))