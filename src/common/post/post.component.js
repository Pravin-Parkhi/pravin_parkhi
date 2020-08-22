import React from 'react'
import moment from 'moment'

import { Link } from "react-router-dom";
import { FiUser } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';

import './post.component.scss'

export default function Post (props) {
  const { data } = props
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

  const postContentBrief = new DOMParser().parseFromString(content, 'text/html')

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
        <p className='time'>
          <IoMdTime />
          <span>{moment(date).fromNow()}</span>
        </p>
        <p className='author'>
          <FiUser />
          <span>{author.name}</span>
        </p>
      </div>
      <p className='post-content'>{postContentBrief.querySelector('p').textContent}</p>
      <p className='read-more-link'>
        <Link to={`/post-list/${ID}/details`}>Continue Reading</Link>
      </p>
      <div className='tag-list'>{tagList}</div>
    </div>
  )
}
