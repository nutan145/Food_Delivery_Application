import React from 'react'
import { assets } from '../../assets/assets'
import './PageNotFound.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <img
          src={assets.notFound}
          alt="Page Not Found"
          className="img-fluid page-not-found"
          width='800px'
          height='300px'
         />
        <h4 className="mb-3">We can't seem to find the page you're looking for...</h4>
        <Link to='/' className="btn btn-danger bi bi-arrow-left text-white fw-bold px-4 py-2 mb-4"> Back To Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound
