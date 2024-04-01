import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({dashboard}) {
  const isdashboard=dashboard?true:false;
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existinnguser");
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
       <Navbar className="bg-success">
        <Container>
         <Link to={'/'} style={{textDecoration:"none"}} >
         <Navbar.Brand className='text-light'>
          <i className="fa-brands fa-stack-overflow me-3 ms-5"></i>
          Project Fair
          </Navbar.Brand>
         </Link>
         {
          isdashboard&&
          <button className='btn btn-warning rounded' onClick={handleLogout}>Logout</button>
         }
        </Container>
      </Navbar>
    </>
  )
}

export default Header