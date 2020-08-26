import React, { useState } from 'react'
import moment from 'moment'

import { Link } from "react-router-dom";
import { FiUser } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { CgArrowLongRight } from 'react-icons/cg';

import './post.component.scss'
import { IconContext } from 'react-icons';

export default function Post (props) {
  const { data, showFullPost } = props
  const { ID, title, post_thumbnail, categories, date, author, content, tags } = data

  const categoriesList = Object.keys(categories).map((category) => {
    return (
      <p key={categories[category].ID} className='category-name'>{category}</p>
    );
  });
  const tagList = Object.keys(tags).map((tag) => {
    return (
      <p key={tags[tag].ID} className='tag-name'>{tag}</p>
    )
  })

  const getPostContent = () => {
    const postContentBrief = new DOMParser().parseFromString(content, 'text/html')
    const contentToShow = postContentBrief.querySelector('p').textContent
    return contentToShow
  }
  
  return (
    <div className='post-wrapper'>
      <img
        src={post_thumbnail.URL}
        alt='Post Thumbnail'
        className='post-thumbnail'
      />
      <h3 className='title' dangerouslySetInnerHTML={{ __html: title }}></h3>
      <div className='category-list'>{categoriesList}</div>
      <div className='post-meta'>
        <div className='time'>
          <IconContext.Provider value={{style: { color: '#767676' }}}>
            <IoMdTime />
          </IconContext.Provider>
          <span>{moment(date).fromNow()}</span>
        </div>
        <div className='author'>
          <IconContext.Provider value={{style: { color: '#767676' }}}>
            <FiUser />
          </IconContext.Provider>
          <span>{author.name}</span>
        </div>
      </div>
      {showFullPost ? 
        <p className='post-content' dangerouslySetInnerHTML={{__html: content}}></p> 
          : <p className='post-content'>{getPostContent()}</p>}
      <p className='read-more-link'>
        <Link to={`/post-list/${ID}/details`}>
          <span>Continue Reading</span>
          <IconContext.Provider value={{style: { marginBottom: '-4px', marginLeft: 5 }}}>
            <CgArrowLongRight />
          </IconContext.Provider>
        </Link>
      </p>
      <div className='tag-list'>{tagList}</div>
    </div>
  )
}
