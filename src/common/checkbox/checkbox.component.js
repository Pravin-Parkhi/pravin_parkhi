import React from 'react'

import './checkbox.component.scss'

export default function Checkbox (props) {
    const { data } = props
    const { onChangeCallback } = props

    const handleOnChange = () => {
        onChangeCallback(data)
    }

    return (
        <div className="checkbox-wrapper" onClick={handleOnChange}>
            {data.isSelected ? <span className='filter-icon selected'></span> : <span className='filter-icon unselected'></span>}
            <span className='filter-name'>{data.label}</span>
        </div>
    )
}
