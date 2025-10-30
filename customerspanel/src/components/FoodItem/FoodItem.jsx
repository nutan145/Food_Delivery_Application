import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,description,imageUrl,price}) => {

    const {increaseQuantity,decreaseQuantity,quantities,token}=useContext(StoreContext);
    const navigate=useNavigate();

  return (
    <div className='col-11 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center'>
    <div className="card" style={{width:'320px'}}>
        <Link to={`/foodItem/${id}`}>
              <img src={imageUrl} className="card-img-top" height={180} width={90} alt="Food Image"/>
         </Link>
       <div className="card-body">
           <h5 className="card-title">{name}</h5>
           <p className="card-text">{description}</p>
           <div className="d-flex justify-content-between align-items-center">
               <span className="h5 mb-0">&#8377; {price}</span>
               <div>
                   <i className="bi bi-star-fill text-warning"></i>
                   <i className="bi bi-star-fill text-warning"></i>
                   <i className="bi bi-star-fill text-warning"></i>
                   <i className="bi bi-star-fill text-warning"></i>
                   <i className="bi bi-star-half text-warning"></i>
               </div>
           </div>
       </div>
      <div className="card-footer d-flex justify-content-between bg-light">
           <Link to={`/foodItem/${id}`} className="btn btn-info btn-sm bi bi-eye-fill">&nbsp;View Details</Link>
          {quantities[id]>0 ? (
                   
                   <div className='d-flex align-items-center gap-2'>
                         <button className='btn btn-info btn-sm bi bi-dash' 
                           onClick={()=>decreaseQuantity(id)}></button>
                         <span className='fw-bold'>{quantities[id]}</span>
                         <button className='btn btn-info btn-sm bi bi-plus' 
                         onClick={()=>increaseQuantity(id)}></button>
                   </div>
          ) : (
              <button className='btn btn-info btn-sm bi bi-plus' onClick={()=> token? increaseQuantity(id):navigate('/login')}>

              </button>
          )}
       </div>
    </div>
</div>
  )
}

export default FoodItem