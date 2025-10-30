import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { fetchFoodDetails } from '../../Service/FoodService'
import {toast} from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const FoodDetails = () => {

   const[foodItem,setFoodItem]=useState({});
   const params=useParams(); 

   const {increaseQuantity,token}=useContext(StoreContext);
   const navigate=useNavigate();

   useEffect(()=>{
        const loadData=async ()=>{
          try
          {
              const foodData=await fetchFoodDetails(params.id);
              setFoodItem(foodData);
          }
          catch(error)
          {
               toast.error("Error displaying the food details")
          }
        }
        loadData();
   },[params.id])

   const addToCart=()=>{
        token ? increaseQuantity(foodItem.id) : navigate('/login');
   }

  return (
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
           <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={foodItem.imageUrl} alt="..." /></div>
              <div className="col-md-6">
                 <div className="fs-5 mb-1">Category:&nbsp;<span className='badge text-bg-warning'>{foodItem.category}</span></div>
                 <h1 className="display-5 fw-bolder">{foodItem.name}</h1>
                 <div className="fs-5 mb-2">
                    <span>&#8377;{foodItem.price}.00</span>
                    <span className='mx-4'>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-half text-warning"></i>
                    </span>
                 </div>
                < p className="lead">{foodItem.description}</p>
                 <div className="d-flex">
                    <button className="btn btn-outline-dark flex-shrink-0" type="button" 
                    onClick={addToCart}>
                        <i className="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}

export default FoodDetails