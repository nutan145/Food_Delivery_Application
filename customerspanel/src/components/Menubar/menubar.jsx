import React, { useContext, useState } from 'react'
import './menubar.css'
import { assets } from '../../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'


const menubar = () => {

   const {quantities,token,setToken,setQuantities}=useContext(StoreContext);

   const[active,setActive]=useState('home');

   const cartCount=Object.values(quantities || {}).filter(qnty=>qnty>0).length;

   const navigate=useNavigate();

   const logout=()=>{
      localStorage.removeItem('token');
      setToken("");
      setQuantities({});
      navigate("/");
   }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
       <Link to="/"><img src={assets.LOGO} height={50} width={70} className='logo mx-2 rounded-circle'/></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={active=='home' ? 'nav-link fw-bold active':'nav-link'} aria-current="page" to='/home' 
            onClick={()=>setActive('home')}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className={active=='explore' ? 'nav-link fw-bold active':'nav-link'} to="/explore"
            onClick={()=>setActive('explore')}>Explore</Link>
          </li>
          <li className="nav-item">
          <Link className={active=='contact' ? 'nav-link fw-bold active':'nav-link'} to="/contact-us" 
          onClick={()=>setActive('contact')}>Contact Us</Link>
          </li>
          <li className="nav-item">
          <Link className={active=='myOrders' ? 'nav-link fw-bold active':'nav-link'} to="/myOrders" 
          onClick={()=>setActive('myOrders')}>My Orders</Link>
          </li>
        </ul>
         <div className='menubar-right'>
               <Link to='/cart'>
                    <div className='cart-container'>
                        <img src={assets.cart} height={28} width={28}/>
                        <span className='cart-badge badge rounded-pill bg-danger'>{cartCount}</span>
                    </div>
               </Link>
               {
                  !token ?
                  <>
                      <Link to='/login' className='btn btn-outline-primary btn-sm'>Login</Link>
                      <Link to='/register' className='btn btn-outline-success btn-sm'>Register</Link>
                  </> :
                  <div className='dropdown text-end me-lg-5'>
                         <a href='#' className='d-block link-body-emphasis text-decoration-none dropdown-toggle'
                           data-bs-toggle='dropdown' aria-expanded='false'>
                              <img src={assets.profile} alt="preview"  height={40} width={40} 
                              className='rounded-circle'/>
                         </a>
                         <ul className='dropdown-menu'>
                              <li className="dropdown-item" onClick={()=>navigate("/myOrders")}>Orders</li>
                              <li className="dropdown-item" onClick={logout}>Logout</li>
                         </ul>
                  </div>
               }
         </div>

      </div>
    </div>
  </nav>
  )
}

export default menubar