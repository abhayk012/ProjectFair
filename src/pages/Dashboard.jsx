import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'

function Dashboard() {
  const [username,setusername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const existinguserdata= JSON.parse(sessionStorage.getItem("existinguser"));
      setusername(existinguserdata.username);
    }
  },[])
  return (
    <>
          <Header dashboard={"dashboard"}/>
          <h2 className='mt-5 ms-5 mb-5'>Welcome <span style={{color:"red",fontWeight:"bold"}}> {username}</span></h2>
    <Row className='mb-5 me-3'>
   
    <Col md={8} lg={8}>
      <Myproject/>
    </Col>

    <Col md={4} lg={4}>
      <Profile/>
    </Col>
    
   </Row>
    </>
  )
}

export default Dashboard