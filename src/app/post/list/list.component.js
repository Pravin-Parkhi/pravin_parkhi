import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getPostList, loadMorePosts } from '../post.action-creator'
import { SITE_ID } from '../../../constants/variables'
import { deepCopy } from '../../../utils/object.utils'
import { getBlogCategoryList, getBlogTagList } from '../../../common/common.action-creator'

import Post from '../../../common/post/post.component'
import Loader from '../../../common/loader/loader.component'
import Filters from '../../../common/filters/filters.component'
import emptyStateGif from '../../../assets/images/empty-state.gif'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import ButtonLoader from '../../../common/button-loader/button-loader.component'

import './list.component.scss'

function PostList (props) {
  const { width } = useWindowDimensions()
  const isMobileView = width<768
  let [ categoryFilters, setCategoryFilter ] = useState([])
  let [ tagFilters, setTagFilter ] = useState([])
  let [ currentPage, setCurrentPage ] = useState(1)
  let [ showLoadMoreLoader, setLoadMoreLoader ] = useState(false)

  const { postList, tagList, categoryList, isLoading } = props
  const { getPostList, getBlogTagList, loadMorePosts, getBlogCategoryList } = props

  const fetchMorePostList = () => {
    loadMorePosts({
      queryParams: {
        siteId: SITE_ID,
        number: 25,
        page: currentPage,
        tag: getSelectedTags().length ? getSelectedTags() : undefined,
        category: getSelectedCategories().length ? getSelectedCategories() : undefined
      }
    })
  }
  
  const fetchPostList = (initialPage) => {
    getPostList({
      queryParams: {
        siteId: SITE_ID,
        number: 25,
        page: 1,
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
        <div className='post-list' style={{paddingLeft: isMobileView ? '0px' : '300px'}}>
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
            isMobileView={isMobileView}
            categoryFilters={categoryFilters}
            onCategoryChangeCallback={(filter)=> handleCategoryChange(filter)}
            onTagChangeCallback={(filter)=> handleTagChange(filter)}
          />
          {isLoading ? <Loader /> : renderPostList()}
        </>
        {postList.length ? <div className='button-wrapper' style={{paddingLeft: isMobileView ? '0px' : '300px'}}>
          {showLoadMoreLoader ? 
            <ButtonLoader /> 
            : <div className='load-more-button' onClick={handleLoadMoreClick}>Load More</div>}
        </div> : null}
      </div>
    )
  }

  useEffect(()=> {
    fetchCategoryList()
    fetchTagList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=> {
    constructCategoryFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList])

  useEffect(()=> {
    constructTagFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagList])

  useEffect(()=> {
    if(categoryFilters.length && tagFilters.length){
      fetchPostList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilters, tagFilters])

  useEffect(()=> {
    if(categoryFilters.length && tagFilters.length){
      setLoadMoreLoader(true)
      fetchMorePostList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(()=> {
    if(showLoadMoreLoader){
      setLoadMoreLoader(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postList])

  return (
    <div className='post-list-container'>
      {renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isLoading: state.post.isLoading,
    postList: state.post.postList,
    tagList: state.common.blogTagList,
    totalPosts: state.post.totalPosts,
    showFilters: state.common.showFilters,
    categoryList: state.common.blogCategoryList
  }
}

export default (connect(mapStateToProps, { getPostList, getBlogTagList, loadMorePosts, getBlogCategoryList })(PostList))