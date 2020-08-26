import React from 'react'

import Checkbox from '../checkbox/checkbox.component'

import './filters.component.scss'

export default function Filters (props) {

  const { tagFilters, showFilters, categoryFilters } = props
  const { onCategoryChangeCallback, onTagChangeCallback } = props

  return (
    <div className='filters-wrapper' style={{
      width: showFilters ? '300px' : '0px',
      padding: showFilters ? '10px 20px' : '10px 0px'
    }}>
      <div className='filter-section' style={{display: showFilters ? 'block' : 'none'}}>
        <p className='filter-heading'>Filter by category</p>
        <div className='filters-list'>
          {categoryFilters && categoryFilters.map(category => <Checkbox 
            key={category.id}
            data={category}
            onChangeCallback={(filter)=> onCategoryChangeCallback(filter)}
          />)}
        </div>
      </div>
      <div className='filter-section' style={{display: showFilters ? 'block' : 'none'}}>
        <p className='filter-heading'>Filter by category</p>
        <div className='filters-list'>
          {tagFilters && tagFilters.map(tag => <Checkbox 
            key={tag.id}
            data={tag}
            onChangeCallback={(filter)=> onTagChangeCallback(filter)}
          />)}
        </div>
      </div>
    </div>
  )
}