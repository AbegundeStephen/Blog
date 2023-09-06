import './App.css';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import  Details from './Pages/Details'
import NotFound from "./Pages/NotFound"
import About from "./Pages/About"
import CreateEditBlog from "./Pages/CreateEditBlog"
import './style.scss'
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import Auth from './Pages/Auth';
import { auth, } from './firebase';
import { signOut } from 'firebase/auth';
import ScrollUp from './Components/ScrollUp';
import Newnav from './Components/Newnav';
import ContactUs from './Components/ContactUs';

function App() {
  const [active, setActive] = useState("home")
  const [user, setUser] = useState(null)
  const Navigate = useNavigate()

  useEffect(() => {
    //capture changes in the user's sign-in/sign-out state.
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      }else {
        setUser(null)
      }
    })
  },[])

  //Runs when the logout button is clicked and sets user's state to null
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive("login")
      Navigate("/auth")
    })
  }
  return (
   <div className='App'>
    <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
    <ScrollUp/>
    <ToastContainer/>
   <Routes>
   <Route path='/' element={<Home setActive={setActive} user={user} active={active}/>}/>
   <Route path='/detail/:id' element={<Details setActive={setActive} user={user}/>}/>
    <Route path='/create' element={user?.uid ? ( <CreateEditBlog user={user}/>) : (<Navigate to="/"/>)}/>
    <Route path='/update/:id' element={user?.uid ? <CreateEditBlog user={user} setActive={setActive}/>:( <Navigate to="/"/>)}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/new' element={<Newnav/>}/>
    <Route path='contact' element={<ContactUs/>}/>
    <Route path='/auth' element={<Auth setActive={setActive} setUser={setUser}/>}/>
    <Route path='*' element={<NotFound/>}/>
   </Routes>
   </div>
  );
}

export default App;
