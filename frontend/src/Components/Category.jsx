import React from 'react'
import { Link } from 'react-router-dom'
const Category = ({catgContentCount}) => {
  return (
    <div className='widget'>
        <div className="blog-heading py-2-mb-4 text-start">
            <div className="link-widget">
                <ul>
                    {catgContentCount?.map((item, index) => (
                        <li key={index}>
                        <Link to={item.category} style={{textDecoration:"none"}}>
                            {item.category}
                            <span>({item.count})</span>
                        </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Category