import React from 'react'
import { useNavigate } from 'react-router-dom'
const Search = ({search,handleChange}) => {

  const handleSubmit = () => {}
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Search</div>
      <form action="" className="form-inline" onSubmit={handleSubmit}>
        <div className="col-12 py-3">
          <input
          type='text'
          value={search}
          className='form-control search-input'
          placeholder='search'
          onChange={handleChange}/>
        </div>
        <button className="btn btn- search-btn">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  )
}

export default Search