import React from 'react'

const Pagination = ({currentPage, hanldePageChange,noOfPages}) => {
  return (
    <div className='row mx-0'>
      <div className="col-12 text-center pb-4 pt-4">
        <button disabled={currentPage === 1} onClick={() => hanldePageChange("Prev")} className="btn_mange_pagging">
            <i className="fa fa-long-row-left"></i>&nbsp;
        </button>
        <span className="btn_pagging">{currentPage}</span>
        <button onClick={() => hanldePageChange("Next")} className="btn_mange_pagging">
          Next <i className="fa fa-long-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination