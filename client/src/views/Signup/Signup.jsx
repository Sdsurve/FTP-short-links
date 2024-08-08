import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Signup() {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        dob: ""
    });

    const signup = async (e) => {
        e.preventDefault();

        if (!user.fullName || !user.email || !user.password || !user.dob) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/signup`, {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                dob: user.dob
            });

            if (response.data.success) {
                toast.success(response.data.message || "Signup successful!");

                setUser({
                    fullName: "",
                    email: "",
                    password: "",
                    dob: ""
                });
            } else {
                toast.error(response.data.message || "Signup failed.");
            }
        } catch (error) {
            toast.error("An error occurred during signup.");
        }
    };

    return (
        <>
            <div style={{ textAlign: "center", fontSize: "35px", margin: "20px" }}>Signup</div>
            <form className='link-form' onSubmit={signup}>
                <input
                    type="text"
                    placeholder='Full Name'
                    value={user.fullName}
                    className='link-inputs1'
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                />

                <input
                    type="email"
                    placeholder='Email'
                    value={user.email}
                    className='link-inputs1'
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder='Password'
                    value={user.password}
                    className='link-inputs1'
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <input
                    type="date"
                    placeholder='DOB'
                    value={user.dob}
                    className='link-inputs1'
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                />

                <button type='submit' className='register-btn1'>Register</button>
                <Link to='/Login' className='reference-links'>Do you have account? Login</Link>
            </form>
            <Toaster />
        </>
    );
}

export default Signup;
