import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

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
      <h1 className='form-heading'>User Login</h1>

      <form className='link-form1'>
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

     

      <Toaster />
    </div>
  )
}

export default Login