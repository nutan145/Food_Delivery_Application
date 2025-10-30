import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import './foodList.css';
import { deleteFoodItem, getAllFoodItems } from '../../Service/FoodService';
import {Link} from 'react-router-dom'

const FoodList = () => {

  const[items,setItem]=useState([]);

  const foodItems= async ()=>{

        try
        {
              const response= await getAllFoodItems();
              if(response.status==200)
              {
                  setItem(response.data);
              }
        }
        catch(error)
        {
           console.log(error);
           toast.error("There is no food items");
        }
      
  }

   const removeItem= async (foodId)=>{
       
            try
            {
                 const response= await deleteFoodItem(foodId);
                 if(response.status==200)
                 {
                    toast.success('food item deleted successfully');
                    foodItems();
                 }
            }
            catch(error)
            {
               toast.error('error while deleting food item');
            }
        
   }

  useEffect(()=>{
       foodItems();
  },[])

  return (
    <div className='py-5 row justify-content-center'>
          <div className='col-11 card'>

          <table className='table table-hover'>
               <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
               </thead>
               <tbody>
                {
                   items.map(item=>
                     <tr key={item.id}>
                          <td>
                            {
                               <img src={item.imageUrl} height={50} width={50}/>
                            }
                          </td>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>&#8377; {item.price}.00</td>
                          <td>
                            <Link to={`/update/${item.id}`}><button className='bi bi-pen-fill mx-3'></button></Link>
                            <button className='bi bi-x-circle-fill text-danger' onClick={()=>removeItem(item.id)}></button>
                          </td>
                     </tr>
                   )
                }
               </tbody>
         </table>

          </div>
    </div>
  )
}

export default FoodList