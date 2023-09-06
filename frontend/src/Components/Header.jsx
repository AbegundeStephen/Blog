import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({active, setActive, user, handleLogout}) => {
  const userId = user?.uid
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a href="#home" class="navbar-brand mx-0 text-start">
        
       <p></p> Educonsulting Solutions</a>
         <button class="navbar-toggler nav-toggler-right"
         type='button'
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
         >
          <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse " id="navmenu">
            <ul class="navbar-nav me-auto flex mx-auto mb-2 mb-lg-0 fs-5 fw-bold gap-2  ">
              <Link to="/" style={{textDecoration:"none"}}>
                <li className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}>Home</li>
              </Link>
              
              {user && (  
              <Link to="/create" style={{textDecoration:"none"}}>
                <li className={`nav-item nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    onClick={() => setActive("create")}>Create</li>
              </Link>
              )}
              
             <Link to="/contact" style={{textDecoration:"none"}}>
                <li className={`nav-item nav-link ${
                      active === "contact" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}>Contact us</li>
              </Link>
              
              <Link to="/about" style={{textDecoration:"none"}}>
                <li className={`nav-item nav-link ${
                      active === "about" ? "active" : ""
                    }`}
                    onClick={() => setActive("about")}>About</li>
              </Link>
              <Link to="/questions" style={{textDecoration:"none"}}>
                <li className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("faqs")}>FAQS</li>
              </Link>
            </ul>
            <div className="ms-auto text-light g-2">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {userId ? (
                  <>
                  <div className="profile-logo">
                    <img src={user?.imgUrl} alt="logo"
                    style={{
                      width:"30px",height:"30px",borderRadius:"50%",marginTop:'12px'
                    }} />
                  </div>
                  <p style={{marginTop:"12px",marginLeft:"5px",}}>
                    {user?.displayName}
                  </p>
                  <li className="nav-item nav-link" onClick={handleLogout}>
                   Logout
                  </li>
                  </>
                ) : (
                  <Link to="/auth" style={{textDecoration:"none",fontSize:"10px"}}>
                    <li className={`nav-item nav-link ${active === "login"? "active" : ""}`}
                    onClick={() => setActive("login")}>Login</li>
                  </Link>
                )}
              </ul>
            </div>
         </div>
        
        
      </div>
  
   </nav>
  )
}

export default Header 