import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div style={{marginTop:'30px'}} className='bg-success m-0'>
      <div className='d-flex justify-content-center alig-items-center '>
        <div className="footer d-flex justify-content-evenly alig-items-center mt-5 p-0 mb-0 " >
          <div className="website " style={{ width: '400px' }}>
            <h5 style={{fontWeight:"bolder"}}><Link to={'/'} style={{textDecoration:"none",color:"black"}} >
            <i className="fa-brands fa-stack-overflow me-3 ms-1"></i>
          Project Fair</Link>
              </h5>
            <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum suscipit iure vel iste cupiditate,
              asperiores expedita ex, maxime aut odit modi, facere placeat nobis illum officia soluta totam. Et, eos?</p>
          </div>
          <div className="links d-flex flex-column ms-5">
            <div className="links d-flex flex-column ms-5">
              <h4>links</h4>
              <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
              <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link>
              <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link>
            </div>

          </div>
          <div className="Guids d-flex flex-column ms-5">
            <h4>Guides</h4>
            <Link to='https://www.w3schools.com/html/html_symbols.asp' target='_blank' style={{ textDecoration: 'none', color: 'black' }}>React</Link>
            <Link style={{ textDecoration: 'none', color:'black' }}>React Bootstap</Link>
            <Link style={{ textDecoration: 'none', color: 'black' }}>Boots watch</Link>
          </div>
          <div className='contactus d-flex flex-column ms-5'>
            <h4>Contact us</h4>
            <div className="input d-flex">
              <input type="text" style={{ margin: '0px' }} placeholder='Enter your email' className='form-control' />
              <button className='btn btn-warning ms-2'> subscribe</button>

            </div>
            <div className="d-flex justify-content-evenly alig-items-center mt-3" style={{fontSize:'30px'}}>
            <Link className='' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-twitter"></i></Link>
            <Link className='' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-facebook"></i></Link>
            <Link className='' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-instagram"></i></Link>
            <Link className='' style={{ textDecoration: 'none', color: 'white' }}><i class="fa-brands fa-linkedin"></i></Link>


            </div>
          </div>

        </div>

      </div>
      <p className='mt-5 text-center'>copyright 2023 mediaPlayer &copy;</p>

    </div>  
    </>
  )
}

export default Footer