import React, { useState } from 'react'
import authimg from '../Assets/img1.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { Form  } from 'react-bootstrap';
import './auth.css'
import { loginAPI, registerAPI } from '../services/allApi';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Auth({ register }) {
  const navigate=useNavigate()
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister=async(e)=>{
    e.preventDefault();
    console.log(userdata);
    const{username,email,password}=userdata;
    if(!username || !email || !password){
      toast.warn("Please fill the form completely")
    }
    else{
      const result=await registerAPI(userdata)
      if (result.status === 200) {
        toast.success("user registered succesfully")
        setuserdata({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        toast.warn(result.response.data)
      }
    }
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    console.log(userdata);
    const{email,password}=userdata;
    if(!email || !password){
      toast.warn("Please fill the form completely")
    }
    else{
      const result=await loginAPI(userdata)
      if (result.status === 200) {
        alert("User Logged In Successsfully")
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))
       sessionStorage.setItem("token",result.data.token)
       setuserdata({
         username:"",
         email: "",
         password: ""
       })
       navigate('/')
      }
      else {
        toast.error(result.response.data)
      }
    }
  }
  const registerForm = register ? true : false;
  return (
    <>
      <div className='d-flex justify-content-center align-items-center ' style={{ width: "100%", height: "100vh" }}>
        <div className='w-75 container'>
          <Link to="/" style={{ textDecoration: "none", color: "black" }} >
            <i class="fa-solid fa-arrow-left"></i> Back To Home <i class="fa-solid fa-house"></i>
          </Link>
          <div className='card bg-success mt-3'>
            <div className='row align-items-center' >
              <div className='col-lg-6 col-md-6 p-5' >
                <img className='rounded' src={authimg} alt="" width={"100%"} height={""} />
              </div>
              <div className='col-lg-6 col-md-6 ' >
                <div className='d-flex align-items-center flex-column'>
                  <h2 style={{ fontWeight: "bolder" }}>
                    <i class='fa-brands fa-stack-overflow me-2'></i>
                    Project Fair
                  </h2>
                  <h4>
                    {
                      registerForm ? "Sign up to your account" : "Sign in to your account"
                    }
                  </h4>
                  <Form>
                    {
                      registerForm &&
                      <Form.Group md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={userdata.username}
                          onChange={(e)=>setuserdata({...userdata,username:e.target.value})}
                          type="text"
                          placeholder="Username" />
                      </Form.Group>
                    }
                    <Form.Group md="4" controlId="validationCustomUsername">
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        value={userdata.email}
                        onChange={(e)=>setuserdata({...userdata,email:e.target.value})}
                        type="email"
                        placeholder="enter your email" />
                    </Form.Group>

                    <Form.Group md="4" controlId="validationCustomUsername">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userdata.password}
                        onChange={(e)=>setuserdata({...userdata,password:e.target.value})}
                        type="password"
                        placeholder="password" />
                    </Form.Group>
                  </Form>
                  {
                    registerForm ?
                      <div className='mt5'>
                        <button className='btn btn-warning rounded mt-3' onClick={handleRegister}>Register</button>
                        <p>Already A User? Click Here To <Link to='/login' style={{ textDecoration: "none", fontWeight: "bolder", backgroundColor: "white", padding: "1px", borderRadius: "40%" }} className='log'>Login</Link></p>
                      </div>
                      :
                      <div >
                        <button className='btn btn-warning rounded mt-3' onClick={handleLogin}>Login</button>
                        <p>Not A User? Click Here To <Link to='/register' style={{ textDecoration: "none", fontWeight: "bolder", backgroundColor: "white", padding: "1px", borderRadius: "40%" }} className='log'>Register</Link></p>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={1500} theme="colored"/>
      </div>
    </>
  )
}

export default Auth