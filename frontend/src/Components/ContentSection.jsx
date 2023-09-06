import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import { excerpt } from '../Utilities'
const ContentSection = ({articles, user,handleDelete}) => {
  return (
    <div>
      <div className="row pb-4" key={articles.id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={articles.imgUrl} alt={articles.title} />
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md">
        <div className="text-start">
          <h6 className="category cat-color">{articles.category}</h6>
          <span className="title py-2">{articles.title}</span>
          <span className="meta-info">
            <p className="author">{articles.author}</p> -&nbsp;
            {articles.timestamp.toDate().toDateString()}
          </span>

        </div>
        <div className="short-description-text text-start">
          {excerpt(articles.description,130)}
        </div>
        <Link to={`/detail/${articles.id}`}>
        <button className="btn btn-read">See More</button>
        </Link>
        {user && user.uid === articles.userId && (
          <div style={{float:"right"}}>
            <FontAwesome
             name="trash"
             style={{margin:"15px", cursor:"pointer"}}
             size="2x"
             onClick={() => handleDelete(articles.id)}/>
             <Link to={`/update/${articles.id}`}>
             <FontAwesome
             name="edit"
             style={{cursor:"pointer"}}
             size="2x"
             />
             </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentSection