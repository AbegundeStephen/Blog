import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
<div class="container-fluid mt-5">

<footer class="text-white text-center text-lg-start bg-dark">
  {/* <!-- Grid container --> */}
  <div class="container p-4">
    {/* <!--Grid row--> */}
    <div class="row mt-4">
      {/* <!--Grid column--> */}
      <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4">EduConsulting Solutions</h5>
          <img src="/frontend/public/images/logo.png" class="img-fluid w-50 d-none d-sm-block" alt="logo"/>
        <div class='d-block'>
        <ul class=" mx-auto mb-2 mb-lg-0 fs-3 fw-bold gap-2  ">
              <Link to="/" style={{textDecoration:"none",color:"white"}}>
                <li class='nav-item nav-link'>Home</li>
              </Link>
               
             <Link to="/contact" style={{textDecoration:"none", color:"white"}}>
                <li class='nav-item nav-link'>Contact us</li>
              </Link>
              
              <Link to="/about" style={{textDecoration:"none", color:"white"}}>
                <li class ='nav-item nav-link'>About</li>
              </Link>
            </ul>
        </div>


        <div class="mt-4">
       
          {/* <!-- Facebook --> */}
          <a href='##' type="button" class="btn btn-floating btn-light btn-lg m-2"><i class="bi bi-facebook"></i></a>
          {/* <!-- Dribbble --> */}
          <a href='##' type="button" class="btn btn-floating btn-light btn-lg m-2"><i class="bi bi-instagram"></i></a>
          {/* <!-- Twitter --> */}
          <a href='##' type="button" class="btn btn-floating btn-light btn-lg m-2"><i class="bi bi-twitter"></i></a>
          {/* <!-- Google + --> */}
          <a href='##' type="button" class="btn btn-floating btn-light btn-lg m-2"><i class="bi bi-google"></i></a>
          {/* <!-- Linkedin --> */}
          </div>
        </div>
      
      {/* <!--Grid column--> */}

      {/* <!--Grid column--> */}
      <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4 pb-1 mt-2">Subscribe to Our Newsletter</h5>

        <div class="form-outline d-lg-flex gap-lg-2 form-white mb-4">
          <input type="text" id="formControlLg" class="form-control form-control-lg" />
          <button class="btn btn-danger btn-lg my-2 ">Subscribe</button>
        </div>

        <ul class="fa-ul" style={{marginLeft:1.65+"rem"}}>
          <li class="mb-3">
            <span class="fa-li"><i class="bi bi-house"></i></span><span class="ms-2">Lagos, Nigeria</span>
          </li>
          <li class="mb-3">
            <span class="fa-li"><i class="bi bi-envelope"></i></span><span class="ms-2">contact@myschoolinfo@gmail.com</span>
          </li>
          <li class="mb-3">
            <span class="fa-li"><i class="bi bi-phone"></i></span><span class="ms-2">08134657752</span>
          </li>
        </ul>
      </div>
      {/* <!--Grid column--> */}

      {/* <!--Grid column--> */}
      <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase mb-4">Opening hours</h5>

        <table class="table text-center text-white">
          <tbody class="fw-normal">
            <tr>
              <td>Mon - Thu:</td>
              <td>8am - 9pm</td>
            </tr>
            <tr>
              <td>Fri - Sat:</td>
              <td>8am - 1am</td>
            </tr>
            <tr>
              <td>Sunday:</td>
              <td>9am - 10pm</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <!--Grid column--> */}
    </div>
    {/* <!--Grid row--> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div class="text-center p-3" style={{backgroundColor:" rgba(0, 0, 0, 0.2)"}}>
    Copyright Educonsulting Solutions &copy; 2023
  </div>
  
</footer>

</div>

  )
}

export default Footer