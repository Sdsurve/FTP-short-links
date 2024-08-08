import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import loginbg from "./loginbg.png"
import logo from './logo.png'

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const loginNow = async() => {
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/login`, {
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

     toast.loading('Redirecting to dashboard...')

     setTimeout(()=>{
       window.location.href = '/'
     }, 3000)
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>
      <div className='login-div'>
      <div style={{justifyContent:"center"}}>
        <img src={logo} style={{height:"70px",display:"block", marginTop:"25%"}} alt="" />
      <h1 style={{textAlign:"center",marginTop:"5%",fontSize:"30px"}}>Welcome...😉</h1>
      <h2 style={{fontSize:"22px",textAlign:"center"}}>Log in to Shorten Your Path</h2>
      <span>
      "Effortlessly transform long URLs into compact, shareable links with our innovative URL shortener.</span>
      </div>
      <div>
      <h1 className='form-heading'>User Login</h1>

      <form className='link-form1'>
      <img className='login-img' src={loginbg} alt="" />
        <input
          type='email'
          placeholder='Email'
          className='link-inputs1'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          />

        <input
          type='password'
          placeholder='Password'
          className='link-inputs1'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          />

        <button
          type='button'
          onClick={loginNow}
          className='register-btn1'>
          Login
        </button>
        
        <Link to='/Signup' className='reference-links'>Don't have an account? Signup</Link>
      </form>
      </div>
      </div>

     

      <Toaster />
    </div>
  )
}

export default Login