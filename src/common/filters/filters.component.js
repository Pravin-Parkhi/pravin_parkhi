import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { deepCopy } from '../../utils/object.utils'
import { SITE_ID } from '../../constants/variables'
import { getPostList } from '../../app/post/post.action-creator'
import { getBlogCategoryList, getBlogTagList } from '../common.action-creator'

import Checkbox from '../checkbox/checkbox.component'

import './filters.component.scss'

function Filters (props) {
  const [categoryFilters, setCategoryFilter] = useState([])
  const [tagFilters, setTagFilter] = useState([])

  const { tagList, categoryList } = props
  const { getBlogCategoryList, getBlogTagList, getPostList } = props

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

  const fetchPostList = () => {
    getPostList({
      queryParams: {
        siteId: SITE_ID,
        tag: getSelectedTags().length ? getSelectedTags() : undefined,
        category: getSelectedCategories().length ? getSelectedCategories() : undefined
      }
    })
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
      fetchPostList()
    }
  }, [categoryFilters, tagFilters])

  return (
    <div className='filters-wrapper'>
      <div className='filter-section'>
        <p className='filter-heading'>Filter by category</p>
        {categoryFilters && categoryFilters.map(category => <Checkbox 
          key={category.id}
          data={category}
          onChangeCallback={(filter)=> handleCategoryChange(filter)}
        />)}
      </div>
      <div className='filter-section'>
        <p className='filter-heading'>Filter by category</p>
        {tagFilters && tagFilters.map(tag => <Checkbox 
          key={tag.id}
          data={tag}
          onChangeCallback={(filter)=> handleTagChange(filter)}
        />)}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    categoryList: state.common.blogCategoryList,
    tagList: state.common.blogTagList
  }
}

export default (connect(mapStateToProps, { getPostList, getBlogTagList, getBlogCategoryList })(Filters))