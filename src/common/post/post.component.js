import React, { useState } from 'react'
import moment from 'moment'

import { Link } from "react-router-dom";
import { FiUser } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { CgArrowLongRight } from 'react-icons/cg';

import './post.component.scss'

const tagColors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export default function Post (props) {
  const { data, showFullPost } = props
  const { ID, title, post_thumbnail, categories, date, author, content, tags } = data

  const categoriesList = Object.keys(categories).map((category, index) => {
    return (
      <p key={categories[category].ID} className='category-name' style={{borderColor: tagColors[index]}}>
        {category}
      </p>
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
      {!showFullPost ? <p className='read-more-link'>
        <Link to={`/post-list/${ID}/details`}>
          <span>Continue Reading</span>
          <IconContext.Provider value={{style: { marginBottom: '-4px', marginLeft: 5 }}}>
            <CgArrowLongRight />
          </IconContext.Provider>
        </Link>
      </p> : null}
      <div className='tag-list'>{tagList}</div>
    </div>
  )
}
