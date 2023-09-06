import React from 'react'


const HeroSection = () => {
  return (
    <div>
    <section class="bg-dark text-light pt-5 pb-5 text-center text-sm-start">
        <div class="container">
            <div class="d-sm-block d-md-flex  align-items-center justify-content-between">
                <div>
                    <h1 class="text-capitalize ">Get Admitted to your <span class="text-success">Dream University</span> </h1>
                    <p class="lead my-4 text-lowercase font-monospace  ">contact us and Book for a Consultation Session
                    </p>
                    <button class="btn btn-success btn-lg">Start</button>
                </div>
             
                <img class="img-fluid w-25 d-none d-sm-block" src={require("../images/schoolbg.png")} alt=""/>
            </div>
        </div>
    </section> 

    </div>
  )
}

export default HeroSection