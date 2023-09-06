import React from 'react'

const OurServices = () => {
  return (
    <div>
         <section class="p-5">
        <div class="container">
            <h1 class="h1 mb-3 text-dark fw-bold">Our Services</h1>
            <div class="row text-center gap-3 gap-sm-4">
                <div class="col-md">
                    <div class="card bg-dark text-white">
                        <div class="card-body text-center">
                        <div class="h1 mb-3">
                            <i class="bi bi-laptop"></i>
                        </div>
                        <h3 class="card-title mb-3">Application Assistance:</h3>
                        <p class="card-text">
                            Assistance with application preparation, ensuring all necessary documentation is complete and accurate.
                            Our experienced team of educational consultants will guide you through 
                            the entire university admissions process. From choosing the right universities
                            to assisting with the application.
                        </p>
                            <a href="##" class="btn btn-primary">Read More</a>
                        </div>
                    </div> 
                </div>
                <div class="col-md">
                    <div class="card bg-secondary text-white">
                        <div class="card-body text-center">
                        <div class="h1 mb-3">
                            <i class="bi bi-amd"></i>
                        </div>
                        <h3 class="card-title mb-3">Education Consultation:</h3>
                        <p class="card-text">Personalized guidance and support in selecting the right educational path.
                                Expert advice on choosing the ideal schools, colleges, or universities based on your interests, goals, and budget.
                                Assessment of your academic profile and exploration of suitable programs.</p>
                            <a href="##" class="btn btn-dark">Read More</a>
                        </div>
                    </div> 
                </div>
                <div class="col-md">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                        <div class="h1 mb-3">
                            <i class="bi bi-book"></i>
                        </div>
                        <h3 class="card-title mb-3">Test Preparation:</h3>
                        <p class="card-text">Preparation classes and resources for standardized tests such as SAT, ACT, GMAT, GRE, TOEFL, and IELTS.
Customized study plans tailored to your strengths and areas for improvement.
Practice exams and mock tests to enhance your test-taking skills.</p>
                            <a href="##" class="btn btn-danger">Read More</a>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="mt-2 mb-3">
                <p class='text-center fs-5  text-success '>At MyschoolInfo, we are dedicated to providing personalized services that cater to your unique needs. Our goal is to empower you to achieve your educational dreams. Contact us today to explore how we can assist you on your path to success."</p>
            </div>

        </div>
    </section>
    </div>
  )
}

export default OurServices