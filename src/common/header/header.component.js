import React from 'react'

import { connect } from 'react-redux'
import { IconContext } from 'react-icons'
import { GiHamburgerMenu } from 'react-icons/gi'
import { toggleFilters } from '../common.action-creator'

import BrandLogo from '../../assets/images/brand-logo.png'

import './header.component.scss'

function Header (props) {

  const { toggleFilters } = props

  const handleHamburgerClick = () => {
    toggleFilters()
  }
  
  return (
    <div className='header-wrapper'>
      <IconContext.Provider value={{ className: 'hamburger-wrapper' }}>
        <GiHamburgerMenu onClick={handleHamburgerClick} />
      </IconContext.Provider>
      <img src={BrandLogo} alt='Brand Logo' className='brand-logo' />
    </div>
  )
}

export default connect(null, { toggleFilters })(Header)