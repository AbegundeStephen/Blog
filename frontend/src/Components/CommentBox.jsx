import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommentBox = ({userId,userComment,setUserComment, handleComment}) => {
    const navigate = useNavigate()
  return (
 <>
 <form action="" className="row blog-form">
  <div className="col-12 py-3">
    <textarea name=""
     className='form-control-description' 
     id="" 
     cols="30"
     rows="10"
     />
  </div>
 </form>
 {!userId ? (
  <>
  <h5>Please login or create an account to leave comment</h5>
  <button className="btn btn-success" onClick={() => navigate("/auth")}>Login</button>
  </>
 ): (
  <>
   <button 
   type="submit"
   onClick={handleComment}
   className="btn btn-primary">Post Comment</button>
  </>
 )}
 </>
  );
};

export default CommentBox