import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Loader from '../../../common/loader/loader.component'

import './details.component.scss'

function PostDetails (props) {
  const [ showLoader, setLoader ] = useState(false)
 
  const renderMainContent = () => {
    return (<div className='content-wrapper'>
      Blog details
    </div>)
  }
  return (
    <div className='post-details-container'>
      {showLoader ? <Loader /> : renderMainContent()}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    
  }
}

export default (connect(mapStateToProps, null)(PostDetails))