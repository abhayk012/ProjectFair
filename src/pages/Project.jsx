import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allprojectAPI } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken, setIsToken] = useState(false)
  const [searchkey, setsearchkey] = useState("")
  const [allproject, setallproject] = useState([])
  const getallproject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allprojectAPI(searchkey,reqheader)
      setallproject(result.data);
    }
  }
  useEffect(() => {
    getallproject();
  }, [searchkey])
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>All Projects</h2>
        <div className='mt-5 w-25 d-flex'>
          <input type="text" className='form-control' placeholder='search project using technology' 
          onChange={(e)=>setsearchkey(e.target.value)} />
          <i class='fa-solid fa-magnifying-glass fa-rotate-90 mt-1' style={{ marginLeft: "-45px" }}></i>
        </div>
      </div>
      <Row className='m-5'>
        
          {
            allproject.length > 0 ?
              allproject.map((item) => (
                <Col md={6} lg={4} sm={12}>
                <Projectcard project={item}/>
                </Col>
              )) :
              <div>
                {
                  isToken?
                  <p>no projects available</p>
                  :
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8_SqNk9HGhazfysh4VDkppIe-D95y17vNe2gcutUnyrkUvPqpvMIRyb6qhMu4ewyMpKA&usqp=CAU" 
                     height="400px" alt="" />
                    <p className="text-danger fs-4" >Please <Link to='/login' style={{textDecoration:"none"}}>Login</Link> To View Projects</p>
                  </div>
                }
              </div>
          }
        
      </Row>
    </>
  )
}

export default Project