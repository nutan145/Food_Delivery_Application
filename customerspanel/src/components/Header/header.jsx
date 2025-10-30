import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'


const header = () => {
  return (
    <div className='p-5 bg-light rounded-3 mt-1 header'>
          <div className='container-fluid py-5'>
                 <h1 className='display-5 fw-bold'>Order Your Favorite Food Here</h1>
                 <p className='fs-4 col-md-8 fw-medium'>Discover the best food and drinks in Hyderabad</p>
                 <Link to='/explore' className='btn btn-primary'>Explore</Link>
          </div>
    </div>
  )
}

export default header