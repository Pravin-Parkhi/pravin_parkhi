import React from 'react'

import Checkbox from '../checkbox/checkbox.component'

import './filters.component.scss'

export default function Filters (props) {

  const { tagFilters, categoryFilters } = props
  const { onCategoryChangeCallback, onTagChangeCallback } = props

  return (
    <div className='filters-wrapper'>
      <div className='filter-section'>
        <p className='filter-heading'>Filter by category</p>
        {categoryFilters && categoryFilters.map(category => <Checkbox 
          key={category.id}
          data={category}
          onChangeCallback={(filter)=> onCategoryChangeCallback(filter)}
        />)}
      </div>
      <div className='filter-section'>
        <p className='filter-heading'>Filter by category</p>
        {tagFilters && tagFilters.map(tag => <Checkbox 
          key={tag.id}
          data={tag}
          onChangeCallback={(filter)=> onTagChangeCallback(filter)}
        />)}
      </div>
    </div>
  )
}