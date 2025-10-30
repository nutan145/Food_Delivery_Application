import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets.js'

const Sidebar = ({sidebarVisible}) => {
  return (
    <div className={`border-end bg-white ${sidebarVisible ? '' : 'd-none'}`} id="sidebar-wrapper">
       <div className="sidebar-heading border-bottom bg-light">
         <img src={assets.LOGO} height='45' width='60'  className='rounded-circle'/>
       </div>
          <div className="list-group list-group-flush">
           <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">
                <i className='bi bi-plus-circle fst-normal fw-semibold'>&nbsp; Add Food Item</i>
           </Link>
           <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">
                <i className='bi bi-list-ul fst-normal fw-semibold'>&nbsp; Food Items</i>
           </Link>
           <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders">
               <i className='bi bi-cart fst-normal fw-semibold'>&nbsp; Orders</i>
           </Link>
          </div>
      </div>
  )
}

export default Sidebar