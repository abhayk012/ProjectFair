import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../Assets/img2.jpeg'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../services/allApi'
import './home.css'

function Home() {
    const [homeproject, sethomeproject] = useState([])
    const getHomeproject = async () => {
        const result = await homeprojectAPI();
        sethomeproject(result.data)
    }
    useEffect(() => {
        getHomeproject();
    }, [])
    const [isloggedin, setisloggedin] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setisloggedin(true)
        }
    }, [])
    return (
        <>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "100vh" }}>
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6} lg={6}>
                            <h1 className='text-light mb-3' style={{ fontSize: "70px", fontWeight: "600" }} > Project Fair</h1>
                            <p>One stop Destination for All web appliction projects</p>
                            {
                                isloggedin ?
                                    <Link to='/dashboard'>
                                        <button className='btn btn-warning rounded'>Manage Projects</button>
                                    </Link>
                                    :
                                    <Link to='/login'>
                                        <button className='btn btn-warning rounded'>Get started</button>
                                    </Link>
                            }
                        </Col>
                        <Col sm={12} lg={6} md={6}>
                            <img src={titleimage} height={"450px"} alt="" style={{ borderRadius: "15px" }} />
                        </Col>
                    </Row>

                </div>
            </div>
            <div className='mt-5 all-project'>
                <div className='text-center' >
                    <h1>Explore my projects</h1>
                    <marquee scrollAmount={10}>
                        <div className='d-flex mt-5 mb-5'>
                            {
                                homeproject.length> 0 ?
                                    homeproject.map((item) => (
                                        <div className='ms-5' style={{ width: "400px" }} >
                                            <Projectcard project={item}/>
                                        </div>
                                    )) :
                                    <p>No projects to load</p>
                            }

                        </div>
                    </marquee>
                    <div className='text-center mt-5 mb-3' >
                        <h5 className='seeproject'><Link to={'/project'} style={{ textDecoration: "none", fontWeight: "bolder", }} >See more projects</Link></h5>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Home