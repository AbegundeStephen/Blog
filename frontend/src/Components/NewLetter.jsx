import React from 'react'

const NewLetter = () => {
  return (
    <div>
         <section class=" text-light p-5">
        <div class="container">
            <div class="d-md-flex justify-content-between align-items-centr">
               
                <div className="input-group news-input">
                    <input type="text" class="form-control w-100 "
                    placeholder="Enter email" aria-label="Enter email"
                    aria-describedby="button-addon2"/>
                    <button class="btn btn-dark btn-lg" type="button" >Subscribe</button>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default NewLetter