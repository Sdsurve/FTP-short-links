import React from 'react'
import logo from "./logo.png"
import logout from './logout.png'
// import './bootstrap/dist/css/bootstrap.min.css';
import toast,{Toaster} from 'react-hot-toast'
import './Navbar.css'

function Navbar() {
    const logoutbt = async ()=>{
        localStorage.clear()
        toast.success('Logged out Successfully')
     setTimeout(()=>{
        window.location.href = '/login'
     }, 3000)
        
    }
  return (
    <div>
         <div className="navbar">

                <a className="navbar-brand web-nm" href="#"><img src={logo} style={{height:"50px"}} alt="" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="mid-div" id="navbarNav">
                    <ul className="navbar-nav nav-sec">
                        {/* <li className="nav-item" type="none">
                            <a className="nav-link web-direc" href="/main">Home</a>
                        </li>
                        <li className="nav-item" type="none">
                            <a className="nav-link web-direc" href="/login">Login</a>
                        </li> */}
                        <li className="nav-item" type="none">
                        <span className='nav-link logot web-direc' onClick={logoutbt}>
                        Logout  <img src={logout} style={{height:"22px",marginLeft:"10px"}} alt="" />
                        </span>
                        </li>
                       
                    </ul>
                </div>
            </div>
        <Toaster/>
    </div>
  )
}

export default Navbar