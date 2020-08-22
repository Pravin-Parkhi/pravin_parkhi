import React from 'react'
import { NavLink } from 'react-router-dom'

import './side-nav.component.scss'

export default function SideBar (props) {
  return (
    <div className='side-bar'>
      <div className='side-bar-option'>
        <div>
          <NavLink className='page-links' activeClassName='active-page' to='/dashboard'>
            fafa
          </NavLink>
        </div>
      </div>
      <div className='side-bar-option'>
        <div>
          <NavLink className='page-links' activeClassName='active-page' to='/bill-list'>
            algnag
          </NavLink>
        </div>
      </div>
    </div>
  )
}